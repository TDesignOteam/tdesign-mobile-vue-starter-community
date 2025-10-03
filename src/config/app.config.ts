export interface AppConfig {
  title: string
  locale: string
  storageNS: string
  storage: 'localStorage' | 'sessionStorage'
}

const appConfig: AppConfig = {
  title: 'TDesign Mobile',
  locale: 'zh-cn',
  storageNS: 'tdesign-mobile-',
  storage: 'localStorage',
}

export default appConfig
