"use client";
import { Button } from "@/components/ui/button";
import { siteLink } from "@/config/site";
import { cn } from "@/lib/utils";
import IClassName from "@/types/common.type";
import { Fullscreen } from "lucide-react";
import { usePathname } from "next/navigation";

const FullScreenPreview = ({
  className,
  previewComponentName,
}: IClassName & { previewComponentName?: string }) => {
  const pathName = usePathname();
  let componentName = pathName.split("/")[pathName.split("/").length - 1];
  componentName = previewComponentName ? previewComponentName : componentName;
  const url = `${siteLink}/preview/${componentName}`;
  return (
    <Button
      aria-label="Full Screen Preview"
      asChild
      className={cn(
        "z-40 text-white bg-[var(--primary-color)] rounded-lg shadow-none px-2.5",
        className,
      )}
    >
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className={cn("group/fullscreen transition-all duration-200")}
      >
        <Fullscreen
          className={cn(
            "h-4 w-4",
            "transition-transform duration-200 group-hover/fullscreen:rotate-45",
          )}
        />
      </a>
    </Button>
  );
};

export default FullScreenPreview;
