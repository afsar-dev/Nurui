import React from "react";
type TIcon = {
  icon: React.ReactNode;
  href?: string;
  iconInfo?: string | number;
};

const RoundedButton: React.FC<TIcon> = ({ icon, href, iconInfo }) => {
  return (
    <>
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
        <div className="bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] hover:bg-[#3CA2FACC] hover:dark:bg-[var(--primary-color-2)] size-auto p-1 rounded-full flex items-center justify-center cursor-pointer">
          <span>{icon}</span>
        </div>
      )}
    </>
  );
};

export default RoundedButton;
