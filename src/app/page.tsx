import AllComponentSection from "@/components/pages/Home/AllComponentSection";
import ComponentDemosSection from "@/components/pages/Home/ComponentDemosSection";
import HeroSection from "@/components/pages/Home/HeroSection";
import MarqueeTestimonialSection from "@/components/pages/Home/MarqueeTestimonialSection";

const Home = () => {
  return (
    <main className="section-gap">
      <HeroSection />
      <AllComponentSection />
      <ComponentDemosSection />
      <MarqueeTestimonialSection />
    </main>
  );
};

export default Home;
