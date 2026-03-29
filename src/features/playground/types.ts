export interface PlaygroundFile {
  id: string;
  name: string;
  content: string;
  language: "typescript" | "javascript" | "css" | "json";
}

export interface PlaygroundState {
  files: PlaygroundFile[];
  activeFileId: string;
  splitRatio: number;
}

export interface CompilationError {
  line: number;
  column: number;
  message: string;
  severity: "error" | "warning";
}

export interface PreviewResult {
  success: boolean;
  compiled?: string;
  errors?: CompilationError[];
}

export type StorageAdapter = {
  save: (state: PlaygroundState) => Promise<void>;
  load: () => Promise<PlaygroundState | null>;
  generateShareUrl: (state: PlaygroundState) => Promise<string>;
};
