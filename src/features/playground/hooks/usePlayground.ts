// src/features/playground/hooks/usePlayground.ts
import { useCallback, useEffect, useState } from "react";
import { DEFAULT_FILES, DEFAULT_SPLIT_RATIO } from "../constants";
import { localStorageAdapter } from "../storage/local-storage";
import { loadFromUrl } from "../storage/url-storage";
import { PlaygroundFile, PlaygroundState } from "../types";

export const usePlayground = () => {
  const [state, setState] = useState<PlaygroundState>({
    files: DEFAULT_FILES,
    activeFileId: DEFAULT_FILES[0].id,
    splitRatio: DEFAULT_SPLIT_RATIO,
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Load initial state only once
  useEffect(() => {
    if (isInitialized) return;

    const loadInitialState = async () => {
      // First, try to load from URL
      const urlState = loadFromUrl();
      if (urlState) {
        setState(urlState);
        setIsInitialized(true);
        return;
      }

      // Then, try to load from localStorage
      const savedState = await localStorageAdapter.load();
      if (savedState) {
        setState(savedState);
      }

      setIsInitialized(true);
    };

    loadInitialState();
  }, [isInitialized]);

  // Save state changes to localStorage (but not on initial load)
  useEffect(() => {
    if (!isInitialized) return;

    const saveState = async () => {
      await localStorageAdapter.save(state);
    };

    // Debounce saves
    const timer = setTimeout(saveState, 1000);
    return () => clearTimeout(timer);
  }, [state, isInitialized]);

  const updateFile = useCallback((id: string, content: string) => {
    setState((prev) => ({
      ...prev,
      files: prev.files.map((f) => (f.id === id ? { ...f, content } : f)),
    }));
  }, []);

  const addFile = useCallback((file: PlaygroundFile) => {
    setState((prev) => ({
      ...prev,
      files: [...prev.files, file],
      activeFileId: file.id,
    }));
  }, []);

  const removeFile = useCallback((id: string) => {
    setState((prev) => {
      const newFiles = prev.files.filter((f) => f.id !== id);
      if (newFiles.length === 0) return prev; // Keep at least one file

      const newActiveId =
        prev.activeFileId === id ? newFiles[0]?.id || "" : prev.activeFileId;

      return { ...prev, files: newFiles, activeFileId: newActiveId };
    });
  }, []);

  const setActiveFile = useCallback((id: string) => {
    setState((prev) => {
      if (prev.activeFileId === id) return prev; // Avoid unnecessary updates
      return { ...prev, activeFileId: id };
    });
  }, []);

  const setSplitRatio = useCallback((ratio: number) => {
    setState((prev) => {
      if (prev.splitRatio === ratio) return prev;
      return { ...prev, splitRatio: ratio };
    });
  }, []);

  return {
    state,
    setState,
    updateFile,
    addFile,
    removeFile,
    setActiveFile,
    setSplitRatio,
  };
};
