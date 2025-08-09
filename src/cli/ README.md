# Nurui CLI

Command-line tool for [Nurui UI](https://nurui.vercel.app) to list, add, and scaffold components.

---

## Install

```bash
npm install -D nurui-cli       # npm
pnpm add -D nurui-cli          # pnpm
bun add -D nurui-cli           # bun
yarn add -D nurui-cli          # yarn
```

Run without install:

```bash
npx nurui <command>
```

---

## Commands

```bash
npx nurui list                          # View components
npx nurui add gradient-button           # Add component
npx nurui g component Alert             # Generate blank component
```

---

## Flags

| Flag           | Description             |
| -------------- | ----------------------- |
| `--dir <path>` | Custom output directory |
| `--js`         | Generate JavaScript     |
| `--overwrite`  | Replace existing files  |
| `--dry-run`    | Preview without writing |

---

## Tips

- Commit before `--overwrite`
- Use `--dry-run` before generating
- Use PascalCase for component names

---

**License:** [MIT](../../LICENSE)
