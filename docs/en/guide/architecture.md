# Architecture & Modules

Following the philosophy of "pages as modules, components as building blocks", with clear layering and well-defined boundaries:

- View Layer (`views/*`): Pages and business logic
- Layout Layer (`layout/*`): Unified framework (Header / Drawer / BottomNav)
- State Layer (`store/*`): Pinia + modular persistence
- Data Layer (`api/*`, `mocks/*`): HTTP client and MSW endpoints
- Utility Layer (`utils/*`, `config/*`, `plugins/*`): Utility functions, runtime configuration, i18n, messaging

## Layer Responsibilities & Collaboration

- View Layer: Render pages by routes, aggregate components and business logic
- Layout Layer: Unified navigation and global interaction containers
- State Layer: Cross-page shared state; side effect entry points (e.g., inject token into httpClient)
- Data Layer: Standardize requests, unified return semantics
- Utility Layer: Inject `$config`, `$storage`, provide i18n and global messaging

## Data Flow & Boundaries

1. Components call interfaces through `api/*`
2. `httpClient` standardizes returns and errors, emits observable results
3. State that needs persistence is written to `store/*`
4. Pages drive UI through `useNavigation()`, `useLayoutState()`

## Design Highlights

- Routing: Conventional auto + manual enhancement, flexible yet consistent
- i18n: Lazy loading + caching, reducing first screen pressure
- Mock: Switchable, independent of real interfaces
- Configuration: `initGlobalConfig()` supports external `config.json` injection

## Packaging Strategy

- Split core dependencies into: `vue-vendor`, `tdesign`, `i18n`, `dayjs`, `vueuse`, `vendor`
- Improve cache hit rates and on-demand loading speed (see `vite.config.ts#manualChunks`)

> Engineering enhancements concentrated in `build/plugins.ts`: auto-import, auto-routing, i18n compilation, SVG components, Tailwind 4, resource pre-compression and size analysis.

## Typical Interaction Flow

1. Startup: Inject `$config/$storage` → Install i18n/Router/Store → Initialize i18n → Optionally start Mock → `mount`
2. Login: Submit form → `auth.ts` → `useUserStore.handleLoginSuccess()` write token/user → Inject Authorization header
3. Search: Input changes → Trigger request (pass `AbortSignal`) → Route switch or next input interrupts previous request