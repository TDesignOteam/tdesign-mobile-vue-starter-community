export interface ApiResponse<T = any> {
  code: number
  message: string
  data?: T
  success: boolean
  bizCode?: number | string
  bizSuccess?: boolean
  requestId?: number
}

export interface SendCodeRequest {
  phone: string
  countryCode: string
}

export interface SendCodeResponse {
  countdown: number
}

export interface VerifyCodeRequest {
  phone: string
  code: string
  countryCode: string
}

export interface LoginRequest {
  account: string
  password: string
}

export interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
    phone: string
    avatar?: string
    gender?: string
    birthday?: string
    address?: string
    bio?: string
    photos?: string[]
    constellation?: string
    location?: string
  }
}

export interface UserInfo {
  id: string
  name: string
  phone: string
  avatar?: string
  gender?: string
  birthday?: string
  address?: string
  bio?: string
  photos?: string[]
  constellation?: string
  location?: string
}

// 消息相关类型定义
export interface ChatMessage {
  id: string
  tag: 'me' | 'other' | 'time'
  value: string
  time: number
}

export interface Chat {
  id: string
  picture: string
  count: number
  name: string
  message: ChatMessage[]
}

export interface SendMessageRequest {
  message: string
}

export interface SendMessageResponse {
  id: string
  tag: 'me' | 'other' | 'time'
  value: string
  time: number
}

export interface MarkAsReadResponse {
  id: string
  count: number
}
