import type { App } from 'vue'
import { createPinia } from 'pinia'

const store = createPinia()
export function useStore(app: App) {
  app.use(store)
}

export { store }

export * from './modules/layout'
export * from './modules/user'
