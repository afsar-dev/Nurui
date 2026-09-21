import { compileMDX } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import path from "path";
import { getMDXComponents } from "../../../../../mdx-components";
import { Metadata } from "next";
import remarkGfm from "remark-gfm";
import CopyPage from "@/components/ui/CopyButton";
import { notFound } from "next/navigation";

interface AsyncParams {
  params: Promise<{ slug: string }>;
}

interface Frontmatter {
  title: string;
  description: string;
  creator: string;
  keywords?: string[];
}

export async function generateMetadata({
  params,
}: AsyncParams): Promise<Metadata> {
  const { slug } = await params;

  // Whitelist validation: only allow alphanumeric, hyphens, and underscores to prevent path traversal
  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "docs",
    `${slug}.mdx`,
  );

  let content: string;
  try {
    content = await fs.readFile(filePath, "utf-8");
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      notFound();
    }
    throw error;
  }

  const { frontmatter } = await compileMDX<Frontmatter>({
    source: content,
    options: {
      parseFrontmatter: true,
    },
  });

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    keywords: frontmatter.keywords ?? [],
    creator: "Md Afsar Mahmud",
    applicationName: "Nur UI",
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      url: `https://nurui.vercel.app/docs/${slug}`,
      siteName: "Nur UI",
      locale: "en_US",
      type: "article",
      images: [
        {
          url: "https://nurui.vercel.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "NUR-UI OG Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: frontmatter.title,
      description: frontmatter.description,
      images: [{ url: "https://nurui.vercel.app/og-image.png" }],
      creator: "@md_afsar_mahmud",
    },
  };
}

export async function generateStaticParams() {
  const files = await fs.readdir(
    path.join(process.cwd(), "src", "content", "docs"),
  );

  const paths = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));

  return paths;
}

const Page = async ({ params }: AsyncParams) => {
  const { slug } = await params;

  // Whitelist validation: only allow alphanumeric, hyphens, and underscores to prevent path traversal
  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
    notFound();
  }

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    "docs",
    `${slug}.mdx`,
  );
  let rawMDX: string;
  try {
    rawMDX = await fs.readFile(filePath, "utf-8");
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === "ENOENT"
    ) {
      notFound();
    }
    throw error;
  }
  const { content } = await compileMDX<Frontmatter>({
    source: rawMDX,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: getMDXComponents({}),
  });

  return (
    <>
      <CopyPage text={rawMDX} slug={slug} />
      {content}
    </>
  );
};

export default Page;