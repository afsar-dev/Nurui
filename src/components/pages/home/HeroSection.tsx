import UserByCompanies from "@/components/common/UserByCompanies";
import RatingStars from "@/components/nurui/rating-star";
import { getContributors } from "@/utils/github";
import { BiCustomize, BiMobileVibration } from "react-icons/bi";
import { GrOptimize } from "react-icons/gr";
import { MdOutlineDarkMode } from "react-icons/md";
import "../../../styles/hero.css";
import { AnimatedTooltip } from "../../common/AnimatedTooltip";
import LabelWithIcon from "../../common/LabelWithIcon";
import ShadowAnimationButton from "../../common/ShadowAnimationButton";
import AnimeJsIcon from "../../icons/AnimeJsIcon";
import { CssIcon } from "../../icons/CssIcon";
import GsapIcon from "../../icons/GsapIcon";
import HtmlIcon from "../../icons/HtmlIcon";
import JavaScriptIcon from "../../icons/JavaScriptIcon";
import MotionIcon from "../../icons/MotionIcon";
import NextJsIcon from "../../icons/NextJsIcon";
import ReactIcon from "../../icons/ReactIcon";
import ReactSpringIcon from "../../icons/ReactSpringIcon";
import SassIcon from "../../icons/SassIcon";
import TailwindIcon from "../../icons/TailwindIcon";
import ThreeJsIcon from "../../icons/ThreeJsIcon";
import TypescriptIcon from "../../icons/TypescriptIcon";
import ZDogIcon from "../../icons/ZDogIcon";
import AnimatedGradientText from "../../ui/animated-gradient-button/AnimatedGradientText";
import BackgroundGridBeam from "../../ui/background-grid-beam/BackgroundGridBeam";
import CollMode from "../../ui/cool-mode/CollMode";

const features = [
  { icon: <BiMobileVibration />, label: "responsive" },
  { icon: <MdOutlineDarkMode />, label: "Dark mode" },
  { icon: <BiCustomize />, label: "customizable" },
  { icon: <GrOptimize />, label: "Lightweight" },
];

const HeroSection = async () => {
  const contributors = await getContributors();
  const lastFiveContributors = contributors.slice(
    contributors.length - 5,
    contributors.length,
  );

  return (
    <BackgroundGridBeam>
      <section className="flex justify-evenly px-4 md:px-20 pt-7 md:pt-16 lg:pt-24 pb-7 md:pb-4 lg:pb-10 ">
        {/* left side icons */}
        <div className="hidden 2xl:flex gap-x-4 h-96 w-60 icon-animation">
          <div className="flex flex-col justify-around relative right-4">
            <ZDogIcon className="relative left-6 icon-animation5" />
            <SassIcon className="icon-animation6" />
            <GsapIcon className="relative left-6 icon-animation7" />
          </div>
          <div className="flex flex-col justify-center gap-12 relative left-3">
            <CssIcon className="icon-animation3" />
            <TailwindIcon className="icon-animation4" />
          </div>
          <div className="flex flex-col justify-between">
            <HtmlIcon className="icon-animation1" />
            <JavaScriptIcon className="icon-animation2" />
          </div>
        </div>
        {/* content */}
        <div className="flex flex-col items-center gap-y-4 md:gap-y-6 lg::gap-y-7 text-center text-[var(--text-primary-color)]">
          <AnimatedGradientText
            href="/docs/gradient-button"
            title={"Introducing Gradient Button"}
            textGradient="bg-[var(--black-color)] dark:bg-gradient-to-r from-[var(--secondary-color)] via-[var(--primary-color)] to-[var(--secondary-color)]"
            borderGradient="bg-gradient-to-r from-[#80EEB4] dark:from-[#80EEB4]/60 via-[#3CA2FA] dark:via-[#3CA2FA]/100 to-[#80EEB4] dark:to-[#80EEB4]/60"
          />
          {/* title */}
          <h1 className="text-3xl md:text-5xl lg:text-7xl xl:text-5xl 2xl:text-7xl max-w-[62rem] font-bold uppercase leading-[1.1] text-balance">
            All Your Component in One{" "}
            <span className="text-[var(--primary-color)]">Place!</span>
          </h1>
          {/* description */}
          <p className="lg:text-xl max-w-2xl text-[var(--opacity-text-color)] text-balance">
            React and Next.js based UI library with CLI scaffolding, TS-to-JS
            conversion, and v0 live previews.
          </p>
          {/* features */}
          <div className="bg-[var(--glass-color)] shadow-lg dark:shadow-none px-6 py-3 rounded-2xl hidden md:flex items-center gap-4 capitalize">
            {features.map(({ icon, label }, i) => (
              <LabelWithIcon key={i} icon={icon} label={label} />
            ))}
          </div>

          {/* action & offer & avatar & rating */}
          <div className="flex flex-col items-center gap-3">
            <CollMode
              options={{
                particle: [
                  "https://res.cloudinary.com/dz1fy2tof/image/upload/v1747489777/icons8-tailwindcss-480_qnf2sy.png",
                  "https://res.cloudinary.com/dz1fy2tof/image/upload/v1751019213/CSS3_enijzz.png",
                  "https://res.cloudinary.com/dz1fy2tof/image/upload/v1747489474/atom_eieqee.png",
                  "https://res.cloudinary.com/dz1fy2tof/image/upload/v1747489870/icons8-javascript-480_nqbmlo.png",
                  "https://res.cloudinary.com/dz1fy2tof/image/upload/v1747489887/icons8-typescript-480_gxf8zq.png",
                  "https://res.cloudinary.com/dz1fy2tof/image/upload/v1747490019/icons8-sass-480_colnli.png",
                  "https://res.cloudinary.com/dz1fy2tof/image/upload/v1751018871/zdog_xc145m.png",
                ],
              }}
            >
              <ShadowAnimationButton
                href={"/docs/components"}
                title="Get Started"
              />
            </CollMode>

            <p className="flex items-center gap-1 font-bold">
              <span className="text-[var(--primary-color)]">
                Get Early Access
              </span>{" "}
              to New UI
            </p>

            <div className="flex flex-col md:flex-row items-center pt-4 md:pt-6">
              <AnimatedTooltip items={lastFiveContributors} />
              <div className="flex flex-col items-center md:items-start gap-1 mt-5 md:mt-0 md:ml-5">
                <RatingStars rating={5} />
                <p className="ml-3 text-[var(--opacity-text-color)] font-semibold">
                  Trusted by{" "}
                  <span className="text-[var(--text-primary-color)]">500+</span>{" "}
                  developers
                </p>
              </div>
            </div>
          </div>

          {/* used by */}
          <UserByCompanies />
        </div>
        {/* right side icons */}
        <div className="hidden 2xl:flex gap-x-4 h-96 w-60 icon-animation mr-8">
          <div className="flex flex-col justify-between">
            <ThreeJsIcon className="icon-animation8" />
            <ReactIcon className="icon-animation9" />
          </div>
          <div className="flex flex-col justify-center gap-12 relative right-3">
            <NextJsIcon className="icon-animation10" />
            <TypescriptIcon className="icon-animation11" />
          </div>
          <div className="flex flex-col justify-around relative right-2">
            <MotionIcon className="icon-animation12" />
            <AnimeJsIcon className="icon-animation13 relative left-7" />
            <ReactSpringIcon className="icon-animation14" />
          </div>
        </div>
      </section>
    </BackgroundGridBeam>
  );
};

export default HeroSection;
