import NewsLetter from "@/components/nurui/news-letter";
import GlassyFaq from "@/components/nurui/glassy-faq";
import AboutUsHeroSection from "@/components/pages/about-us/AboutUsHeroSection";
import ImageTabsSection from "@/components/pages/about-us/ImageTabsSection";
import StackingCardsSection from "@/components/pages/about-us/StackingCardsSection";
import StatesCountupSection from "@/components/pages/about-us/StatesCountupSection";
import { WorldMapAnimationSection } from "@/components/pages/about-us/WorldMapAnimationSection";

export const metadata = {
  title: "About Us",
  description:
    "Learn more about the Nur/ui, our mission, and how we build the future of UI components.",
};

const page = () => {
  return (
    <main className="section-gap">
      <AboutUsHeroSection />
      <ImageTabsSection />
      <StatesCountupSection />
      <WorldMapAnimationSection />
      <StackingCardsSection />
      <GlassyFaq />
      <NewsLetter />
    </main>
  );
};

export default page;
