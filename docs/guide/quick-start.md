# Quick Start {#quick-start}

## Prerequisites {#prerequisites}

- System: `Windows` or `macOS`
- Recommended IDE: `VSCode`
- `Node.js` version `20.19.0` or above. If not installed, please visit the [Node.js official website](https://nodejs.org/en) to download or update.

  > Starting from `Vite 7`, `Node 18` is no longer supported. [Details>>](https://vite.dev/blog/announcing-vite7.html#node-js-support)

- `pnpm` package manager. If not installed, after installing `Node.js`, run the following command:

  ```bash
  npm install -g pnpm
  ```

## Local Development {#local-dev}

### Install Dependencies {#installation}

```bash
pnpm install
```
::: tip Note
If you encounter the error `pnpm : File xxx cannot be loaded because running scripts is disabled on this system...`, open `PowerShell` and enter:

```bash
set-ExecutionPolicy RemoteSigned
```

Type `Y` to confirm.
:::

### Run {#run}

```bash
pnpm dev
```

### Build {#build}

```bash
pnpm build
# Build & analyze
pnpm report
```

### Preview {#preview}

```bash
pnpm preview
# Build & preview
pnpm preview:build
```

## Browser Compatibility {#browser}

- Chrome: 110+
- Edge: 110+
- Firefox: 104+
- Safari: 16+

**IE is not supported 🤡**
