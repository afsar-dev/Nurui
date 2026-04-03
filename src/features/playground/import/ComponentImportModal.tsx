// src/features/playground/import/ComponentImportModal.tsx
"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ComponentName, Index } from "@/registry/components-registry";
import { Mic, Search, X } from "lucide-react";
import { useState } from "react";
import { TbPhotoSearch } from "react-icons/tb";

interface ComponentImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (componentName: ComponentName) => void;
}

export const ComponentImportModal = ({
  isOpen,
  onClose,
  onImport,
}: ComponentImportModalProps) => {
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const components = Object.keys(Index) as ComponentName[];
  const filtered = components.filter((name) =>
    name.toLowerCase().includes(search.toLowerCase()),
  );

  const formatName = (name: string) => {
    return name
      .replace(/([A-Z])/g, " $1")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getCategoryFromName = (name: string): string => {
    if (name.includes("Button")) return "Button";
    if (name.includes("Card")) return "Card";
    if (name.includes("Hero")) return "Hero";
    if (name.includes("Form")) return "Form";
    if (name.includes("Cursor")) return "Cursor";
    if (name.includes("Background")) return "Background";
    if (name.includes("Loader")) return "Loader";
    if (name.includes("Navbar")) return "Navigation";
    if (name.includes("Footer")) return "Footer";
    if (name.includes("Faq")) return "FAQ";
    if (name.includes("Testimonial")) return "Testimonial";
    if (name.includes("Pricing")) return "Pricing";
    return "Component";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[80vh] overflow-hidden rounded-lg border border-[var(--border-color)] dark:border-[var(--primary-color-2)] bg-[var(--background-color)] dark:bg-[var(--primary-color-4)] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[var(--border-color)] dark:border-[var(--primary-color-2)] p-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary-color)]">
            Import Component
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-[var(--opacity-text-color)] transition-colors hover:bg-[var(--primary-color-3)] hover:text-[var(--primary-color)]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="border-b border-[var(--border-color)] dark:border-[var(--primary-color-2)] p-4">
          <div className="flex h-11 items-center overflow-hidden rounded-lg border border-[var(--border-color)] dark:border-[var(--primary-color-2)] bg-[var(--glass-color)]">
            <div className="flex h-full w-12 items-center justify-center bg-[var(--primary-color)] text-[var(--white-color)]">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components..."
              className="h-full flex-1 bg-transparent px-4 text-[var(--text-primary-color)] placeholder:uppercase placeholder:tracking-[0.18em] placeholder:text-[var(--opacity-text-color)] focus:outline-none"
              autoFocus
            />
            <div className="mr-2 flex items-center gap-2 text-[var(--opacity-text-color)]">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label="Image search"
                    className="rounded p-1 transition-colors hover:bg-[var(--primary-color-3)] hover:text-[var(--primary-color)]"
                  >
                    <TbPhotoSearch size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="rounded bg-[var(--primary-color)] px-3 py-1.5 text-sm font-semibold text-[var(--white-color)]"
                  tollTipArrowClassName="bg-[var(--primary-color)] fill-transparent"
                >
                  Search by image
                </TooltipContent>
              </Tooltip>
              <span className="h-5 w-px bg-[var(--primary-color-2)]" />
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    aria-label="Voice search"
                    className="rounded p-1 transition-colors hover:bg-[var(--primary-color-3)] hover:text-[var(--primary-color)]"
                  >
                    <Mic size={20} />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="rounded bg-[var(--primary-color)] px-3 py-1.5 text-sm font-semibold text-[var(--white-color)]"
                  tollTipArrowClassName="bg-[var(--primary-color)] fill-transparent"
                >
                  Search by voice
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          <div className="mt-2 text-sm text-[var(--opacity-text-color)]">
            {filtered.length} component{filtered.length !== 1 ? "s" : ""} found
          </div>
        </div>

        <div
          className="overflow-y-auto p-4"
          style={{ maxHeight: "calc(80vh - 160px)" }}
        >
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((name) => (
              <button
                key={name}
                onClick={() => {
                  onImport(name);
                  onClose();
                }}
                className="group rounded-lg border border-transparent bg-[var(--primary-color-3)] p-4 text-left transition-all hover:border-[var(--primary-color)] hover:bg-[var(--primary-color-2)]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-1 text-sm font-bold text-[var(--text-primary-color)]">
                      {formatName(name)}
                    </div>
                    <div className="text-xs text-[var(--opacity-text-color)]">
                      {getCategoryFromName(name)}
                    </div>
                  </div>
                  <div className="ml-2 rounded border font-semibold border-[var(--primary-color-2)] bg-[var(--primary-color-3)] px-2 py-1 text-sm text-[var(--primary-color)] opacity-0 transition-opacity group-hover:opacity-100">
                    Import
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="py-12 text-center text-[var(--opacity-text-color)]">
              No components found matching {search}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
