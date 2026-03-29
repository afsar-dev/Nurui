// src/features/playground/editor/MonacoEditor.tsx
"use client";
import * as monaco from "monaco-editor";
import { useEffect, useRef } from "react";
import { MONACO_OPTIONS } from "../constants";
import { CompilationError } from "../types";

interface MonacoEditorProps {
  value: string;
  language: string;
  onChange: (value: string) => void;
  errors?: CompilationError[];
}

export const MonacoEditor = ({
  value,
  language,
  onChange,
  errors = [],
}: MonacoEditorProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isUpdatingRef = useRef(false);
  const onChangeRef = useRef(onChange);
  const initialValueRef = useRef(value);
  const initialLanguageRef = useRef(language);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Initialize editor
  useEffect(() => {
    if (!containerRef.current) return;

    // Create editor instance
    editorRef.current = monaco.editor.create(containerRef.current, {
      value: initialValueRef.current,
      language: initialLanguageRef.current,
      theme: "vs-dark",
      ...MONACO_OPTIONS,
    });

    const model = editorRef.current.getModel();
    if (model) {
      // Listen for content changes
      model.onDidChangeContent(() => {
        if (!isUpdatingRef.current) {
          const newValue = editorRef.current?.getValue() || "";
          onChangeRef.current(newValue);
        }
      });
    }

    return () => {
      editorRef.current?.dispose();
    };
  }, []); // Only run once on mount

  useEffect(() => {
    const model = editorRef.current?.getModel();
    if (model) {
      monaco.editor.setModelLanguage(model, language);
    }
  }, [language]);

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

    monaco.editor.setModelMarkers(model, "typescript", markers);
  }, [errors]);

  return <div ref={containerRef} className="h-full w-full" />;
};
