/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/playground/core/compiler.ts
import * as esbuild from "esbuild-wasm";

export class TypeScriptCompiler {
  private static instance: TypeScriptCompiler | null = null;
  private static initializationPromise: Promise<void> | null = null;
  private initialized = false;

  static getInstance(): TypeScriptCompiler {
    if (!TypeScriptCompiler.instance) {
      TypeScriptCompiler.instance = new TypeScriptCompiler();
    }
    return TypeScriptCompiler.instance;
  }

  private async ensureInitialized() {
    if (this.initialized) {
      return;
    }

    if (TypeScriptCompiler.initializationPromise) {
      await TypeScriptCompiler.initializationPromise;
      return;
    }

    TypeScriptCompiler.initializationPromise = esbuild
      .initialize({
        wasmURL: "https://unpkg.com/esbuild-wasm@0.27.2/esbuild.wasm",
      })
      .then(() => {
        this.initialized = true;
        TypeScriptCompiler.initializationPromise = null;
      })
      .catch((error) => {
        TypeScriptCompiler.initializationPromise = null;
        throw error;
      });

    await TypeScriptCompiler.initializationPromise;
  }

  async compileAll(files: any[]) {
    await this.ensureInitialized();

    // Create virtual file system
    const fileMap = new Map(files.map((f) => [`/${f.name}`, f.content]));

    console.log("📁 Virtual file system:", Array.from(fileMap.keys()));

    try {
      const result = await esbuild.build({
        entryPoints: ["/App.tsx"],
        bundle: true, // This is KEY - actually bundle everything
        write: false,
        format: "esm",
        jsx: "automatic",
        jsxImportSource: "react",

        plugins: [
          {
            name: "virtual-fs",
            setup(build) {
              // Resolve ALL imports from virtual filesystem
              build.onResolve({ filter: /.*/ }, (args) => {
                console.log("🔍 Resolving:", args.path, "from:", args.importer);

                // Skip external modules
                const externalModules = [
                  "react",
                  "react-dom",
                  "react/jsx-runtime",
                  "framer-motion",
                  "lucide-react",
                  "react-icons",
                  "@gsap/react",
                  "gsap/SplitText",
                  "gsap",
                ];

                if (externalModules.some((mod) => args.path.startsWith(mod))) {
                  return { path: args.path, external: true };
                }

                // Handle @/components/nurui/* imports
                if (args.path.startsWith("@/components/nurui/")) {
                  const fileName = args.path.replace("@/components/nurui/", "");
                  const possiblePaths = [`/${fileName}.tsx`, `/${fileName}`];

                  for (const path of possiblePaths) {
                    if (fileMap.has(path)) {
                      console.log("✅ Resolved @/ import to:", path);
                      return { path, namespace: "virtual" };
                    }
                  }

                  console.warn("⚠️ Could not resolve:", args.path);
                  return { path: args.path, external: true };
                }

                // Handle @/lib/utils
                if (args.path === "@/lib/utils") {
                  // Inline the cn utility
                  return { path: args.path, namespace: "utils" };
                }

                // Handle relative imports (./component or ../component)
                if (args.path.startsWith("./") || args.path.startsWith("../")) {
                  // Resolve relative to importer
                  const importerDir = args.importer
                    .split("/")
                    .slice(0, -1)
                    .join("/");
                  let resolved = args.path;

                  // Simple relative path resolution
                  if (args.path.startsWith("./")) {
                    resolved = `${importerDir}/${args.path.slice(2)}`;
                  }

                  // Try with and without .tsx
                  const possiblePaths = [resolved, `${resolved}.tsx`];

                  for (const path of possiblePaths) {
                    if (fileMap.has(path)) {
                      console.log("✅ Resolved relative import to:", path);
                      return { path, namespace: "virtual" };
                    }
                  }
                }

                // Try direct lookup
                if (fileMap.has(args.path)) {
                  return { path: args.path, namespace: "virtual" };
                }

                if (fileMap.has(`${args.path}.tsx`)) {
                  return { path: `${args.path}.tsx`, namespace: "virtual" };
                }

                console.warn("⚠️ Unresolved import:", args.path);
                return { path: args.path, external: true };
              });

              // Load virtual files
              build.onLoad({ filter: /.*/, namespace: "virtual" }, (args) => {
                const content = fileMap.get(args.path);
                console.log("📄 Loading:", args.path, content ? "✅" : "❌");
                return {
                  contents: content || "",
                  loader: "tsx",
                };
              });

              // Provide inline cn utility
              build.onLoad({ filter: /.*/, namespace: "utils" }, (args) => {
                if (args.path === "@/lib/utils") {
                  return {
                    contents: `
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
                    `,
                    loader: "ts",
                  };
                }
              });
            },
          },
        ],

        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "framer-motion",
          "lucide-react",
          "react-icons/fa",
          "react-icons/fa6",
          "react-icons/bs",
          "react-icons/gi",
          "react-icons/io5",
          "gsap",
          "@gsap/react",
          "clsx",
          "tailwind-merge",
        ],
      });

      const compiled = result.outputFiles[0].text;
      console.log("✅ Bundle complete:", compiled.length, "chars");

      return {
        compiled,
        errors: [],
      };
    } catch (error: any) {
      console.error("❌ Compilation error:", error);
      return {
        compiled: "",
        errors: [
          {
            line: 0,
            column: 0,
            message: error.message || "Compilation failed",
            severity: "error",
          },
        ],
      };
    }
  }
}
