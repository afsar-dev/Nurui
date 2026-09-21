"use client";
import BunIcon from "@/components/icons/BunIcon";
import NpmIcon from "@/components/icons/NpmIcon";
import PnpmIcon from "@/components/icons/PnpmIcon";
import YarnIcon from "@/components/icons/YarnIcon";
import { cliDependenciesMap, CliDependency } from "@/registry/cli-dependencies";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Snippet,
  SnippetCopyButton,
  SnippetHeader,
  SnippetTabsContent,
  SnippetTabsList,
  SnippetTabsTrigger,
} from "./Snippet";

interface IDependencies {
  dependencies?: CliDependency[];
  isManual?: boolean;
}

const commands = [
  {
    label: "npm",
    icon: <NpmIcon />,
    code: `npx nurui add`,
  },
  {
    label: "pnpm",
    icon: <PnpmIcon />,
    code: `pnpm dlx nurui add`,
  },
  {
    label: "bun",
    icon: <BunIcon />,
    code: `bunx nurui add`,
  },
  {
    label: "yarn",
    icon: <YarnIcon />,
    code: `yarn dlx nurui add`,
  },
];

const Cli: React.FC<IDependencies> = ({ dependencies, isManual = false }) => {
  console.log("Cli dependencies:", dependencies);
  const [value, setValue] = useState(commands[0].label);
  const pathname = usePathname();
  const slug = pathname.split("/").at(-1) ?? "";

  const resolvedDeps = isManual
    ? dependencies?.length
      ? dependencies
      : cliDependenciesMap[slug]
    : undefined;

  const activeCommand = commands.find((c) => c.label === value);
  const dependencyCommand = resolvedDeps?.find((dep) => dep.label === value);

  return (
    <Snippet value={value} onValueChange={setValue} className="w-full">
      <SnippetHeader>
        <SnippetTabsList>
          {commands.map((command) => (
            <SnippetTabsTrigger
              key={command.label}
              value={command.label}
              className={
                command.label === value
                  ? "!bg-[var(--primary-color)] dark:!bg-[var(--primary-color-4)] rounded-lg"
                  : ""
              }
            >
              <span>{command.icon}</span>
              <span>{command.label}</span>
            </SnippetTabsTrigger>
          ))}
        </SnippetTabsList>

        {resolvedDeps?.length ? (
          <SnippetCopyButton value={dependencyCommand?.command ?? ""} />
        ) : (
          <SnippetCopyButton
            value={activeCommand?.code.concat(" ", slug) ?? ""}
          />
        )}
      </SnippetHeader>

      {resolvedDeps?.length
        ? resolvedDeps.map((dep) => (
            <SnippetTabsContent key={dep.label} value={dep.label}>
              {dep.command}
            </SnippetTabsContent>
          ))
        : commands.map((command) => (
            <SnippetTabsContent key={command.label} value={command.label}>
              {command.code} {slug}
            </SnippetTabsContent>
          ))}
    </Snippet>
  );
};

export default Cli;
