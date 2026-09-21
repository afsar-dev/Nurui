import { IShowcaseItem } from "@/types/showcase.type";
import { ShowcaseCard } from "./ShowcaseCard";

interface IShowcaseGridProps {
  items: IShowcaseItem[];
}

export function ShowcaseGrid({ items }: IShowcaseGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
      {items.map((item, index) => (
        <ShowcaseCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
