interface CodeEntry  {
  fileName: string;
  code: () => Promise<{ default: string }>;
};

export interface ComponentEntry {
  preview: React.ComponentType;
  code: () => Promise<{ default: string }>;
  othersCode?: CodeEntry[];
  ssr?: boolean;
};