import { request } from '@/utils/request'

/** 获取消息列表 */
export function getMessageListApi<T = any>() {
  return request.get<T>('/getMessageList')
}

/** 已读消息 */
export function readMessageApi(id: string) {
  return request.post<string>('/readMessage', {
    id,
  })
}

/** 获取未读数量 */
export function getUnReadCountApi() {
  return request.get<number>('/getUnReadCount')
}
