"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Download, Package, RefreshCw, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onLoadFromUrl,
}: ToolbarProps) => {
  const [isResetOpen, setIsResetOpen] = useState(false);

  useEffect(() => {
    if (!isResetOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const dialogContent = document.querySelector(
        '[data-slot="alert-dialog-content"]',
      );
      if (!dialogContent) return;

      const target = event.target as Node | null;
      if (target && !dialogContent.contains(target)) {
        setIsResetOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [isResetOpen]);

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

        {/* <button
          onClick={onLoadFromUrl}
          className="flex items-center gap-2 rounded-lg  px-3 py-1.5 text-sm text-[var(--white-color)] hover:text-[var(--primary-color)] transition-colors"
        >
          <Upload size={16} />
          Load from URL
        </button> */}
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

        <AlertDialog open={isResetOpen} onOpenChange={setIsResetOpen}>
          <AlertDialogTrigger asChild>
            <button
              className="p-2 text-[var(--primary-color)] transition-colors"
              title="Reset"
            >
              <RefreshCw size={18} />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent
            className="rounded-xl border border-[var(--primary-color-2)] bg-[var(--primary-color-4)] p-5 text-[var(--white-color)] shadow-[0_12px_32px_var(--primary-color-4)] backdrop-blur-md"
          >
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[var(--white-color)] font-bold">
                Reset playground?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-[var(--white-color-2)]">
                This will clear all your current files and changes.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="-mx-0 -mb-0 mt-5 border-0 bg-transparent p-0 sm:justify-end">
              <AlertDialogCancel className="border-[var(--primary-color-2)] bg-transparent text-[var(--white-color)] hover:bg-[var(--primary-color-4)]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setIsResetOpen(false);
                  onReset();
                }}
                className="border border-[var(--primary-color-2)] bg-[var(--primary-color-3)] text-[var(--white-color)] "
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
