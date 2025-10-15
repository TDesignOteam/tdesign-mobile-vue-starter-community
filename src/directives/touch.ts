import type { Directive, DirectiveBinding } from 'vue'

interface TouchOptions {
  tap?: () => void
  longpress?: () => void
  swipe?: (direction: 'left' | 'right' | 'up' | 'down') => void
}

export const touch: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding // v-touch="options" 或 v-touch:tap="handler"
    const event = binding?.arg as keyof TouchOptions // 指令参数: v-touch:tap, v-touch:longpress, v-touch:swipe

    let startX = 0
    let startY = 0
    let startTime = 0
    let longPressTimer: NodeJS.Timeout | null = null

    // 处理不同的绑定方式
    const options: TouchOptions = typeof value === 'function' && event
      ? { [event]: value }
      : value || {}

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0]
      startX = touch.clientX
      startY = touch.clientY
      startTime = Date.now()

      // 长按处理
      if (options.longpress) {
        longPressTimer = setTimeout(() => {
          options.longpress?.()
        }, 300) // 300ms 触发长按
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      // 清除长按定时器
      if (longPressTimer) {
        clearTimeout(longPressTimer)
        longPressTimer = null
      }

      const touch = e.changedTouches[0]
      const endX = touch.clientX
      const endY = touch.clientY
      const endTime = Date.now()

      const deltaX = endX - startX
      const deltaY = endY - startY
      const deltaTime = endTime - startTime

      // 点击判断（时间短且移动距离小）
      if (deltaTime < 300 && Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        options.tap?.()
        return
      }

      // 滑动判断
      const minSwipeDistance = 50
      if (Math.abs(deltaX) > minSwipeDistance || Math.abs(deltaY) > minSwipeDistance) {
        let direction: 'left' | 'right' | 'up' | 'down'

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          direction = deltaX > 0 ? 'right' : 'left'
        }
        else {
          direction = deltaY > 0 ? 'down' : 'up'
        }

        options.swipe?.(direction)
      }
    }

    const handleTouchMove = () => {
      // 移动时取消长按
      if (longPressTimer) {
        clearTimeout(longPressTimer)
        longPressTimer = null
      }
    }

    // 添加事件监听
    el.addEventListener('touchstart', handleTouchStart, { passive: true })
    el.addEventListener('touchend', handleTouchEnd, { passive: true })
    el.addEventListener('touchmove', handleTouchMove, { passive: true })

    ;(el as any).__touchFn__ = {
      handleTouchStart,
      handleTouchEnd,
      handleTouchMove,
    }
  },
  unmounted(el: HTMLElement) {
    const handlers = (el as any).__touchFn__
    if (handlers) {
      el.removeEventListener('touchstart', handlers.handleTouchStart)
      el.removeEventListener('touchend', handlers.handleTouchEnd)
      el.removeEventListener('touchmove', handlers.handleTouchMove)
      delete (el as any).__touchFn__
    }
  },
}
