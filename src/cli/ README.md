# Nurui CLI

Use the Nurui CLI to list and add components to your project.

---

## list

Use the `list` command to view all available components.

```bash
npx nurui list
```

Example output:

```
┌  Welcome to Nur UI CLI
│
◇  📦 Available components:

• gradient-button
• border-button
• shiny-card
• spotlight-card
• contact-form
• video-modal
• gradient-hero
• spotlight-hero
• animated-pricing
• project-showcase
│
└  ✨ End of list.
```

---

## add

Use the `add` command to add a component to your project.
Downloads the component and styles, creates `lib/utils`, and installs required dependencies.

```bash
npx nurui add <component-name>
```

Example:

```bash
npx nurui add gradient-button
```

> Note: The `add` command **requires** a component name.
> If you run `npx nurui add` without a name, the CLI prints usage and exits.

---

## How it works (behind the scenes)

When you run:

```bash
npx nurui add gradient-button
```

1. Fetches the component registry from GitHub (`registry-cli.json`).
2. Finds `gradient-button` in the registry.
3. Prompts you to choose **TypeScript (.tsx)** or **JavaScript (.jsx)**.
4. Downloads files from the repo:
   - component files → `components/nurui/`
   - styles (`.css`) → `components/nurui/styles/`

5. Ensures `lib/utils.ts` or `lib/utils.js` exists (adds `cn` helper using `clsx` + `tailwind-merge`).
6. If JavaScript selected, transpiles `.tsx` → `.jsx` (TypeScript + Prettier).
7. Detects your package manager (`yarn` / `pnpm` / `bun` / `npm`) and installs any required dependencies for that component.
8. Prints a success summary.
