"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
// import CountUp from "react-countup";
// import { useInView } from "react-intersection-observer";

type CtaAction = {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
};

type CtaInspireSectionProps = {
  badgeLabel?: string;
  title?: string;
  description?: string;
  note?: string;
  actions?: CtaAction[];
  stats?: CtaStat[];
};

type CtaStat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

const defaultActions: CtaAction[] = [
  {
    label: "Email us",
    href: "mailto:mdafsar.dev@gmail.com",
    variant: "secondary",
  },
  {
    label: "Book a free call",
    href: "https://cal.com/md-afsar-mahmud",
    variant: "primary",
  },
];

// const defaultStats: CtaStat[] = [
//   {
//     value: 3,
//     label: "Available slots",
//     suffix: "+",
//   },
//   {
//     value: 7,
//     label: "Sprint delivery mindset",
//     suffix: "Day",
//   },
//   {
//     value: 24,
//     label: "First reply time",
//     prefix: "<",
//     suffix: "Hour",
//   },
// ];

const CtaInspireSection = ({
  badgeLabel = "You",
  title = "Got a Project?",
  description = "Book a free discovery call.",
  note = "We believe in people, not forms. Book a call and let's talk directly.",
  actions = defaultActions,
  // stats = defaultStats,
}: CtaInspireSectionProps) => {
  // const { ref, inView } = useInView();

  return (
    <section className="px-4 md:px-6 lg:px-8">
      <div className="flex flex-col items-center mx-auto max-w-6xl rounded-2xl borde border-[var(--primary-color-2)] bg-gradient-to-b from-[var(--white-color)] dark:from-[var(--glass-color)] via-[var(--white-color)] dark:via-[var(--glass-color)] to-[var(--primary-color)] dark:to-[var(--primary-color-2)] p-4 md:p-8 shadow-xl dark:shadow-none">
        <div className="max-w-5xl w-full rounded-2xl border border-[var(--primary-color-2)] bg-transparent p-4 md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Image
                    className="h-12 w-12 rounded-full border border-[var(--primary-color)] object-cover"
                    src="/afsar.jpeg"
                    alt="Founder"
                    width={0}
                    height={0}
                  />
                  <div className="h-10 w-10 rounded-full absolute bottom-1 -right-4 grid place-items-center border border-[var(--primary-color-2)] bg-[var(--primary-color)] text-sm font-bold text-[var(--white-color)]  px-2 py-0.5">
                    {badgeLabel}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary-color)]">
                  {title}
                </h3>
                <p className="text-sm text-[var(--opacity-text-color)]">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 md:justify-end">
              {actions.map((action) => (
                <Link
                  key={`${action.label}-${action.href}`}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex min-h-10 items-center gap-2 justify-center rounded-full px-5 text-sm font-semibold transition-all duration-300",
                    action.variant === "primary"
                      ? "bg-[var(--primary-color)] text-[var(--text-primary-color)] hover:brightness-90 font-semibold"
                      : "bg-[var(--primary-color-4)] border border-[var(--primary-color)] hover:text-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color-3)]",
                  )}
                >
                  {action.label}

                  {action.label === "Book a free call" && (
                    <span className="relative flex size-3">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gray-100 opacity-75"></span>
                      <span className="relative inline-flex size-3 rounded-full bg-gray-100"></span>
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <p className="max-w-3xl w-full rounded-xl rounded-t-none lg:border lg:border-t-0 border-[var(--primary-color-2)] bg-transparent py-3 text-center text-sm text-[var(--primary-color)] font-semibold">
          {note}
        </p>

        {/* <div ref={ref} className="lg:mt-8 w-full max-w-5xl  pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[var(--primary-color-2)]">
            {stats.map((stat) => (
              <div key={stat.label} className="py-5 text-center">
                <h4 className="inline-flex items-baseline justify-center gap-1 text-4xl font-bold tracking-tight text-[var(--primary-color)]">
                  {stat.prefix ? <span>{stat.prefix}</span> : null}
                  {inView ? (
                    <CountUp start={0} end={stat.value} duration={2.8} />
                  ) : (
                    stat.value
                  )}
                  {stat.suffix ? <span>{stat.suffix}</span> : null}
                </h4>
                <p className="mt-1 text-sm text-[var(--white-color)] font-semibold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default CtaInspireSection;
