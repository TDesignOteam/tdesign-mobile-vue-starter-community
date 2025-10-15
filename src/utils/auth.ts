import Cookies from 'js-cookie'
import { useUserStoreHook } from '@/store'
import { useStorage } from '@/utils/global'

/**
 * 该 UserInfo 和 useUserStore 中的类型虽然一样，但是实际意义不同
 */
export interface UserInfo {
  id: string
  username: string
  avatar: string
  tags: { label: string, icon: string }[]
  token?: string
  expires?: number
}

const _TOKEN_KEY = 'tmv-token'
export const _USER_KEY = 'user-info'

/** 设置 token */
export function setToken(data: UserInfo) {
  // 借助 cookie 的过期机制
  Cookies.set(_TOKEN_KEY, data.token, {
    expires: data.expires / 86400000,
  })

  const userStore = useUserStoreHook()
  userStore.SET_USERID(data.id)
  userStore.SET_USERNAME(data.username)
  userStore.SET_AVATAR(data.avatar)
  userStore.SET_TAGS(data.tags)

  // 本地存储再备份一份，以免刷新丢失状态
  const { setItem } = useStorage()
  setItem<UserInfo>(_USER_KEY, {
    id: data.id,
    username: data.username,
    avatar: data.avatar,
    tags: data.tags,
  })
}

/** 获取 token */
export function getToken(): string {
  const token = Cookies.get(_TOKEN_KEY)

  if (token) {
    return `Bearer ${token}`
  }

  return ''
}

export function removeToken() {
  Cookies.remove(_TOKEN_KEY)
}
