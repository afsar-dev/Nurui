// src/features/playground/import/import-service.ts
import { ComponentName, Index } from "@/registry/components-registry";
import { PlaygroundFile } from "../types";

export class ComponentImportService {
  private readonly publicCssFiles = new Set([
    "ai-button.css",
    "digital-hero.css",
    "dynamic-card.css",
    "footer.css",
    "gradient-button.css",
    "info-card.css",
    "playing-card.css",
    "shiny-card.css",
    "wave-card.css",
  ]);

  private extractCssDependencies(code: string): string[] {
    const imports = Array.from(
      code.matchAll(/import\s+["']([^"']+\.css)["'];?/g),
      (match) => match[1],
    );

    return imports
      .map((importPath) => importPath.split("/").pop())
      .filter((fileName): fileName is string => Boolean(fileName))
      .filter((fileName) => this.publicCssFiles.has(fileName))
      .map((fileName) => `/css/${fileName}`);
  }

  private extractImportSpecifiers(code: string): string[] {
    const matches = [
      ...Array.from(
        code.matchAll(/from\s+["']([^"']+)["']/g),
        (match) => match[1],
      ),
      ...Array.from(
        code.matchAll(/import\s+["']([^"']+)["']/g),
        (match) => match[1],
      ),
    ];

    return Array.from(new Set(matches));
  }

  private isLocalDependency(specifier: string): boolean {
    return (
      specifier.startsWith("./") ||
      specifier.startsWith("../") ||
      specifier.startsWith("@/components/nurui/") ||
      specifier.startsWith("@/components/ui/") ||
      specifier.startsWith("@/data/") ||
      specifier.startsWith("@/utils/")
    );
  }

  private normalizeDependencyName(specifier: string): string {
    return specifier.split("/").pop() || specifier;
  }

  private async loadRawDependency(specifier: string): Promise<{
    fileName: string;
    content: string;
  } | null> {
    const dependencyName = this.normalizeDependencyName(specifier);

    const candidates = [
      {
        fileName: `${dependencyName}.tsx`,
        load: () => import(`@/components/nurui/${dependencyName}.tsx?raw`),
      },
      {
        fileName: `${dependencyName}.ts`,
        load: () => import(`@/components/nurui/${dependencyName}.ts?raw`),
      },
      {
        fileName: `${dependencyName}.tsx`,
        load: () => import(`@/components/ui/${dependencyName}.tsx?raw`),
      },
      {
        fileName: `${dependencyName}.ts`,
        load: () => import(`@/components/ui/${dependencyName}.ts?raw`),
      },
      {
        fileName: `${dependencyName}.ts`,
        load: () => import(`@/utils/${dependencyName}.ts?raw`),
      },
      {
        fileName: `${dependencyName}.tsx`,
        load: () => import(`@/utils/${dependencyName}.tsx?raw`),
      },
      {
        fileName: `${dependencyName}.ts`,
        load: () => import(`@/data/${dependencyName}.ts?raw`),
      },
      {
        fileName: `${dependencyName}.tsx`,
        load: () => import(`@/data/${dependencyName}.tsx?raw`),
      },
    ];

    for (const candidate of candidates) {
      try {
        const loadedModule = await candidate.load();
        return {
          fileName: candidate.fileName,
          content: loadedModule.default || "",
        };
      } catch {
        continue;
      }
    }

    return null;
  }

