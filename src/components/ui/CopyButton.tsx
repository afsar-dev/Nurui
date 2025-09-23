"use client";
import { useState, useEffect, useRef } from "react";
import { Copy, Github, ExternalLink } from "lucide-react";
import { FaAngleDown } from "react-icons/fa";
import { SiClaude } from "react-icons/si";
import ChatgptIcon from "../icons/ChatgptIcon";
import SciraAiIcon from "../icons/SciraAiIcon";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

interface CopyWithMenuProps {
  text: string;
  slug: string;
}
type AIProvider = "chatgpt" | "scira" | "claude" | "t3";

export default function CopyPage({ text, slug }: CopyWithMenuProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // ref for menu

  const githubBase =
    "https://github.com/afsar-dev/Nurui/blob/main/src/content/docs";

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


  const handleAI = (provider: AIProvider, slug: string) => {
    const mdxUrl = `https://raw.githubusercontent.com/afsar-dev/Nurui/refs/heads/main/src/content/docs/${slug}.mdx`; // full public URL
    const prompt = `Read ${mdxUrl}, I want to ask questions about it.`;
    const encoded = encodeURIComponent(prompt);


    let baseUrl = "";

    switch (provider) {
      case "chatgpt":
        baseUrl = "https://chat.openai.com/?prompt=";
        break;
      case "scira":
        baseUrl = "https://scira.ai/?q=";
        break;
      case "claude":
        baseUrl = "https://claude.ai/new?q=";
        break;
      case "t3":
        baseUrl = "https://t3.chat/new?q=";
        break;
    }

    window.open(`${baseUrl}${encoded}`, "_blank");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="flex items-center gap-2 relative mb-4" ref={menuRef}>
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 rounded-lg px-3 py-1.5 bg-gray-200 text-black hover:bg-gray-300 transition dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
      >
        <Copy size={16} />
        {copied ? "Copied!" : "Copy Markdown"}
      </button>

      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg flex items-center gap-1 px-3 py-1.5 bg-gray-200 text-black hover:bg-gray-300 transition dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
      >
        Open <FaAngleDown size={16} />
      </button>

      {open && (
        <div className="absolute top-12 left-0 w-56 bg-gray-100 border text-black border-gray-700 rounded-xl shadow-lg p-2 space-y-1 z-50 dark:bg-gray-900 dark:text-white">
          <button
            onClick={handleGitHub}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-200 transition dark:hover:bg-gray-800"
          >
            <span className="flex items-center gap-2">
              <Github size={16} /> Open in GitHub
            </span>
            <ExternalLink size={14} />
          </button>
          <button
            onClick={() => handleAI("chatgpt", slug)}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-200 transition dark:hover:bg-gray-800"
          >
            <span className="flex items-center gap-2">
              <ChatgptIcon className="size-4" /> Open in ChatGPT
            </span>
            <ExternalLink size={14} />
          </button>
          <button
            onClick={() => handleAI("scira", slug)}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-200 transition dark:hover:bg-gray-800"
          >
            <span className="flex items-center gap-2">
              <SciraAiIcon className="size-4" /> Open in Scira AI
            </span>
            <ExternalLink size={14} />
          </button>
          <button
            onClick={() => handleAI("claude", slug)}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-200 transition dark:hover:bg-gray-800"
          >
            <span className="flex items-center gap-2">
              <SiClaude size={16} /> Open in Claude AI
            </span>
            <ExternalLink size={14} />
          </button>
          <button
            onClick={() => handleAI("t3", slug)}
            className="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-200 transition dark:hover:bg-gray-800"
          >
            <span className="flex items-center gap-2">
              <IoChatbubbleEllipsesOutline size={16} /> Open in T3 Chat
            </span>
            <ExternalLink size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
