import { showcaseItems } from "@/data/showcase.data";
import { IShowcaseItem } from "@/types/showcase.type";

/**
 * Fetches all showcase projects.
 * Conforms to a standard asynchronous fetching signature for future CMS compatibility.
 */
export async function getShowcaseItems(): Promise<IShowcaseItem[]> {
  return showcaseItems;
}

/**
 * Fetches a single showcase project by its slug.
 * Returns undefined if the project is not found.
 */
export async function getShowcaseBySlug(
  slug: string,
): Promise<IShowcaseItem | undefined> {
  return showcaseItems.find((item) => item.slug === slug);
}
