# Nurui CLI

The **Nurui CLI** is a command-line tool for working with the [Nurui UI component library](https://nurui.vercel.app).  
It helps you quickly **list, add, and scaffold components** into your project with minimal setup.

---

## 1. Introduction

Nurui CLI is designed to:

- **Speed up development** by scaffolding ready-to-use components
- **List available components** from the Nurui catalog
- **Generate TypeScript or JavaScript** code based on your project setup
- **Maintain consistent folder structures** for your UI components

---

## 2. Installation

If you installed `nurui` via a package manager, you likely already have the CLI available as `nurui`.  
If not, install it as a dev dependency:

```bash
# npm
npm install -D nurui-cli

# pnpm
pnpm add -D nurui-cli

# bun
bun add -D nurui-cli

# yarn
yarn add -D nurui-cli
```

You can also run it without installation using `npx`/`pnpm dlx`/`bunx`/`yarn dlx`.

---

## 3. Basic Usage

Run the CLI using:

```bash
npx nurui <command> [options]
```

If installed locally:

```bash
yarn nurui <command>
```

---

## 4. Commands

### `list`

Displays all available components that can be added to your project.

```bash
npx nurui list
```

**Example output:**

```
Available components:
- button
- gradient-button
- card
- form
- modal
```

---

### `add <component-name>`

Adds a component from the Nurui catalog into your project.

```bash
npx nurui add gradient-button
```

**Result:**

```
✔ GradientButton component created at: components/nurui/GradientButton.tsx
```

---

### `g component <Name>`

Generates a new blank component scaffold.

```bash
npx nurui g component Alert
```

This will create:

```
components/nurui/Alert.tsx
components/nurui/Alert.stories.tsx
components/nurui/Alert.test.tsx
```

---

## 5. Options / Flags

| Flag           | Description                                         | Example                             |
| -------------- | --------------------------------------------------- | ----------------------------------- |
| `--dir <path>` | Specify a custom directory for generated components | `npx nurui add button --dir src/ui` |
| `--js`         | Force JavaScript output instead of TypeScript       | `npx nurui add card --js`           |
| `--overwrite`  | Overwrite existing files if they already exist      | `npx nurui add modal --overwrite`   |
| `--dry-run`    | Show what will be generated without writing files   | `npx nurui add input --dry-run`     |

---

## 6. Examples

**List components:**

```bash
npx nurui list
```

**Add a Gradient Button to your project:**

```bash
npx nurui add gradient-button
```

**Generate a new custom component in `src/ui` as JS:**

```bash
npx nurui g component Banner --dir src/ui --js
```

---

## 7. Tips

- Always commit your changes **before running `--overwrite`** to avoid losing work.
- Use `--dry-run` to preview what will be created.
- Keep component names **PascalCase** for consistency (`AlertBox`, `UserCard`).
- Ensure your project paths in imports match your folder structure.

---

## 8. License

This CLI is part of the [Nurui UI](https://nurui.vercel.app) project and licensed under the [MIT License](../../LICENSE).
