import { LAUNCHPAD_BADGES } from "@/config/launchpad.config";
import { cn } from "@/lib/utils";

const SKELETON_WIDTHS: Record<string, number> = {
  peerlist: 160,
  "product-hunt": 250,
};

interface BadgeSkeletonProps {
  className?: string;
}

const BadgeSkeleton = ({ className }: BadgeSkeletonProps) => (
  <div
    className={cn(
      "flex flex-wrap items-center justify-center gap-4",
      className,
    )}
  >
    {LAUNCHPAD_BADGES.map(({ id, height }) => (
      <div
        key={id}
        className="rounded-lg bg-[var(--border-color)] animate-pulse"
        style={{ height, width: SKELETON_WIDTHS[id] ?? 200 }}
      />
    ))}
  </div>
);

export default BadgeSkeleton;
