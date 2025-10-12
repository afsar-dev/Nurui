import Gravity, { MatterBody } from "@/components/common/Gravity";
import SectionIntro from "@/components/common/SectionIntro";
import JavaScriptIcon from "@/components/icons/JavaScriptIcon";
import TailwindIcon from "@/components/icons/TailwindIcon";
import SassIcon from "@/components/icons/SassIcon";
import HtmlIcon from "@/components/icons/HtmlIcon";
import NextJsIcon from "@/components/icons/NextJsIcon";
import TypescriptIcon from "@/components/icons/TypescriptIcon";
import { CssIcon } from "@/components/icons/CssIcon";
import ReactIcon from "@/components/icons/ReactIcon";
import GsapIcon from "@/components/icons/GsapIcon";
import ZDogIcon from "@/components/icons/ZDogIcon";
import ThreeJsIcon from "@/components/icons/ThreeJsIcon";
import MotionIcon from "@/components/icons/MotionIcon";
import AnimeJsIcon from "@/components/icons/AnimeJsIcon";
import ReactSpringIcon from "@/components/icons/ReactSpringIcon";

export default function AllTechnologySection() {
  const icons = [
    {
      icon: (
        <ZDogIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <SassIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <CssIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <TailwindIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <HtmlIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <JavaScriptIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <ThreeJsIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <ReactIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <NextJsIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <TypescriptIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <MotionIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <AnimeJsIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <GsapIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
    {
      icon: (
        <ReactSpringIcon
          isAnimation={false}
          className="rounded-full size-14 md:size-18 lg:size-20"
          reSize={true}
        />
      ),
    },
  ];

  return (
    <section className="max-w-5xl mx-[1.1rem] md:mx-[1.3rem] lg:mx-[1.5rem] xl:mx-auto h-[40vh] md:h-[45vh] lg:h-[50vh]  flex flex-col justify-between rounded-2xl border border-[var(--secondary-color)] bg-[var(--secondary-color-4)] pt-2 md:pt-3 xl:pt-4 relative overflow-hidden">
      <SectionIntro
        title={{
          highLiteWords: "Everything You Need In",
          normalWords: "Your Stack",
          firstHighLightColor: "text-[var(--secondary-color)]",
        }}
        description="From TypeScript to JavaScript, discover a powerful collection of tools designed to supercharge your development workflow."
        sectionGap="pb-3 md:pb-7"
      />
      <Gravity resetOnResize={true} gravity={{ x: 0, y: 1 }}>
        {icons.map((IconData, index) => {
          const Icon = IconData.icon;
          const randomX = Math.random() * 60 + 20;
          const randomY = Math.random() * 20 + 5;

          return (
            <MatterBody
              key={index}
              matterBodyOptions={{
                friction: 0.5,
                restitution: 0.2,
                density: 0.001,
              }}
              x={`${randomX}%`}
              y={`${randomY}%`}
            >
              <div className="select-none">{Icon}</div>
            </MatterBody>
          );
        })}
      </Gravity>
    </section>
  );
}
