"use client";
import LinkWithProgress from "@/components/common/LinkWithProgress";
import Nurui from "@/components/common/Nurui";
import RoundedButton from "@/components/common/RoundedButton";
import VaulDrawer from "@/components/ui/drawer/VaulDrawer";
import { navigationActive } from "@/utils/navigationActive";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import ThemeSwitcher from "../common/ThemeSwitcher";

const Navbar = () => {
  const [stars, setStars] = useState(0);

  useEffect(() => {
    async function fetchStars() {
      const response = await fetch(
        "https://api.github.com/repos/afsar-dev/Nurui",
      );
      const data = await response.json();
      setStars(data.stargazers_count);
    }

    fetchStars();
  }, []);

  const pathName = usePathname();
  if (pathName.includes("docs") || pathName.includes("preview")) return null;

  return (
    <div className="sticky top-0 z-50 bg-[var(--background-color)] lg:bg-transparent lg:backdrop-blur-lg lg:overflow-hidden w-full border-dashed border-b border-[var(--black-color)] dark:border-white/20 ">
      <nav className="container flex flex-wrap items-center justify-between h-16 lg:h-20">
        <div className="flex items-center justify-center gap-1">
          <Nurui textSize="text-2xl lg:text-3xl" />
          <p className="bg-[var(--primary-color-2)] text-[var(--primary-color)] rounded-full font-semibold px-1.5 text-[0.65rem] hidden lg:block">
            Basic
          </p>
        </div>
        <div
          className="hidden lg:flex items-center  py-2.5 px-3.5 bg-[var(--glass-color)] dark:bg-[white]/5 border 
         border-[var(--border-color)] dark:border-white/15 rounded-full font-semibold"
        >
          {navigation.map((nav) => (
            <LinkWithProgress
              className={
                navigationActive(nav.url, pathName)
                  ? `navigation-active text-[#FCFCFC] bg-[var(--primary-color)] dark:bg-white/10`
                  : `navigation-unactive`
              }
              key={nav.id}
              href={nav.url}
            >
              {nav.name}
            </LinkWithProgress>
          ))}
        </div>

        <div className="hidden xl:flex items-center gap-3.5">
          <RoundedButton
            href="https://discord.gg/XzAh8V3S"
            icon={
              <FaDiscord className="text-2xl text-[var(--white-color)] dark:text-[var(--primary-color)]" />
            }
          />
          <RoundedButton
            href="https://github.com/afsar-dev/Nurui"
            icon={
              <FaGithub className="text-2xl text-[var(--white-color)] dark:text-[var(--primary-color)] " />
            }
            iconInfo={stars || 0}
          />

          <ThemeSwitcher />
        </div>
        <VaulDrawer />
      </nav>
    </div>
  );
};

export default Navbar;

const navigation = [
  {
    id: 1,
    name: "docs",
    url: "/docs/installation",
  },
  {
    id: 2,
    name: "component",
    url: "/docs/components",
  },
  {
    id: 3,
    name: "About",
    url: "/about-us",
  },
  {
    id: 4,
    name: "playground",
    url: "/playground",
  },
];
