// src/features/playground/editor/MonacoEditor.tsx
"use client";
import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";
import { MONACO_OPTIONS } from "../constants";
import { CompilationError } from "../types";

interface MonacoEditorProps {
  value: string;
  language: string;
  fileName?: string;
  onChange: (value: string) => void;
  errors?: CompilationError[];
}

export const MonacoEditor = ({
  value,
  language,
  fileName,
  onChange,
  errors = [],
}: MonacoEditorProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);
  const onChangeRef = useRef(onChange);
  const initialValueRef = useRef(value);
  const initialLanguageRef = useRef(language);

  const resolveMonacoLanguage = (lang: string, name?: string): string => {
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

    const resolvedBackground =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--background-color")
        .trim() || "#1e1e1e";

    // const resolvedPrimary =
    //   getComputedStyle(document.documentElement)
    //     .getPropertyValue("--primary-color")
    //     .trim() || "#3b82f6";

    // const resolvedPrimary100 =
    //   getComputedStyle(document.documentElement)
    //     .getPropertyValue("--primary-color-1")
    //     .trim() || "#3b82f6";

    const resolvedPrimary200 =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary-color-2")
        .trim() || "#3b82f6";
        
    const resolvedPrimary300 =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary-color-3")
        .trim() || "#3ca2fa33";

    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      allowNonTsExtensions: true,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      noEmit: true,
    });
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      ...monaco.languages.typescript.typescriptDefaults.getDiagnosticsOptions(),
      noSemanticValidation: true,
      noSuggestionDiagnostics: true,
      noSyntaxValidation: false,
    });
    monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      ...monaco.languages.typescript.javascriptDefaults.getCompilerOptions(),
      jsx: monaco.languages.typescript.JsxEmit.ReactJSX,
      allowNonTsExtensions: true,
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      esModuleInterop: true,
      noEmit: true,
    });
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      ...monaco.languages.typescript.javascriptDefaults.getDiagnosticsOptions(),
      noSemanticValidation: true,
      noSuggestionDiagnostics: true,
      noSyntaxValidation: false,
    });
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);

    monaco.editor.defineTheme("nurui-editor-theme", {
      base: "vs-dark",
      inherit: true,
      rules: [
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
        "editor.foreground": "#e5e7eb",
        "editorCursor.foreground": "#3ca2fa",
        "editor.lineHighlightBackground": "#3ca2fa1a",
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

    const initialLanguage = resolveMonacoLanguage(
      initialLanguageRef.current,
      fileName,
    );
    const modelPath =
      fileName || (initialLanguage === "javascript" ? "App.js" : "App.tsx");
    const modelUri = monaco.Uri.file(modelPath);
    const model = monaco.editor.createModel(
      initialValueRef.current,
      initialLanguage,
      modelUri,
    );

    // Create editor instance
    editorRef.current = monaco.editor.create(containerRef.current, {
      model,
      theme: "nurui-editor-theme",
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

    return () => {
      editorRef.current?.getModel()?.dispose();
      editorRef.current?.dispose();
    };
  }, []); // Only run once on mount

  useEffect(() => {
    const model = editorRef.current?.getModel();
    if (model) {
      monaco.editor.setModelLanguage(
        model,
        resolveMonacoLanguage(language, fileName),
      );
    }
  }, [language, fileName]);

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
