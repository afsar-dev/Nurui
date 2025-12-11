"use client";

import NuruiLogo from "@/components/nurui/nurui-logo";
import RocketScrollToTop from "@/components/nurui/rocket-scroll-to-top";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import "./styles/footer.css";

const FOOTER_SECTIONS = [
  {
    title: "Products",
    items: [
      { label: "Nurui", url: "https://nurui.vercel.app", external: true },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", url: "https://nurui.vercel.app/about-us" },
      { label: "Playground", url: "https://nurui.vercel.app/playground" },
    ],
  },
  {
    title: "Explore",
    items: [
      {
        label: "Introduction",
        url: "https://nurui.vercel.app/docs/introduction",
      },
      {
        label: "Documentation",
        url: "https://nurui.vercel.app/docs/installation",
      },
      { label: "Components", url: "https://nurui.vercel.app/docs/components" },
    ],
  },
];

const navigation = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "Docs", url: "/docs/installation" },
  { id: 3, name: "Components", url: "/docs/components" },
  { id: 4, name: "About", url: "/about-us" },
  { id: 5, name: "Playground", url: "/playground" },
];

const RocketFooter = () => {
  const pathName = usePathname();

  return (
    <div className="bg-[#fff] dark:bg-transparent border-t border-[#393a3d] w-full text-[#fff] mt-auto rounded-tl-[50px] lg:rounded-tl-[80px] xl:rounded-tl-[110px] rocket-animation">
      <RocketScrollToTop className="bg-[#f7f7f7] dark:bg-[#010313] max-w-24 mx-auto rounded-full -mt-16 hidden md:block" />

      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 xl:flex flex-col md:flex-row 2xl:justify-between gap-10 xl:gap-14 2xl:gap-24 py-7 xl:py-16 pl-1 xl:pl-0">
          {/* Logo & description */}
          <div className="space-y-3 max-w-80 col-span-full">
            <Link
              href="/"
              className="text-[#3ca2fa] font-black text-3xl flex items-center gap-1"
            >
              <NuruiLogo />
              <span>Nur/ui</span>
            </Link>
            <p className="text-black dark:text-[#fff]">
              Beautifully crafted, accessible components built with Tailwind CSS
              perfect for modern developers and creative teams.
            </p>
          </div>

          {/* Dynamic Footer Nav Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <nav
              key={section.title}
              className="space-y-4 max-w-80 flex flex-col text-black dark:text-[#fff]"
            >
              <h6 className="font-semibold text-lg text-[#3ca2fa]">
                {section.title}
              </h6>

              {section.items.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target={"_blank"}
                  className="cursor-pointer hover:text-[#3ca2fa]"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          ))}

          {/* Contact */}
          <nav className="space-y-4 max-w-80 flex flex-col text-black dark:text-[#fff]">
            <h6 className="font-semibold text-lg">Contact</h6>
            <a className="flex items-start gap-2.5 max-w-48">
              <IoLocationOutline className="flex-shrink-0" />
              Sylhet, Bangladesh
            </a>
            <a className="flex gap-2.5 items-center cursor-pointer">
              <MdOutlineMail className="flex-shrink-0" /> nurui@gmail.com
            </a>
          </nav>
        </div>

        {/* Bottom Navigation */}
        <div className="border-t border-[#393a3d] border-opacity-20 p-5 flex items-center justify-center lg:justify-between">
          <div className="hidden lg:flex flex-wrap items-center gap-4">
            {navigation.map((item, i) => (
              <Link
                key={item.id}
                href={item.url}
                className={`
                  pr-4 font-semibold
                  ${i !== navigation.length - 1 ? "border-r border-[#736f7f]" : ""}
                  ${pathName === item.url ? "text-[#3ca2fa] font-bold" : "text-[#6a5f77]"}
                `}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <p className="text-[#6a5f77]">
            Created by{" "}
            <a
              href="https://github.com/afsar-dev"
              target="_blank"
              className="text-[#3ca2fa] border-b border-[#3ca2fa] font-semibold"
            >
              Md Afsar Mahmud
            </a>{" "}
            © {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RocketFooter;
