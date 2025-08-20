"use client";
import { useState } from "react";
import {
  Snippet,
  SnippetHeader,
  SnippetTabsTrigger,
  SnippetTabsList,
  SnippetCopyButton,
  SnippetTabsContent,
} from "./Snippet";
import PnpmIcon from "@/components/icons/PnpmIcon";
import NpmIcon from "@/components/icons/NpmIcon";
import YarnIcon from "@/components/icons/YarnIcon";
import BunIcon from "@/components/icons/BunIcon";
import { usePathname } from "next/navigation";

interface IDependencies {
  dependencies: {
    label: string;
    command: string;
  }[];
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

const Cli: React.FC<IDependencies> = ({ dependencies }) => {
  const [value, setValue] = useState(commands[0].label);
  const activeCommand = commands?.find((command) => command.label === value);
  const dependencieCommand = dependencies?.find((dep) => dep.label === value);
  const componentName = usePathname().split("/");

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
        {dependencies?.length ? (
          <SnippetCopyButton value={dependencieCommand?.command ?? ""} />
        ) : (
          <SnippetCopyButton
            value={
              activeCommand?.code.concat(
                " ",
                componentName[componentName.length - 1],
              ) ?? ""
            }
          />
        )}
      </SnippetHeader>
      {dependencies?.length
        ? dependencies.map((dep) => (
            <SnippetTabsContent key={dep.label} value={dep.label}>
              {dep.command}
            </SnippetTabsContent>
          ))
        : commands.map((command) => (
            <SnippetTabsContent key={command.label} value={command.label}>
              {command.code} {componentName[componentName.length - 1]}
            </SnippetTabsContent>
          ))}
    </Snippet>
  );
};

export default Cli;
