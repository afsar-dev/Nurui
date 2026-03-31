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
    <div className="flex items-center gap- border-b border-[var(--primary-color-2)] bg-[var(--primary-color-4)]">
      {files.map((file) => (
        <button
          key={file.id}
          onClick={() => onSelectFile(file.id)}
          className={`
            group flex items-center gap-2 px-3 py-2.5 text-sm transition-colors
            ${
              activeFileId === file.id
                ? "bg-[var(--primary-color)] text-[var(--white-color)] dark:bg-[var(--primary-color-3)] dark:hover:bg-[var(--primary-color-2)] dark:text-[var(--primary-color)] "
                : "hover:text-[var(--primary-color)] text-[var(--white-color)]"
            }
          `}
        >
          <span>{file.name}</span>
          {files.length > 1 && (
            <X
              size={20}
              className="hover:bg-[var(--primary-color-2)] p-0.5 rounded"
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
        className="p-3 text-[var(--white-color)]  hover:text-[var(--primary-color)] transition-colors"
        title="Add file"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};
