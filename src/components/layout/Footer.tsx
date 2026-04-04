"use client";
import LinkWithProgress from "@/components/common/LinkWithProgress";
import Nurui from "@/components/common/Nurui";
import RocketScrollToTop from "@/components/nurui/rocket-scroll-to-top";
import { FOOTER_EXCLUDED_PATHS } from "@/config/paths";
import { newsLetter } from "@/data/newsletter.data";
import { cn } from "@/lib/utils";
import { navigationActive } from "@/utils/navigationActive";
import { usePathname } from "next/navigation";
import "../../styles/footer.css";
import AnimatedInput from "../nurui/animated-input";

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
    id: 3,
    name: "Components",
    url: "/docs/components",
  },
  {
    id: 4,
    name: "About",
    url: "/about-us",
  },
  {
    id: 5,
    name: "Playground",
    url: "/playground",
  },
];

const Footer = () => {
  const pathName = usePathname();
  if (FOOTER_EXCLUDED_PATHS.some((path) => pathName.includes(path)))
    return null;

  return (
    <div
      className={cn(
        "bg-[var(--white-color)] dark:bg-transparent border-t border-[var(--border-color)] w-full text-[var(--text-primary-color)] mt-auto",
        "rounded-t-[40px] lg:rounded-t-[70px] xl:rounded-t-[100px] rocket-animation",
      )}
    >
      <RocketScrollToTop className="bg-[var(--background-color)] max-w-24 mx-auto  rounded-full -mt-16 hidden md:block" />
      <div className="container">
        <div className="flex flex-col items-center text-center pb-7 pt-7 xl:pb-16 xl:pt-8 gap-2">
          <Nurui textSize="text-2xl lg:text-3xl" />

          <p className="mx-auto max-w-sm text-center leading-relaxed">
            React and Next.js based UI library with CLI scaffolding, TS-to-JS
            conversion, and v0 live previews.
          </p>

          <AnimatedInput
            className="mt-3.5 w-full max-w-xl"
            onBlurTitle={newsLetter?.input_field.onBlur.value}
            onFocusTitle={newsLetter?.input_field.onFocus.value}
            buttonTitle={newsLetter?.subscribe_button.label}
            buttonClassName="bg-[var(--primary-color-4)] border border-[var(--primary-color)] hover:text-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color-3)]"
          />
        </div>

        <div className="border-t border-[var(--border-color)] border-opacity-20 p-5 flex items-center justify-center lg:justify-between">
          <div className="hidden lg:flex flex-wrap items-center justify-between gap-4">
            {navigation.map((item, i) => (
              <LinkWithProgress
                key={item.id}
                href={item.url}
                className={cn(
                  i !== navigation.length - 1 &&
                    "border-r border-[var(--black-color-2)] pr-4",
                  navigationActive(item.url, pathName)
                    ? "text-[var(--primary-color)] font-bold"
                    : "text-[--copy-right-color] font-semibold",
                )}
              >
                {item.name}
              </LinkWithProgress>
            ))}
          </div>
          <p className="text-[--copy-right-color]">
            Created by{" "}
            <a
              href="https://github.com/afsar-dev"
              rel="noopener noreferrer"
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
