import type { RouterHistory } from 'vue-router'
import { createWebHashHistory, createWebHistory } from 'vue-router'

function getRouterMode(mode: string): RouterHistory {
  const base = import.meta.env.BASE_URL || '/'
  return mode === 'hash' ? createWebHashHistory(base) : createWebHistory(base)
}

export {
  getRouterMode,
}
