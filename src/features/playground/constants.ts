export const DEFAULT_FILES = [
  {
    id: "app",
    name: "App.tsx",
    language: "typescript" as const,
    content: `export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Nur UI Playground
        </h1>
        <p className="text-white/80 mb-8">
          Click "Import Component" to get started
        </p>
      </div>
    </div>
  );
}`,
  },
];

export const MONACO_OPTIONS = {
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: "on" as const,
  roundedSelection: false,
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 2,
  wordWrap: "on" as const,
  formatOnPaste: true,
  formatOnType: true,
};

export const STORAGE_KEY = "nurui_playground_state";
export const MIN_SPLIT_RATIO = 0.3;
export const MAX_SPLIT_RATIO = 0.7;
export const DEFAULT_SPLIT_RATIO = 0.5;
