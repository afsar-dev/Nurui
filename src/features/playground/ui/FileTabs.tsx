"use client";
import { Plus, X } from "lucide-react";
import { ReactNode } from "react";
import { PlaygroundFile } from "../types";
import { PlaygroundLanguageMode } from "./LanguageSwitcher";

interface FileTabsProps {
  files: PlaygroundFile[];
  activeFileId: string;
  onSelectFile: (id: string) => void;
  onCloseFile: (id: string) => void;
  onAddFile: () => void;
  languageMode?: PlaygroundLanguageMode;
  languageSwitcher?: {
    render: ReactNode;
  };
}

export const FileTabs = ({
  files,
  activeFileId,
  onSelectFile,
  onCloseFile,
  onAddFile,
  languageMode = "ts",
  languageSwitcher,
}: FileTabsProps) => {
  const getDisplayFileName = (name: string) => {
    if (languageMode === "js") {
      if (name.endsWith(".tsx")) return name.replace(/\.tsx$/, ".jsx");
      if (name.endsWith(".ts")) return name.replace(/\.ts$/, ".js");
    }
    return name;
  };

  return (
    <div className="flex items-center gap-0 border-b border-[var(--border-color)] dark:border-[var(--primary-color-2)] bg-[var(--glass-color)] dark:bg-[var(--primary-color-4)]">
      {files.map((file) => (
        <button
          key={file.id}
          onClick={() => onSelectFile(file.id)}
          className={`
            group flex items-center gap-2 px-3 py-2.5 text-sm transition-colors
            ${
              activeFileId === file.id
                ? "bg-[var(--primary-color)] text-[var(--white-color)] dark:bg-[var(--primary-color-3)] dark:hover:bg-[var(--primary-color-2)] dark:text-[var(--primary-color)]"
                : "text-[var(--text-primary-color)] dark:hover:bg-[var(--primary-color-4)] hover:text-[var(--primary-color)]"
            }
          `}
        >
          <span>{getDisplayFileName(file.name)}</span>
          {files.length > 1 && (
            <X
              size={20}
              className="dark:hover:bg-[var(--primary-color-2)] p-0.5 rounded"
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
        className="p-3 text-[var(--text-primary-color)] hover:bg-[var(--primary-color-4)] hover:text-[var(--primary-color)] transition-colors"
        title="Add file"
      >
        <Plus size={16} />
      </button>

      {languageSwitcher && (
        <div className="ml-auto pr-3">{languageSwitcher.render}</div>
      )}
    </div>
  );
};
