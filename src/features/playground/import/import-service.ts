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

    // Try to find the main component
    const componentMatch = code.match(
      /(?:export\s+)?(?:const|function)\s+(\w+)/,
    );

    if (componentMatch) {
      const componentName = componentMatch[1];
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
