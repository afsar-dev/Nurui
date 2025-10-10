"use client";
import React from "react";
import { IChildren } from "@/types/common.type";
import ComponentsRightSidebar from "@/components/layout/components-layout/ComponentsRightSidebar";
import { useAppContext } from "@/context/AppContext";
import ComponentsFooter from "@/components/layout/components-layout/ComponentsFooter";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Layout = ({ children }: IChildren) => {
  const { sideBar } = useAppContext();
  const pathname = usePathname();
  const isLeftSideBar =
    pathname === "/docs/installation" ||
    pathname === "/docs/introduction" ||
    pathname === "/docs/components";

  return (
    <div className={`flex items-start pt-16 ${sideBar ? "xl:pl-72" : "pl-16"}`}>
      <div
        className={cn(`w-full flex flex-col min-h-screen`, {
          "xl:w-[calc(100%-18rem)]": !isLeftSideBar,
        })}
      >
        <main className="px-6 md:px-12 py-8">{children}</main>
        <ComponentsFooter />
      </div>
      <ComponentsRightSidebar />
    </div>
  );
};

export default Layout;
