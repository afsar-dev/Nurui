"use client";
import { BiCustomize, BiMobileVibration } from "react-icons/bi";
import { MdOutlineDarkMode } from "react-icons/md";
import { GrOptimize } from "react-icons/gr";
import BackgroundGridBeam from "../../ui/background-grid-beam/BackgroundGridBeam";
import AnimatedGradientText from "../../ui/animated-gradient-button/AnimatedGradientText";
import LabelWithIcon from "../../common/LabelWithIcon";
import { motion } from "motion/react";
import ReactIcon from "../../icons/ReactIcon";
import NextJsIcon from "../../icons/NextJsIcon";
import TailwindIcon from "../../icons/TailwindIcon";
import TypescriptIcon from "../../icons/TypescriptIcon";
import RatingStars from "@/components/nurui/rating-star";
import UserByCompanies from "@/components/common/UserByCompanies";
import Link from "next/link";

const HeroSection = () => {
  return (
    <BackgroundGridBeam>
      <section className="relative flex flex-col items-center justify-center text-center px-6 pt-20 pb-24 md:pb-32">
        {/* Gradient title label */}
        <AnimatedGradientText
          href="/docs/gradient-button"
          title={"Build Faster. Design Smarter."}
          textGradient="bg-gradient-to-r from-[var(--secondary-color)] via-[var(--primary-color)] to-[var(--secondary-color)]"
          borderGradient="bg-gradient-to-r from-[#80EEB4]/70 via-[#3CA2FA] to-[#80EEB4]/70"
        />

        {/* Headline */}
        <h1 className="font-extrabold tracking-tight uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] max-w-4xl mt-8 text-balance">
          All Your{" "}
          <span className="text-[var(--primary-color)]">Components</span>
          <br className="hidden sm:block" /> in One Place
          <span className="text-[var(--primary-color)]">!</span>
        </h1>

        {/* Description */}
        <p className="text-[var(--opacity-text-color)] mt-6 md:mt-8 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed">
          A modern, minimal, and responsive React + Next.js component library —
          <br className="hidden sm:block" />
          crafted for developers who value{" "}
          <span className="text-[var(--primary-color)] font-medium">
            aesthetics
          </span>{" "}
          and
          <span className="text-[var(--primary-color)] font-medium">
            {" "}
            speed
          </span>
          .
        </p>

        {/* Feature list */}
        <div className="bg-[var(--glass-color)] shadow-md dark:shadow-none px-6 py-3 mt-8 rounded-2xl hidden md:flex items-center gap-6 capitalize backdrop-blur-sm">
          {[
            { icon: <BiMobileVibration />, label: "Responsive" },
            { icon: <MdOutlineDarkMode />, label: "Dark mode" },
            { icon: <BiCustomize />, label: "Customizable" },
            { icon: <GrOptimize />, label: "Lightweight" },
          ].map(({ icon, label }, i) => (
            <LabelWithIcon key={i} icon={icon} label={label} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10">
          <Link
            href="/docs/components"
            className="px-8 py-3 rounded-xl text-lg   font-medium 
    bg-white/10 backdrop-blur-md border border-white/20 
    text-[var(--text-primary-color)]
    hover:bg-white/20 hover:border-white/30 
    transition-all duration-300"
          >
            Explore Components
          </Link>
        </div>

        {/* Tech icons animation */}
        <div className="relative mt-20 flex items-center justify-center">
          <motion.div
            className="grid grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {[ReactIcon, NextJsIcon, TailwindIcon, TypescriptIcon].map(
              (Icon, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  className="flex justify-center items-center"
                >
                  <Icon className="w-12 h-12 md:w-16 md:h-16 opacity-80 hover:opacity-100 transition-all duration-300" />
                </motion.div>
              ),
            )}
          </motion.div>
        </div>

        {/* Rating + Companies */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <RatingStars />
          <p className="text-[var(--opacity-text-color)] font-medium">
            Trusted by
            <span className="text-[var(--text-primary-color)] font-semibold">
              500+
            </span>
            developers
          </p>
          <UserByCompanies />
        </div>
      </section>
    </BackgroundGridBeam>
  );
};

export default HeroSection;
