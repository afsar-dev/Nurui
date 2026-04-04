import AllTechnologySection from "@/components/pages/home/AllTechnologySection";
import ComponentDemosSection from "@/components/pages/home/ComponentDemosSection";
import CtaInspireSection from "@/components/pages/home/CtaInspireSection";
import HeroSection from "@/components/pages/home/HeroSection";
import MarqueeTestimonialSection from "@/components/pages/home/MarqueeTestimonialSection";

const Home = () => {
  return (
    <main className="section-gap">
      <HeroSection />
      <AllTechnologySection />
      <ComponentDemosSection />
      <MarqueeTestimonialSection />
      <CtaInspireSection />
    </main>
  );
};

export default Home;
