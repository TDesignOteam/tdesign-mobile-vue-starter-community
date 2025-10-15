import { defineConfig } from 'vitepress'
import { zh } from './locales'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],

  locales: {
    root: {
      title: 'TDesign Docs',
      description: 'TDesign Mobile Vue Quick Start',
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Quickstart', link: '/guide/quick-start' },
        ],
        sidebar: [
          {
            text: 'Examples',
            collapsed: false,
            items: [
              { text: 'Markdown Examples', link: '/vp-inst/markdown-examples' },
              { text: 'Runtime API Examples', link: '/vp-inst/api-examples' },
            ],
          },
          {
            text: 'Get Start',
            collapsed: false,
            items: [
              { text: 'Introduction', link: '/guide/instruction' },
              { text: 'Quickstart', link: '/guide/quick-start' },
              { text: 'File Structure', link: '/guide/directory' },
            ],
          },
          {
            text: 'Advanced',
            collapsed: false,
            items: [
              { text: 'Mock', link: '/advanced/mock' },
              { text: 'HTTP', link: '/advanced/http' },
              { text: 'Internationalization', link: '/advanced/i18n' },
              { text: 'Tailwind CSS', link: '/advanced/tailwindcss' },
              { text: 'Components', link: '/advanced/components' },
              { text: 'Router', link: '/advanced/router' },
              { text: 'Global Config', link: '/advanced/config' },
              { text: 'Directives', link: '/advanced/directives' },
            ],
          },
          {
            text: 'Pages',
            collapsed: false,
            items: [
              { text: 'Navbar', link: '/pages/navbar' },
              { text: 'Catalog', link: '/pages/catalog' },
              { text: 'Search', link: '/pages/search' },
              { text: 'Home', link: '/pages/home' },
              { text: 'Publish', link: '/pages/publish' },
              { text: 'Message list', link: '/pages/messages' },
              { text: 'Chat', link: '/pages/chat' },
              { text: 'Profile', link: '/pages/profile' },
              { text: 'Profile info', link: '/pages/info' },
              { text: 'Settings', link: '/pages/settings' },
              { text: 'Charts', link: '/pages/charts' },
              { text: 'Login', link: '/pages/login' },
              { text: 'Error', link: '/pages/error' },
            ],
          },
        ],
      },
    },
    zh,
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo2.png',
    outline: {
      level: 'deep',
    },

    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/TDesignOteam/tdesign-mobile-vue-starter-community' },
    ],
  },

  vite: {
    server: {
      port: 4399,
      host: '0.0.0.0',
      proxy: {},
    },
  },
})
