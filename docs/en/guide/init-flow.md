---
title: Initialization Flow
---

# Initialization Flow

The startup sequence of the app entry `src/main.ts`:

1. Create app instance `createApp(App)`
2. Register custom directives (if any)
3. Initialize global config `initGlobalConfig(app)`:
   - Merge external `config.json` into built-in config
   - Inject `$config` and `$storage`
4. Install Store, Storage, i18n, Message, Router
5. Initialize i18n asynchronously (load default locale messages)
6. Initialize user data (based on persisted Token)
7. Start MSW `startMsw()` in DEV or when explicitly enabled
8. Mount the app `app.mount('#app')`

```ts
// src/main.ts (excerpt)
initGlobalConfig(app).then(async () => {
  useStore(app)
  injectStorageConfig(app)
  useI18n(app)
  app.use(MessagePlugin)
  app.use(router)
  await initializeI18n()
  const userStore = useUserStore()
  userStore.initUserData()
  if (import.meta.env.DEV || import.meta.env.VITE_MSW === 'true') {
    const { startMsw } = await import('@/mocks')
    await startMsw()
  }
  app.mount('#app')
})
```
