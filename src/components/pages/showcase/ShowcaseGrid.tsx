import { IShowcaseItem } from "@/types/showcase.type";
import React from "react";
import { ShowcaseCard } from "./ShowcaseCard";

interface ShowcaseGridProps {
  items: IShowcaseItem[];
}

export const ShowcaseGrid: React.FC<ShowcaseGridProps> = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item.id} className="h-full">
          <ShowcaseCard item={item} />
        </div>
      ))}
    </div>
  );
};
