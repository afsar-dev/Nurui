import { ComponentSource } from "@/components/common/component-source";
import { cn } from "@/lib/utils";
import type { MDXComponents } from "mdx/types";
import ComponentPreview from "@/components/common/ComponentPreview";
import Cli from "@/components/ui/cli/Cli";
import { CodeBlock } from "@/components/ui/code-block/CodeBlock";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/common/Tabs";
import Link from "next/link";
import ComponentsPage from "./src/components/pages/components/ComponentsPage";

export function getMDXComponents(
  components: MDXComponents = {},
): MDXComponents {
  return {
    h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h1
        className={cn(
          "text-3xl font-semibold pb-2 border-b border-[var(--primary-color)] dark:border-[var(--primary-color-3)] text-[var(--primary-color)]",
          className,
        )}
        {...props}
      />
    ),

    h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        id="installation"
        className={cn(
          "text-2xl font-semibold pt-10 pb-2 mb-6 border-b border-[var(--primary-color)] dark:border-[var(--primary-color-3)]",
          className,
        )}
        {...props}
      />
    ),

    h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h2
        id="props"
        className={cn(
          "text-xl font-semibold pt-10 pb-2 border-b border-[var(--primary-color)] dark:border-[var(--primary-color-3)]",
          className,
        )}
        {...props}
      />
    ),

    h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
      <h6
        className={cn("text-base font-semibold py-5", className)}
        {...props}
      />
    ),

    a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
      <CustomLink
        className={cn("font-medium underline underline-offset-4", className)}
        {...props}
      />
    ),

    p: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLParagraphElement>) => (
      <p
        className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
        {...props}
      />
    ),

    ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
      <ul className={cn("ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
      <ol className={cn("ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <li className={cn("mt-2", className)} {...props} />
    ),

    table: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6 w-full overflow-y-auto rounded-lg border border-[var(--primary-color)]  dark:border-[var(--primary-color-3)]">
        <table
          className={cn("my-0 w-full overflow-hidden", className)}
          {...props}
        />
      </div>
    ),

    thead: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <thead
        className={cn(
          "border-b border-[var(--primary-color)] dark:border-[var(--primary-color-3)] bg-[var(--primary-color-3)] dark:bg-[var(--primary-color-5)]",
          className,
        )}
        {...props}
      />
    ),

    tr: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableRowElement>) => (
      <tr
        className={cn(
          "border-b border-[var(--primary-color)] dark:border-[var(--primary-color-3)] last:border-b-0",
          className,
        )}
        {...props}
      />
    ),

    th: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <th
        className={cn(
          "text-balance border-r border-[var(--primary-color)] dark:border-[var(--primary-color-3)] px-6 py-3 text-left font-mono text-sm font-semibold tracking-tight last:border-r-0",
          className,
        )}
        {...props}
      />
    ),

    td: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <td
        className={cn(
          "border-r border-[var(--primary-color)] dark:border-[var(--primary-color-3)] px-6 py-3 text-sm last:border-r-0 [&[align=center]]:text-center [&[align=right]]:text-right",
          className,
        )}
        {...props}
      />
    ),

    Tabs: ({ className, ...props }: React.ComponentProps<typeof Tabs>) => (
      <Tabs
        className={cn(
          "relative mt-6 w-full overflow-x-auto overflow-y-hidden",
          className,
        )}
        {...props}
      />
    ),

    TabsList: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsList>) => (
      <TabsList
        className={cn(
          "w-full justify-start rounded-none border-b border-[var(--primary-color)] dark:border-[var(--primary-color-3)] bg-transparent p-0",
          className,
        )}
        {...props}
      />
    ),

    TabsTrigger: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsTrigger>) => (
      <TabsTrigger
        className={cn(
          "relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-black dark:data-[state=active]:border-b-white data-[state=active]:text-foreground data-[state=active]:shadow-none",
          className,
        )}
        {...props}
      />
    ),

    TabsContent: ({
      className,
      ...props
    }: React.ComponentProps<typeof TabsContent>) => (
      <TabsContent
        className={cn(
          "relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold",
          className,
        )}
        {...props}
      />
    ),

    ComponentSource: (props: React.ComponentProps<typeof ComponentSource>) => (
      <ComponentSource {...props} />
    ),

    Step: ({ className, ...props }: React.ComponentProps<"h3">) => (
      <h3
        className={cn(
          "font-heading tracking-tight text-black dark:text-white",
          className,
        )}
        {...props}
      />
    ),

    Steps: ({ ...props }) => (
      <div
        className="[&>h3]:step steps ml-4 border-l border-black dark:border-white/20 pl-8 [counter-reset:step] -mt-7 space-y-4"
        {...props}
      />
    ),

    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <code
        className={cn(
          "relative rounded shadow-md dark:shadow-none border dark:border-none bg-white dark:bg-white/10 px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className,
        )}
        {...props}
      />
    ),

    blockquote: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLElement>) => (
      <blockquote
        className={cn("mt-6 border-l-2 pl-6 italic", className)}
        {...props}
      />
    ),

    CodeBlock,
    ComponentPreview,
    Cli,
    ComponentsPage,
    ...components,
  };
}

const CustomLink = (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { href = "", children, ...rest } = props;

  if (href.startsWith("/")) {
    return (
      <Link {...rest} href={href}>
        {children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return (
      <a {...rest} href={href}>
        {children}
      </a>
    );
  }

  return (
    <a target="_blank" rel="noopener noreferrer" {...rest} href={href}>
      {children}
    </a>
  );
};
