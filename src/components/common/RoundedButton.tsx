import { cn } from "@/lib/utils";
import React from "react";
type TRoundedButton = {
  icon: React.ReactNode;
  href?: string;
  iconInfo?: string | number;
  parentClassName?: string;
  onClick?: () => void;
};

const RoundedButton: React.FC<TRoundedButton> = ({
  icon,
  href,
  iconInfo,
  parentClassName,
  onClick,
}) => {
  return (
    <div className={cn(parentClassName)} onClick={onClick}>
      {href ? (
        <a
          href={href}
          target="_blank"
          className="bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] hover:bg-[#3CA2FACC] hover:dark:bg-[var(--primary-color-2)] text-[var(--white-color)] dark:text-[var(--primary-color)] font-semibold size-auto p-2 rounded-full flex items-center justify-center gap-1.5"
        >
          {iconInfo && <span className="text-base pl-1">{iconInfo}</span>}
          <span>{icon}</span>
        </a>
      ) : (
        <div className="bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] hover:bg-[#3CA2FACC] hover:dark:bg-[var(--primary-color-2)] size-auto p-2 rounded-full flex items-center justify-center cursor-pointer">
          <span>{icon}</span>
        </div>
      )}
    </div>
  );
};

export default RoundedButton;
