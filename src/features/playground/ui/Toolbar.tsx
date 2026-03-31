"use client";
import { Download, Package, RefreshCw, Share2, Upload } from "lucide-react";

interface ToolbarProps {
  onImport: () => void;
  onShare: () => void;
  onReset: () => void;
  onExport: () => void;
  onLoadFromUrl: () => void;
}

export const Toolbar = ({
  onImport,
  onShare,
  onReset,
  onExport,
  onLoadFromUrl,
}: ToolbarProps) => {
  return (
    <div className="flex items-center justify-between border-b border-[var(--primary-color-2)] bg-[var(--primary-color-4)] px-3 py-2.5">
      <div className="flex items-center gap-2">
        <button
          onClick={onImport}
          className="flex items-center gap-1.5 rounded-lg bg-[var(--primary-color-3)] px-3 py-2 text-sm text-[var(--primary-color)] hover:bg-[var(--primary-color-2)] transition-colors"
        >
          <Package size={16} />
          Import Component
        </button>

        <button
          onClick={onLoadFromUrl}
          className="flex items-center gap-2 rounded-lg  px-3 py-1.5 text-sm text-[var(--white-color)] hover:text-[var(--primary-color)] transition-colors"
        >
          <Upload size={16} />
          Load from URL
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onShare}
          className="p-2 text-[var(--primary-color)] transition-colors"
          title="Share"
        >
          <Share2 size={18} />
        </button>

        <button
          onClick={onExport}
          className="p-2 text-[var(--primary-color)] transition-colors"
          title="Export"
        >
          <Download size={18} />
        </button>

        <button
          onClick={onReset}
          className="p-2 text-[var(--primary-color)] transition-colors"
          title="Reset"
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );
};
