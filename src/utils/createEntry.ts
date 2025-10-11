import { ComponentEntry } from "@/types/registry.type";
import dynamic from "next/dynamic";

const tryImport = async (name: string) => {
  try {
    const mod = await import(`@/components/nurui/${name}-demo`);
    return mod.default || mod[name] || Object.values(mod)[0];
  } catch {
    const mod = await import(`@/components/nurui/${name}`);
    return mod.default || mod[name] || Object.values(mod)[0];
  }
};

export const createEntry = (
  name: string,
  others: string[] = [],
  ssr = true,
): ComponentEntry => ({
  preview: dynamic(() => tryImport(name), { ssr }),
  code: async () => {
    try {
      return await import(`@/components/nurui/${name}-demo.tsx?raw`);
    } catch {
      return await import(`@/components/nurui/${name}.tsx?raw`);
    }
  },
  othersCode: others.map((file) => ({
    fileName: file,
    code: async () => {
      try {
        return await import(`@/components/nurui/${file}.tsx?raw`);
      } catch {
        return { default: `// Failed to load ${file}.tsx` };
      }
    },
  })),
});
