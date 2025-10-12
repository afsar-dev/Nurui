import FaqSection from "@/components/nurui/glassy-faq";
import AllTechnologySection from "@/components/pages/Home/AllTechnologySection";
import ComponentDemosSection from "@/components/pages/Home/ComponentDemosSection";
import HeroSection from "@/components/pages/Home/HeroSection";
import MarqueeTestimonialSection from "@/components/pages/Home/MarqueeTestimonialSection";

const Home = () => {
  return (
    <main className="section-gap">
      <HeroSection />
      <AllTechnologySection />
      <ComponentDemosSection />
      <MarqueeTestimonialSection />
      <FaqSection />
    </main>
  );
};

export default Home;
