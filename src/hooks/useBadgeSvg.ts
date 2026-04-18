import { useEffect, useState } from "react";

interface UseBadgeSvgReturn {
  svg: string | null;
  isLoading: boolean;
}

export function useBadgeSvg(src: string): UseBadgeSvgReturn {
  const [svg, setSvg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error("Failed to fetch badge SVG");
        const text = await res.text();
        if (!cancelled) setSvg(text);
      } catch {
        if (!cancelled) setSvg(null);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [src]);

  return { svg, isLoading };
}
