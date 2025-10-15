import { request } from '@/utils/request'

/** 用户名登录 */
export function loginByUnameApi<T = any>(data: object) {
  return request.post<T>('/loginByUsername', data)
}

/** 验证码登录 */
export function loginByPhoneApi<T = any>(data: object) {
  return request.post<T>('/loginByPhone', data)
}

/** 发送验证码 */
export function sendVerifyCodeApi(data: { phone: string, region: string }) {
  return request.post<{ codeId: string }>('/sendVerifyCode', data)
}

/** 获取个人信息 */
export function getProfileInfoApi<T = any>(id: string) {
  return request.get<T>('/getProfileInfo', { id })
}

/** 更新个人信息 */
export function updateProfileInfoApi<T, K>(data: K) {
  return request.post<T>('/updateProfileInfo', data)
}
