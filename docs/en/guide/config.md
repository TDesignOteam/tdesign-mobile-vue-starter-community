# Application Configuration

The project manages configuration through "built-in defaults + external overrides": at startup, it reads `public/config.json` and merges it with built-in configuration, then injects it globally into the application.

## Environment Variables

- `VITE_ROUTER_MODE`: `history | hash`
- `VITE_MSW`: `true | false`
- `VITE_BASE_PATH`: Site base path (affects routing and static resources)
- `VITE_PORT`: Development server port

## Configuration Sources & Merging

Built-in configuration is located in:

- `src/config/app.config.ts`: Application title, default language `locale`, storage namespace `storageNS`
- `src/config/network.config.ts`: `baseURL`, `storage` (`localStorage | sessionStorage`)
- `src/config/theme.config.ts`: Default theme `defaultTheme`

At startup, `initGlobalConfig(app)` reads `public/config.json` and merges it, finally exposing it globally as `$config`:

```ts
// src/config/index.ts (excerpt)
const config = { ...appConfig, ...networkConfig, ...themeConfig }
export async function initGlobalConfig(app: App) {
  const res = await fetch(`${VITE_BASE_PATH}config.json`)
  if (res.ok) Object.assign(config, await res.json())
  app.config.globalProperties.$config = config
}
```

## Personalized Storage `$storage`

Select `localStorage` or `sessionStorage` based on the configuration item `storage`, and persist with namespace `${storageNS}config`; after injection to global, expose as reactive object:

```ts
// src/config/index.ts (excerpt)
;(app.config.globalProperties as any).$storage = toReactive({ locale: getGlobalConfig('locale') })
```

- Purpose: Save preferences like language, work with i18n/TDesign Provider
- Read: `const { $storage } = useGlobal()`
- Modify: `$storage.locale = 'en-us'` and also `useStorage().setItem(`${storagePrefix()}config`, $storage)`

## Example `public/config.json`

```json
{
  "version": "0.0.1",
  "locale": "zh-cn",
  "storageNS": "tmv-"
}
```

## VitePress Documentation Site Configuration

See `docs/.vitepress/config.ts`: navigation, sidebar, social links, Footer, Outline, DocFooter.

## Theme & Styling

- Based on TDesign Token, can be extended in `src/style/index.scss`
- Homepage and profile background images use 1x/2x dual sets of resources to improve clarity