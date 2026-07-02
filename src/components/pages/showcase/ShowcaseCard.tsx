import ImageComponent from "@/components/common/Image";
import { IShowcaseItem } from "@/types/showcase.type";
import Link from "next/link";

const DEFAULT_ACCENT_COLORS = ["#e85d04", "#6b7280", "#a78bfa", "#3ca2fa"];

interface IShowcaseCardProps {
  item: IShowcaseItem;
  index: number;
}

function getDisplayDomain(websiteUrl: string): string {
  try {
    return new URL(websiteUrl).hostname.replace(/^www\./, "");
  } catch {
    return websiteUrl;
  }
}

function getCardSubtitle(item: IShowcaseItem): string {
  return item.subtitle ?? item.tags?.[0] ?? item.description;
}

export function ShowcaseCard({ item, index }: IShowcaseCardProps) {
  const accentColor =
    item.accentColor ?? DEFAULT_ACCENT_COLORS[index % DEFAULT_ACCENT_COLORS.length];
  const displayDomain = getDisplayDomain(item.websiteUrl);
  const subtitle = getCardSubtitle(item);

  return (
    <article className="group">
      <Link
        href={item.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
        aria-label={`Visit ${displayDomain}`}
      >
        <div
          className="relative overflow-hidden rounded-2xl px-5 pb-0 pt-8 sm:px-7 sm:pt-10"
          style={{ backgroundColor: accentColor }}
        >
          <div className="overflow-hidden rounded-t-xl border border-white/20 bg-[var(--background-color)] shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-black/10 transition-transform duration-300 ease-out group-hover:-translate-y-1">
            <div className="flex items-center gap-1.5 border-b border-[var(--border-color)] bg-[var(--background-color-2)] px-3 py-2">
              <span className="size-2 rounded-full bg-red-500/80" />
              <span className="size-2 rounded-full bg-yellow-500/80" />
              <span className="size-2 rounded-full bg-green-500/80" />
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <ImageComponent
                src={item.image}
                alt={`Screenshot preview of ${item.name}`}
                className="h-full w-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        <div className="mt-4 px-1">
          <h3 className="text-base font-semibold tracking-tight text-[var(--text-primary-color)] transition-colors group-hover:text-[var(--primary-color)]">
            {displayDomain}
          </h3>
          <p className="mt-1 text-sm text-[var(--opacity-text-color)]">
            {subtitle}
          </p>
        </div>
      </Link>
    </article>
  );
}
