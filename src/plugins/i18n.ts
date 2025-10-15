import type { App } from 'vue'
import type { I18n } from 'vue-i18n'

// import enLocale from 'tdesign-mobile-vue/es/locale/en_US'
// import zhLocale from 'tdesign-mobile-vue/es/locale/zh_CN'

import { createI18n } from 'vue-i18n'

// 此处要设置为立即执行函数
const processI18n = (function () {
  // 自动匹配 locales 目录下的yaml文件，转换为键值对数组形式
  const localeFiles: [string, any][] = Object.entries(
    import.meta.glob('../../locales/*.y(a)?ml', { eager: true }),
  )
  // 清洗匹配到的内容 --> ['zh-cn', obj][]
  const localeArr = localeFiles.map(([k, v]) => {
    const key = k.match(/([\w-]+)\./)[1]
    return [key, v.default]
  })

  // 将数组还原回 obj --> { 'zh-cn': {...}, 'en-us': {...} }
  const locale = Object.fromEntries(localeArr)

  return (lang = 'zh-cn') => {
    return locale[lang]
  }
})()

const locales = {
  'zh-cn': {
    ...processI18n('zh-cn'),
    // ...zhLocale,
  },
  'en-us': {
    ...processI18n('en-us'),
    // ...enLocale,
  },
}

/** 仅迎合 `lokalise.i18n-ally` 插件，并无实际意义 */
export const $t = (val: string) => val

// 🤔 此处要不要写一个函数，用来专门翻译国际化，避免某些语言翻译不全呢？？

export const i18n: I18n = createI18n({
  legacy: false,
  locale: 'zh-cn', // 初始语言，在 App.vue 中有所处理
  fallbackLocale: 'en-us',
  messages: locales,
})

export function useI18n(app: App) {
  app.use(i18n)
}
