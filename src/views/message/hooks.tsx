import { getMessageListApi, readMessageApi } from '@/api/message'

interface MessageList {
  id: string
  avatar: string
  title: string
  content: string
  count: number
}

export function useMessageHook() {
  const router = useRouter()

  const msgList = ref<MessageList[]>([])

  function getMsgList() {
    getMessageListApi<MessageList[]>().then((res) => {
      msgList.value = res.data
    })
  }

  function goToChat(id: string, name: string) {
    readMessageApi(id)
    router.push({ path: `/message/${id}/${name}/` })
  }

  return {
    msgList,
    goToChat,
    getMsgList,
  }
}
