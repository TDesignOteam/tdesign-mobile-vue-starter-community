import type { Directive, DirectiveBinding } from 'vue'
import { notifyError, notifySuccess } from '@/utils/notify'

export const copy: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding // v-copy="xxx", value 就是 xxx
    const event = binding?.arg ?? 'click' // 指令参数: 比如 v-copy:click="", event就是 'click'
    el.addEventListener(event, () => {
      const textToCopy = typeof value === 'string' ? value : el.textContent || ''
      if (!textToCopy) {
        notifyError('没有可复制的内容')
        return
      }
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          notifySuccess('复制成功')
        })
        .catch(() => {
          notifyError('复制失败')
        })
    })
  },
}
