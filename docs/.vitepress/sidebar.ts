import type { DefaultTheme } from 'vitepress'

export const sidebarZh: DefaultTheme.Sidebar = {
  '/guide/': [
    {
      text: '上手指南',
      items: [
        { text: '介绍', link: '/guide/' },
        { text: '快速开始', link: '/guide/getting-started' },
        { text: '目录结构', link: '/guide/directory-structure' },
        { text: '架构与模块', link: '/guide/architecture' },
      ],
      collapsed: false,
    },
    {
      text: '核心能力与实践',
      items: [
        { text: '布局 Layout', link: '/guide/layout' },
        { text: '路由与导航', link: '/guide/router' },
        { text: '状态管理', link: '/guide/store' },
        { text: '国际化', link: '/guide/i18n' },
        { text: '主题与样式', link: '/guide/theme' },
        { text: 'HTTP', link: '/guide/http' },
        { text: 'Mock', link: '/guide/mocks' },
        { text: '消息提示', link: '/guide/message' },
        { text: '工具函数', link: '/guide/utils' },
        { text: '性能优化', link: '/guide/performance' },
      ],
      collapsed: false,
    },
    {
      text: '工程化与规范',
      items: [
        { text: '应用配置', link: '/guide/config' },
        { text: '接口与 Mock', link: '/guide/api' },
        { text: '错误处理', link: '/guide/error-handling' },
      ],
      collapsed: false,
    },
  ],
  '/pages/': [
    {
      text: '页面与示例',
      items: [
        { text: '概览', link: '/pages/' },
        { text: '首页 Home', link: '/pages/home' },
        { text: '发布页 Publish', link: '/pages/publish' },
        { text: '搜索 Search', link: '/pages/search' },
        { text: '会话列表 Talklist', link: '/pages/talklist' },
        { text: '数据中心 DataCenter', link: '/pages/datacenter' },
        { text: '个人中心 My', link: '/pages/my' },
        { text: '设置 Setting', link: '/pages/setting' },
        { text: '个人信息表单 Edit', link: '/pages/edit' },
        { text: '登录 Login', link: '/pages/login' },
      ],
      collapsed: false,
    },
  ],
}

export const sidebarEn: DefaultTheme.Sidebar = {
  '/en/guide/': [
    {
      text: 'Getting Started',
      items: [
        { text: 'Introduction', link: '/en/guide/' },
        { text: 'Getting Started', link: '/en/guide/getting-started' },
        { text: 'Directory Structure', link: '/en/guide/directory-structure' },
        { text: 'Architecture & Modules', link: '/en/guide/architecture' },
        // Initialization Flow removed to align with zh structure
      ],
      collapsed: false,
    },
    {
      text: 'Core Capabilities',
      items: [
        { text: 'Layout', link: '/en/guide/layout' },
        { text: 'Router & Navigation', link: '/en/guide/router' },
        { text: 'State Management', link: '/en/guide/store' },
        { text: 'Internationalization', link: '/en/guide/i18n' },
        { text: 'Theme & Styles', link: '/en/guide/theme' },
        { text: 'HTTP', link: '/en/guide/http' },
        { text: 'Mock', link: '/en/guide/mocks' },
        { text: 'Message', link: '/en/guide/message' },
        { text: 'Utility Functions', link: '/en/guide/utils' },
        { text: 'Performance', link: '/en/guide/performance' },
      ],
      collapsed: false,
    },
    {
      text: 'Engineering & Standards',
      items: [
        { text: 'App Config', link: '/en/guide/config' },
        { text: 'API & Mock', link: '/en/guide/api' },
        { text: 'Error Handling', link: '/en/guide/error-handling' },
      ],
      collapsed: false,
    },
  ],
  '/en/pages/': [
    {
      text: 'Pages & Demos',
      items: [
        { text: 'Overview', link: '/en/pages/' },
        { text: 'Home', link: '/en/pages/home' },
        { text: 'Publish', link: '/en/pages/publish' },
        { text: 'Search', link: '/en/pages/search' },
        { text: 'Talklist', link: '/en/pages/talklist' },
        { text: 'DataCenter', link: '/en/pages/datacenter' },
        { text: 'My', link: '/en/pages/my' },
        { text: 'Setting', link: '/en/pages/setting' },
        { text: 'Edit', link: '/en/pages/edit' },
        { text: 'Login', link: '/en/pages/login' },
        { text: 'Notice', link: '/en/pages/notice' },
      ],
      collapsed: false,
    },
  ],
}

