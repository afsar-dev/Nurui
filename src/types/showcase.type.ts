export interface IShowcaseItem {
  id: string;
  name: string;
  slug: string;
  description: string;       // Short description for listing grid
  longDescription: string;   // Detailed description for dynamic details route
  image: string;             // Screenshot/preview image path
  websiteUrl: string;        // External live link
  tags?: string[];           // Categorization tags (optional)
}
