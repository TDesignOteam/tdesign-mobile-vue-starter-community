# Getting Started

## Environment

- Node.js ≥ 18
- Package Manager: Recommend pnpm (also supports npm/yarn)

## Install Dependencies

```bash
pnpm install
```

## Start Development

```bash
pnpm dev
```

- Default address: `http://localhost:5173`
- Port & base path: `.env.*` → `VITE_PORT`, `VITE_BASE_PATH`
- Router mode: `.env.*` → `VITE_ROUTER_MODE=history|hash`
- Mock: `.env.*` → `VITE_MSW=true`; or console `window.__MSW_ENABLED__ = true`

## Build & Preview

```bash
pnpm build
pnpm preview
```

## Common Scripts (excerpt)

```json
{
  "scripts": {
    "dev": "pnpm run dev:app",
    "dev:app": "cross-env NODE_OPTIONS=--max-old-space-size=4096 vite",
    "build": "rimraf dist && cross-env NODE_OPTIONS=--max-old-space-size=8192 vite build",
    "preview": "vite preview",
    "report": "rimraf dist && cross-env NODE_OPTIONS=--max-old-space-size=8192 vite build --mode report",
    "lint": "eslint --cache --max-warnings 0 \"{src,mock,build}/**/*.{vue,js,ts,tsx,css,scss}\" --fix"
  }
}
```

## Environment Variables Quick Reference

- `VITE_BASE_PATH`: Application base path (affects routing & static resources)
- `VITE_PORT`: Dev server port (see `vite.config.ts`)
- `VITE_ROUTER_MODE`: `history | hash` (see `src/router/utils.ts`)
- `VITE_MSW`: Enable MSW Mock (see `src/mocks/index.ts`)

## Directory Overview (simplified)

```text
src/
  api/            # Request wrapper & business interfaces
  layout/         # Layout: Header/BottomNav/Global navigation
  views/          # Business pages
  store/          # Pinia & persistence
  plugins/        # i18n, message and other plugins
  mocks/          # MSW Mock & data
  router/         # Routing & utilities
  style/          # Styles & themes
```

> DX: Pre-configured with auto-import/component on-demand, auto-routing, i18n compilation, SVG components, Tailwind 4, build compression & bundle analysis; see each section for details.