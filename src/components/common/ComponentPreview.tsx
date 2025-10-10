"use client";
import React, { useEffect, useMemo, useState } from "react";
import AnimatedTabs from "./AnimatedTabs";
import { IoEyeOutline } from "react-icons/io5";
import { FaCode } from "react-icons/fa";
import Preview from "./Preview";
import ComponentPreviewIntro from "./ComponentPreviewIntro";
import { Index } from "@/registry/components-registry";
import dynamic from "next/dynamic";
const LazyCodeBlock = dynamic<{ code: string }>(
  () => import("../ui/code-block/CodeBlock").then((mod) => mod.CodeBlock),
  { ssr: false },
);

interface ComponentPreviewProps {
  componentName: keyof typeof Index;
  introName?: boolean;
  exampleName?: string;
  v0ComponentName?: string;
  previewComponentName?: string;
}

const ComponentPreview = ({
  componentName,
  introName = true,
  exampleName,
  v0ComponentName,
  previewComponentName,
}: ComponentPreviewProps) => {
  const DemoComponent = Index[componentName]?.preview;
  // const sourceCode = Index[componentName]?.code ?? "";
  const [sourceCode, setSourceCode] = useState("");

  // Load raw code dynamically
  useEffect(() => {
    const loadCode = async () => {
      const importer = Index[componentName]?.code;
      if (typeof importer === "function") {
        const mod = await importer();
        setSourceCode(mod.default || ""); // ?raw exports default string
      }
    };
    loadCode();
  }, [componentName]);

  const tabs = useMemo(() => {
    if (!DemoComponent) return [];

    return [
      {
        id: "Preview",
        icon: <IoEyeOutline />,
        label: "Preview",
        content: (
          <Preview
            Component={DemoComponent}
            v0ComponentName={v0ComponentName}
            previewComponentName={previewComponentName}
          />
        ),
      },
      {
        id: "Code",
        icon: <FaCode />,
        label: "Code",
        content: <LazyCodeBlock code={sourceCode} />,
      },
    ];
  }, [DemoComponent, sourceCode, v0ComponentName, previewComponentName]);

  if (!DemoComponent) {
    return (
      <p className="text-sm text-red-500">
        Component {componentName} not found in registry.
      </p>
    );
  }

  return (
    <div>
      {introName ? (
        <ComponentPreviewIntro />
      ) : (
        exampleName && (
          <h3 className="text-2xl font-bold pb-3 pt-4 capitalize">
            {exampleName}
          </h3>
        )
      )}
      <AnimatedTabs tabs={tabs} />
    </div>
  );
};

export default ComponentPreview;