  private async loadNestedDependencies(
    files: PlaygroundFile[],
    cssFiles: Set<string>,
  ): Promise<PlaygroundFile[]> {
    const queue = [...files];
    const seen = new Set(files.map((file) => file.name));

    while (queue.length > 0) {
      const currentFile = queue.shift();
      if (!currentFile) continue;

      const imports = this.extractImportSpecifiers(currentFile.content).filter(
        (specifier) => this.isLocalDependency(specifier),
      );

      for (const specifier of imports) {
        const loaded = await this.loadRawDependency(specifier);
        if (!loaded || seen.has(loaded.fileName)) {
          continue;
        }

        this.extractCssDependencies(loaded.content).forEach((file) =>
          cssFiles.add(file),
        );

        let content = this.fixImportPaths(loaded.content);

        if (
          !content.includes("export default") &&
          !content.includes("export {") &&
          !content.includes("export const") &&
          !content.includes("export function") &&
          !content.includes("export class") &&
          !content.includes("export interface") &&
          !content.includes("export type")
        ) {
          const componentMatches = Array.from(
            content.matchAll(/(?:const|function)\s+([A-Z]\w*)/g),
            (match) => match[1],
          );

          if (componentMatches.length > 0) {
            content += `\n\nexport default ${componentMatches[0]};`;
          }
        }

        const dependencyFile: PlaygroundFile = {
          id: loaded.fileName.replace(/\.(tsx|ts|jsx|js)$/, ""),
          name: loaded.fileName,
          content,
          language: "typescript",
        };

        files.push(dependencyFile);
        queue.push(dependencyFile);
        seen.add(dependencyFile.name);
      }
    }

    return files;
  }

