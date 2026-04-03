/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/playground/editor/MonacoEditor.tsx
// cspell:ignore nurui efac
"use client";
import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";
import { MONACO_OPTIONS } from "../constants";
import { CompilationError } from "../types";

interface MonacoEditorProps {
  value: string;
  language: string;
  fileName?: string;
  languageOverride?: "typescript" | "javascript";
  readOnly?: boolean;
  onChange: (value: string) => void;
  errors?: CompilationError[];
}

export const MonacoEditor = ({
  value,
  language,
  fileName,
  languageOverride,
  readOnly = false,
  onChange,
  errors = [],
}: MonacoEditorProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorMountRef = useRef<HTMLDivElement | null>(null);
  const isUpdatingRef = useRef(false);
  const onChangeRef = useRef(onChange);
  const initialValueRef = useRef(value);
  const initialLanguageRef = useRef(language);
  const initialFileNameRef = useRef(fileName);
  const initialLanguageOverrideRef = useRef(languageOverride);
  const initialReadOnlyRef = useRef(readOnly);

  const resolveMonacoLanguage = (
    lang: string,
    name?: string,
    override?: "typescript" | "javascript",
  ): string => {
    if (override) return override;

    const normalizedName = name?.toLowerCase() || "";

    if (normalizedName.endsWith(".tsx")) return "typescript";
    if (normalizedName.endsWith(".ts")) return "typescript";
    if (normalizedName.endsWith(".jsx")) return "javascript";
    if (normalizedName.endsWith(".js")) return "javascript";

    return lang === "javascript" ? "javascript" : "typescript";
  };

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Initialize editor
  useEffect(() => {
    if (!containerRef.current) return;
    const hostElement = containerRef.current;

    // Always mount Monaco in a fresh inner node to avoid
    // "Element already has context attribute" on dev remounts.
    hostElement.innerHTML = "";
    const mountNode = document.createElement("div");
    mountNode.style.width = "100%";
    mountNode.style.height = "100%";
    hostElement.appendChild(mountNode);
    editorMountRef.current = mountNode;

    const setEditorTheme = () => {
      const root = document.documentElement;
      const rootStyles = getComputedStyle(root);
      const isLightTheme = root.classList.contains("light");
      const resolvedBackground =
        rootStyles.getPropertyValue("--background-color").trim() ||
        (isLightTheme ? "#f7f7f7" : "#010313");
      const resolvedPrimary200 =
        rootStyles.getPropertyValue("--primary-color-2").trim() || "#3ca2fa4d";
      const resolvedPrimary300 =
        rootStyles.getPropertyValue("--primary-color-3").trim() || "#3ca2fa33";

      monaco.editor.defineTheme("nurui-editor-theme", {
        base: isLightTheme ? "vs" : "vs-dark",
        inherit: true,
        rules: isLightTheme
          ? [
              { token: "keyword", foreground: "0058b5", fontStyle: "bold" },
              { token: "type.identifier", foreground: "4c1d95" },
              { token: "identifier", foreground: "111827" },
              { token: "string", foreground: "047857" },
              { token: "number", foreground: "be123c" },
              { token: "comment", foreground: "6b7280", fontStyle: "italic" },
              { token: "delimiter", foreground: "1d4ed8" },
              { token: "tag", foreground: "0f766e" },
              { token: "attribute.name", foreground: "be185d" },
            ]
          : [
              { token: "keyword", foreground: "7dd3fc", fontStyle: "bold" },
              { token: "type.identifier", foreground: "a78bfa" },
              { token: "identifier", foreground: "e2e8f0" },
              { token: "string", foreground: "86efac" },
              { token: "number", foreground: "fda4af" },
              { token: "comment", foreground: "64748b", fontStyle: "italic" },
              { token: "delimiter", foreground: "93c5fd" },
              { token: "tag", foreground: "22d3ee" },
              { token: "attribute.name", foreground: "f9a8d4" },
            ],
        colors: {
          "editor.background": resolvedBackground,
          "editor.foreground": isLightTheme ? "#111827" : "#e5e7eb",
          "editorCursor.foreground": "#3ca2fa",
          "editor.lineHighlightBackground": isLightTheme
            ? "#3ca2fa0d"
            : "#3ca2fa1a",
          "editor.lineHighlightBorder": resolvedPrimary300,
          "editor.selectionBackground": "#3ca2fa33",
          "editor.inactiveSelectionBackground": "#3ca2fa1a",
          "editorIndentGuide.background1": "#3ca2fa1a",
          "editorIndentGuide.activeBackground1": "#3ca2fa4d",
          "scrollbarSlider.background": resolvedPrimary200,
          "scrollbarSlider.hoverBackground": resolvedPrimary200,
          "scrollbarSlider.activeBackground": resolvedPrimary200,
          "scrollbar.shadow": resolvedPrimary300,
        },
      });

      monaco.editor.setTheme("nurui-editor-theme");
    };

    // Monaco typings vary by version; access TS language service API via runtime bridge.
    const tsApi = (monaco.languages as any)?.typescript;

    if (tsApi?.typescriptDefaults) {
      tsApi.typescriptDefaults.setCompilerOptions({
        ...tsApi.typescriptDefaults.getCompilerOptions(),
        ...(tsApi.JsxEmit?.ReactJSX !== undefined
          ? { jsx: tsApi.JsxEmit.ReactJSX }
          : {}),
        allowNonTsExtensions: true,
        ...(tsApi.ScriptTarget?.ESNext !== undefined
          ? { target: tsApi.ScriptTarget.ESNext }
          : {}),
        ...(tsApi.ModuleKind?.ESNext !== undefined
          ? { module: tsApi.ModuleKind.ESNext }
          : {}),
        esModuleInterop: true,
        noEmit: true,
      });
      tsApi.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false,
      });
      tsApi.typescriptDefaults.setEagerModelSync(true);
    }

    if (tsApi?.javascriptDefaults) {
      tsApi.javascriptDefaults.setCompilerOptions({
        ...tsApi.javascriptDefaults.getCompilerOptions(),
        ...(tsApi.JsxEmit?.ReactJSX !== undefined
          ? { jsx: tsApi.JsxEmit.ReactJSX }
          : {}),
        allowNonTsExtensions: true,
        ...(tsApi.ScriptTarget?.ESNext !== undefined
          ? { target: tsApi.ScriptTarget.ESNext }
          : {}),
        ...(tsApi.ModuleKind?.ESNext !== undefined
          ? { module: tsApi.ModuleKind.ESNext }
          : {}),
        esModuleInterop: true,
        noEmit: true,
      });
      tsApi.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: false,
      });
      tsApi.javascriptDefaults.setEagerModelSync(true);
    }

    setEditorTheme();

    const initialLanguage = resolveMonacoLanguage(
      initialLanguageRef.current,
      initialFileNameRef.current,
      initialLanguageOverrideRef.current,
    );
    const normalizeModelPath = (name: string | undefined, lang: string) => {
      const fallbackName = lang === "javascript" ? "App.js" : "App.tsx";
      const base = name || fallbackName;

      if (lang === "javascript") {
        if (base.endsWith(".tsx")) return base.replace(/\.tsx$/, ".jsx");
        if (base.endsWith(".ts")) return base.replace(/\.ts$/, ".js");
      } else {
        if (base.endsWith(".jsx")) return base.replace(/\.jsx$/, ".tsx");
        if (base.endsWith(".js")) return base.replace(/\.js$/, ".ts");
      }

      return base;
    };

    const modelPath = normalizeModelPath(initialFileNameRef.current, initialLanguage);
    const modelUri = monaco.Uri.file(modelPath);
    const existingModel = monaco.editor.getModel(modelUri);
    if (existingModel) {
      existingModel.dispose();
    }
    const model = monaco.editor.createModel(
      initialValueRef.current,
      initialLanguage,
      modelUri,
    );

    // Create editor instance
    editorRef.current = monaco.editor.create(mountNode, {
      model,
      theme: "nurui-editor-theme",
      readOnly: initialReadOnlyRef.current,
      ...MONACO_OPTIONS,
    });

    const createdModel = editorRef.current.getModel();
    if (createdModel) {
      // Listen for content changes
      createdModel.onDidChangeContent(() => {
        if (!isUpdatingRef.current) {
          const newValue = editorRef.current?.getValue() || "";
          onChangeRef.current(newValue);
        }
      });
    }

    const themeObserver = new MutationObserver(() => {
      setEditorTheme();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      // Monaco can throw "Canceled: Canceled" during React dev remount cleanup.
      // Keep cleanup non-throwing to avoid crashing the playground.
      editorRef.current = null;
      editorMountRef.current = null;
      themeObserver.disconnect();
      hostElement.innerHTML = "";
    };
  }, []); // Only run once on mount

  useEffect(() => {
    const model = editorRef.current?.getModel();
    if (model) {
      monaco.editor.setModelLanguage(
        model,
        resolveMonacoLanguage(language, fileName, languageOverride),
      );
    }
  }, [language, fileName, languageOverride]);

  useEffect(() => {
    editorRef.current?.updateOptions({ readOnly });
  }, [readOnly]);

  // Update editor value when prop changes (e.g., switching files)
  useEffect(() => {
    if (!editorRef.current) return;

    const currentValue = editorRef.current.getValue();

    // Only update if value actually changed
    if (currentValue !== value) {
      isUpdatingRef.current = true;

      // Preserve cursor position
      const position = editorRef.current.getPosition();
      editorRef.current.setValue(value);

      // Restore cursor position if valid
      if (position) {
        editorRef.current.setPosition(position);
      }

      isUpdatingRef.current = false;
    }
  }, [value]);

  // Update error markers
  useEffect(() => {
    if (!editorRef.current) return;

    const model = editorRef.current.getModel();
    if (!model) return;

    const markers = errors.map((error) => ({
      startLineNumber: error.line + 1,
      startColumn: error.column + 1,
      endLineNumber: error.line + 1,
      endColumn: error.column + 100,
      message: error.message,
      severity:
        error.severity === "error"
          ? monaco.MarkerSeverity.Error
          : monaco.MarkerSeverity.Warning,
    }));

    monaco.editor.setModelMarkers(model, "playground-compiler", markers);
  }, [errors]);

  return <div ref={containerRef} className="h-full w-full" />;
};
