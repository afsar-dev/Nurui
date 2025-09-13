"use client";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineMail } from "react-icons/md";
import { navigationActive } from "@/utils/navigationActive";
import { usePathname } from "next/navigation";
import Nurui from "@/components/common/Nurui";
import RocketScrollToTop from "@/components/common/RocketScrollToTop";
import LinkWithProgress from "@/components/common/LinkWithProgress";

const Footer = () => {
  const pathName = usePathname();
  if (pathName.includes("docs") || pathName.includes("preview")) return null;

  return (
    <div className="bg-[var(--white-color)] dark:bg-transparent border-t border-[var(--border-color)] w-full text-[var(--text-primary-color)] mt-auto rounded-tl-[50px] lg:rounded-tl-[80px] xl:rounded-tl-[110px] rocket-animation">
      <RocketScrollToTop className=" bg-[var(--background-color)] max-w-24 mx-auto  rounded-full -mt-16 hidden md:block" />
      <div className="container">
        <div className=" grid md:grid-cols-2 lg:grid-cols-4 xl:flex flex-col md:flex-row 2xl:justify-between gap-10 xl:gap-14 2xl:gap-24 py-7 xl:py-16 pl-1 xl:pl-0">
          <div className="space-y-3 lg:space-y-4 xl:space-y-6 max-w-80 col-span-full">
            <Nurui textSize="text-2xl lg:text-3xl" />
            <p>
              Beautifully crafted, accessible components built with Tailwind CSS
              perfect for modern developers and creative teams.
            </p>
          </div>

          <nav className="space-y-4 max-w-80 flex flex-col">
            <h6 className="font-semibold text-lg">Products</h6>
            <a
              href="https://nurui.vercel.app"
              target="_blank"
              className="cursor-pointer"
            >
              Nurui
            </a>
          </nav>

          <nav className="space-y-4 max-w-80 flex flex-col">
            <h6 className="font-semibold text-lg">Company</h6>
            <a
              href="https://nurui.vercel.app/about-us"
              className="cursor-pointer"
            >
              About
            </a>
            <a
              href="https://nurui.vercel.app/playground"
              className="cursor-pointer"
            >
              Playground
            </a>
          </nav>

          <nav className="space-y-4 max-w-80 flex flex-col">
            <h6 className="font-semibold text-lg">Explore</h6>
            <a
              href="https://nurui.vercel.app/docs/introduction"
              className="cursor-pointer"
            >
              Introduction
            </a>
            <a
              href="https://nurui.vercel.app/docs/installation"
              className="cursor-pointer"
            >
              Documentation
            </a>
            <a
              href="https://nurui.vercel.app/docs/components"
              className="cursor-pointer"
            >
              Components
            </a>
          </nav>

          <nav className="space-y-4 max-w-80 flex flex-col">
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

        <div className="border-t border-[var(--border-color)] border-opacity-20 p-5 flex items-center justify-center lg:justify-between">
          <div className="hidden lg:flex flex-wrap items-center justify-between gap-4">
            {navigation.map((data, i) => (
              <LinkWithProgress
                key={data?.id + i}
                href={data?.url}
                className={`${
                  navigation?.length === i + 1
                    ? ""
                    : "border-r border-[var(--black-color-2)]"
                } pr-4 font-semibold ${
                  navigationActive(data?.url, pathName)
                    ? "text-[var(--primary-color)] font-bold"
                    : "text-[--copy-right-color]"
                }`}
              >
                {data?.name}
              </LinkWithProgress>
            ))}
          </div>
          <p className="text-[--copy-right-color]">
            Created by{" "}
            <a
              href="https://github.com/afsar-dev"
              target="_blank"
              className="text-[var(--primary-color)] border-b border-[var(--primary-color)] font-semibold"
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

export default Footer;

const navigation = [
  {
    id: 1,
    name: "Home",
    url: "/",
  },
  {
    id: 2,
    name: "Docs",
    url: "/docs/installation",
  },
  {
    id: 2,
    name: "Components",
    url: "/docs/components",
  },
  {
    id: 3,
    name: "About",
    url: "/about-us",
  },
  {
    id: 4,
    name: "Playground",
    url: "/playground",
  },
];
