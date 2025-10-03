import { createRouter } from 'vue-router'
import Layout from '@/layout/index.vue'

import { getRouterMode } from './utils'

const router = createRouter({
  history: getRouterMode(import.meta.env.VITE_ROUTER_MODE),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', redirect: '/home' },
        { path: 'home', component: () => import('@/views/home/index.vue') },
        { path: 'publish', component: () => import('@/views/publish/index.vue') },
        { path: 'search', component: () => import('@/views/search/index.vue') },
        { path: 'talklist', component: () => import('@/views/talklist/index.vue') },
        { path: 'datacenter', component: () => import('@/views/datacenter/index.vue') },
        { path: 'my', component: () => import('@/views/my/index.vue') },
        { path: 'my/black_mode', component: () => import('@/views/setting/components/blackMode.vue') },
        { path: 'my/general-settings', component: () => import('@/views/setting/components/generalSettings.vue') },
        { path: 'notice/:id', name: 'Notice', component: () => import('@/views/notice/index.vue') },
        { path: 'login', redirect: '/login/phone' },
        { path: 'login/phone', component: () => import('@/views/login/PhoneLoginPage.vue') },
        { path: 'login/password', component: () => import('@/views/login/PasswordLoginPage.vue') },
        { path: 'login/verify', component: () => import('@/views/login/VerifyCodePage.vue') },
        { path: 'my/edit', component: () => import('@/views/edit/index.vue') },
        { path: 'my/settings', component: () => import('@/views/setting/index.vue') },
      ],
    },
    // 登录重定向
    { path: '/login', redirect: '/login/phone' },
    // 错误页面
    { path: '/error/403', component: () => import('@/views/error/403/index.vue') },
    { path: '/error/404', component: () => import('@/views/error/404/index.vue') },
    { path: '/error/500', component: () => import('@/views/error/500/index.vue') },
    // 兜底重定向到 404
    { path: '/:pathMatch(.*)*', redirect: '/error/404' },
  ],
})

export default router
