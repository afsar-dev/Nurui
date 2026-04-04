"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

export default function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [size, setSize] = useState(22);

  useEffect(() => {
    setMounted(true);

    const updateSize = () => {
      if (window.innerWidth < 768) {
        setSize(16);
      } else if (window.innerWidth < 1024) {
        setSize(18);
      } else {
        setSize(22);
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] hover:bg-[#3CA2FACC] hover:dark:bg-[var(--primary-color-2)]  size-10 p-2 rounded-full flex items-center justify-center">
      <DarkModeSwitch
        sunColor="white"
        moonColor="var(--primary-color)"
        checked={resolvedTheme === "dark"}
        onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        size={size}
      />
    </div>
  );
}
