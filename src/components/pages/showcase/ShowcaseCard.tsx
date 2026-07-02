import ImageComponent from "@/components/common/Image";
import { IShowcaseItem } from "@/types/showcase.type";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ShowcaseCardProps {
  item: IShowcaseItem;
}

export const ShowcaseCard: React.FC<ShowcaseCardProps> = ({ item }) => {
  // Safe parsing of the hostname for display
  let displayDomain = "";
  try {
    displayDomain = new URL(item.websiteUrl).hostname;
  } catch {
    displayDomain = item.websiteUrl;
  }

  return (
    <Link
      href={`/showcase/${item.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--glass-color)] transition-all duration-300 hover:border-[var(--primary-color)] hover:shadow-[0_0_30px_rgba(60,162,250,0.15)] h-full"
      aria-label={`View details for ${item.name}`}
    >
      {/* Image container with fixed aspect ratio to prevent CLS */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-[var(--border-color)] bg-[var(--background-color-2)]">
        <ImageComponent
          src={item.image}
          alt={`Screenshot preview of ${item.name}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-color)]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--primary-color-4)] px-2.5 py-0.5 text-xs font-semibold text-[var(--primary-color)] border border-[var(--primary-color-3)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title and Icon */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-[var(--text-primary-color)] group-hover:text-[var(--primary-color)] transition-colors duration-200">
              {item.name}
            </h3>
            <span className="text-[var(--opacity-text-color)] group-hover:text-[var(--primary-color)] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={20} />
            </span>
          </div>

          {/* Description */}
          <p className="mt-2 text-sm text-[var(--opacity-text-color)] line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Domain name indicator */}
        <div className="mt-4 text-xs font-semibold text-[var(--primary-color)] opacity-60 group-hover:opacity-100 transition-opacity">
          {displayDomain}
        </div>
      </div>
    </Link>
  );
};
