import { IBadgeConfig, TBadgeTheme } from "@/types/launchpad.type";
import Image from "next/image";

interface BadgeLinkProps {
  badge: IBadgeConfig;
  theme: TBadgeTheme;
}

const BadgeLink = ({ badge, theme }: BadgeLinkProps) => {
  const { href, alt, height, width, getSrc } = badge;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={alt}
      className="transition-opacity duration-200 hover:opacity-80"
    >
      <Image
        src={getSrc(theme)}
        alt={alt}
        height={height}
        width={width ?? 160}
        style={{ height, width: width ?? "auto" }}
        unoptimized // external SVG URLs — Next.js optimizer doesn't support them
      />
    </a>
  );
};

export default BadgeLink;
