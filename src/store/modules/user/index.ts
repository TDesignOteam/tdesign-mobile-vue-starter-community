import type { LoginByPhone, LoginByUname, UserInfo } from './types'

import { defineStore } from 'pinia'
import { loginByPhoneApi, loginByUnameApi } from '@/api/user'
import { store } from '@/store'
import { _USER_KEY, removeToken } from '@/utils/auth'
import { useStorage } from '@/utils/global'

const useUserStore = defineStore('tmv-user', {
  state: (): UserInfo => ({
    // 初始化优先从本地读取
    id: useStorage().getItem<UserInfo>(_USER_KEY)?.id ?? '',
    username: useStorage().getItem<UserInfo>(_USER_KEY)?.username ?? '',
    avatar: useStorage().getItem<UserInfo>(_USER_KEY)?.avatar ?? '',
    tags: useStorage().getItem<UserInfo>(_USER_KEY)?.tags ?? [],
  }),
  actions: {
    SET_USERID(val: UserInfo['id']) {
      this.id = val
    },
    SET_USERNAME(val: UserInfo['username']) {
      this.username = val
    },
    SET_AVATAR(val: UserInfo['avatar']) {
      this.avatar = val
    },
    SET_TAGS(val: UserInfo['tags']) {
      this.tags = val
    },

    /** 用户名密码登录 */
    loginByUsername<T>(param: LoginByUname) {
      return loginByUnameApi<T>(param)
    },

    /** 手机号验证码登录 */
    loginByPhone<T>(param: LoginByPhone) {
      return loginByPhoneApi<T>(param)
    },

    /** 前端登出 */
    logout() {
      removeToken()
      useStorage().removeItem(_USER_KEY)
    },
  },
})

export function useUserStoreHook() {
  // 此处放一些使用 store 的额外操作
  // ...
  return useUserStore(store)
}
