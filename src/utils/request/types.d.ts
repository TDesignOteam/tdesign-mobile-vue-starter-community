import type { Method } from 'axios'

export interface ErrorResponsePayload {
  message?: string
  code?: number
}

export interface CustomError extends Error {
  friendlyMessage: string
  code: number
  response?: any
}

// 取交集
export type RequestMethods = Extract<
  Method,
  'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
>

// 扩展AxiosRequestConfig类型
declare module 'axios' {
  interface AxiosRequestConfig {
    retryCount?: number
    showLoading?: boolean
    showError?: boolean
  }
  interface InternalAxiosRequestConfig {
    retryCount?: number
    showLoading?: boolean
    showError?: boolean
  }
}
