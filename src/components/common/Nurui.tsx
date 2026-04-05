import { cn } from "@/lib/utils";
import NuruiLogo from "../nurui/nurui-logo";
import LinkWithProgress from "./LinkWithProgress";
type ClassType = { textSize?: string; logoNameClassName?: string };

const Nurui = ({ textSize, logoNameClassName }: ClassType) => {
  return (
    <LinkWithProgress
      href="/"
      className={cn(
        `text-[var(--primary-color)] text-3xl font-black flex items-center gap-0.05 -mb-1.5 xl:-mb-0`,
        textSize,
      )}
    >
      <NuruiLogo />
      <p
        className={cn(
          "space-x-1.5 hidden lg:flex items-center",
          logoNameClassName,
        )}
      >
        <span>Nur</span>
        <span>UI</span>
      </p>
    </LinkWithProgress>
  );
};

export default Nurui;
