import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const zh: LocaleSpecificConfig<DefaultTheme.Config> & { label: string, link?: string } = {
  title: 'TDesign 文档',
  description: 'TDesign 移动端模板',
  label: '中文（简体）',
  lang: 'zh',
  link: '/zh',
  themeConfig: {
    search: {
      provider: 'local',
      options: searchOptions(),
    },
    outline: {
      label: '页面导航',
    },
    lastUpdated: {
      text: '最后更新于',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    nav: [
      { text: '首页', link: '/zh/index' },
      { text: '快速开始', link: '/zh/guide/quick-start' },
    ],
    sidebar: getSideBar(),
  },
}

function searchOptions(): Partial<DefaultTheme.LocalSearchOptions> {
  return {
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        displayDetails: '显示详情',
        resetButtonTitle: '清除',
        backButtonTitle: '返回',
        noResultsText: '无法找到相关结果',
        footer: {
          selectText: '选择',
          selectKeyAriaLabel: 'Enter 键',
          navigateText: '切换',
          navigateUpKeyAriaLabel: '向上箭头',
          navigateDownKeyAriaLabel: '向下箭头',
          closeText: '关闭',
          closeKeyAriaLabel: 'Esc 键',
        },
      },
    },
  }
}

function getSideBar(): DefaultTheme.Sidebar {
  return [
    {
      text: 'VitePress 开发指南',
      collapsed: false,
      items: [
        { text: 'Markdown 示例', link: '/zh/vp-inst/markdown-examples' },
        { text: '运行时 API 示例', link: '/zh/vp-inst/api-examples' },
      ],
    },
    {
      text: '起步',
      collapsed: false,
      items: [
        { text: '项目介绍', link: '/zh/guide/instruction' },
        { text: '快速开始', link: '/zh/guide/quick-start' },
        { text: '目录结构', link: '/zh/guide/directory' },
      ],
    },
    {
      text: '进阶',
      collapsed: false,
      items: [
        { text: 'Mock', link: '/zh/advanced/mock' },
        { text: 'HTTP', link: '/zh/advanced/http' },
        { text: '国际化', link: '/zh/advanced/i18n' },
        { text: 'Tailwind CSS', link: '/zh/advanced/tailwindcss' },
        { text: '组件', link: '/zh/advanced/components' },
        { text: '路由', link: '/zh/advanced/router' },
        { text: '全局配置', link: '/zh/advanced/config' },
        { text: '自定义指令', link: '/zh/advanced/directives' },
      ],
    },
    {
      text: '功能模块',
      collapsed: false,
      items: [
        { text: '导航栏', link: '/zh/pages/navbar' },
        { text: '页面目录', link: '/zh/pages/catalog' },
        { text: '搜索页', link: '/zh/pages/search' },
        { text: '首页', link: '/zh/pages/home' },
        { text: '发布页', link: '/zh/pages/publish' },
        { text: '消息列表页', link: '/zh/pages/messages' },
        { text: '对话页', link: '/zh/pages/chat' },
        { text: '个人中心', link: '/zh/pages/profile' },
        { text: '个人信息页', link: '/zh/pages/info' },
        { text: '设置页', link: '/zh/pages/settings' },
        { text: '数据图表页', link: '/zh/pages/charts' },
        { text: '登录页', link: '/zh/pages/login' },
        { text: '错误页', link: '/zh/pages/error' },
      ],
    },
  ]
}
