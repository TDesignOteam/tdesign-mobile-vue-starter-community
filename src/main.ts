import type { Directive } from 'vue'

import { createApp } from 'vue'

import { DynamicScroller, DynamicScrollerItem, RecycleScroller } from 'vue-virtual-scroller'
import Banner from '@/components/Banner'
import { initGlobalConfig, injectStorageConfig } from '@/config'
import * as directives from '@/directives'
import { useI18n } from '@/plugins/i18n'

import App from './App.vue'
import router from './router'
import { useStore } from './store'

import './style/reset.scss'
import './style/index.scss'
// [踩坑] TailwindCSS 放在 index 里面整合的话 HMR 会变慢
import './style/tailwind.css'
import 'tdesign-mobile-vue/es/style/index.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const app = createApp(App)

// 自定义指令
Object.keys((directives as { [k: string]: Directive })).forEach((k) => {
  app.directive(k, directives[k])
})

// 初始化全局配置
initGlobalConfig(app).then(() => {
  useStore(app)
  injectStorageConfig(app)

  app
    .use(useI18n)
    .use(router)
    .use(Banner)
    .component('RecycleScroller', RecycleScroller)
    .component('DynamicScroller', DynamicScroller)
    .component('DynamicScrollerItem', DynamicScrollerItem)

  app.mount('#app')
})
