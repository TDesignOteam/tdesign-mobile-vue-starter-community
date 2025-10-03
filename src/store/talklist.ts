import type { Chat, ChatMessage } from '../api/types'
import { reactive, ref } from 'vue'
import { chatApi } from '../api/chat'

export const talklist = reactive<Chat[]>([])
export const isLoading = ref(false)
export const error = ref<string | null>(null)

export async function loadTalkList(): Promise<void> {
  try {
    isLoading.value = true
    error.value = null

    const response = await chatApi.getTalkList()

    if (response.success && response.data) {
      // 清空现有数据并添加新数据
      talklist.splice(0, talklist.length, ...response.data)
    }
    else {
      error.value = response.message || '获取聊天列表失败'
    }
  }
  catch (err) {
    error.value = '网络连接失败'
    console.error('加载聊天列表失败:', err)
  }
  finally {
    isLoading.value = false
  }
}

export async function markChatAsRead(chatId: string): Promise<boolean> {
  try {
    const response = await chatApi.markAsRead(chatId)

    if (response.success && response.data) {
      // 更新本地数据
      const chat = talklist.find(item => item.id === chatId)
      if (chat) {
        chat.count = 0
      }
      return true
    }
    return false
  }
  catch (err) {
    console.error('标记已读失败:', err)
    return false
  }
}

// 加载聊天详情
export async function loadChatDetail(chatId: string): Promise<void> {
  try {
    // 首先检查本地是否已有数据
    const existingChat = talklist.find(item => item.id === chatId)

    if (!existingChat) {
      // 如果本地没有数据，重新加载整个列表
      await loadTalkList()
    }

    // 确保消息都有时间戳
    const chat = talklist.find(item => item.id === chatId)
    if (chat && chat.message) {
      chat.message = chat.message.map(msg => ({
        ...msg,
        time: msg.time || Date.now(),
      }))
    }
  }
  catch (err) {
    console.error('加载聊天详情失败:', err)
  }
}

export async function sendMessage(chatId: string, message: string): Promise<{ success: boolean, data?: ChatMessage }> {
  try {
    const response = await chatApi.sendMessage(chatId, message)

    if (response.success && response.data) {
      // 创建包含时间戳的消息对象
      const newMessage: ChatMessage = {
        id: response.data.id,
        tag: response.data.tag,
        value: response.data.value,
        time: response.data.time || Date.now(),
      }

      // 更新本地数据
      const chat = talklist.find(item => item.id === chatId)
      if (chat) {
        chat.message.push(newMessage)
      }

      return { success: true, data: newMessage }
    }
    return { success: false }
  }
  catch (err) {
    console.error('发送消息失败:', err)
    return { success: false }
  }
}

export async function getUnreadCount(): Promise<number> {
  try {
    const response = await chatApi.getUnreadCount()

    if (response.success && response.data) {
      return response.data.count
    }
    return 0
  }
  catch (err) {
    console.error('获取未读消息数失败:', err)
    return 0
  }
}

// 时间格式化工具函数
export function formatMessageTime(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000)
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())

  if (messageDate.getTime() === today.getTime()) {
    return `今天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  else if (messageDate.getTime() === yesterday.getTime()) {
    return `昨天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
  else {
    return `${date.getMonth() + 1}月${date.getDate()}日 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }
}

// 判断是否需要显示时间分隔符（超过5分钟显示）
export function shouldShowTimeDivider(currentTime: number, previousTime?: number): boolean {
  if (!previousTime) {
    return true // 第一条消息总是显示时间
  }
  const timeDiff = currentTime - previousTime
  return timeDiff > 5 * 60 * 1000 // 5分钟
}

export default talklist
