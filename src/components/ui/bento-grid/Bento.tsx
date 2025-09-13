import { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "lucide-react";
import OpenInV0Button from "@/components/common/OpenInV0Button";
import FullScreenPreview from "@/components/common/FullScreenPreview";
import CLICommandButton from "@/components/common/CLICommandButton";
import Link from "next/link";

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
  className?: string;
  container?: boolean;
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string;
  className?: string;
  background: ReactNode;
  description: string;
  href: string;
  previewComponentName: string;
  v0ComponentName?: string;
  cli?: string;
}

const BentoGrid = ({
  children,
  className,
  container = true,
  ...props
}: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid  auto-rows-[22rem] grid-cols-4 gap-4",
        container && "container",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  description,
  previewComponentName,
  v0ComponentName,
  cli,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
      // light styles
      "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
      // dark styles
      "transform-gpu dark:bg-background dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    {...props}
  >
    <div className="z-50">
      {cli && (
        <CLICommandButton cli={cli} className="absolute right-36 top-2" />
      )}
      <FullScreenPreview
        className={cn(
          "absolute right-[101px] top-2",
          !v0ComponentName && "absolute right-2 top-2",
        )}
        previewComponentName={previewComponentName}
      />
      {v0ComponentName && (
        <OpenInV0Button
          className="absolute right-2 top-2"
          v0ComponentName={v0ComponentName}
        />
      )}
    </div>
    <div className="flex flex-col items-center justify-center">
      {background}
    </div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
        {name}
      </h3>
      <p className="max-w-lg text-[var(--opacity-text-color)] dark:text-neutral-400">
        {description}
      </p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center px-4 py-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <Link
        href={props?.href}
        className="flex items-center text-sm pointer-events-auto hover:bg-[var(--glass-color-2)] p-2 rounded-xl"
      >
        <span>View</span>
        <ArrowRightIcon className="ms-2 h-4 w-4" />
      </Link>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
