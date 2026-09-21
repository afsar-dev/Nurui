"use client";

import BadgeLink from "@/components/common/BadgeLink";
import BadgeSkeleton from "@/components/common/BadgeSkeleton";
import { LAUNCHPAD_BADGES } from "@/config/launchpad.config";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";
import type { TBadgeTheme } from "@/types/launchpad.type";
import { useTheme } from "next-themes";

interface LaunchpadBadgesProps {
  className?: string;
}

const LaunchpadBadges = ({ className }: LaunchpadBadgesProps) => {
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();

  if (!mounted) return <BadgeSkeleton className={cn("mt-4", className)} />;

  const theme: TBadgeTheme = resolvedTheme === "dark" ? "light" : "light";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-4 mt-8",
        className,
      )}
    >
      {LAUNCHPAD_BADGES.map((badge) => (
        <BadgeLink key={badge.id} badge={badge} theme={theme} />
      ))}
    </div>
  );
};

export default LaunchpadBadges;
