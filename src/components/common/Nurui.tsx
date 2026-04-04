import NuruiLogo from "../nurui/nurui-logo";
import LinkWithProgress from "./LinkWithProgress";
type ClassType = { textSize?: string };

const Nurui = ({ textSize }: ClassType) => {
  return (
    <LinkWithProgress
      href="/"
      className={`text-[var(--primary-color)] font-black ${
        textSize || "text-3xl"
      } flex items-center gap-0.05 -mb-1 xl:-mb-0`}
    >
      <NuruiLogo />
      <p className="space-x-1.5 hidden lg:flex items-center">
        <span>Nur</span>
        <span className="-mb-0.">UI</span>
      </p>
    </LinkWithProgress>
  );
};

export default Nurui;
