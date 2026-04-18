import { SPONSOR } from "@/config/sponsor.config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { RiSparklingLine } from "react-icons/ri";

interface ISponsorAdProps {
  className?: string;
}

const STATUS_CONFIG = {
  "coming-soon": null,
  beta: {
    label: "Beta",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    icon: <RiSparklingLine className="text-blue-400" />,
  },
  live: null,
} as const;

const SponsorAd = ({ className }: ISponsorAdProps) => {
  const { label, description, href, cta, image, logo, badge, isOwn, status } =
    SPONSOR;

  const statusConfig = status ? STATUS_CONFIG[status] : null;
  const isComingSoon = status === "coming-soon";

  return (
    <div className={cn("pt-4", className)}>
      {/* "Sponsored" label — only for third-party */}
      {!isOwn && (
        <p className="text-[10px] uppercase tracking-widest text-[var(--opacity-text-color)] mb-2 flex items-center gap-1">
          <RiSparklingLine className="text-[var(--primary-color)]" />
          Sponsored
        </p>
      )}

      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "group flex flex-col rounded-xl overflow-hidden",
          "border border-[var(--border-color)]",
          "hover:border-[var(--primary-color)] hover:shadow-[0_0_12px_var(--primary-color-3)]",
          "transition-all duration-300",
        )}
      >
        {/* Banner image */}
        <div className="relative w-full h-[120px] overflow-hidden">
          <Image
            src={image}
            alt={label}
            fill
            className={cn(
              "object-cover transition-transform duration-500",
              isComingSoon
                ? "grayscale-[30%] group-hover:scale-105"
                : "group-hover:scale-105",
            )}
            unoptimized
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Coming soon overlay — subtle scanline effect */}
          {isComingSoon && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/90 px-3 py-1 rounded-full border border-white/20 bg-black/40 backdrop-blur-sm">
                Coming Soon
              </span>
            </div>
          )}

          {/* Badge top-right */}
          {badge && (
            <span className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--primary-color)] text-white">
              {badge}
            </span>
          )}

          {/* Logo bottom-left */}
          {logo && (
            <div className="absolute bottom-2 left-2">
              <Image
                src={logo}
                alt={`${label} logo`}
                width={24}
                height={24}
                className="rounded-md"
                unoptimized
              />
            </div>
          )}
        </div>

        {/* Text body */}
        <div className="p-3 space-y-2 bg-[var(--white-color)] dark:bg-[var(--background-color)]">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold text-[var(--text-primary-color)] group-hover:text-[var(--primary-color)] transition-colors duration-200">
              {label}
            </p>
            {statusConfig && (
              <span
                className={cn(
                  "text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 flex items-center gap-1",
                  statusConfig.className,
                )}
              >
                {statusConfig.icon}
                {statusConfig.label}
              </span>
            )}
          </div>

          <p className="text-xs text-[var(--opacity-text-color)] leading-relaxed line-clamp-2">
            {description}
          </p>

          <span className="text-xs font-semibold text-[var(--primary-color)] flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
            {cta}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default SponsorAd;
