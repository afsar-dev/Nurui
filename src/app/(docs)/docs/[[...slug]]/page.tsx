import { compileMDX } from "next-mdx-remote/rsc";
import { promises as fs, existsSync } from "fs";
import path from "path";
import remarkGfm from "remark-gfm";
import CopyPage from "@/components/ui/CopyButton";
import { getMDXComponents } from "../../../../../mdx-components";

const Page = async ({ params }: { params: { slug?: string[] } }) => {
  const slugParts = params.slug || [];
  let slugStr = slugParts.join("/"); // join array to string

  // Detect if raw MDX URL
  const isRaw = slugStr.endsWith(".mdx");
  if (isRaw) {
    slugStr = slugStr.replace(/\.mdx$/, "");
  }

  const filePath = path.join(process.cwd(), "src/content/docs", slugStr + ".mdx");

  if (!existsSync(filePath)) {
    return <div className="p-4 text-red-600">File not found: {filePath}</div>;
  }

  const rawMDX = await fs.readFile(filePath, "utf-8");

  if (isRaw) {
    return (
      <div className="prose mx-auto p-4">
        <h1 className="text-xl font-bold mb-2">Raw MDX: /docs/{slugStr}.mdx</h1>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
          {rawMDX}
        </pre>
      </div>
    );
  }

  const { content } = await compileMDX({
    source: rawMDX,
    options: {
      parseFrontmatter: true,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
    components: getMDXComponents({}),
  });

  return (
    <div className="prose mx-auto p-4">
      <CopyPage text={rawMDX} slug={slugStr} />
      {content}
    </div>
  );
};


export default Page;
