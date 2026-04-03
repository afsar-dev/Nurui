"use client";

import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";
import { BiLogoTypescript } from "react-icons/bi";
import { FaJsSquare } from "react-icons/fa";

export type PlaygroundLanguageMode = "ts" | "js";

interface LanguageSwitcherProps {
  value: PlaygroundLanguageMode;
  onChange: (mode: PlaygroundLanguageMode) => void;
}

const options: {
  mode: PlaygroundLanguageMode;
  label: string;
  icon: ReactNode;
}[] = [
  {
    mode: "js",
    label: "JavaScript (.jsx)",
    icon: <FaJsSquare className="text-[#EFD81D] text-lg" />,
  },
  {
    mode: "ts",
    label: "TypeScript (.tsx)",
    icon: <BiLogoTypescript className="text-[#377CC8] text-lg" />,
  },
];

export const LanguageSwitcher = ({ value, onChange }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find((option) => option.mode === value) || options[1];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 rounded-md p-1 dark:text-[var(--white-color)] hover:bg-[var(--primary-color-3)]"
        title="Select language view"
      >
        <span>{selected.icon}</span>
        <ChevronDown className={`h-3 w-3 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-50 mt-2 w-40 rounded-lg border border-[var(--border-color)] dark:border-[var(--primary-color-2)] bg-[var(--white-color)] dark:bg-[var(--background-color)] p-1 space-y-1">
          {options.map((option) => (
            <button
              key={option.mode}
              onClick={() => {
                onChange(option.mode);
                setIsOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-md p-2 text-sm text-left transition-colors ${
                option.mode === value
                  ? "bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] text-[var(--white-color)] font-semibold"
                  : "text-[var(--black-color)] dark:text-[var(--white-color)] hover:bg-[var(--primary-color-4)]"
              }`}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
