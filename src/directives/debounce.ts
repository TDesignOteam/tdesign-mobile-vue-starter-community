import type { Directive, DirectiveBinding } from 'vue'

export const debounce: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value, arg, modifiers } = binding
    const event = Object.keys(modifiers)[0] || 'click'
    const delay = Number(arg) || 500

    if (typeof value !== 'function') {
      if (import.meta.env.DEV) {
        console.error('v-debounce: 绑定值必须是函数')
      }
      return
    }

    let timer: NodeJS.Timeout | null = null

    // 定义事件处理函数
    const debounceFn = () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        value()
      }, delay)
    }

    // 保存事件名和处理函数到元素上，便于卸载时移除
    ;(el as any).__debounceFn__ = { event, debounceFn }

    el.addEventListener(event, debounceFn)
  },
  unmounted(el: HTMLElement) {
    const data = (el as any)?.__debounceFn__
    if (data) {
      el.removeEventListener(data.event, data.debounceFn)
      delete (el as any).__debounceFn__
    }
  },
}
