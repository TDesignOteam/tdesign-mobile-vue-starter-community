// import type { Directive } from 'vue'

import { createApp } from 'vue'

import { initGlobalConfig, injectStorageConfig } from '@/config'
// import * as directives from '@/directives'
import { initializeI18n, useI18n } from '@/plugins/i18n'
import { MessagePlugin } from '@/plugins/message'

import { useUserStore } from '@/store/user'
import App from './App.vue'
import router from './router'
import { useStore } from './store'

import './style/reset.scss'
import './style/index.scss'
// [踩坑] TailwindCSS 放在 index 里面整合的话 HMR 会变慢
import './style/tailwind.css'
// import 'tdesign-mobile-vue/es/style/dark.css'

const app = createApp(App)

// 自定义指令
// Object.keys((directives as { [k: string]: Directive })).forEach((k) => {
//   app.directive(k, directives[k])
// })

// 初始化全局配置
initGlobalConfig(app).then(async () => {
  useStore(app)
  injectStorageConfig(app)
  useI18n(app)
  app.use(MessagePlugin)
  app.use(router)

  // 初始化 i18n
  await initializeI18n()

  // 初始化用户数据
  const userStore = useUserStore()
  userStore.initUserData()
  if (import.meta.env.DEV || import.meta.env.VITE_MSW === 'true') {
    const { startMsw } = await import('@/mocks')
    await startMsw()
  }
  app.mount('#app')
})
