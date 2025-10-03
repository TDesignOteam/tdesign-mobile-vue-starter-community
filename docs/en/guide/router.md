---
title: Router & Navigation
---

# Router & Navigation

The project adopts a hybrid strategy of convention-based and hand-written routes: auto-generated business pages are mounted as `Layout` children, while special routes like login/error are configured separately.

## Router registration (excerpt)

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

## Router mode

Controlled by `VITE_ROUTER_MODE`:

```ts
// src/router/utils.ts
export function getRouterMode(mode: string) {
  const base = import.meta.env.BASE_URL || '/'
  return mode === 'hash' ? createWebHashHistory(base) : createWebHistory(base)
}
```

### Environment Variables & Deployment Notes

- Configure `VITE_ROUTER_MODE=hash | history` in `.env.*`.
- `history` mode requires server fallback to `index.html` for unknown routes (configure rewrite on Nginx/static hosts).
- For hosts without custom fallback (e.g., GitHub Pages), prefer `hash` mode.
- If deploying under a sub-path, set `BASE_URL` (Vite `base`) to ensure correct asset paths.

## Navigation and title strategy

Provided by `useNavigation()`:

- `baseSidebar`: side menu
- `tabList`: bottom tab configuration
- `getPageTitle()`: returns title text based on path
- `handleTabChange()` / `changeToSearch()`: navigation behaviors

> Suggest adding new business pages to `baseSidebar` for quick access.
