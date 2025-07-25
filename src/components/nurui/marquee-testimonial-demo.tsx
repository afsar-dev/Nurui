import { Marquee } from "@/components/nurui/marque";
import TestimonialCard from "@/components/nurui/testimonial-card";

export default function MarqueeTestimonialDemo() {
  return (
    <section
      className="m-6 relative flex flex-col lg:flex-row gap-6 overflow-hidden
    border-y md:border border-[var(--primary-color)] md:rounded-2xl md:px-5 xl:px-6 2xl:px-10 md:mx-6 "
    >
      {/* title */}
      <div className="w-[40%] space-y-3.5 hidden 2xl:flex flex-col justify-center items-start">
        <p className="py-1 uppercase px-2 bg-[var(--primary-color-4)] inline-block text-[var(--primary-color)] font-semibold rounded-lg">
          Community
        </p>
        <h1 className="text-7xl font-black pb-2">
          Hear From Our Happy{" "}
          <span className="text-[var(--primary-color)]">People</span>
        </h1>
        <p className="text-balance text-lg">
          Here&apos;s what some of our users have to say about nurui UI.
          Designing became faster, smoother, and way more enjoyable. From
          startups to scaleups, developers trust our components daily.
        </p>
      </div>

      {/* testimonial cards */}
      <div className="flex flex-row items-center md:gap-2.5 xl:gap-8 2xl:w-[60%] mx-auto py-4 md:py-0 max-h-[calc(100vh-6rem)]">
        {[
          { data: data?.slice(0, 10), reverse: true },
          { data: data?.slice(10, 20), reverse: false },
          // { data: data?.slice(20, data?.length), reverse: true },
        ].map((item, idx) => (
          <Marquee
            key={idx}
            pauseOnHover
            vertical
            reverse={item.reverse}
            className="[--duration:100s] hidden md:block"
          >
            {item.data?.map((tes, i) => (
              <TestimonialCard
                key={i}
                position={tes?.position}
                name={tes?.name}
                review={tes?.testimonial}
                marginTop={i + 1 === 1 ? "mt-4" : ""}
              />
            ))}
          </Marquee>
        ))}
        {[
          { data: data?.slice(0, 10), reverse: true },
          // { data: data?.slice(10, 20), reverse: false },
        ].map((item, idx) => (
          <Marquee
            key={idx}
            pauseOnHover
            vertical
            reverse={item.reverse}
            className="[--duration:100s] block md:hidden"
          >
            {item.data?.map((tes, i) => (
              <TestimonialCard
                key={i}
                position={tes?.position}
                name={tes?.name}
                review={tes?.testimonial}
                marginTop={i + 1 === 1 ? "mt-4" : ""}
              />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

const data = [
  {
    name: "John Doe",
    position: "Google CEO",
    testimonial:
      "Our partnership with this team has helped us accelerate our innovation. Their dedication and vision have transformed how we approach challenges.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 4.8,
  },
  {
    name: "Jane Smith",
    position: "Innovatech CTO",
    testimonial:
      "They have a unique ability to solve complex problems with simplicity. Their team is efficient, reliable, and always ahead of the curve.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 4.6,
  },
  {
    name: "Mike Johnson",
    position: "FutureLab Founder",
    testimonial:
      "A game-changer in every sense. Their ability to innovate and adapt to market needs has been a key factor in our company's growth.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 4.9,
  },
  {
    name: "Emily Watson",
    position: "NovaWorks Manager",
    testimonial:
      "Their creative solutions are unmatched, and their ability to deliver on time is truly remarkable. We couldn’t ask for a better team.",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    rating: 4.7,
  },
  {
    name: "David Brown",
    position: "Stellar CEO",
    testimonial:
      "A trustworthy partner who always goes above and beyond. Their solutions have helped streamline our operations and improve our bottom line.",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    rating: 2,
  },
  {
    name: "Sophia Lee",
    position: "WaveInc Marketing",
    testimonial:
      "Their approach to marketing is both innovative and results-driven. The strategic insights they provided helped us reach new heights.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    rating: 4.4,
  },
  {
    name: "James Carter",
    position: "BuildWise Engineer",
    testimonial:
      "We’ve worked with many teams, but none as proactive and solution-oriented as this one. They always deliver exceptional results.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    rating: 4.9,
  },
  {
    name: "Olivia Martin",
    position: "BioNex Head R&D",
    testimonial:
      "The team’s ability to blend technology and science is outstanding. Their work has been pivotal in pushing the boundaries of our research.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    rating: 4.3,
  },
  {
    name: "Lucas Scott",
    position: "DataDrive Lead",
    testimonial:
      "A true partner in every sense. Their insights helped us refine our data strategy and improve our customer experience dramatically.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    rating: 3,
  },
  {
    name: "Ella Davis",
    position: "Artify Lead",
    testimonial:
      "Their designs are not only beautiful but highly functional. The attention to detail and creativity they bring to every project is unparalleled.",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    rating: 4.5,
  },
  {
    name: "Liam Wilson",
    position: "SoftCore VP",
    testimonial:
      "A fantastic team with a clear focus on delivering results. Their strategic guidance has been crucial in our recent successes.",
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 4.8,
  },
  {
    name: "Ava Thompson",
    position: "Pixxio Director",
    testimonial:
      "Working with them has been an absolute pleasure. They understand our needs and deliver exactly what we want, every time.",
    image: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 4.7,
  },
  {
    name: "William Martinez",
    position: "InfoTrack Head",
    testimonial:
      "Their team’s attention to detail and commitment to excellence is unmatched. They’ve been instrumental in helping us scale.",
    image: "https://randomuser.me/api/portraits/men/13.jpg",
    rating: 4.9,
  },
  {
    name: "Isabella Garcia",
    position: "OpenSpace Manager",
    testimonial:
      "They are a pleasure to work with. Their focus on results and customer satisfaction has made a real difference for us.",
    image: "https://randomuser.me/api/portraits/women/14.jpg",
    rating: 4.2,
  },
  {
    name: "Benjamin Gonzalez",
    position: "WorkHub Lead",
    testimonial:
      "The team consistently exceeds our expectations. Their innovative approach and excellent communication make them stand out.",
    image: "https://randomuser.me/api/portraits/men/15.jpg",
    rating: 4.3,
  },
  {
    name: "Charlotte Clark",
    position: "TeamConnect Director",
    testimonial:
      "Their expertise in HR solutions has helped us improve our workforce productivity and foster a better workplace environment.",
    image: "https://randomuser.me/api/portraits/women/16.jpg",
    rating: 4.4,
  },
  {
    name: "Jack Robinson",
    position: "InsightMax Analyst",
    testimonial:
      "A team that delivers outstanding insights. Their analysis helped us make critical business decisions and drive growth.",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    rating: 4.6,
  },
  {
    name: "Amelia Rodriguez",
    position: "BrightPath Strategist",
    testimonial:
      "An exceptional team with a deep understanding of branding. They helped us redefine our brand’s identity and expand our market reach.",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
    rating: 4.7,
  },
  {
    name: "Henry Lewis",
    position: "Codify Lead",
    testimonial:
      "The team’s technical expertise is top-notch. They continuously deliver high-quality solutions that meet our business needs.",
    image: "https://randomuser.me/api/portraits/men/19.jpg",
    rating: 4.5,
  },
  {
    name: "Mia Walker",
    position: "HelpMate Head",
    testimonial:
      "They have been an invaluable partner in improving our customer service processes. Their solutions have led to a better customer experience.",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
    rating: 4.8,
  },
  {
    name: "Daniel Young",
    position: "QuickLink Manager",
    testimonial:
      "Their ability to streamline processes and optimize our supply chain operations has helped us stay ahead of the competition.",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    rating: 4.4,
  },
  {
    name: "Grace King",
    position: "MediaWave Manager",
    testimonial:
      "Their approach to social media strategy has helped us significantly increase our online presence and engagement.",
    image: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 2,
  },
  {
    name: "Samuel Scott",
    position: "GuardNet Head",
    testimonial:
      "Their security solutions are robust, reliable, and have greatly enhanced our company's data protection strategy.",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    rating: 4.5,
  },
  {
    name: "Victoria Rivera",
    position: "PlanIt Coordinator",
    testimonial:
      "Working with this team was a pleasure. Their attention to detail and creativity were essential in making our event a success.",
    image: "https://randomuser.me/api/portraits/women/24.jpg",
    rating: 4.6,
  },
  {
    name: "Andrew Flores",
    position: "FinVista Accountant",
    testimonial:
      "Their financial expertise and strategic advice have been critical to helping us manage and grow our finances effectively.",
    image: "https://randomuser.me/api/portraits/men/25.jpg",
    rating: 4.7,
  },
  {
    name: "Natalie Ramirez",
    position: "CreatiFly Designer",
    testimonial:
      "A creative force in design. They’ve consistently delivered exceptional visuals that have significantly elevated our product presentations.",
    image: "https://randomuser.me/api/portraits/women/26.jpg",
    rating: 4.6,
  },
  {
    name: "Ryan Sanders",
    position: "DevSolutions Head",
    testimonial:
      "Their development solutions are scalable, reliable, and always meet our evolving business needs. We trust them for all our tech requirements.",
    image: "https://randomuser.me/api/portraits/men/27.jpg",
    rating: 4.8,
  },
];
