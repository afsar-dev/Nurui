export interface IShowcaseItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  image: string;
  websiteUrl: string;
  /** Short label shown under the domain, e.g. "Portfolio Site" */
  subtitle?: string;
  /** Card preview panel background color */
  accentColor?: string;
  tags?: string[];
}
