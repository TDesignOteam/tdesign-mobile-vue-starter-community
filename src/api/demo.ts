import { request } from '@/utils/request'

export function handleLoginApi(username: string, password: string) {
  return request.post('/login', { username, password })
}

export function getUserInfoApi() {
  return request.get('/getUserInfo')
}

export function getUserListApi(param: any) {
  return request.get('/getUserList', param)
}
