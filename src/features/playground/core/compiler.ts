/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/playground/core/compiler.ts
import * as esbuild from "esbuild-wasm";

const REACT_EXTERNALS = new Set([
  "react",
  "react-dom",
  "react/jsx-runtime",
  "react/jsx-dev-runtime",
]);

const NEXT_SHIMS = new Set([
  "next/image",
  "next/link",
  "next/navigation",
  "next/dynamic",
]);

const ESBUILD_EXTENSIONS = [".tsx", ".ts", ".jsx", ".js"];
const INTERNAL_SHIMS = new Set(["@/utils/use-mouse-position"]);
const ESBUILD_VERSION = (esbuild as { version?: string }).version || "0.27.2";
const ESBUILD_WASM_URLS = [
  `https://unpkg.com/esbuild-wasm@${ESBUILD_VERSION}/esbuild.wasm`,
  `https://cdn.jsdelivr.net/npm/esbuild-wasm@${ESBUILD_VERSION}/esbuild.wasm`,
];
const ESBUILD_WASM_FETCH_TIMEOUT_MS = 12000;

const PACKAGE_VERSIONS: Record<string, string> = {
  "lucide-react": "0.523.0",
  motion: "12.4.7",
  "react-icons": "5.4.0",
  "class-variance-authority": "0.7.1",
  clsx: "2.1.1",
  "tailwind-merge": "3.3.1",
  gsap: "3.13.0",
  "@gsap/react": "2.1.2",
  "@radix-ui/react-avatar": "1.1.10",
  "@radix-ui/react-collapsible": "1.1.11",
  "@radix-ui/react-icons": "1.3.2",
  "@radix-ui/react-label": "2.1.7",
  "@radix-ui/react-slot": "1.2.3",
  "@radix-ui/react-tabs": "1.1.12",
  "@radix-ui/react-visually-hidden": "1.2.3",
  "@react-three/fiber": "9.0.0-alpha.8",
  three: "0.176.0",
  "next-themes": "0.4.4",
};

const isBareModuleSpecifier = (path: string) =>
  !path.startsWith(".") &&
  !path.startsWith("/") &&
  !path.startsWith("@/") &&
  !path.startsWith("http://") &&
  !path.startsWith("https://");

