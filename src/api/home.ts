import { request } from '@/utils/request'

/** 获取标签列表 */
export function getTagListApi<T = any[]>() {
  return request.get<T>('/getTagList')
}
