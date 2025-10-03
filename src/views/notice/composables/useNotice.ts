import { computed, nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { message as $message } from '@/plugins/message'
import { formatMessageTime, loadChatDetail, loadTalkList, markChatAsRead, sendMessage, shouldShowTimeDivider, talklist } from '@/store/talklist'

export function useNotice() {
  const route = useRoute()
  const router = useRouter()
  const { t } = useI18n()

  const message = ref('')
  const sending = ref(false)

  const currentId = computed(() => (route.params as { id?: string }).id || '')

  const current = computed(() => talklist.find(item => item.id === currentId.value))

  const talkContent = computed(() => current.value?.message || [])

  const messagesWithTimeInfo = computed(() => {
    return talkContent.value.map((msg, index) => {
      const previousMsg = index > 0 ? talkContent.value[index - 1] : undefined
      return {
        ...msg,
        showTimeDivider: shouldShowTimeDivider(msg.time, previousMsg?.time),
        timeText: formatMessageTime(msg.time),
      }
    })
  })

  function scrollToBottom() {
    const messagesArea = document.querySelector('.messages-area') as HTMLElement | null
    if (messagesArea)
      messagesArea.scrollTop = messagesArea.scrollHeight
  }

  async function handleSendMessage() {
    if (message.value.trim() === '' || sending.value)
      return

    try {
      sending.value = true
      const messageContent = message.value.trim()

      const result = await sendMessage(currentId.value, messageContent)

      if (result.success && result.data) {
        message.value = ''
        await nextTick()
        scrollToBottom()
      }
      else {
        message.value = messageContent
        console.error(t('pages.notice.errors.send_failed'))
        $message.error(t('pages.notice.errors.send_failed'))
      }
    }
    catch (error) {
      console.error(t('pages.notice.errors.send_failed'), error)
      $message.error(t('pages.notice.errors.network_error'))
    }
    finally {
      sending.value = false
    }
  }

  onMounted(async () => {
    if (!currentId.value)
      return

    try {
      await loadChatDetail(currentId.value)

      if (!current.value) {
        await loadTalkList()
        if (!current.value) {
          router.replace('/talklist')
          return
        }
      }

      await markChatAsRead(currentId.value)
      if (current.value)
        current.value.count = 0

      await nextTick()
      scrollToBottom()
    }
    catch (error) {
      console.error('load chat or mark read failed:', error)
    }
  })

  return {
    t,
    message,
    sending,
    current,
    messagesWithTimeInfo,
    handleSendMessage,
  }
}

export type UseNoticeReturn = ReturnType<typeof useNotice>
