import type { Reactive } from 'vue'

declare global {

  /** 全局 Vite 环境变量 */
  interface VITE_ENV {
    VITE_PORT: number
    VITE_BASE_PATH: string
    VITE_ROUTER_MODE: string
    VITE_API_BASE_URL: string
  }

  /** Mock 数据配置 */
  interface MockModule {
    url: string
    method: 'GET' | 'POST'
    response: (params: { query: URLSearchParams, body: any }) => any
  }

  /** 项目全局配置，对应 `public/config.json` */
  interface GlobalConfig {
    /** 版本号 */
    version?: string
    /** 默认语言 */
    locale?: string
    /** 本地存储命名空间 */
    storageNS?: string
  }

  /**
   * 需要保存的配置项 😯
   * 一些静态的配置项：版本、标题等无需保存
   * 一些个性化配置项：语言、布局、主题等需要本地保存
   * 当配置项较多的时候，应考虑往下细分
   */
  interface StorageConfig {
    locale: string
  }

  /** 组件内全局访问属性 */
  interface GlobalProperties {
    /** 原始配置 */
    $config: GlobalConfig
    /** 缓存配置，响应式 */
    $storage: Reactive<StorageConfig>
  }

  /** 全局 HTTP 请求响应体，后端统一响应结构 */
  interface BaseHttpResp<T = any> {
    code: number
    message: string
    data: T
    /** 分页查询，条目总数 */
    total?: number
    success: boolean
  }
}

// https://router.vuejs.org/guide/advanced/meta.html#TypeScript
declare module 'vue-router' {
  // 扩展路由元信息类型
  interface RouteMeta {
    title?: string
    i18n?: string
    hideHeader?: boolean
    showFooter?: boolean
    showBackground?: boolean
    backgroundColor?: string
  }
}

export {}
