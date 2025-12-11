"use client";

import { navigation } from "@/registry/component-navigation";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiCommand, FiSearch } from "react-icons/fi";

// =============================================================================
// Type Definitions
// =============================================================================
interface FlattenedItem {
  title: string;
  href: string;
  category: string;
}

interface NavigationItem {
  title: string;
  href?: string;
  submenu?: { name: string; href: string }[];
}

// =============================================================================
// Utility: Flatten Navigation Data
// =============================================================================
function flattenNavigation(nav: NavigationItem[]): FlattenedItem[] {
  const result: FlattenedItem[] = [];

  for (const item of nav) {
    // Direct link items (no submenu)
    if (item.href && !item.submenu) {
      result.push({
        title: item.title,
        href: item.href,
        category: "General",
      });
    }

    // Items with submenu
    if (item.submenu) {
      for (const sub of item.submenu) {
        result.push({
          title: sub.name,
          href: sub.href,
          category: item.title,
        });
      }
    }
  }

  return result;
}

// =============================================================================
// Component: DashboardSearch
// =============================================================================
const DashboardSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Ensure we only render portal on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Flatten navigation data once
  const flattenedItems = useMemo(
    () => flattenNavigation(navigation as NavigationItem[]),
    []
  );

  // Filter items based on query
  const filteredItems = useMemo(() => {
    if (!query.trim()) return flattenedItems;

    const lowerQuery = query.toLowerCase();
    return flattenedItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
    );
  }, [query, flattenedItems]);

  // Reset selected index when filtered items change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle navigation
  const handleNavigate = useCallback(
    (href: string) => {
      router.push(href);
      setIsOpen(false);
      setQuery("");
    },
    [router]
  );

  // Keyboard shortcuts: Cmd/Ctrl + K to toggle modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Keyboard navigation within modal
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        handleNavigate(filteredItems[selectedIndex].href);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredItems, selectedIndex, handleNavigate]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Trigger Button - Nur/UI Theme */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative w-full h-10 px-3 flex items-center gap-2 
          bg-[var(--glass-color)] dark:bg-white/5
          border border-[var(--border-color)] dark:border-white/15
          hover:bg-white/10 hover:border-[var(--primary-color)] dark:hover:border-white/25
          focus:border-[var(--primary-color)] dark:focus:border-white/30
          rounded-xl transition-all cursor-text text-sm 
          text-[var(--black-color)] dark:text-white/60
          focus:outline-none focus:ring-2 focus:ring-white/20"
      >
        <FiSearch className="w-4 h-4 text-[var(--black-color)]/50 dark:text-white/40" />
        <span className="flex-1 text-left text-[var(--black-color)]/50 dark:text-white/40">
          Search...
        </span>
        <kbd
          className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 
          bg-[var(--glass-color)] dark:bg-white/10
          border border-[var(--border-color)] dark:border-white/15
          rounded-md text-xs font-medium text-[var(--black-color)]/60 dark:text-white/50"
        >
          <FiCommand className="w-3 h-3" />
          <span>K</span>
        </kbd>
      </button>

      {/* Command Palette Modal - Rendered via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Backdrop with Flex Centering */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery("");
                  }}
                  className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center"
                >
                  {/* Modal Content - Nur/UI Theme */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-[calc(100%-2rem)] max-w-lg 
                      bg-[var(--background-color)]
                      border border-[var(--primary-color)] dark:border-white/10
                      rounded-xl shadow-2xl shadow-black/20 overflow-hidden"
                  >
                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-color)] dark:border-white/10">
                      <FiSearch className="w-5 h-5 text-[var(--primary-color)] flex-shrink-0" />
                      <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search components..."
                        className="flex-1 bg-transparent text-[var(--black-color)] dark:text-white 
                          placeholder:text-[var(--black-color)]/40 dark:placeholder:text-white/40 
                          focus:outline-none text-sm"
                      />
                      <kbd
                        className="hidden sm:inline-flex px-1.5 py-0.5 
                        bg-[var(--glass-color)] dark:bg-white/10
                        border border-[var(--border-color)] dark:border-white/15
                        rounded text-xs text-[var(--black-color)]/60 dark:text-white/50"
                      >
                        ESC
                      </kbd>
                    </div>

                    {/* Results List */}
                    <div className="max-h-80 overflow-y-auto py-2">
                      {filteredItems.length === 0 ? (
                        <div className="px-4 py-8 text-center text-[var(--black-color)]/50 dark:text-white/50 text-sm">
                          No results found for &ldquo;{query}&rdquo;
                        </div>
                      ) : (
                        <div className="space-y-1 px-2">
                          {filteredItems.map((item, index) => (
                            <button
                              key={`${item.href}-${index}`}
                              onClick={() => handleNavigate(item.href)}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg 
                                text-left transition-all cursor-pointer
                                ${
                                  selectedIndex === index
                                    ? "bg-[var(--primary-color)]/10 dark:bg-white/10 border border-[var(--primary-color)]/30 dark:border-white/20"
                                    : "border border-transparent hover:bg-[var(--glass-color)] dark:hover:bg-white/5"
                                }`}
                            >
                              <div
                                className="w-8 h-8 flex items-center justify-center rounded-lg 
                                bg-[var(--glass-color)] dark:bg-white/10 flex-shrink-0"
                              >
                                <FiSearch className="w-4 h-4 text-[var(--primary-color)]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-[var(--black-color)] dark:text-white truncate capitalize">
                                  {item.title}
                                </p>
                                <p className="text-xs text-[var(--black-color)]/50 dark:text-white/50 truncate">
                                  {item.category}
                                </p>
                              </div>
                              {selectedIndex === index && (
                                <kbd
                                  className="hidden sm:inline-flex px-1.5 py-0.5 
                                  bg-[var(--primary-color)]/20 dark:bg-white/15
                                  rounded text-xs text-[var(--primary-color)] dark:text-white/70"
                                >
                                  Enter
                                </kbd>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div
                      className="flex items-center justify-between gap-4 px-4 py-2.5 
                      border-t border-[var(--border-color)] dark:border-white/10
                      bg-[var(--glass-color)] dark:bg-white/5 text-xs text-[var(--black-color)]/60 dark:text-white/50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <kbd className="px-1.5 py-0.5 bg-[var(--glass-color)] dark:bg-white/10 border border-[var(--border-color)] dark:border-white/15 rounded text-[10px]">
                            ↑
                          </kbd>
                          <kbd className="px-1.5 py-0.5 bg-[var(--glass-color)] dark:bg-white/10 border border-[var(--border-color)] dark:border-white/15 rounded text-[10px]">
                            ↓
                          </kbd>
                          <span className="ml-1">Navigate</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <kbd className="px-1.5 py-0.5 bg-[var(--glass-color)] dark:bg-white/10 border border-[var(--border-color)] dark:border-white/15 rounded text-[10px]">
                            ↵
                          </kbd>
                          <span className="ml-1">Open</span>
                        </span>
                      </div>
                      <span className="text-[var(--primary-color)]">
                        {filteredItems.length} result
                        {filteredItems.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default DashboardSearch;
