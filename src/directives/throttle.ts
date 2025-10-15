import type { Directive, DirectiveBinding } from 'vue'

export const throttle: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value, arg, modifiers } = binding
    const event = Object.keys(modifiers)[0] || 'click'
    const delay = Number(arg) || 500

    if (typeof value !== 'function') {
      if (import.meta.env.DEV) {
        console.error('v-throttle: 绑定值必须是函数')
      }
      return
    }

    let timer: NodeJS.Timeout | null = null

    const throttleFn = () => {
      if (timer)
        return
      value()
      timer = setTimeout(() => {
        timer = null
      }, delay)
    }
    ;(el as any).__throttleFn__ = { event, throttleFn }

    el.addEventListener(event, throttleFn)
  },
  unmounted(el: HTMLElement) {
    const data = (el as any)?.__throttleFn__
    if (data) {
      el.removeEventListener(data.event, data.throttleFn)
      delete (el as any).__throttleFn__
    }
  },
}
