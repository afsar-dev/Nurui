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
    <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
      <SectionIntro
        title={{
          fullHighLightColor: "text-[var(--text-primary-color)]",
          highLiteWords: "Showcase",
        }}
        description="Developers choose Nur UI to build their landing pages."
        sectionGap="pb-10 lg:pb-16"
      />

      {items.length > 0 ? (
        <ShowcaseGrid items={items} />
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--glass-color)] py-16 text-center">
          <p className="text-[var(--opacity-text-color)]">
            No showcase projects found. Check back later!
          </p>
        </div>
      )}

      <footer className="mt-16 text-center md:mt-20">
        <p className="text-sm text-[var(--opacity-text-color)]">
          Built something with Nur UI?{" "}
          <a
            href="https://github.com/afsar-dev/Nurui/issues/new?template=showcase_submission.md"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--primary-color)] underline-offset-4 transition-colors hover:text-[var(--primary-color-1)] hover:underline"
          >
            Submit your site
          </a>
        </p>
      </footer>
    </div>
  );
}
