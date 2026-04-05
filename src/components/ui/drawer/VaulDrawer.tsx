"use client";
import MenuItem from "@/components/common/MenuItem";
import { navigation as componentNavigation } from "@/registry/component-navigation";
import React from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { CgMenuRight } from "react-icons/cg";
import { GrInstallOption } from "react-icons/gr";
import { SlDocs } from "react-icons/sl";
import { TbHandClick } from "react-icons/tb";
import { Drawer } from "vaul";

export default function VaulDrawer() {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] dark:hover:bg-[var(--primary-color-2)] rounded p-0.5 block xl:hidden">
        <CgMenuRight className="text-[var(--white-color)] dark:text-[var(--primary-color)] text-2xl md:text-3xl" />
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60" />
        <Drawer.Content className="bg-[var(--background-color)] flex flex-col rounded-t-3xl border-t border-[var(--primary-color-1)] h-[80%] lg:h-80 fixed bottom-0 left-0 right-0 outline-none z-[1000] p-5">
          <div className="overflow-y-auto">
            <div className="w-24 h-[1px] mx-auto bg-[var(--primary-color-2)]" />
            <div className="text-sm px-2 space-y-1 py-6">
              {navigation?.slice(0).map((nav, index) => (
                <MenuItem
                  key={nav?.title + index}
                  icon={nav.icon}
                  title={nav.title}
                  href={nav?.href}
                  submenu={nav?.submenu}
                  parentHover={false}
                  subMenuHover={true}
                />
              ))}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

type NavigationItem = {
  icon: React.ReactNode;
  title: string;
  href?: string;
  submenu?: {
    name: string;
    href: string;
  }[];
};

const baseNavigation: NavigationItem[] = [
  {
    icon: <AiOutlineFileSearch />,
    title: "Component",
    href: "/docs/gradient-button",
  },
  {
    icon: <GrInstallOption />,
    title: "About",
    href: "/about-us",
  },
  {
    icon: <SlDocs />,
    title: "Docs",
    href: "/docs/installation",
  },
  {
    icon: <TbHandClick />,
    title: "Playground",
    href: "/playground",
  },
];

const navigation: NavigationItem[] = [
  ...baseNavigation,
  ...componentNavigation,
];
