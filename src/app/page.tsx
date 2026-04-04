import FaqSection from "@/components/nurui/glassy-faq";
import AllTechnologySection from "@/components/pages/home/AllTechnologySection";
import ComponentDemosSection from "@/components/pages/home/ComponentDemosSection";
import CTAInspireSection from "@/components/pages/home/CTAInspireSection";
import HeroSection from "@/components/pages/home/HeroSection";
import MarqueeTestimonialSection from "@/components/pages/home/MarqueeTestimonialSection";

const Home = () => {
  return (
    <main className="section-gap">
      <HeroSection />
      <AllTechnologySection />
      <ComponentDemosSection />
      <MarqueeTestimonialSection />
      <FaqSection />
      <CTAInspireSection />
    </main>
  );
};

export default Home;
