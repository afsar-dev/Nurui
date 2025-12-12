import { navigation } from "@/registry/component-navigation";
import {
  flattenNavigation,
  FlattenedItem,
  NavigationItem,
} from "@/utils/search-utils";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseComponentSearchReturn {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredResults: FlattenedItem[];
  toggleOpen: () => void;
  closeModal: () => void;
}

export function useComponentSearch(): UseComponentSearchReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const flattenedItems = useMemo(
    () => flattenNavigation(navigation as NavigationItem[]),
    []
  );

  const filteredResults = useMemo(() => {
    if (!query.trim()) return flattenedItems;

    const lowerQuery = query.toLowerCase();
    return flattenedItems.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.category.toLowerCase().includes(lowerQuery)
    );
  }, [query, flattenedItems]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleOpen();
      }

      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggleOpen, closeModal]);

  return {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    filteredResults,
    toggleOpen,
    closeModal,
  };
}
