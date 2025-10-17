#!/usr/bin/env node
import { intro, outro, spinner, cancel, select } from "@clack/prompts";
import { format } from "prettier/standalone";
import babel from "prettier/plugins/babel";
import estree from "prettier/plugins/estree";
import ts from "typescript";
import colors from "picocolors";
import fs from "fs";
import path from "path";
import { execa } from "execa";
import fetch from "node-fetch";
const registryPath = `https://raw.githubusercontent.com/Mdafsarx/Nurui/main/registry-cli.json`;
const basePath = `https://raw.githubusercontent.com/Mdafsarx/Nurui/main`;

// CLI args
const [command, componentName] = process.argv.slice(2);

intro(colors.bold("Welcome to Nurui CLI"));

if (command === "list") {
  const s = spinner();
  s.start(colors.white("Fetching available components..."));
  try {
    const registry = await fetchRegistry();
    s.stop(colors.green("📦 Available components:\n"));
    for (const item of registry.items) {
      console.log(`${colors.green("•")} ${item.name}`);
    }
    outro(colors.bold(colors.green("✨ End of list.")));
    process.exit(0);
  } catch (err) {
    s.stop(colors.red("❌ Failed to fetch registry."));
    console.error(err);
    process.exit(1);
  }
}
if (command !== "add" || !componentName) {
  cancel(colors.red("Usage: npx nurui add component-name"));
  process.exit(0);
}

const language = await select({
  message: "Select the language of the component:",
  options: [
    { label: "TypeScript (.tsx)", value: "ts" },
    { label: "JavaScript (.jsx)", value: "js" },
  ],
});

async function fetchRegistry() {
  const res = await fetch(registryPath);
  if (!res.ok) throw new Error("Failed to fetch registry.json");
  return await res.json();
}

async function convertTsxToJsx(code) {
  const transpiled = ts.transpileModule(code, {
    compilerOptions: {
      jsx: ts.JsxEmit.Preserve,
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      allowJs: true,
    },
    fileName: "component.tsx",
  }).outputText;
  return await format(transpiled, {
    parser: "babel",
    plugins: [babel, estree],
    singleQuote: false,
    semi: true,
    trailingComma: "all",
    tabWidth: 2,
    printWidth: 80,
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: "always",
    endOfLine: "lf",
    bracketSameLine: true,
  });
}

async function downloadFileFromGitHub(filePath) {
  const rawUrl = `${basePath}/${filePath.replace(/^\.\//, "")}`;
  const res = await fetch(rawUrl);
  if (!res.ok) throw new Error(`Failed to download ${filePath}`);
  const content = await res.text();

  const fileName = path.basename(filePath);
  const isCss = fileName.endsWith(".css");

  const hasSrc = fs.existsSync(path.join(process.cwd(), "src"));

  const baseDir = hasSrc
    ? path.join(process.cwd(), "src", "components", "nurui")
    : path.join(process.cwd(), "components", "nurui");

  const targetDir = isCss ? path.join(baseDir, "styles") : baseDir;

  const targetPath = path.join(targetDir, fileName);

  // Convert .tsx to .jsx if JS mode and it's a .tsx file
  if (!isCss && language === "js" && fileName.endsWith(".tsx")) {
    const jsx = await convertTsxToJsx(content);
    const newPath = targetPath.replace(/\.tsx$/, ".jsx");
    await fs.promises.mkdir(path.dirname(newPath), { recursive: true });
    await fs.promises.writeFile(newPath, jsx.trim(), "utf8");
    console.log(colors.cyan(`📦 Saved: ${newPath}`));
  } else {
    await fs.promises.mkdir(targetDir, { recursive: true });
    await fs.promises.writeFile(targetPath, content, "utf8");
    console.log(colors.cyan(`📦 Saved: ${targetPath}`));
  }
}

function detectPackageManager() {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, "yarn.lock"))) return "yarn";
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) return "pnpm";
  if (fs.existsSync(path.join(cwd, "bun.lockb"))) return "bun";
  return "npm";
}

// Main logic
const s = spinner();
s.start(colors.white(`Adding ${componentName}...`));

try {
  const registry = await fetchRegistry();
  const match = registry.items.find((item) => item.name === componentName);

  if (!match) {
    s.stop(
      colors.red(`❌ Component '${componentName}' not found in registry.`),
    );
    process.exit(1);
  }

  const hasSrc = fs.existsSync(path.join(process.cwd(), "src"));
  const baseLibDir = hasSrc
    ? path.join(process.cwd(), "src", "lib")
    : path.join(process.cwd(), "lib");

  const cnContent = {
    ts: `import { type ClassValue, clsx } from "clsx";
    import { twMerge } from "tailwind-merge";

    export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
    }`,
    js: `import { clsx } from "clsx";
    import { twMerge } from "tailwind-merge";

    export function cn(...inputs) {
    return twMerge(clsx(inputs));
    }`,
  };

  const cnPath = path.join(
    baseLibDir,
    `utils.${language === "js" ? "js" : "ts"}`,
  );

  let utilsCreated = false;
  // Create utils file if it doesn't exist
  if (!fs.existsSync(cnPath)) {
    await fs.promises.mkdir(baseLibDir, { recursive: true });
    await fs.promises.writeFile(cnPath, cnContent[language], "utf8");
    console.log(
      colors.green(
        `🛠️ Created ${hasSrc ? "src/lib" : "lib"}/utils.${language}`,
      ),
    );
    utilsCreated = true;
  }

  for (const file of match.files) {
    await downloadFileFromGitHub(file.path);
  }

  s.stop(colors.green(`✅ ${componentName} downloaded successfully!`));

  if (match?.dependencies?.length) {
    const pm = detectPackageManager();
    const s2 = spinner();

    const deps = [...(match.dependencies || [])];
    if (utilsCreated) {
      deps.push("clsx", "tailwind-merge");
    }

    if (deps.length > 0) {
      const uniqueDeps = [...new Set(deps)];
      s2.start(
        `📦 Installing dependencies with ${pm}: ${uniqueDeps.join(", ")}`,
      );

      const cmd = ["add", ...uniqueDeps];
      const fallback = ["install", ...uniqueDeps];

      try {
        await execa(pm, pm === "npm" ? fallback : cmd, { stdio: "inherit" });
        s2.stop(colors.green("✅ Dependencies installed."));
      } catch (err) {
        s2.stop(colors.red("❌ Failed to install dependencies."));
        console.error(err);
      }
    }
  }

  outro(colors.bold(colors.green("🎉 Done!")));
} catch (err) {
  s.stop(colors.red("❌ Failed."));
  console.error(err);
  process.exit(1);
}
