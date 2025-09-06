"use client";
import { useState } from "react";
import { Copy, Github, ExternalLink, Bot } from "lucide-react";

interface CopyWithMenuProps {
  text: string;
  slug: string;
}

export default function CopyPage({ text, slug }: CopyWithMenuProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const githubBase = "https://github.com/afsar-dev/Nurui/blob/main/src/content/docs";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  }

  const handleGitHub = () => {
    window.open(`${githubBase}/${slug}.mdx`, "_blank");
  };

  const handleChatGPT = () => {
    const mdxUrl = `https://nurui.vercel.app/docs/${slug}`; // full public URL
    const prompt = `I want to ask you some questions about that page:\n\n${mdxUrl}`;
    const encoded = encodeURIComponent(prompt);
    window.open(`https://chat.openai.com/?prompt=${encoded}`, "_blank");
  };

  return (
    <div className="flex items-center gap-2 relative mb-2">
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 rounded-lg px-3 py-1.5 bg-gray-900 text-white hover:bg-gray-800 transition"
      >
        <Copy size={16} />
        {copied ? "Copied!" : "Copy Markdown"}
      </button>

      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg px-3 py-1.5 bg-gray-900 text-white hover:bg-gray-800 transition"
      >
        Open ▾
      </button>

      {open && (
        <div className="absolute top-12 left-0 w-56 bg-gray-900 border border-gray-700 rounded-xl shadow-lg p-2 space-y-1 z-50">
          <button
            onClick={handleGitHub}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <span className="flex items-center gap-2"><Github size={16} /> Open in GitHub</span>
            <ExternalLink size={14} />
          </button>
          <button
            onClick={handleChatGPT}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <span className="flex items-center gap-2"><Bot size={16} /> Open in ChatGPT</span>
            <ExternalLink size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
