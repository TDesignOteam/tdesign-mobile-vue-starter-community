import { fakerZH_CN as faker } from '@faker-js/faker'

import dayjs from 'dayjs'

interface MessageInfo {
  id: string
  userAvatar?: string
  content?: string
  me?: boolean
  time: dayjs.ConfigType
  isTime?: boolean
}

export function useChatHook() {
  const route = useRoute()

  const routeParam = route.params as { id: string, name: string }
  const userInfo = reactive({
    id: routeParam.id,
    name: routeParam.name,
  })

  const chatContainerRef = ref(null)
  const footerRef = ref()

  const messageList = ref<MessageInfo[]>([])

  /** 发送消息 */
  async function sendMessage(msg: string) {
    const lastTime = messageList.value.at(-1)?.time
    if (!lastTime || Date.now() - dayjs(lastTime).valueOf() > 120000) {
      // 最新消息和当前消息相差两分钟，就要给时间段
      messageList.value.push({
        id: `${Number(messageList.value.at(-1)?.id ?? -1) + 1}`,
        time: Date.now(),
        isTime: true,
      })
    }
    messageList.value.push({
      id: `${Number(messageList.value.at(-1).id) + 1}`,
      userAvatar: `https://tdesign.gtimg.com/mobile/demos/avatar3.png`,
      content: msg.trim(),
      time: Date.now(),
      me: true,
      isTime: false,
    })
    scrollToBottom()
    footerRef.value!.clearMsg()

    // 模拟回复
    setTimeout(() => {
      messageList.value.push({
        id: `${Number(messageList.value.at(-1).id) + 1}`,
        userAvatar: `https://tdesign.gtimg.com/mobile/demos/avatar${getItId(userInfo.id)}.png`,
        content: faker.lorem.sentence({ min: 3, max: 15 }),
        time: Date.now(),
        me: false,
        isTime: false,
      })
      scrollToBottom()
    }, faker.number.int({ min: 1500, max: 3000 }))
  }

  /** 构建消息列表，先随机 n 条数据 */
  function buildMessageList() {
    const n = faker.number.int({ min: 3, max: 50 })
    const arr: MessageInfo[] = []
    let timeCount = 0 // 累计时间段，保证随机的时间是连续的
    let i: number
    for (i = n; i > 0; i--) {
      const me = faker.datatype.boolean(0.3)
      timeCount += faker.number.int({ min: 60000, max: 300000 }) // 随机时间段，1min~5min
      arr.push({
        id: `${i}`,
        userAvatar: `https://tdesign.gtimg.com/mobile/demos/avatar${me ? '3' : getItId(userInfo.id)}.png`,
        content: faker.lorem.sentence({ min: 3, max: 100 }),
        time: Date.now() - timeCount,
        me,
        isTime: false,
      })
    }
    // 第一个一定是时间块
    if (arr.length > 0) {
      arr.push({
        id: `${i}`,
        isTime: true,
        time: Date.now() - timeCount,
      })
    }

    messageList.value = arr.reverse()
    scrollToBottom(false)
  }

  /** 滚动至底部 */
  function scrollToBottom(smooth = true) {
    nextTick(() => {
      if (chatContainerRef.value) {
        const el = chatContainerRef.value!
        // smooth 由开发者自行实现平滑滚动
        el.scrollToBottom()
      }
    })
  }

  return {
    userInfo,
    footerRef,
    messageList,
    chatContainerRef,
    sendMessage,
    scrollToBottom,
    buildMessageList,
  }
}

function getItId(id: string) {
  const num = Number(id) - 1
  return num % 5 + 1
}
