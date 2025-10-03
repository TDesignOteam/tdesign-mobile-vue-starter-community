import { defineConfig } from 'vitepress'
import { navZh, navEn } from './nav'
import { sidebarZh, sidebarEn } from './sidebar'

export default defineConfig({
  title: 'TDesign Mobile Starter',
  description: '企业级、移动端优先的 TDesign Mobile Vue 应用模板',
  base: '/',
  lastUpdated: true,
  ignoreDeadLinks: true,
  cleanUrls: true,
  appearance: true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#41d1ff' }],
  ],

  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      themeConfig: {
        siteTitle: '',
        logo: '/logo.svg',
        search: { provider: 'local' },
        nav: navZh,
        sidebar: sidebarZh,
        outline: [2, 4],
        outlineTitle: '本页导航',
        docFooter: { prev: '上一页', next: '下一页' },
        sidebarMenuLabel: '目录',
        returnToTopLabel: '回到顶部',
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色主题',
        darkModeSwitchTitle: '切换到深色主题',
        externalLinkIcon: false,
        lastUpdated: {
          text: '上次更新',
          formatOptions: { dateStyle: 'short', timeStyle: 'short' },
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/TDesignOteam/tdesign-mobile-vue-starter-community' },
        ],
        footer: {
          message: '基于 TDesign Mobile Vue 构建',
          copyright: 'Copyright © 2024-2025',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en-US',
      link: '/en/',
      themeConfig: {
        siteTitle: '',
        logo: '/logo.svg',
        search: { provider: 'local' },
        nav: navEn,
        sidebar: sidebarEn,
        outline: [2, 4],
        outlineTitle: 'On this page',
        docFooter: { prev: 'Previous', next: 'Next' },
        sidebarMenuLabel: 'Menu',
        returnToTopLabel: 'Back to top',
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        externalLinkIcon: false,
        editLink: {
          pattern: 'https://github.com/OWNER/REPO/edit/main/docs/:path',
          text: 'Edit this page on GitHub',
        },
        lastUpdated: {
          text: 'Last updated',
          formatOptions: { dateStyle: 'short', timeStyle: 'short' },
        },
        socialLinks: [
          { icon: 'github', link: 'https://github.com/TDesignOteam/tdesign-mobile-vue-starter-community' },
        ],
        footer: {
          message: 'Powered by TDesign Mobile Vue',
          copyright: 'Copyright © 2024-2025',
        },
      },
    },
  },
})
