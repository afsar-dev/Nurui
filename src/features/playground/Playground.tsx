/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ComponentName } from "@/registry/components-registry";
import { useCallback, useEffect, useState } from "react";
import { TypeScriptCompiler } from "./core/compiler";
import { MonacoEditor } from "./editor/MonacoEditor";
import { usePlayground } from "./hooks/usePlayground";
import { ComponentImportModal } from "./import/ComponentImportModal";
import { ComponentImportService } from "./import/import-service";
import { PreviewSandbox } from "./preview/PreviewSandbox";
import { copyShareUrl, loadFromUrl } from "./storage/url-storage";
import { FileTabs } from "./ui/FileTabs";
import { SplitPanel } from "./ui/SplitPanel";
import { Toolbar } from "./ui/Toolbar";

const compiler = TypeScriptCompiler.getInstance();
const importService = new ComponentImportService();

export const Playground = () => {
  const {
    state,
    updateFile,
    addFile,
    removeFile,
    setActiveFile,
    setSplitRatio,
    setState,
  } = usePlayground();

  const [isImportOpen, setIsImportOpen] = useState(false);
  const [compiled, setCompiled] = useState("");
  const [cssFiles, setCssFiles] = useState<string[]>([]);
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCompiling, setIsCompiling] = useState(false);

  const activeFile = state.files.find((f) => f.id === state.activeFileId);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setIsCompiling(true);
      try {
        console.log(
          "🔄 Compiling files:",
          state.files.map((f) => f.name),
        );

        // Log file contents for debugging
        state.files.forEach((f) => {
          console.log(
            `📄 ${f.name} (${f.content.length} chars):`,
            f.content.substring(0, 100) + "...",
          );
        });

        const result = await compiler.compileAll(state.files);

        if (!cancelled) {
          if (result.compiled) {
            console.log("✅ Compilation successful");
            console.log("📦 Compiled code length:", result.compiled.length);
            console.log(
              "📦 First 200 chars:",
              result.compiled.substring(0, 200),
            );
            setCompiled(result.compiled);
          } else {
            console.warn("⚠️ Compilation produced no output");
            setCompiled("");
          }
          setErrors(result.errors || []);
        }
      } catch (err) {
        if (!cancelled) {
          console.error("❌ Compilation error:", err);
          setErrors([
            {
              line: 0,
              column: 0,
              message:
                err instanceof Error ? err.message : "Compilation failed",
              severity: "error",
            },
          ]);
          setCompiled("");
        }
      } finally {
        if (!cancelled) {
          setIsCompiling(false);
        }
      }
    };

    const timer = setTimeout(run, 600);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [state.files]);

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === "runtime-error") {
        console.error("❌ Runtime error from iframe:", event.data.message);
        setErrors((prev) => [
          ...prev.filter((e) => e.severity !== "runtime"),
          {
            line: 0,
            column: 0,
            message: event.data.message,
            severity: "error",
          },
        ]);
      } else if (event.data?.type === "success") {
        console.log("✅ Component rendered successfully in iframe");
        setErrors((prev) => prev.filter((e) => e.severity !== "runtime"));
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const handleImportComponent = useCallback(
    async (name: ComponentName) => {
      setIsLoading(true);
      try {
        const { files, cssFiles: css } =
          await importService.importComponent(name);

        console.log("✅ Importing:", name);
        console.log(
          "📁 Files:",
          files.map((f) => f.name),
        );
        console.log("🎨 CSS Files:", css);

        setState({
          files,
          activeFileId: files[0]?.id || "",
          splitRatio: state.splitRatio,
        });

        setCssFiles(css);
      } catch (error) {
        console.error("❌ Import failed:", error);
        alert(`Failed to import component: ${error}`);
      } finally {
        setIsLoading(false);
      }
    },
    [setState, state.splitRatio],
  );

  const handleShare = async () => {
    try {
      await copyShareUrl(state);
      alert("✅ Link copied to clipboard!");
    } catch (error) {
      alert("❌ Failed to copy link");
    }
  };

  const handleReset = () => {
    if (confirm("Reset playground? This will clear all your code.")) {
      window.location.href = window.location.pathname;
    }
  };

  const handleExport = () => {
    if (!activeFile) return;

    const blob = new Blob([activeFile.content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = activeFile.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-screen w-full bg-neutral-950 text-white flex flex-col">
      <Toolbar
        onImport={() => setIsImportOpen(true)}
        onShare={handleShare}
        onReset={handleReset}
        onExport={handleExport}
        onLoadFromUrl={() => {
          const urlState = loadFromUrl();
          if (urlState) {
            setState(urlState);
          }
        }}
      />

      <FileTabs
        files={state.files}
        activeFileId={state.activeFileId}
        onSelectFile={setActiveFile}
        onCloseFile={removeFile}
        onAddFile={() => {
          const newFile = {
            id: `file-${Date.now()}`,
            name: `NewFile-${state.files.length + 1}.tsx`,
            content:
              "export default function Component() {\n  return <div>Hello</div>;\n}\n",
            language: "typescript" as const,
          };
          addFile(newFile);
        }}
      />

      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="text-white text-lg">Loading component...</div>
          </div>
        ) : (
          <SplitPanel
            initialRatio={state.splitRatio}
            onRatioChange={setSplitRatio}
            left={
              <div className="h-full flex flex-col bg-[#1e1e1e]">
                {isCompiling && (
                  <div className="bg-yellow-500/10 border-b border-yellow-500/20 px-4 py-1 text-xs text-yellow-400">
                    ⚡ Compiling...
                  </div>
                )}
                {errors.length > 0 && (
                  <div className="bg-red-500/10 border-b border-red-500/20 px-4 py-1 text-xs text-red-400">
                    ❌ {errors.length} error{errors.length !== 1 ? "s" : ""}:{" "}
                    {errors[0]?.message}
                  </div>
                )}
                {compiled && (
                  <div className="bg-green-500/10 border-b border-green-500/20 px-4 py-1 text-xs text-green-400">
                    ✅ Compiled ({compiled.length} chars)
                  </div>
                )}
                <div className="flex-1">
                  {activeFile ? (
                    <MonacoEditor
                      key={activeFile.id}
                      value={activeFile.content}
                      language={activeFile.language}
                      onChange={(value) => updateFile(activeFile.id, value)}
                      errors={errors}
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-neutral-400">
                      No file selected
                    </div>
                  )}
                </div>
              </div>
            }
            right={
              <div className="h-full bg-white">
                {compiled ? (
                  <PreviewSandbox
                    key={compiled.substring(0, 100)} // Force re-render when code changes
                    code={compiled}
                    cssFiles={cssFiles}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center text-neutral-400 bg-gradient-to-br from-blue-500 to-purple-600">
                    <div className="text-center text-white">
                      <h1 className="text-3xl font-bold mb-4">
                        Welcome to Nurui Playground
                      </h1>
                      <p className="text-white/80 mb-6">
                        Click Import Component to get started
                      </p>
                      <p className="text-xs text-white/60">
                        Open browser console (F12) to see debug logs
                      </p>
                    </div>
                  </div>
                )}
              </div>
            }
          />
        )}
      </div>

      <ComponentImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImport={handleImportComponent}
      />
    </div>
  );
};
