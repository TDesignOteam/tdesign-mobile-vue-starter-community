import type { App } from 'vue'
import type { I18n } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { storagePrefix } from '@/config'
import { useStorage } from '@/utils/global'

// 初始只加载中文
const defaultLocale = 'zh-cn'

export const i18n: I18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en-us',
  messages: {},
  // 仅在开发环境输出缺失与回退警告，生产环境关闭以减少噪音与开销
  missingWarn: import.meta.env.DEV,
  fallbackWarn: import.meta.env.DEV,
  // 关闭基于 HTML 的消息警告
  warnHtmlMessage: false,
})

// 懒加载优化：收集 locales 下的 yaml，返回「路径 → 懒加载函数」映射（eager:false 表示运行时按需动态 import）
const localeFiles = import.meta.glob('../../locales/*.yaml', { eager: false })

function isLocaleLoaded(locale: string): boolean {
  return Object.keys(i18n.global.getLocaleMessage(locale) || {}).length > 0
}

async function loadMessagesIfNeeded(locale: string): Promise<void> {
  // 已加载则跳过，避免重复请求与 setLocaleMessage
  if (isLocaleLoaded(locale))
    return

  // 拼成与 glob 映射键一致的路径，如 ../../locales/zh-cn.yaml
  const localeKey = `../../locales/${locale}.yaml`
  const files = localeFiles as Record<string, () => Promise<{ default: any }>>
  // 从映射中取出对应语言包的懒加载函数
  const loader = files[localeKey]
  if (!loader)
    return

  try {
    // 调用时才真正触发动态 import()，获取对应 chunk
    const module = await loader()
    const messages = module?.default || {}
    // 将文案注入 i18n，供 t() 使用
    i18n.global.setLocaleMessage(locale, messages)
  }
  catch (error) {
    if (import.meta.env.DEV)
      console.warn(`Failed to load locale ${locale}:`, error)
  }
}

// 更新全局响应式 locale，使界面按新语言即时渲染
function setGlobalLocale(locale: string) {
  const localeRef = i18n.global.locale as any
  localeRef.value = locale
}

// 从本地存储读取语言配置，失败/不存在则回退默认语言
function getStoredLocale(): string {
  try {
    const { getItem } = useStorage()
    const storage = getItem<StorageConfig>(`${storagePrefix()}config`)
    return storage?.locale || defaultLocale
  }
  catch {
    return defaultLocale
  }
}

// 异步初始化 i18n
export async function initializeI18n() {
  // 从本地存储读取用户上次选择的语言
  const initialLocale = getStoredLocale()
  // 按需加载对应语言包（若尚未加载）
  await loadMessagesIfNeeded(initialLocale)
  // 设置全局语言并立即生效
  setGlobalLocale(initialLocale)

  // 空闲预取：在空闲时预取一个最可能语言（浏览器语言或回退语言）
  const requestIdle = (cb: () => void) => {
    const ric = (window as any).requestIdleCallback as undefined | ((fn: any) => number)
    if (typeof ric === 'function')
      ric(cb)
    else setTimeout(cb, 1200)
  }

  // 将浏览器语言归一化为项目支持的 locale 值
  const normalizeLang = (lang?: string): string | undefined => {
    if (!lang)
      return undefined
    const l = lang.toLowerCase().replace('_', '-')
    if (l.startsWith('zh'))
      return 'zh-cn'
    if (l.startsWith('en'))
      return 'en-us'
    return undefined
  }

  requestIdle(async () => {
    const current = (i18n.global.locale as any).value as string
    const navLang = normalizeLang(navigator?.language)
    const fallback = (i18n.global.fallbackLocale as any) as string
    // 选择预取目标：浏览器语言优先，否则使用回退语言
    const candidate = navLang && navLang !== current ? navLang : fallback
    if (candidate && candidate !== current && !isLocaleLoaded(candidate))
      await loadMessagesIfNeeded(candidate)
  })
}

// 语言切换
export async function setLanguage(locale: string) {
  // 已是目标语言则无需处理
  if ((i18n.global.locale as any).value === locale)
    return

  // 按需加载目标语言文案
  await loadMessagesIfNeeded(locale)
  // 切换全局语言，立即生效
  setGlobalLocale(locale)
}

// 在应用中安装 i18n 插件
export function useI18n(app: App) {
  app.use(i18n)
}
