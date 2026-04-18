export type SponsorStatus = "live" | "coming-soon" | "beta";

export interface ISponsorConfig {
  id: string;
  label: string;
  description: string;
  href: string;
  cta?: string;
  image: string; // full banner/hero image
  logo?: string; // optional small logo overlaid on banner
  badge?: string;
  isOwn?: boolean;
  status?: SponsorStatus;
}
