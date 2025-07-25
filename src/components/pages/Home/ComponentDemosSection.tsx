import React from "react";
import SectionIntro from "@/components/common/SectionIntro";
import ButtonsMarquee from "./ButtonsMarquee";
import BentoDemo from "@/components/ui/bento-grid/BentoGrid";
import { AnimatedBeamMultipleOutputDemo } from "@/components/ui/animated-beam-multiple-outputs/AnimatedBeamMultipleOutputs";
import { AnimatedListDemo } from "@/components/ui/animated-list/AnimatedList";
import { AnimatedCircularProgressBarDemo } from "@/components/ui/progress-bar/AnimatedCircularProgressBarDemo";
import { TerminalDemo } from "@/components/ui/terminal/TerminalDemo";
import { cn } from "@/lib/utils";
import { IconCloudDemo } from "@/components/ui/icon-cloud/IconCloudDemo";
import OrbitingItems3D from "@/components/ui/orbiting-Items-3D/OrbitingItems3d";
import {
  FaAngular,
  FaCss3,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaPython,
  FaReact,
  FaSass,
  FaVuejs,
} from "react-icons/fa6";
import { GrMysql } from "react-icons/gr";
import { FeatureBlockAnimatedCard } from "@/components/ui/feature-block-animated-card/FeatureBlockAnimatedCard";
import HyperspeedDemo from "@/components/ui/hyperspeed/HyperspeedDemo";
import { VortexDemo } from "@/components/ui/vortex-background/VortexDemo";
import { Marquee } from "@/components/nurui/marque";

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
    name: "Animated Beam",
    description: "An animated beam of light which travels along a path.",
    href: "#",
    className: "col-span-full xl:col-span-2",
    background: (
      <AnimatedBeamMultipleOutputDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_5%,#000_100%)]" />
    ),
  },
  {
    name: "Marquee",
    description: "An infinite scrolling component.",
    href: "#",
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
    href: "#",
    cta: "Learn more",
    className: "col-span-full md:col-span-2 xl:col-span-1 xl:row-span-2",
    background: (
      <AnimatedListDemo className="absolute left-1/2 -translate-x-1/2 -top-20 h-[900px] w-full scale-75 border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
  },
  {
    name: "Animated Progress",
    description: "Displays a circular gauge with a percentage value.",
    className: "col-span-full md:col-span-2 xl:col-span-1",
    href: "#",
    cta: "Learn more",
    background: (
      <AnimatedCircularProgressBarDemo className="left-1/2 -ml-20 top-14" />
    ),
  },
  {
    name: "Terminal",
    description:
      "An implementation of the MacOS terminal. Useful for showcasing a command line interface.",
    className: "col-span-full md:col-span-2 xl:col-span-2",
    href: "#",
    cta: "Learn more",
    background: (
      <TerminalDemo className="absolute left-1/2 -translate-x-1/2 -top-6 h-[400px] w-full scale-75 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
  },
];

const featuresDataTwo = [
  {
    name: "3D Icon Animation",
    description: "An interactive 3D tag cloud component.",
    href: "#",
    className: "col-span-full md:col-span-2 xl:col-span-1",
    background: (
      <IconCloudDemo className="absolute left-1/2 -translate-x-1/2 -top-8" />
    ),
  },
  {
    name: "Rounded 3D Animation",
    description: "Fluid 3D movements that elevate your digital experience.",
    href: "#",
    className: "col-span-full md:col-span-2 xl:col-span-2",
    background: (
      <OrbitingItems3D
        duration={25}
        items={[
          <FaReact key="react" className="h-8 w-8" />,
          <FaAngular key="angular" className="h-8 w-8" />,
          <FaHtml5 key="html5" className="h-8 w-8" />,
          <FaCss3 key="css3" className="h-8 w-8" />,
          <FaSass key="sass" className="h-8 w-8" />,
          <FaJs key="javascript" className="h-8 w-8" />,
          <FaPython key="python" className="h-8 w-8" />,
          <FaVuejs key="vuejs" className="h-8 w-8" />,
          <FaNodeJs key="nodejs" className="h-8 w-8" />,
          <GrMysql key="mysql" className="h-8 w-8" />,
        ]}
        radiusX={120}
        radiusY={30}
        tiltAngle={330}
        className="absolute left-1/2 -translate-x-1/2 top-0"
      />
    ),
  },
  {
    name: "Card",
    description: "A set of cards that can be used for different use cases.",
    href: "#",
    className: "col-span-full md:col-span-2 xl:col-span-1 row-span-1",
    background: (
      <FeatureBlockAnimatedCard className="absolute left-1/2 -translate-x-1/2 -top-9 h-[400px] w-full scale-75 transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)]" />
    ),
  },
  {
    name: "Hyperspeed Background",
    description:
      "Experience the rush of digital pathways with dynamic light trails. Navigate your content at the speed of thought.",
    className: "col-span-full md:col-span-2 xl:col-span-2",
    href: "#",
    cta: "Learn more",
    background: <HyperspeedDemo />,
  },
  {
    name: "Vortex Background",
    description:
      "A wavy, swirly, vortex background ideal for CTAs and backgrounds.",
    className: "col-span-full xl:col-span-2",
    href: "#",
    cta: "Learn more",
    background: (
      <VortexDemo className="absolute left-1/2 -translate-x-1/2 -top-32 h-[600px] w-full" />
    ),
  },
];
