import type { Directive, DirectiveBinding } from 'vue'

export const imgLazy: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding // v-img-lazy="imageUrl"

    if (!(el instanceof HTMLImageElement)) {
      if (import.meta.env.DEV) {
        console.error('v-img-lazy: 指令只能用于 img 元素')
      }
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          const src = typeof value === 'string' ? value : img.dataset.src || ''

          if (src) {
            img.src = src
            observer.unobserve(img)
          }
        }
      })
    })

    observer.observe(el)
    ;(el as any).__imgLazyObserver__ = observer
  },
  unmounted(el: HTMLElement) {
    const observer = (el as any).__imgLazyObserver__ as IntersectionObserver | undefined
    if (observer) {
      observer.disconnect()
    }
    delete (el as any).__imgLazyObserver__
  },
}
