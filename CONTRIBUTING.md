# Contributing

Thanks for your interest in contributing to Nur/ui. We're happy to have you here.

This document will guide you through the process of setting up the project locally, contributing components, and following our commit conventions.

Please take a moment to review this document before submitting your first pull request. We also strongly recommend that you check for open issues and pull requests to see if someone else is working on something similar.

If you need any help, feel free to reach out to [afsar](https://www.linkedin.com/in/md-afsar-mahmud).

## 📦 About This Project

- Package manager: [yarn](https://yarnpkg.com/cli)
- Markdown with components: [MDX](https://mdxjs.com)

## 🚀 Getting Started

### 1. Fork and Clone the Repository

You can fork this repo by clicking the fork button in the top right corner of this page.

### Clone on your local machine

```bash
git clone https://github.com/afsar-dev/Nurui.git
```

### Navigate to project directory

```bash
cd Nurui
```

### Create a new Branch

```bash
git checkout -b my-new-branch
```

### Install dependencies

```bash
yarn install
```

### Run the Project

```bash
yarn dev
```

## Pull Request Guidelines

> **IMPORTANT:**  
> All pull requests **must be made against the `dev` branch** — **not `main`**.

Please ensure that:

- Your pull request comes **from your forked repository's feature branch**.
- You are merging **into the `dev` branch** of this repository.
- Any pull request made directly to the `main` branch **will be rejected**.

#### Correct PR:

`your-feature-branch ➡️ dev`

#### Not Allowed:

`your-feature-branch ➡️ main`

This helps us keep the `main` branch stable and production-ready.

## Folder Structure

```bash
NURUI/
├── .github/
├── .next/
├── .vercel/
├── .vscode/
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── (docs)/
│   │   ├── about-us/
│   │   ├── playground/
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── MainContent.tsx
│   │   ├── page.tsx
│   │   └── ThemeProvider.tsx
│   ├── cli/
│   │   ├── bin/
│   │   └── node_modules/
│   │       ├── README.md
│   │       ├── .npmignore
│   │       ├── package-lock.json
│   │       └── package.json
│   └── components/
│       ├── common/
│       ├── icons/
│       ├── nurui/
│       ├── pages/
│       └── ui/
├── content/
├── docs/
├── context/
├── hooks/
├── layout/
├── lib/
├── registry/
│   ├── ComponentNavigation.tsx
│   └── componentsRegistry.tsx
├── styles/
├── types/
├── utils/
├── .gitignore
├── .prettierrc.json
├── CONTRIBUTING.md
├── custom.d.ts
├── eslint.config.mjs
├── LICENSE
├── mdx-components.tsx
├── next-env.d.ts
├── next.config.ts
├── nurui-logo.png
├── og-image.png
├── package.json
├── postcss.config.mjs
├── README.md
├── registry-cli.json
├── registry.json
├── SECURITY.md
├── tailwind.config.ts
├── tailwindcss.d.ts
├── tsconfig.json
└── yarn.lock
```

## How to Add a New Component to Nurui

Follow these 7 simple steps to add a new UI component to the library.

---

### Step 1: Add to `componentNavigation.ts`

Locate `src/registry/componentNavigation.ts` and update the appropriate section (`Buttons`, `Cards`, etc.).

```ts
{
  name: "Shiny",
  href: "/docs/shiny-button",
}
```

### Step 2: Create the Component & Demo

In the path `src/components/nurui/`, create two files:

```bash
shiny-button.tsx         # Main component
shiny-button-demo.tsx    # Demo preview component
```

### Step 3: Register in componentRegistry.ts

Nur/ui now uses a dynamic registry system useing the function createEntry().

Open `src/registry/componentRegistry.ts` and add your entry:

Import the files:

```bash
import { createEntry } from "@/utils/createEntry";

export const componentsRegistry = {
  shinyButton: createEntry("shiny-button", ["shiny-button"]),
};

## This automatically loads your preview and raw code dynamically.
## If your component doesn’t follow the -demo pattern, the system will handle it conditionally.
```

### Step 4: Create .mdx File for Docs

Create a new file in src/content/:`shiny-button.mdx`

Use the following structure:

```bash
---
title: "Shiny Button"
description: "A glowing button component with customizable animations."
---

<ComponentPreview componentName="shinyButton" />

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>

<TabsContent value="cli">
  <Cli />
</TabsContent>

<TabsContent value="manual">
<Steps>
<Step>Install dependencies</Step>
<Cli
  dependencies={[
    { label: "npm", command: "npm i ..." },
    { label: "yarn", command: "yarn add ..." },
  ]}
/>
<Step>Copy and paste the following code into your project.</Step>
`components/nurui/shiny-button.tsx`
<CodeBlock componentName="shinyButton" fileName="shiny-button" />
</Steps>
</TabsContent>

</Tabs>

### Props

| Prop       | Type       | Default   | Description                   |
|------------|------------|-----------|-------------------------------|
| `variant`  | `string`   | `"glow"`  | Type of glow animation        |
| `children` | `ReactNode`| —         | Button text or nested content |
| ...props   | `button`   | —     | Standard button props         |
```

### Step 5: Add to registry.json

This powers the web registry for component open in the v0.

Open `registry.json` and add your entry:

Import the files:

```bash
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "nurui",
  "homepage": "https://nurui.vercel.app",
  "items": [
   {
      "name": "shiny-button",
      "type": "registry:component",
      "devDependencies": [],
      "dependencies": ["react-icons", "clsx", "tailwind-merge"],
      "registryDependencies": [],
      "files": [
        {
          "path": "./src/components/nurui/shiny-button-demo.tsx",
          "type": "registry:component"
        },
        {
          "path": "./src/components/nurui/shiny-button.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
## Also you can add more dependencies and files if needed.
```

### Step 6: Add to registry-cli.json (for CLI Support)

This enables users to install via:

```bash
npx nurui add shiny-button
```

Open `registry-cli.json` and add your entry:

Import the files:

```bash
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "nurui",
  "homepage": "https://nurui.vercel.app",
  "items": [
   {
      "name": "shiny-button",
      "type": "registry:component",
      "devDependencies": [],
      "dependencies": ["react-icons"],
      "registryDependencies": [],
      "files": [
        {
          "path": "./src/components/nurui/shiny-button.tsx",
          "type": "registry:component"
        }
      ]
    }
  ]
}
## Also you can add more dependencies and files if needed.
## Note: do not need to add the demo file
```

### Step 7: Run shadcn command:

```bash
npx shadcn build
```

### Step 8: Add Preview Page (Full Page Support)

NurUI supports live previews for each component at `/preview/[component]`

Open `src/app/preview/[component]/components-preview-registry.tsx` and add your entry:

```bash
import React from "react";
import dynamic from "next/dynamic";

export const componentsPreviewRegistry: Record<
  string,
  { component: React.ComponentType }
> = {
  "shiny-button": {
    component: dynamic(
      () => import("@/components/nurui/shiny-button-demo"),
    ),
  }}

## If this component is not default export then use likt this:
import("@/components/nurui/shiny-button-demo").then((mod) => mod.TextButtonDemo)
```

🔚 Done!
Your component should now appear in the sidebar, render in the preview, and have complete documentation in MDX.

## Commit Convention

Before you create a Pull Request, please check whether your commits comply with
the commit conventions used in this repository.

When you create a commit we kindly ask you to follow the convention
`category(scope or module): message` in your commit message while using one of
the following categories:

- `feat / feature`: all changes that introduce completely new code or new
  features
- `fix`: changes that fix a bug (ideally you will additionally reference an
  issue if present)
- `refactor`: any code related change that is not a fix nor a feature
- `docs`: changing existing or creating new documentation (i.e. README, docs for
  usage of a lib or cli usage)
- `build`: all changes regarding the build of the software, changes to
  dependencies or the addition of new dependencies
- `test`: all changes regarding tests (adding new tests or changing existing
  ones)
- `ci`: all changes regarding the configuration of continuous integration (i.e.
  github actions, ci system)
- `chore`: all changes to the repository that do not fit into any of the above
  categories

  e.g. `feat(components): add new prop to the avatar component`

If you are interested in the detailed specification you can visit
<https://www.conventionalcommits.org/> or check out the
[Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

## Ask for Help

For any help or questions, please open a new GitHub issue.
