"use client";
import { Spinner } from "@/components/nurui/spinner";
import { codeSnippetsMap } from "@/registry/code-snippets";
import { Index } from "@/registry/components-registry";
import { convertTsxToJsx } from "@/utils/convertTsxToJsx";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BiLogoTypescript } from "react-icons/bi";
import { FaJsSquare } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import { RxCopy } from "react-icons/rx";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  atomDark,
  oneLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";

type CodeBlockProps = {
  language?: string;
  code?: string;
  componentName?: keyof typeof Index;
  fileName?: string;
  isLanguage?: boolean;
  snippetKey?: string;
};

export const CodeBlock = ({
  language = "tsx",
  code = "",
  componentName,
  fileName,
  isLanguage = true,
  snippetKey,
}: CodeBlockProps) => {
  const { theme } = useTheme();

  // Resolve snippet from map if key provided
  const snippet = snippetKey ? codeSnippetsMap[snippetKey] : undefined;
  const resolvedCode = snippet?.code ?? code;
  const resolvedLang = snippet?.language ?? language;
  const resolvedIsLang =
    snippet !== undefined ? (snippet.isLanguage ?? true) : isLanguage;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("TypeScript (.tsx)");
  const [sourceCode, setSourceCode] = useState(resolvedCode);
  const [originalTsSource, setOriginalTsSource] = useState(resolvedCode);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(
    // only show spinner when we need to fetch from registry
    !resolvedCode && !!(componentName && fileName),
  );

  const selectedLang = languages.find((l) => l.name === selectedLanguage);

  useEffect(() => {
    // If code came from snippetKey or direct prop, nothing to fetch
    if (resolvedCode) {
      setSourceCode(resolvedCode);
      setOriginalTsSource(resolvedCode);
      setLoading(false);
      return;
    }

    // Fetch from registry
    const loadCode = async () => {
      if (componentName && fileName) {
        setLoading(true);
        try {
          const matched = Index[componentName]?.othersCode?.find(
            (o) => o.fileName === fileName,
          );
          const loader = matched?.code || Index[componentName]?.code;
          if (loader) {
            const result = await loader();
            setSourceCode(result.default);
            setOriginalTsSource(result.default);
          }
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadCode();
  }, [resolvedCode, componentName, fileName]);

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

    if (languageName === "JavaScript (.jsx)" && originalTsSource) {
      setSourceCode(await convertTsxToJsx(originalTsSource));
    } else {
      setSourceCode(originalTsSource);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 border border-[var(--primary-color)] dark:border-[var(--primary-color-3)] rounded-2xl bg-white dark:bg-[var(--primary-color-5)]">
        <Spinner className="text-[var(--primary-color)] size-6" />
      </div>
    );
  }

  return (
    <div className="border border-[var(--primary-color)] dark:border-[var(--primary-color-3)] rounded-2xl max-h-[30rem] overflow-auto w-full text-sm">
      <div className="flex items-center justify-end gap-3 p-3 bg-white dark:bg-[var(--primary-color-5)]">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-1 text-sm text-black dark:text-zinc-400 hover:dark:text-zinc-200 transition-colors"
        >
          {copied ? <FaCheck /> : <RxCopy />}
        </button>

        {resolvedIsLang && (
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

            {isOpen && (
              <div className="absolute z-50 right-0 mt-3.5 border border-[var(--primary-color)] dark:border-[var(--primary-color-3)] rounded-lg min-w-40 bg-white dark:bg-[var(--primary-color-5)] p-1">
                {languages.map((lang, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(lang.name)}
                    className="w-full flex items-center gap-1 p-2 z-50 hover:dark:bg-[var(--primary-color-4)] rounded-lg"
                  >
                    <span>{lang.icon}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}

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
        language={resolvedLang}
        style={theme === "light" ? oneLight : atomDark}
        wrapLines
        PreTag="div"
        showLineNumbers
        customStyle={{ margin: 0, padding: 16, background: "transparent" }}
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
