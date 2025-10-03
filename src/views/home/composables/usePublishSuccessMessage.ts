import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { message as $message } from '@/plugins/message'

export interface UsePublishSuccessMessageOptions {
  /** 绑定消息的容器选择器，用于定位 Message 的 context */
  contextSelector?: string
}

export function usePublishSuccessMessage(options: UsePublishSuccessMessageOptions = {}) {
  const { t } = useI18n()
  const route = useRoute()
  const router = useRouter()

  const context = typeof document !== 'undefined'
    ? (document.querySelector(options.contextSelector ?? '.content') as Element | null)
    : null

  function showSuccessMessage() {
    $message.success(t('pages.home.messages.publish_success'), {
      duration: 2000,
      icon: true,
      zIndex: 20000,
      offset: [108, 16],
      context,
    })
  }

  async function checkAndNotifyOnce() {
    if (route.query.success === '1') {
      showSuccessMessage()
      await router.replace({
        path: route.path,
        query: { ...route.query, success: undefined },
      })
    }
  }

  return { showSuccessMessage, checkAndNotifyOnce }
}
