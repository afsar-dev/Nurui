"use client";
import SponsorAd from "@/components/common/SponsorAd";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegLightbulb } from "react-icons/fa6";
import { LuBug } from "react-icons/lu";
import { MdOutlineModeEditOutline } from "react-icons/md";

const ComponentsRightSidebar = () => {
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const issueUrl =
    `https://github.com/Mdafsarx/nurui/issues/new?` +
    `title=${encodeURIComponent(`[bug]: ${pathname}`)}` +
    `&labels=bug&labels=documentation` +
    `&template=bug_report.md`;

  const featureUrl =
    `https://github.com/Mdafsarx/nurui/issues/new?` +
    `title=${encodeURIComponent(`[feature]: ${pathname}`)}` +
    `&labels=enhancement,documentation&template=feature_request.md`;

  const editUrl = `https://github.com/Mdafsarx/nurui/blob/main/src/content${pathname}.mdx`;

  const navigation = {
    onThisPage: [
      {
        label: "installation",
        href: "#installation",
      },
      {
        label: "props",
        href: "#props",
      },
    ],
    contribute: [
      {
        label: "Report an issue",
        icon: <LuBug />,
        href: issueUrl,
      },
      {
        label: "Request a feature",
        icon: <FaRegLightbulb />,
        href: featureUrl,
      },
      {
        label: "Edit this page",
        icon: <MdOutlineModeEditOutline />,
        href: editUrl,
      },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("h2");

      sections.forEach((section) => {
        const top = window.scrollY;
        const offset = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute("id");

        if (id && top >= offset && top < offset + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  if (
    pathname === "/docs/installation" ||
    pathname === "/docs/introduction" ||
    pathname === "/docs/components"
  ) {
    return null;
  }

  return (
    <div className="fixed top-16 right-0 hidden xl:block">
      <div className="w-72 h-[calc(100vh-4rem)] border-l border-[var(--primary-color)] dark:border-[var(--primary-color-1)] border-dashed p-4 flex flex-col overflow-y-auto">
        <div className="flex flex-col gap-y-2 mb-3">
          <h3 className="font-semibold pb-1">On this page</h3>
          {navigation?.onThisPage?.map((nav) => (
            <a
              key={nav?.label}
              href={nav?.href}
              className={`${activeSection === nav?.label ? "text-black dark:text-white" : "text-[var(--opacity-text-color)]"}  cursor-pointer`}
            >
              {nav?.label}
            </a>
          ))}
        </div>
        {/* Contribute */}
        <div className="flex flex-col gap-y-2">
          <h3 className="font-semibold pb-1">Contribute</h3>
          {navigation?.contribute?.map((nav) => (
            <a
              href={nav?.href}
              key={nav?.label}
              target="_blank"
              className="text-[var(--opacity-text-color)] flex navs-center gap-1"
            >
              {nav?.icon}
              {nav?.label}
            </a>
          ))}
        </div>

        <SponsorAd className="mt-auto" />
      </div>
    </div>
  );
};

export default ComponentsRightSidebar;
