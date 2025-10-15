import { Toast } from 'tdesign-mobile-vue'

export function notifyError(message: string) {
  Toast({ theme: 'error', message })
}

export function notifySuccess(message: string) {
  Toast({ theme: 'success', message })
}
