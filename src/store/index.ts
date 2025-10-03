import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { getGlobalConfig } from '@/config'

// 创建 pinia 实例
const store = createPinia()

// 配置持久化插件
store.use(piniaPluginPersistedstate)
// 记录已创建的 store 实例，避免依赖私有 API
const registeredStores = new Set<any>()
store.use((ctx) => {
  registeredStores.add(ctx.store)
})

export function setupStore(app: App) {
  app.use(store)
}

// 不再需要在各个 store 手动注册，已通过 plugin 自动收集
export function resetAllStores() {
  registeredStores.forEach((storeInstance) => {
    if (typeof storeInstance.$reset === 'function') {
      storeInstance.$reset()
    }
  })
}

export function getPersistConfig(key: string) {
  const storagePrefix = getGlobalConfig('storageNS') || 'tdesign-mobile-'
  return {
    key: `${storagePrefix}${key}`,
    storage: (getGlobalConfig('storage') === 'sessionStorage' ? sessionStorage : localStorage),
  }
}

export { store }
export * from './user'
export { setupStore as useStore }
