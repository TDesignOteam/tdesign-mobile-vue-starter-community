# 路由与导航

项目采用“约定式 + 手写路由”融合策略：自动生成的业务页面作为 `Layout` 子路由，登录/错误等特殊路由独立配置。

## 路由注册（节选）

```ts
// src/router/index.ts
const layoutChildren = autoRoutes.filter(r => !r.path.startsWith('/error') && !r.path.startsWith('/login'))

const router = createRouter({
  history: getRouterMode(import.meta.env.VITE_ROUTER_MODE),
  routes: [
    { path: '/', component: Layout, children: [
      { path: '', redirect: '/home' },
      ...layoutChildren,
      { path: 'notice/:id', name: 'Notice', component: () => import('@/views/notice/index.vue') },
      { path: 'login', redirect: '/login/phone' },
      { path: 'login/phone', component: () => import('@/views/login/PhoneLoginPage.vue') },
      { path: 'login/password', component: () => import('@/views/login/PasswordLoginPage.vue') },
      { path: 'login/verify', component: () => import('@/views/login/VerifyCodePage.vue') },
      { path: 'my/edit', component: () => import('@/views/my/edit.vue') },
      { path: 'my/settings', component: () => import('@/views/my/settings.vue') },
    ]},
    { path: '/login', redirect: '/login/phone' },
    ...autoRoutes.filter(r => r.path.startsWith('/error')),
    { path: '/:pathMatch(.*)*', redirect: '/error/404' },
  ],
})
```

## 路由模式

通过 `VITE_ROUTER_MODE` 控制：

```ts
// src/router/utils.ts
export function getRouterMode(mode: string) {
  const base = import.meta.env.BASE_URL || '/'
  return mode === 'hash' ? createWebHashHistory(base) : createWebHistory(base)
}
```

### 环境变量与部署注意事项

- `.env.*` 中配置 `VITE_ROUTER_MODE=hash | history`。
- `history` 模式需要服务端将未知路由重写到 `index.html`（Nginx/静态托管需配置 fallback）。
- GitHub Pages 等不支持自定义回退的托管，推荐使用 `hash` 模式。
- 如有子路径部署，请设置 `BASE_URL`（Vite 的 `base`），以确保资源路径正确。

## 导航与标题策略

`useNavigation()` 统一提供：

- `baseSidebar`：侧边目录
- `tabList`：底部 Tab 配置
- `getPageTitle()`：根据路径返回标题文本
- `handleTabChange()` / `changeToSearch()`：导航行为

> 建议将业务新页面纳入 `baseSidebar` 以便检索与跳转。