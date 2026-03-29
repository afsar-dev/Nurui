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
    <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-4 py-2">
      <div className="flex items-center gap-2">
        <button
          onClick={onImport}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700 transition-colors"
        >
          <Package size={16} />
          Import Component
        </button>

        <button
          onClick={onLoadFromUrl}
          className="flex items-center gap-2 rounded-lg bg-neutral-800 px-3 py-1.5 text-sm text-white hover:bg-neutral-700 transition-colors"
        >
          <Upload size={16} />
          Load from URL
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onShare}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
          title="Share"
        >
          <Share2 size={18} />
        </button>

        <button
          onClick={onExport}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
          title="Export"
        >
          <Download size={18} />
        </button>

        <button
          onClick={onReset}
          className="p-2 text-neutral-400 hover:text-white transition-colors"
          title="Reset"
        >
          <RefreshCw size={18} />
        </button>
      </div>
    </div>
  );
};