const createEsmUrl = (specifier: string) => {
  const segments = specifier.split("/");
  const packageName = specifier.startsWith("@")
    ? segments.slice(0, 2).join("/")
    : segments[0];
  const subpath = specifier.slice(packageName.length);
  const version = PACKAGE_VERSIONS[packageName];
  const packageWithVersion = version ? `${packageName}@${version}` : packageName;
  const encodedSpecifier = `${packageWithVersion}${subpath}`
    .split("/")
    .map((segment, index) =>
      index === 0 && packageWithVersion.startsWith("@")
        ? segment
        : encodeURIComponent(segment),
    )
    .join("/");

  return `https://esm.sh/${encodedSpecifier}?external=react,react-dom`;
};

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

  private async fetchWasmModule(url: string): Promise<WebAssembly.Module> {
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      ESBUILD_WASM_FETCH_TIMEOUT_MS,
    );

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        cache: "force-cache",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const wasmBinary = await response.arrayBuffer();
      return WebAssembly.compile(wasmBinary);
    } finally {
      clearTimeout(timeout);
    }
  }

  private async initializeEsbuildWithFallbacks() {
    const initErrors: string[] = [];

    for (const wasmUrl of ESBUILD_WASM_URLS) {
      try {
        const wasmModule = await this.fetchWasmModule(wasmUrl);
        await esbuild.initialize({
          wasmModule,
        });
        return;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        initErrors.push(`${wasmUrl} (${message})`);
      }
    }

    throw new Error(
      `Failed to initialize esbuild-wasm v${ESBUILD_VERSION}. Attempts: ${initErrors.join(" | ")}`,
    );
  }

  private async ensureInitialized() {
    if (this.initialized) {
      return;
    }

    if (TypeScriptCompiler.initializationPromise) {
      await TypeScriptCompiler.initializationPromise;
      return;
    }

    TypeScriptCompiler.initializationPromise = this
      .initializeEsbuildWithFallbacks()
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

    const resolveVirtualPath = (path: string) => {
      const possiblePaths = [
        path,
        ...ESBUILD_EXTENSIONS.map((extension) => `${path}${extension}`),
        ...ESBUILD_EXTENSIONS.map((extension) => `${path}/index${extension}`),
      ];

      return possiblePaths.find((candidate) => fileMap.has(candidate));
    };

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

                if (REACT_EXTERNALS.has(args.path)) {
                  return { path: args.path, external: true };
                }

                if (NEXT_SHIMS.has(args.path)) {
                  return { path: args.path, namespace: "next-shim" };
                }

                if (args.path.endsWith(".css")) {
                  return { path: args.path, namespace: "css-stub" };
                }

                // Handle in-memory alias imports
                if (
                  args.path.startsWith("@/components/nurui/") ||
                  args.path.startsWith("@/components/ui/")
                ) {
                  const fileName = args.path.split("/").pop() || "";
                  const resolvedPath = resolveVirtualPath(`/${fileName}`);

                  if (resolvedPath) {
                    console.log("✅ Resolved @/ import to:", resolvedPath);
                    return { path: resolvedPath, namespace: "virtual" };
                  }

                  console.warn("⚠️ Could not resolve:", args.path);
                  return {
                    path: createEsmUrl(args.path.replace("@/", "")),
                    external: true,
                  };
                }

                // Handle @/lib/utils
                if (args.path === "@/lib/utils") {
                  // Inline the cn utility
                  return { path: args.path, namespace: "utils" };
                }

                if (INTERNAL_SHIMS.has(args.path)) {
                  return { path: args.path, namespace: "internal-shim" };
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

                  const resolvedPath = resolveVirtualPath(resolved);

                  if (resolvedPath) {
                    console.log("✅ Resolved relative import to:", resolvedPath);
                    return { path: resolvedPath, namespace: "virtual" };
                  }
                }

                // Try direct lookup
                const directPath = resolveVirtualPath(args.path);
                if (directPath) {
                  return { path: directPath, namespace: "virtual" };
                }

                if (isBareModuleSpecifier(args.path)) {
                  const externalUrl = createEsmUrl(args.path);
                  console.log("🌐 Externalizing module to:", externalUrl);
                  return { path: externalUrl, external: true };
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

              build.onLoad({ filter: /.*/, namespace: "css-stub" }, () => ({
                contents: "export default {};",
                loader: "js",
              }));

              build.onLoad(
                { filter: /.*/, namespace: "internal-shim" },
                (args) => {
                  const shims: Record<string, { contents: string; loader: "ts" }> = {
                    "@/utils/use-mouse-position": {
                      loader: "ts",
                      contents: `
import { useEffect, useState } from "react";

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
}
                      `,
                    },
                  };

                  return shims[args.path];
                },
              );

              build.onLoad({ filter: /.*/, namespace: "next-shim" }, (args) => {
                const shims: Record<string, { contents: string; loader: "tsx" | "ts" }> = {
                  "next/image": {
                    loader: "tsx",
                    contents: `
import * as React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  fill?: boolean;
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
  quality?: number;
  sizes?: string;
  src: string | { src?: string } | undefined;
};

const Image = React.forwardRef<HTMLImageElement, ImageProps>(function Image(
  { src, alt = "", fill, style, ...props },
  ref,
) {
  const resolvedSrc =
    typeof src === "string" ? src : src?.src || "";

  const resolvedStyle = fill
    ? {
        position: "absolute" as const,
        inset: 0,
        width: "100%",
        height: "100%",
        ...style,
      }
    : style;

  return <img ref={ref} src={resolvedSrc} alt={alt} style={resolvedStyle} {...props} />;
});

export default Image;
                    `,
                  },
                  "next/link": {
                    loader: "tsx",
                    contents: `
import * as React from "react";

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string | { pathname?: string };
};

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, children, ...props },
  ref,
) {
  const resolvedHref =
    typeof href === "string" ? href : href?.pathname || "#";

  return (
    <a ref={ref} href={resolvedHref} {...props}>
      {children}
    </a>
  );
});

export default Link;
                    `,
                  },
                  "next/navigation": {
                    loader: "ts",
                    contents: `
const noop = async () => undefined;

export const usePathname = () => "/";
export const useSearchParams = () => new URLSearchParams();
export const useParams = () => ({});
export const useRouter = () => ({
  push: noop,
  replace: noop,
  refresh: noop,
  prefetch: noop,
  back: () => undefined,
  forward: () => undefined,
});
                    `,
                  },
                  "next/dynamic": {
                    loader: "tsx",
                    contents: `
import * as React from "react";

type LoaderResult<TProps> =
  | { default?: React.ComponentType<TProps> }
  | React.ComponentType<TProps>;

export default function dynamic<TProps>(
  loader: () => Promise<LoaderResult<TProps>>,
  options?: {
    loading?: React.ComponentType<TProps>;
    ssr?: boolean;
  },
) {
  const LazyComponent = React.lazy(async () => {
    const mod = await loader();
    return {
      default:
        (typeof mod === "function" ? mod : mod.default) ||
        (() => null),
    };
  });

  return function DynamicComponent(props: TProps) {
    const Fallback = options?.loading;

    return (
      <React.Suspense fallback={Fallback ? <Fallback {...props} /> : null}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  };
}
                    `,
                  },
                };

                return shims[args.path];
              });
            },
          },
        ],

        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react/jsx-dev-runtime",
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
