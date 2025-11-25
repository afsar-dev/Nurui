"use client";
import LinkWithProgress from "@/components/common/LinkWithProgress";
import MenuItem from "@/components/common/MenuItem";
import Nurui from "@/components/common/Nurui";
import NuruiLogo from "@/components/nurui/nurui-logo";
import { useAppContext } from "@/context/AppContext";
import { navigation } from "@/registry/component-navigation";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const ComponentsLeftSidebar = () => {
  const { sideBar } = useAppContext();

  return (
    <div className="fixed top-0 left-0 hidden xl:block">
      <SimpleBar className="max-h-screen">
        <div
          className={`bg-[#F4F4F5] dark:bg-[var(--purple-color)] border-r border-[var(--primary-color)] dark:border-[var(--primary-color-1)] border-dashed min-h-screen flex flex-col justify-between pt-3 pb-6 space-y-5 ${
            sideBar ? "w-72" : "w-16 items-center"
          }`}
        >
          <div className="space-y-5">
            {sideBar ? (
              <div className="flex items-center justify-center gap-1">
                <Nurui />
                <p className="bg-[var(--primary-color-2)] text-[var(--primary-color)] rounded-full font-semibold px-1.5 text-[0.65rem]">
                  Basic
                </p>
              </div>
            ) : (
              <LinkWithProgress href="/">
                <NuruiLogo />
              </LinkWithProgress>
            )}
            <div className="text-sm px-2 space-y-1">
              {navigation
                ?.slice(0, navigation?.length - 1)
                .map((nav, index) => (
                  <MenuItem
                    href={nav?.href}
                    key={nav?.title + index}
                    icon={nav.icon}
                    title={nav.title}
                    submenu={nav?.submenu}
                    parentHover={false}
                    subMenuHover={true}
                  />
                ))}
            </div>
          </div>

          <div className="text-sm px-2 space-y-1">
            <p className="text-black dark:text-[var(--black-color-4)] pl-2.5 uppercase">
              {sideBar && "others"}
            </p>
            {navigation?.slice(navigation?.length - 1).map((nav, index) => (
              <MenuItem
                href={nav.href}
                key={nav?.title + index}
                icon={nav.icon}
                title={nav.title}
                submenu={nav?.submenu}
                parentHover={false}
                subMenuHover={true}
              />
            ))}
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};

export default ComponentsLeftSidebar;
