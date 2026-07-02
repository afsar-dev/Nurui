import SectionIntro from "@/components/common/SectionIntro";
import { ShowcaseGrid } from "@/components/pages/showcase/ShowcaseGrid";
import { getShowcaseItems } from "@/lib/showcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showcase",
  description:
    "Browse websites, portfolios, and SaaS dashboards built by the developer community using Nur UI components.",
  openGraph: {
    title: "Showcase | Nur UI",
    description:
      "Explore the beautiful community implementations built using Nur UI components.",
  },
};

export default async function ShowcasePage() {
  const items = await getShowcaseItems();

  return (
    <div className="container px-4 py-8 lg:py-16 mx-auto">
      {/* Page Header */}
      <SectionIntro
        sectionName="Showcase"
        sectionNameColor="text-[var(--primary-color)]"
        title={{
          normalWords: "Beautiful sites built with",
          highLiteWords: "Nur UI",
          highlightColor: "text-[var(--primary-color)]",
        }}
        description="See how developers and designers are leveraging Nur UI to create stunning, high-performance web experiences."
        sectionGap="pb-10 lg:pb-16"
      />

      {/* Showcase Grid */}
      <div className="max-w-6xl mx-auto">
        {items.length > 0 ? (
          <ShowcaseGrid items={items} />
        ) : (
          <div className="text-center py-12 border border-dashed border-[var(--border-color)] rounded-2xl bg-[var(--glass-color)]">
            <p className="text-[var(--opacity-text-color)]">
              No showcase projects found. Check back later!
            </p>
          </div>
        )}
      </div>

      {/* Showcase CTA */}
      <div className="max-w-3xl mx-auto mt-16 lg:mt-24 text-center p-8 rounded-2xl border border-[var(--border-color)] bg-[var(--glass-color)]">
        <h3 className="text-xl lg:text-2xl font-bold text-[var(--text-primary-color)]">
          Built something beautiful with Nur UI?
        </h3>
        <p className="mt-3 text-sm lg:text-base text-[var(--opacity-text-color)] max-w-xl mx-auto leading-relaxed">
          We feature outstanding community projects in our showcase gallery. Submit your project on GitHub to get featured!
        </p>
        <div className="mt-6">
          <a
            href="https://github.com/afsar-dev/Nurui/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-[var(--primary-color)] hover:bg-[var(--primary-color-1)] px-5 py-2.5 font-bold text-[var(--white-color)] transition-colors duration-200 text-sm"
          >
            Submit Your Site
          </a>
        </div>
      </div>
    </div>
  );
}
