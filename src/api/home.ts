import type { ApiResponse } from './types'
import { get, post } from '@/api/request'

// 首页相关的API接口

export interface HomeTag {
  label: string
  theme: 'primary' | 'success' | 'default' | 'danger' | 'warning'
}

export interface HomeItem {
  type: 'card' | 'swiper'
  id: number
  title?: string
  image?: string
  images?: string[]
  tags?: HomeTag[]
}

export interface HomeContentResponse {
  items: HomeItem[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasMore: boolean
  }
}

export interface HomeRefreshResponse {
  items: HomeItem[]
  refreshTime: string
}

// 获取首页内容
export function getHomeContent(params?: {
  page?: number
  limit?: number
}): Promise<ApiResponse<HomeContentResponse>> {
  const qs = new URLSearchParams()
  if (params?.page != null)
    qs.set('page', String(params.page))
  if (params?.limit != null)
    qs.set('limit', String(params.limit))
  const query = qs.toString()
  return get(`/home/content${query ? `?${query}` : ''}`)
}

// 获取指定内容详情
export function getContentDetail(id: number): Promise<ApiResponse<HomeItem>> {
  return get(`/home/content/${id}`)
}

// 刷新首页内容
export function refreshHomeContent(): Promise<ApiResponse<HomeRefreshResponse>> {
  return post('/home/refresh')
}
