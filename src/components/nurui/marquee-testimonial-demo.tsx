import { Marquee } from "@/components/nurui/marquee";
import TestimonialCard from "@/components/nurui/testimonial-card";
import { testimonialData } from "@/data/testimonial.data";

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
          { data: testimonialData?.slice(0, 10), reverse: true },
          { data: testimonialData?.slice(10, 20), reverse: false },
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
                src={tes?.image}
                key={i}
                position={tes?.position}
                name={tes?.name}
                review={tes?.testimonial}
                rating={tes?.rating}
                marginTop={i + 1 === 1 ? "mt-4" : ""}
              />
            ))}
          </Marquee>
        ))}
        {[
          { data: testimonialData?.slice(0, 10), reverse: true },
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
                src={tes?.image}
                key={i}
                position={tes?.position}
                name={tes?.name}
                review={tes?.testimonial}
                rating={tes?.rating}
                marginTop={i + 1 === 1 ? "mt-4" : ""}
              />
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
