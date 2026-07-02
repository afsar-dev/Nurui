import ImageComponent from "@/components/common/Image";
import { getShowcaseBySlug, getShowcaseItems } from "@/lib/showcase";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getShowcaseBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.name,
    description: project.longDescription || project.description,
    openGraph: {
      title: `${project.name} | Nur UI Showcase`,
      description: project.description,
      images: [
        {
          url: project.image,
          alt: `${project.name} preview screenshot`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Nur UI Showcase`,
      description: project.description,
      images: [project.image],
    },
  };
}

export async function generateStaticParams() {
  const items = await getShowcaseItems();
  return items.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ShowcaseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getShowcaseBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container px-4 py-8 lg:py-16 mx-auto max-w-6xl">
      {/* Back Button */}
      <div className="mb-6 lg:mb-10">
        <Link
          href="/showcase"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--opacity-text-color)] hover:text-[var(--primary-color)] transition-colors duration-200"
        >
          <ArrowLeft size={16} />
          Back to Showcase
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Details */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[var(--primary-color-4)] px-3 py-1 text-xs font-semibold text-[var(--primary-color)] border border-[var(--primary-color-3)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Project Name */}
            <h1 className="text-3xl lg:text-4xl font-extrabold text-[var(--text-primary-color)] tracking-tight">
              {project.name}
            </h1>

            {/* Project Description */}
            <p className="mt-6 text-base lg:text-lg text-[var(--opacity-text-color)] leading-relaxed text-pretty">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Action Area */}
          <div className="mt-8 pt-6 border-t border-[var(--border-color)]">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <span className="text-xs text-[var(--opacity-text-color)] block uppercase tracking-wider font-semibold">
                  Live URL
                </span>
                <span className="text-sm font-medium text-[var(--primary-color)] truncate max-w-xs block mt-0.5">
                  {project.websiteUrl}
                </span>
              </div>
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary-color)] hover:bg-[var(--primary-color-1)] px-6 py-3 font-bold text-[var(--white-color)] transition-all duration-200 text-sm hover:shadow-[0_0_20px_rgba(60,162,250,0.3)]"
              >
                Visit Website
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Large Preview Screenshot */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--glass-color)] shadow-2xl">
            {/* Visual Header bar to simulate browser window */}
            <div className="flex items-center gap-1.5 px-4 py-3 bg-[var(--background-color-2)] border-b border-[var(--border-color)]">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            {/* Aspect Video wrapper */}
            <div className="relative aspect-video w-full">
              <ImageComponent
                src={project.image}
                alt={`Large full screenshot of ${project.name}`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
