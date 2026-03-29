"use client";
import { Plus, X } from "lucide-react";
import { PlaygroundFile } from "../types";

interface FileTabsProps {
  files: PlaygroundFile[];
  activeFileId: string;
  onSelectFile: (id: string) => void;
  onCloseFile: (id: string) => void;
  onAddFile: () => void;
}

export const FileTabs = ({
  files,
  activeFileId,
  onSelectFile,
  onCloseFile,
  onAddFile,
}: FileTabsProps) => {
  return (
    <div className="flex items-center gap-1 border-b border-neutral-800 bg-neutral-900 px-2">
      {files.map((file) => (
        <button
          key={file.id}
          onClick={() => onSelectFile(file.id)}
          className={`
            group flex items-center gap-2 px-3 py-2 text-sm transition-colors
            ${
              activeFileId === file.id
                ? "bg-neutral-800 text-white"
                : "text-neutral-400 hover:text-white"
            }
          `}
        >
          <span>{file.name}</span>
          {files.length > 1 && (
            <X
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                onCloseFile(file.id);
              }}
            />
          )}
        </button>
      ))}
      <button
        onClick={onAddFile}
        className="p-2 text-neutral-400 hover:text-white transition-colors"
        title="Add file"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};
