"use client";

import RoundedButton from "@/components/common/RoundedButton";
import NuruiLogo from "@/components/nurui/nurui-logo";
import { useComponentSearch } from "@/hooks/useComponentSearch";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ComponentSearchbar = () => {
  const { isOpen, query, setQuery, filteredResults, toggleOpen, closeModal } =
    useComponentSearch();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  useEffect(() => setSelectedIndex(0), [filteredResults]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const activeItem = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ block: "nearest", behavior: "auto" });
      }
    }
  }, [selectedIndex]);

  const handleNavigate = useCallback(
    (href: string) => {
      router.push(href);
      closeModal();
    },
    [router, closeModal],
  );

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredResults.length - 1 ? prev + 1 : 0,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredResults.length - 1,
        );
      } else if (e.key === "Enter" && filteredResults[selectedIndex]) {
        e.preventDefault();
        handleNavigate(filteredResults[selectedIndex].href);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex, handleNavigate]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <RoundedButton
        onClick={toggleOpen}
        parentClassName="block md:hidden"
        icon={
          <Search className="text-xl lg:text-2xl text-[var(--white-color)] dark:text-[var(--primary-color)]" />
        }
      />
      <div className="hidden md:block w-64">
        <button
          onClick={toggleOpen}
          className="relative w-full h-10 pr-3 flex items-center gap-2 
            bg-transparent
          border border-[var(--primary-color-2)] dark:border-[var(--primary-color-2)]
            hover:bg-[var(--primary-color-4)] hover:border-[var(--primary-color)] dark:hover:border-[var(--primary-color)]
  
            focus:border-[var(--primary-color)] dark:focus:border-[var(--primary-color)]
             transition-all cursor-text text-sm 
            text-[var(--black-color)] dark:text-[var(--placeholder-color)]
            focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] overflow-hidden rounded-lg"
        >
          <div className="flex h-full w-8 items-center justify-center bg-[var(--primary-color)] text-[var(--white-color)]">
            <Search size={16} />
          </div>
          <span className="flex-1 text-left text-[var(--black-color)]/50 dark:text-white/40">
            Search...
          </span>
          <kbd className="hidden sm:flex items-center gap-1 text-xs font-semibold text-[var(--white-color)] dark:text-[var(--primary-color)]">
            <span className="bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] border border-[var(--primary-color-2)] rounded-md px-2 py-0.5">
              Ctrl
            </span>
            <span className="text-[var(--primary-color)]">+</span>
            <span className="bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] border border-[var(--primary-color-2)] rounded-md px-2 py-0.5">
              K
            </span>
          </kbd>
        </button>

        {mounted &&
          createPortal(
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={closeModal}
                  className="fixed inset-0 z-[9999] bg-black/45 backdrop-blur-sm flex items-center justify-center"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-[calc(100%-2rem)] max-w-lg rounded-lg border border-[var(--primary-color-2)] dark:border-[var(--primary-color-2)] bg-[var(--background-color)] dark:bg-[var(--glass-color)] backdrop-blur-sm shadow-xl overflow-hidden"
                  >
                    <div className="flex items-center gap-3 pr-3 border-b border-[var(--border-color)] dark:border-[var(--primary-color-2)]">
                      {/* <FiSearch className="w-5 h-5 text-[var(--primary-color)] flex-shrink-0" /> */}
                      <div className="flex w-10 h-10 items-center justify-center bg-[var(--primary-color)] text-[var(--white-color)]">
                        <Search size={18} />
                      </div>
                      <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search components..."
                        className="flex-1 bg-transparent text-[var(--black-color)] dark:text-white placeholder:text-[var(--black-color)]/40 dark:placeholder:text-white/40 focus:outline-none text-sm"
                      />
                      <kbd className="hidden sm:flex px-1.5 pb-0.5 pt-1 bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] border border-[var(--primary-color-2)] font-semibold rounded text-xs text-[var(--white-color)] dark:text-[var(--primary-color)]">
                        ESC
                      </kbd>
                    </div>

                    <div className="max-h-80 overflow-y-auto py-2">
                      {filteredResults.length === 0 ? (
                        <div className="px-4 py-8 text-center text-[var(--black-color)]/50 dark:text-white/50 text-sm">
                          No results found for &ldquo;{query}&rdquo;
                        </div>
                      ) : (
                        <div ref={listRef} className="space-y-1 px-2">
                          {filteredResults.map((item, index) => (
                            <button
                              key={`${item.href}-${index}`}
                              onClick={() => handleNavigate(item.href)}
                              onMouseEnter={() => setSelectedIndex(index)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all cursor-pointer ${
                                selectedIndex === index
                                  ? "bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] border border-[var(--primary-color)] dark:border-[var(--primary-color-2)]"
                                  : "border border-transparent hover:bg-[var(--glass-color)] dark:hover:bg-[var(--primary-color-2)]"
                              }`}
                            >
                              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--background-color)] dark:bg-[var(--primary-color-3)] flex-shrink-0">
                                <NuruiLogo className="-mr-0.5 -mt-0" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[var(--black-color)] dark:text-white truncate capitalize">
                                  {item.title}
                                </p>
                                <p className="text-xs text-[var(--black-color)]/50 dark:text-white/50 truncate">
                                  {item.category}
                                </p>
                              </div>
                              {selectedIndex === index && (
                                <kbd className="hidden sm:inline-flex px-1.5 py-0.5 bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] border border-[var(--primary-color-2)] rounded font-semibold text-xs text-[var(--white-color)] dark:text-[var(--primary-color)]">
                                  Enter
                                </kbd>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-t border-[var(--primary-color-2)] bg-transparent text-xs text-[var(--white-color)] dark:text-[var(--primary-color)]">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <kbd className="px-1.5 py-0.5 bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] border border-[var(--primary-color-2)] rounded text-[10px]">
                            ↑
                          </kbd>
                          <kbd className="px-1.5 py-0.5 bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] border border-[var(--primary-color-2)] rounded text-[10px]">
                            ↓
                          </kbd>
                          <span className="ml-1 text-[var(--primary-color)] font-semibold">
                            Navigate
                          </span>
                        </span>
                        <span className="flex items-center gap-1">
                          <kbd className="px-1.5 py-0.5 bg-[var(--primary-color)] dark:bg-[var(--primary-color-3)] border border-[var(--primary-color-2)] rounded text-[10px]">
                            ↵
                          </kbd>
                          <span className="ml-1">Open</span>
                        </span>
                      </div>
                      <span className="text-[var(--primary-color)] font-semibold text-base capitalize">
                        {filteredResults.length} components
                        {filteredResults.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body,
          )}
      </div>
    </>
  );
};

export default ComponentSearchbar;
