export type TBadgeTheme = "light" | "dark";

export interface IBadgeConfig {
  id: string;
  href: string;
  alt: string;
  height: number;
  width?: number;
  getSrc: (theme: TBadgeTheme) => string;
}
