import { STORAGE_KEY } from "../constants";
import { PlaygroundState, StorageAdapter } from "../types";

export const localStorageAdapter: StorageAdapter = {
  async save(state: PlaygroundState): Promise<void> {
    try {
      const serialized = JSON.stringify(state);
      localStorage.setItem(STORAGE_KEY, serialized);
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
      throw new Error("Storage save failed");
    }
  },

  async load(): Promise<PlaygroundState | null> {
    try {
      const serialized = localStorage.getItem(STORAGE_KEY);
      return serialized ? JSON.parse(serialized) : null;
    } catch (error) {
      console.error("Failed to load from localStorage:", error);
      return null;
    }
  },

  async generateShareUrl(state: PlaygroundState): Promise<string> {
    const compressed = btoa(JSON.stringify(state));
    const url = new URL(window.location.href);
    url.searchParams.set("code", compressed);
    return url.toString();
  },
};
