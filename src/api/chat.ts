import type { ApiResponse, Chat, ChatMessage, MarkAsReadResponse, SendMessageRequest, SendMessageResponse } from './types'
import { get, post, put } from './request'

export const chatApi = {

  // 获取聊天列表
  getTalkList(): Promise<ApiResponse<Chat[]>> {
    return get('/chat')
  },

  // 发送消息到指定聊天
  sendMessage(chatId: string, message: string): Promise<ApiResponse<SendMessageResponse>> {
    return post(`/chat/${chatId}/message`, { message })
  },

  // 标记聊天为已读
  markAsRead(chatId: string): Promise<ApiResponse<MarkAsReadResponse>> {
    return put(`/chat/${chatId}/read`)
  },

  // 获取未读消息总数
  getUnreadCount(): Promise<ApiResponse<{ count: number }>> {
    return get('/chat/unread-count')
  },
}

export const {
  getTalkList,
  sendMessage,
  markAsRead,
  getUnreadCount,
} = chatApi

export default chatApi
