import type { App, Plugin } from 'vue'
import TMessage from 'tdesign-mobile-vue/es/message'
import 'tdesign-mobile-vue/es/message/style/index.css'

export type MessageType = 'success' | 'error' | 'warning' | 'info'

export interface MessageOptions {
  duration?: number
  icon?: boolean | string
  offset?: number[]
  context?: Element | null
  zIndex?: number
}

export interface UnifiedMessageApi {
  success: (msg: string, options?: MessageOptions) => void
  error: (msg: string, options?: MessageOptions) => void
  warning: (msg: string, options?: MessageOptions) => void
  info: (msg: string, options?: MessageOptions) => void
  closeAll: () => void
}

function show(type: MessageType, message: string, options?: MessageOptions) {
  const duration = options?.duration ?? 2000
  const payload: any = {
    content: message,
    duration,
    icon: options?.icon,
    offset: options?.offset ?? [108, 16],
    context: (options?.context ?? (typeof document !== 'undefined' ? document.body : null)) as any,
    zIndex: options?.zIndex,
  }
  const api: any = TMessage as any
  if (type === 'success' && typeof api.success === 'function') {
    api.success(payload)
    return
  }
  if (type === 'error' && typeof api.error === 'function') {
    api.error(payload)
    return
  }
  if (type === 'warning' && typeof api.warning === 'function') {
    api.warning(payload)
    return
  }
  if (typeof api.info === 'function') {
    api.info(payload)
  }
}

export const message: UnifiedMessageApi = {
  success: (msg, options) => show('success', msg, options),
  error: (msg, options) => show('error', msg, options),
  warning: (msg, options) => show('warning', msg, options),
  info: (msg, options) => show('info', msg, options),
  closeAll: () => {
    try {
      (TMessage as any).closeAll?.()
    }
    catch {}
  },
}

export const MessagePlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$message = message
  },
}
