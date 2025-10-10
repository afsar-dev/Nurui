"use client";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { oneLight } from "react-syntax-highlighter/dist/cjs/styles/prism"; // light theme
import { RxCopy } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";
import { FaJsSquare } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { Index } from "@/registry/components-registry";
import { convertTsxToJsx } from "@/utils/convertTsxToJsx";
import { useTheme } from "next-themes";

type CodeBlockProps = {
  language?: string;
  code?: string;
  componentName?: keyof typeof Index;
  fileName?: string;
  isLanguage?: boolean;
};

export const CodeBlock = ({
  language = "tsx",
  code = "",
  componentName,
  fileName,
  isLanguage = true,
}: CodeBlockProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("TypeScript (.tsx)");
  const [sourceCode, setSourceCode] = useState(code || "");
  const [copied, setCopied] = React.useState(false);
  const selectedLang = languages.find((lang) => lang.name === selectedLanguage);
  const { theme } = useTheme();

  useEffect(() => {
    const loadCode = async () => {
      if (!code && componentName && fileName) {
        const matched = Index[componentName]?.othersCode?.find(
          (otherCode) => otherCode.fileName === fileName,
        );
        const loader = matched?.code || Index[componentName]?.code;
        if (loader) {
          const result = await loader();
          setSourceCode(result.default);
        }
      }
    };

    loadCode();
  }, [code, componentName, fileName]);

  const copyToClipboard = async () => {
    if (sourceCode) {
      await navigator.clipboard.writeText(sourceCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSelect = async (languageName: string) => {
    setSelectedLanguage(languageName);
    setIsOpen(false);

    if (languageName === "JavaScript (.jsx)" && sourceCode) {
      const jsxCode = await convertTsxToJsx(sourceCode);
      setSourceCode(jsxCode);
    } else {
      // Reload original TS code
      if (code) {
        setSourceCode(code);
      } else if (componentName && fileName) {
        const matched = Index[componentName]?.othersCode?.find(
          (otherCode) => otherCode.fileName === fileName,
        );
        const loader = matched?.code || Index[componentName]?.code;
        if (loader) {
          const result = await loader();
          setSourceCode(result.default);
        }
      }
    }
  };

  return (
    <div className="border border-[var(--primary-color)] dark:border-[var(--primary-color-3)] rounded-2xl max-h-[30rem] overflow-auto w-full text-sm">
      <div className="flex items-center justify-end gap-3 p-3 bg-white dark:bg-[var(--primary-color-5)]">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-sm text-black dark:text-zinc-400 hover:dark:text-zinc-200 transition-colors"
        >
          {copied ? <FaCheck /> : <RxCopy />}
        </button>

        {isLanguage && (
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1"
            >
              <span>{selectedLang?.icon}</span>
              <ChevronDown
                className={`w-3 h-3 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute z-50 right-0 mt-3.5 border border-[var(--primary-color)] dark:border-[var(--primary-color-3)] rounded-lg min-w-40 bg-white dark:bg-[var(--primary-color-5)] p-1">
                {languages.map((language, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelect(language?.name)}
                    className="w-full flex items-center gap-1 p-2 z-50 hover:dark:bg-[var(--primary-color-4)] rounded-lg"
                  >
                    <span>{language.icon}</span>
                    <span>{language.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Backdrop to close dropdown when clicking outside */}
            {isOpen && (
              <div
                className="fixed inset-0 z-0"
                onClick={() => setIsOpen(false)}
              />
            )}
          </div>
        )}
      </div>

      <SyntaxHighlighter
        language={language}
        style={theme === "light" ? oneLight : atomDark}
        wrapLines
        PreTag="div"
        showLineNumbers={true}
        customStyle={{
          margin: 0,
          padding: 16,
          background: "transparent",
        }}
      >
        {sourceCode.trim() ||
          `Component ${componentName} not found in registry.`}
      </SyntaxHighlighter>
    </div>
  );
};

const languages = [
  {
    name: "JavaScript (.jsx)",
    icon: <FaJsSquare className="text-[#EFD81D] text-xl" />,
  },
  {
    name: "TypeScript (.tsx)",
    icon: <BiLogoTypescript className="text-[#377CC8] text-xl" />,
  },
];
