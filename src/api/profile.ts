import type { ApiResponse } from './types'
import { get, post } from '@/api/request'

// 个人页面相关的API接口

export interface ServiceItem {
  name: string
  icon: string
  url?: string
  type?: 'internal' | 'external'
}

export interface StatItem {
  label: string
  icon: string
  count: number
  key: string
}

export interface MenuItem {
  name: string
  icon: string
  url?: string
  type?: 'internal' | 'external'
}

export interface ProfileServiceResponse {
  serviceGroups: ServiceItem[][]
  menuItems: MenuItem[]
}

export interface UserStatsResponse {
  stats: StatItem[]
}

// 获取个人页面服务数据
export function getProfileServices(): Promise<ApiResponse<ProfileServiceResponse>> {
  return get('/profile/services')
}

// 获取用户统计数据
export function getUserStats(userId?: string): Promise<ApiResponse<UserStatsResponse>> {
  const params = userId ? { userId } : undefined
  return get('/profile/stats', params)
}

// 更新用户统计数据
export function updateUserStats(data: {
  statKey: string
  increment?: number
}): Promise<ApiResponse<{ stat: StatItem }>> {
  return post('/profile/stats', data)
}

// 记录服务点击
export function trackServiceClick(data: {
  serviceName: string
  serviceType: string
}): Promise<ApiResponse<{
  serviceName: string
  serviceType: string
  timestamp: string
}>> {
  return post('/profile/service-click', data)
}
