import type { App, Plugin } from 'vue'
import { stroagePrefix } from '@/config'

/**
 * 获取已注册的全局配置
 * @see https://vuejs.org/api/application.html#app-config-globalproperties
 */
export function useGlobal<T = GlobalProperties>(): T {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('请在使用 setup 的 vue 组件内使用此函数，且尽可能避免在内部函数中调用')
  }
  return instance.appContext.config.globalProperties as T
}

/**
 * 操作存储
 * @param type 存储类型，默认 `local`
 */
export function useStorage(type: 'local' | 'session' = 'local') {
  const storage = type === 'local' ? localStorage : sessionStorage
  const prefix = stroagePrefix()

  function getItem<T>(k: string): T {
    const val = storage.getItem(`${prefix}${k}`)
    if (val === null) {
      return null
    }
    try {
      return JSON.parse(val) as T
    }
    catch {
      throw new Error(`Failed to parse ${type}Storage key "${k}" of "${val}"`)
    }
  }

  function setItem<T>(k: string, v: T) {
    storage.setItem(`${prefix}${k}`, JSON.stringify(v))
  }

  function removeItem(k: string) {
    storage.removeItem(`${prefix}${k}`)
  }

  function clearAll() {
    storage.clear()
  }

  return {
    getItem,
    setItem,
    removeItem,
    clearAll,
  }
}

/**
 * 为组件添加 install 方法，使其既能被 import 使用，又能被 app.use 使用
 *
 * 参考了 ep 源码实现方式
 * @param component Vue 组件
 * @returns 带有 install 方法的组件
 * @see https://github.com/element-plus/element-plus/blob/dev/packages/utils/vue/install.ts#L6
 */
export function withInstall<T>(component: T) {
  const comp = component as T & Plugin
  comp.install = (app: App) => {
    // 提取 name，用作后续判断
    const compName = (comp as any)?.name

    if (!compName) {
      // name 是必须的
      // 参考 https://github.com/vuejs/core/blob/main/packages/runtime-core/src/apiCreateApp.ts#L329
      throw new Error(`组件 name 属性丢失，无法注册`)
    }

    app.component(compName, comp as any)
  }
  return comp
}
