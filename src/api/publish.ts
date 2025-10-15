import type { FormData } from '@/views/publish/types'
import { request } from '@/utils/request'
/** 获取发布是否成功信息 */
export function getPublishResultApi(data: FormData) {
  return request.post<{ success: boolean }>('/getPublishResult', data)
}
