// src/features/playground/import/ComponentImportModal.tsx
"use client";

import { ComponentName, Index } from "@/registry/components-registry";
import { Search, X } from "lucide-react";
import { useState } from "react";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[80vh] rounded-lg bg-neutral-900 shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-neutral-800 p-4">
          <h2 className="text-lg font-semibold text-white">Import Component</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-neutral-800">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
              size={18}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search components..."
              className="w-full rounded-lg bg-neutral-800 py-2 pl-10 pr-4 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          </div>
          <div className="mt-2 text-sm text-neutral-400">
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
                className="group rounded-lg bg-neutral-800 p-4 text-left transition-all hover:bg-neutral-700 hover:ring-2 hover:ring-blue-500"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white mb-1">
                      {formatName(name)}
                    </div>
                    <div className="text-xs text-neutral-400">
                      {getCategoryFromName(name)}
                    </div>
                  </div>
                  <div className="ml-2 rounded bg-blue-500/10 px-2 py-1 text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Import
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-neutral-400">
              No components found matching {search}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
