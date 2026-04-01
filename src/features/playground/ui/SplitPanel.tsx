"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { MAX_SPLIT_RATIO, MIN_SPLIT_RATIO } from "../constants";

interface SplitPanelProps {
  left: ReactNode;
  right: ReactNode;
  initialRatio?: number;
  onRatioChange?: (ratio: number) => void;
}

export const SplitPanel = ({
  left,
  right,
  initialRatio = 0.5,
  onRatioChange,
}: SplitPanelProps) => {
  const [ratio, setRatio] = useState(initialRatio);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const newRatio = (e.clientX - rect.left) / rect.width;
      const clampedRatio = Math.max(
        MIN_SPLIT_RATIO,
        Math.min(MAX_SPLIT_RATIO, newRatio),
      );

      setRatio(clampedRatio);
      onRatioChange?.(clampedRatio);
    };

    const handleUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleUp);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleUp);
    };
  }, [isDragging, onRatioChange]);

  return (
    <div ref={containerRef} className="flex h-full w-full">
      <div style={{ width: `${ratio * 100}%` }} className="overflow-hidden">
        {left}
      </div>

      <div
        onMouseDown={() => setIsDragging(true)}
        className="w-1 cursor-col-resize bg-neutral-800 hover:bg-blue-500 transition-colors"
      />

      <div
        style={{ width: `${(1 - ratio) * 100}%` }}
        className="overflow-hidden"
      >
        {right}
      </div>
    </div>
  );
};
