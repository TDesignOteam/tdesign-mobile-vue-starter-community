/**
 * 该 store 仅作为模板示例
 * 开发者可根据情况 copy 成符合业务的逻辑
 *
 * copy 完可以选择性地在 store/index.ts 中引入
 */

import type { layoutType } from './types'

import { defineStore } from 'pinia'
import { store } from '@/store'

const useLayoutStore = defineStore('tmv-layout', {
  state: (): layoutType => ({
    count: 0,
  }),
  actions: {
    ADD_COUNT() {
      this.count++
    },
  },
})

export function useLayoutStoreHook() {
  // 此处放一些使用 store 的额外操作
  // ...
  return useLayoutStore(store)
}
