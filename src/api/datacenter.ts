import type { ApiResponse } from './types'
import { get } from '@/api/request'

// 数据中心相关的API接口

export interface VideoStatistics {
  index: number
  title: string
  global: string
  northChina: string
  eastChina: string
  westChina: string
  southChina: string
}

export interface RegionColumn {
  colKey: string
  title: string
  width?: string
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
}

export interface DataCenterResponse {
  regionData: VideoStatistics[]
  regionColumns: RegionColumn[]
  overview: {
    views: string
    pv: string
    uv: string
  }
  interaction: {
    views: number
    likes: number
    shares: number
    favorites: number
  }
  completion: Array<{ time: string, percentage: number }>
}

// 获取数据中心统计数据
export function getDataCenterStats(): Promise<ApiResponse<DataCenterResponse>> {
  return get('/datacenter/stats')
}

// 获取指定视频详情
export function getVideoDetail(id: number): Promise<ApiResponse<VideoStatistics>> {
  return get(`/datacenter/video/${id}`)
}
