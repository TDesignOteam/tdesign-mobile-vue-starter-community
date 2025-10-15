import { request } from '@/utils/request'

/** 获取搜索发现列表 */
export function getSearchDiscApi() {
  return request.get<string[]>('/getSearchDiscovery')
}
