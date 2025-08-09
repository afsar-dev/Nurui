<h1 align="center">
  <img src="nurui-logo.png" alt="Nurui Logo" width="200" />
</h1>

<p align="center"><b>Nurui</b> — A production-ready React & Next.js UI component library for building fast, beautiful, and accessible interfaces.</p>

<p align="center">
  <a href="https://nurui.vercel.app/docs/installation"><b>Documentation</b></a> •
  <a href="#features">Features</a> •
  <a href="#installation">Install</a> •
  <a href="#add-components">Add Components</a> •
  <a href="#contributing">Contribute</a>
</p>

<p align="center">
  <img alt="License" src="https://img.shields.io/github/license/afsar-dev/Nurui?label=License&style=flat-square">
  <img alt="Last Commit" src="https://img.shields.io/github/last-commit/afsar-dev/Nurui?style=flat-square">
  <img alt="Issues" src="https://img.shields.io/github/issues/afsar-dev/Nurui?style=flat-square">
  <img alt="PRs welcome" src="https://img.shields.io/badge/PRs-welcome-1abc9c.svg?style=flat-square">
</p>

<img src="og-image.png" alt="Nurui UI component library" width="100%" />

---

## About Nurui

Nurui provides a modern set of React/Next.js UI components with built-in CLI scaffolding, TypeScript to JavaScript conversion, and live previews for faster, more customizable workflows.  
It’s production-ready, accessible by default, and easy to theme.

---

## Features

- Next.js-first — Works seamlessly with App Router and Pages Router
- Themeable — CSS variables, design tokens, and dark mode ready
- Component Library + CLI — Scaffold new components instantly
- Live Previews — Iterate faster in a playground environment
- Accessible by default — ARIA roles, keyboard navigation, focus management
- Tree-shakable — Import only what you need
- TypeScript and JavaScript Support — Works in both environments

---

## Installation

Install Nurui and the CLI with your preferred package manager:

```bash
# npm
npm install nurui nurui-cli

# pnpm
pnpm add nurui nurui-cli

# bun
bun add nurui nurui-cli

# yarn
yarn add nurui nurui-cli
```

---

## View All Available Components

List all supported components you can scaffold:

```bash
npx nurui list
```

---

## Add Components

Add any component to your project using the CLI:

```bash
# npm
npx nurui add gradient-button

# pnpm
pnpm dlx nurui add gradient-button

# bun
bunx nurui add gradient-button

# yarn
yarn dlx nurui add gradient-button
```

This will generate the `GradientButton` component in:

```
components/nurui/GradientButton.tsx
```

---

## Import and Use a Component

```tsx
import { GradientButton } from "@/components/nurui/GradientButton";

export default function Home() {
  return (
    <div>
      <GradientButton />
    </div>
  );
}
```

Update the import path to match your project’s folder structure.

---

## Local Development Setup

```bash
# 1. Clone the repository
git clone https://github.com/afsar-dev/Nurui.git
cd Nurui

# 2. Create a .env file in the root directory:
echo "NODE_ENV=development" > .env

# 3. Install dependencies
yarn install

# 4. Start the development server
yarn dev

# App runs at http://localhost:3000
```

---

## Contributing

We welcome contributions!

1. Fork the repo
2. Create a feature branch (`feat/amazing-feature`)
3. Commit with conventional messages
4. Open a PR

See the [Contributing Guide](https://github.com/afsar-dev/Nurui/blob/main/CONTRIBUTING.md) for details.

---

## License

Licensed under the [MIT License](https://github.com/afsar-dev/Nurui/blob/main/LICENSE).

---

## Author

**Md Afsar Mahmud** — Full Stack Developer
[HackerRank](https://www.hackerrank.com/profile/mdafsar) •
[LinkedIn](https://www.linkedin.com/in/md-afsar-mahmud)
