"use client";
import RoundedButton from "@/components/common/RoundedButton";
import ThemeSwitcher from "@/components/common/ThemeSwitcher";
import VaulDrawer from "@/components/ui/drawer/VaulDrawer";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import ComponentSearchbar from "./ComponentSearchbar";

const ComponentsNavbar = () => {
  const { sideBar, setSideBar } = useAppContext();
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

  return (
    <div
      className={`fixed top-0 xl:right-0 z-50 ${
        sideBar
          ? "w-full xl:w-[calc(100%-18rem)]"
          : "w-full xl:w-[calc(100vw-5rem)]"
      }`}
    >
      <nav className="w-full h-16 py-2 px-5 flex items-center justify-between border-b border-[var(--primary-color)] dark:border-[var(--primary-color-1)] border-dashed bg-[var(--background-color)] lg:bg-transparent lg:backdrop-blur-md">
        {/* Left Group: Sidebar Toggle + VaulDrawer + Search */}
        <div className="flex items-center gap-4">
          {sideBar ? (
            <GoSidebarExpand
              className="text-2xl cursor-pointer hidden xl:block"
              onClick={() => setSideBar(false)}
            />
          ) : (
            <GoSidebarCollapse
              className="text-2xl cursor-pointer hidden xl:block"
              onClick={() => setSideBar(true)}
            />
          )}
          <VaulDrawer />
          <div className="hidden md:block w-64">
            <ComponentSearchbar />
          </div>
        </div>

        {/* Right Group: Social Icons + Theme Switcher */}
        <div className="flex items-center gap-3.5">
          <RoundedButton
            href="https://x.com/md_afsar_mahmud"
            icon={
              <FaXTwitter className="text-2xl text-[var(--white-color)] dark:text-[var(--primary-color)]" />
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
      </nav>
    </div>
  );
};

export default ComponentsNavbar;
