import { PlaygroundState } from "../types";

export const loadFromUrl = (): PlaygroundState | null => {
  try {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return null;

    const decoded = atob(code);
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Failed to load from URL:", error);
    return null;
  }
};

export const copyShareUrl = async (state: PlaygroundState): Promise<void> => {
  const compressed = btoa(JSON.stringify(state));
  const url = new URL(window.location.origin + window.location.pathname);
  url.searchParams.set("code", compressed);

  await navigator.clipboard.writeText(url.toString());
};
