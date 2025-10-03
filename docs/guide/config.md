# 应用配置

项目通过“内置默认 + 外部可覆盖”的方式管理配置：启动时会读取 `public/config.json` 并合并到内置配置，然后注入到应用全局。

## 环境变量

- `VITE_ROUTER_MODE`: `history | hash`
- `VITE_MSW`: `true | false`
- `VITE_BASE_PATH`: 站点基础路径（影响路由与静态资源）
- `VITE_PORT`: 开发服务器端口

## 配置来源与合并

内置配置位于：

- `src/config/app.config.ts`：应用标题、默认语言 `locale`、存储命名空间 `storageNS`
- `src/config/network.config.ts`：`baseURL`、`storage`（`localStorage | sessionStorage`）
- `src/config/theme.config.ts`：默认主题 `defaultTheme`

启动时通过 `initGlobalConfig(app)` 读取 `public/config.json` 并合并，最终以 `$config` 暴露在全局：

```ts
// src/config/index.ts（节选）
const config = { ...appConfig, ...networkConfig, ...themeConfig }
export async function initGlobalConfig(app: App) {
  const res = await fetch(`${VITE_BASE_PATH}config.json`)
  if (res.ok) Object.assign(config, await res.json())
  app.config.globalProperties.$config = config
}
```

## 个性化存储 `$storage`

根据配置项 `storage` 选择 `localStorage` 或 `sessionStorage`，并以命名空间 `${storageNS}config` 进行持续化存储；注入到全局后以响应式对象暴露：

```ts
// src/config/index.ts（节选）
;(app.config.globalProperties as any).$storage = toReactive({ locale: getGlobalConfig('locale') })
```

- 用途：保存语言等偏好，配合 i18n/TDesign Provider 生效
- 读取：`const { $storage } = useGlobal()`
- 修改：`$storage.locale = 'en-us'` 并同时 `useStorage().setItem(`${storagePrefix()}config`, $storage)`

## 示例 `public/config.json`

```json
{
  "version": "0.0.1",
  "locale": "zh-cn",
  "storageNS": "tmv-"
}
```

## VitePress 文档站配置

见 `docs/.vitepress/config.ts`：导航、侧边栏、社交链接、Footer、Outline、DocFooter。

## 主题与样式

- 基于 TDesign Token，可在 `src/style/index.scss` 扩展
- 首页与个人中心背景图使用 1x/2x 两套资源，提升清晰度