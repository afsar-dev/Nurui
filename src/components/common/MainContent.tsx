"use client";
import { MAIN_CONTENT_EXCLUDED_PATHS } from "@/config/paths";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";
import { TooltipProvider } from "../ui/tooltip";

const MainContent = ({ children }: { children: React.ReactNode }) => {
  const pathName = usePathname();
  const isExcluded = MAIN_CONTENT_EXCLUDED_PATHS.some((path) =>
    pathName.includes(path),
  );

  return (
    <main className={cn(!isExcluded && "pb-12 lg:pb-16 xl:pb-20 2xl:pb-24")}>
      <TooltipProvider>{children}</TooltipProvider>
    </main>
  );
};

export default MainContent;
