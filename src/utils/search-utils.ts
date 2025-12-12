export interface FlattenedItem {
  title: string;
  href: string;
  category: string;
}

export interface NavigationItem {
  title: string;
  href?: string;
  submenu?: { name: string; href: string }[];
}

export function flattenNavigation(nav: NavigationItem[]): FlattenedItem[] {
  const result: FlattenedItem[] = [];

  for (const item of nav) {
    if (item.href && !item.submenu) {
      result.push({
        title: item.title,
        href: item.href,
        category: "General",
      });
    }

    if (item.submenu) {
      for (const sub of item.submenu) {
        result.push({
          title: sub.name,
          href: sub.href,
          category: item.title,
        });
      }
    }
  }

  return result;
}
