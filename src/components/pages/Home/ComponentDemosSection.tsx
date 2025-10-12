import React from "react";
import SectionIntro from "@/components/common/SectionIntro";
import ButtonsMarquee from "./ButtonsMarquee";
import BentoDemo from "@/components/ui/bento-grid/BentoGrid";
import { TerminalDemo } from "@/components/nurui/terminal-demo";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/nurui/marquee";
import { GradientGridHero } from "@/components/nurui/gradient-grid-hero";
import GlowingCard from "@/components/nurui/glowing-card";
import GradientBarsDemo from "@/components/nurui/bars-background-demo";
import GradientText from "@/components/nurui/gradient-text";
import ShinyCardDemo from "@/components/nurui/shiny-card-demo";
import { FollowingEye } from "@/components/nurui/following-eye";
import { ProgressBarDemo } from "@/components/nurui/progress-bar-demo";
import AnimatedListDemo from "@/components/nurui/animated-list-demo";

const ComponentDemosSection = () => {
  return (
    <section>
      <SectionIntro
        title={{
          fullHighLightColor: "text-[var(--secondary-color)]",
          normalWords: "Component",
          highLiteWords: "Demos",
        }}
        description="Here are some of the components that you can use to build your landing pages.
        You can easily customize and combine them to match your brand and design goals."
      />
      <div className="space-y-12">
        <BentoDemo features={featuresDataOne} />
        <ButtonsMarquee />
        <BentoDemo features={featuresDataTwo} />
      </div>
    </section>
  );
};

export default ComponentDemosSection;

const files = [
  {
    name: "bitcoin.pdf",
    body: "Bitcoin is a cryptocurrency invented in 2008 by an unknown person or group of people using the name Satoshi Nakamoto.",
  },
  {
    name: "finances.xlsx",
    body: "A spreadsheet or worksheet is a file made of rows and columns that help sort data, arrange data easily, and calculate numerical data.",
  },
  {
    name: "logo.svg",
    body: "Scalable Vector Graphics is an Extensible Markup Language-based vector image format for two-dimensional graphics with support for interactivity and animation.",
  },
  {
    name: "keys.gpg",
    body: "GPG keys are used to encrypt and decrypt email, files, directories, and whole disk partitions and to authenticate messages.",
  },
  {
    name: "seed.txt",
    body: "A seed phrase, seed recovery phrase or backup seed phrase is a list of words which store all the information needed to recover Bitcoin funds on-chain.",
  },
];

const featuresDataOne = [
  {
    name: "Glowing Card",
    description: "Interactive glowing UI card",
    href: "/docs/glowing-card",
    className: "col-span-full xl:col-span-2",
    previewComponentName: "glowing-card",
    v0ComponentName: "glowing-card",
    cli: "npx nurui add glowing-card",
    background: (
      <GlowingCard className="absolute left-1/2 -translate-x-1/2 -top-6 h-[400px] w-full scale-75 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
  },
  {
    name: "Marquee Testimonial",
    description: "Smooth infinite testimonial scroll.",
    href: "/docs/marquee-testimonial",
    previewComponentName: "marquee-testimonial",
    v0ComponentName: "marquee-testimonial",
    cli: "npx nurui add marquee-testimonial",
    className: "col-span-full md:col-span-2 xl:col-span-1",
    background: (
      <Marquee
        pauseOnHover
        className="absolute top-6 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_30%,#000_100%)] "
      >
        {files.map((f, idx) => (
          <figure
            key={idx}
            className={cn(
              "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
              "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
              "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
              "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
            )}
          >
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-col">
                <figcaption className="text-sm font-medium dark:text-white ">
                  {f.name}
                </figcaption>
              </div>
            </div>
            <blockquote className="mt-2 text-xs">{f.body}</blockquote>
          </figure>
        ))}
      </Marquee>
    ),
  },
  {
    name: "Animated List",
    description: "A list that animates each item in sequence with a delay.",
    href: "/docs/animated-list",
    previewComponentName: "animated-list",
    v0ComponentName: "animated-list",
    cli: "npx nurui add animated-list",
    className: "col-span-full md:col-span-2 xl:col-span-1 xl:row-span-2",
    background: (
      <AnimatedListDemo className="absolute left-1/2 -translate-x-1/2 -top-20 h-[900px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
  },
  {
    name: "Animated Progress",
    description: "Displays a circular gauge with a percentage value.",
    className: "col-span-full md:col-span-2 xl:col-span-1",
    href: "/docs/progress-bar",
    previewComponentName: "progress-bar",
    v0ComponentName: "progress-bar",
    cli: "npx nurui add animated-progress",
    background: <ProgressBarDemo className="top-10" />,
  },
  {
    name: "Terminal",
    description:
      "An implementation of the MacOS terminal. Useful for showcasing a command line interface.",
    className: "col-span-full md:col-span-2 xl:col-span-2",
    href: "/docs/terminal",
    previewComponentName: "terminal",
    v0ComponentName: "terminal",
    cli: "npx nurui add terminal",
    background: (
      <TerminalDemo className="absolute left-1/2 -translate-x-1/2 -top-6 h-[400px] w-full scale-75 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
  },
];

const featuresDataTwo = [
  {
    name: "Following Eye",
    description: "Interactive following eye cursor",
    href: "/docs/following-eye",
    previewComponentName: "following-eye",
    v0ComponentName: "following-eye",
    cli: "npx nurui add following-eye",
    className: "col-span-full md:col-span-2 xl:col-span-1",
    background: (
      <div className="absolute left-1/2 -translate-x-1/2 -top-8">
        <FollowingEye className={"w-auto h-[400px]"} />
      </div>
    ),
  },
  {
    name: "Gradient Hero",
    description: "A animated gradient hero section for portfolio websites ",
    href: "/docs/gradient-hero",
    previewComponentName: "gradient-hero",
    v0ComponentName: "gradient-hero",
    cli: "npx nurui add gradient-hero",
    className: "col-span-full md:col-span-2 xl:col-span-2",
    background: (
      <div className="absolute left-1/2 -translate-x-1/2 -top-6 h-[400px] w-full scale-75 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
        <GradientGridHero />
      </div>
    ),
  },
  {
    name: "Shiny Card",
    description: "Digital animation card",
    href: "/docs/shiny-card",
    previewComponentName: "shiny-card",
    v0ComponentName: "shiny-card",
    cli: "npx nurui add shiny-card",
    className: "col-span-full md:col-span-2 xl:col-span-1 row-span-1",
    background: (
      <div className="absolute left-1/2 -translate-x-1/2 -top-9 h-[400px] w-full scale-75 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]">
        <ShinyCardDemo />
      </div>
    ),
  },
  {
    name: "Bars Background",
    description:
      "Animated gradient bars background for next generation websites",
    className: "col-span-full md:col-span-2 xl:col-span-2",
    href: "/docs/bars-background",
    previewComponentName: "bars-background",
    v0ComponentName: "bars-background",
    cli: "npx nurui add bars-background",
    background: <GradientBarsDemo />,
  },
  {
    name: "Gradient Text",
    description: "Animated colorful gradient text",
    className: "col-span-full xl:col-span-2",
    href: "/docs/gradient-text",
    previewComponentName: "gradient-text",
    v0ComponentName: "gradient-text",
    cli: "npx nurui add gradient-text",
    background: (
      <GradientText
        colors={["#3ca2fa", "#80eeb4", "#3ca2fa", "#80eeb4", "#3ca2fa"]}
        animationSpeed={3}
        showBorder={false}
        className="text-6xl font-black mt-16"
      >
        Welcome to Nur/ui
      </GradientText>
    ),
  },
];