  /**
   * Fix import paths in code to work in playground
   */
  private fixImportPaths(code: string): string {
    let fixed = code;

    // Remove "use client" directive
    fixed = fixed.replace(/["']use client["'];?\s*/g, "");

    // Strip CSS imports. Matching files are injected separately into the iframe.
    fixed = fixed.replace(/import\s+["'][^"']+\.css["'];?\s*/g, "");

    // Fix @/components/nurui/* imports to relative imports
    // Example: @/components/nurui/button → ./button
    fixed = fixed.replace(
      /@\/components\/nurui\/([a-zA-Z0-9-_]+)/g,
      (match, componentName) => {
        console.log(`🔧 Fixing import: ${match} → ./${componentName}`);
        return `./${componentName}`;
      },
    );

    fixed = fixed.replace(
      /@\/components\/ui\/([a-zA-Z0-9-_]+)/g,
      (match, componentName) => {
        console.log(`🔧 Fixing UI import: ${match} → ./${componentName}`);
        return `./${componentName}`;
      },
    );

    fixed = fixed.replace(
      /@\/data\/([a-zA-Z0-9-_.]+)/g,
      (match, fileName) => {
        console.log(`🔧 Fixing data import: ${match} → ./${fileName}`);
        return `./${fileName}`;
      },
    );

    fixed = fixed.replace(
      /@\/utils\/([a-zA-Z0-9-_.]+)/g,
      (match, fileName) => {
        console.log(`🔧 Fixing util import: ${match} → ./${fileName}`);
        return `./${fileName}`;
      },
    );

    // Fix @/lib/utils import
    fixed = fixed.replace(
      /from ["']@\/lib\/utils["']/g,
      'from "@/lib/utils"', // Keep this, we'll inline it in compiler
    );

    return fixed;
  }

  /**
   * Ensure code has default export
   */
  private ensureDefaultExport(code: string): string {
    // If already has default export, return as-is
    if (code.includes("export default")) {
      return code;
    }

    // Prefer actual component declarations over any uppercase constant.
    const componentMatches = Array.from(
      code.matchAll(
        /(?:export\s+)?function\s+([A-Z]\w*)\s*\(|(?:export\s+)?const\s+([A-Z]\w*)\s*=\s*(?:async\s*)?(?:\([^)]*\)|[A-Za-z_$][\w$]*)\s*=>/g,
      ),
      (match) => match[1] || match[2],
    ).filter(Boolean);

    if (componentMatches.length > 0) {
      const componentName = componentMatches[0];
      console.log(`✅ Adding default export for: ${componentName}`);
      return code + `\n\nexport default ${componentName};`;
    }

    // Fallback to PascalCase declarations if the file uses a less common style.
    const fallbackMatches = Array.from(
      code.matchAll(/(?:export\s+)?(?:const|function)\s+([A-Z]\w*)/g),
      (match) => match[1],
    );

    if (fallbackMatches.length > 0) {
      const componentName = fallbackMatches[0];
      console.log(`✅ Adding default export for: ${componentName}`);
      return code + `\n\nexport default ${componentName};`;
    }

    console.warn("⚠️ Could not add default export automatically");
    return code;
  }

  async importComponent(name: ComponentName): Promise<{
    files: PlaygroundFile[];
    cssFiles: string[];
  }> {
    const entry = Index[name];
    if (!entry) throw new Error(`Component ${name} not found`);

    const files: PlaygroundFile[] = [];
    const cssFiles = new Set<string>();

    try {
      // Get the demo/main component code
      const mainCodeModule = await entry.code();
      let mainCode = mainCodeModule.default || "";

      this.extractCssDependencies(mainCode).forEach((file) => cssFiles.add(file));

      console.log("📄 Main code loaded:", {
        name,
        codeLength: mainCode.length,
        preview: mainCode.substring(0, 150),
      });

      // Fix import paths
      mainCode = this.fixImportPaths(mainCode);

      // Ensure default export
      mainCode = this.ensureDefaultExport(mainCode);

      files.push({
        id: "demo",
        name: "App.tsx",
        content: mainCode,
        language: "typescript",
      });

      // Add dependency files
      if (entry.othersCode && entry.othersCode.length > 0) {
        console.log(
          "📦 Loading dependencies:",
          entry.othersCode.map((o) => o.fileName),
        );

        for (const other of entry.othersCode) {
          try {
            const codeModule = await other.code();
            let code = codeModule.default || "";

            this.extractCssDependencies(code).forEach((file) =>
              cssFiles.add(file),
            );

            // Fix import paths in dependencies too
            code = this.fixImportPaths(code);

            // Ensure dependencies have proper exports
            if (
              !code.includes("export default") &&
              !code.includes("export {")
            ) {
              // Try to add default export
              const componentMatch = code.match(/(?:const|function)\s+(\w+)/);
              if (componentMatch) {
                code += `\n\nexport default ${componentMatch[1]};`;
              }
            }

            console.log(`📄 Loaded ${other.fileName}:`, {
              codeLength: code.length,
              preview: code.substring(0, 100),
            });

            files.push({
              id: other.fileName,
              name: `${other.fileName}.tsx`,
              content: code,
              language: "typescript",
            });
          } catch (err) {
            console.warn(`⚠️ Failed to load ${other.fileName}:`, err);
          }
        }
      }

      await this.loadNestedDependencies(files, cssFiles);

      const inferredCssFiles = await this.getCssDependencies(name);
      inferredCssFiles.forEach((file) => cssFiles.add(file));

      console.log("✅ Import complete:", {
        name,
        filesCount: files.length,
        cssFilesCount: cssFiles.size,
        files: files.map((f) => ({
          name: f.name,
          size: f.content.length,
          hasDefaultExport: f.content.includes("export default"),
        })),
      });

      return { files, cssFiles: Array.from(cssFiles) };
    } catch (error) {
      console.error("❌ Import error:", error);
      throw new Error(`Failed to import ${name}: ${error}`);
    }
  }

  async getCssDependencies(name: ComponentName): Promise<string[]> {
    const cssMap: Record<string, string[]> = {
      digitalHero: ["/css/digital-hero.css"],
      gradientButton: ["/css/gradient-button.css"],
      dynamicCard: ["/css/dynamic-card.css"],
      infoCard: ["/css/info-card.css"],
      playingCard: ["/css/playing-card.css"],
      shinyCard: ["/css/shiny-card.css"],
      waveCard: ["/css/wave-card.css"],
      aiButton: ["/css/ai-button.css"],
      rocketFooter: ["/css/footer.css"],
      hoverFooter: ["/css/footer.css"],
    };

    return cssMap[name] || [];
  }
}
