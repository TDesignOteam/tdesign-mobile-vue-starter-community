import type { PluginOption } from 'vite'

import process from 'node:process'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import Tailwindcss from '@tailwindcss/vite'
// https://tdesign.tencent.com/mobile-vue/getting-started#vite
import { TDesignResolver } from '@tdesign-vue-next/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import { visualizer } from 'rollup-plugin-visualizer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import svgLoader from 'vite-svg-loader'

import { removeConsole } from './console'
import { buildInfo } from './info'
import { fakerServer } from './mock'
import { processPath } from './utils'

/**
 * 统一化处理 plugin
 */
export function usePlugins(): PluginOption[] {
  const lifecycle = process.env.npm_lifecycle_event // dev | build | report

  return [
    AutoImport({
      imports: ['vue', VueRouterAutoImports],
      resolvers: [TDesignResolver({
        library: 'mobile-vue',
        resolveIcons: true,
      })],
      dts: './types/auto-imports.d.ts',
    }),
    Components({
      globs: ['!src/components'],
      resolvers: [TDesignResolver({
        library: 'mobile-vue',
        resolveIcons: true,
      })],
      dts: './types/components.d.ts',
    }),
    VueRouter({
      dts: './types/vue-router.d.ts',
      routesFolder: ['src/views'],
      exclude: [
        '**/!(index).vue', // 排除非 index.vue 文件
      ],
    }),
    // i18n 支持
    VueI18nPlugin({
      include: [processPath('../locales/**')],
    }),
    vue(),
    // 支持 JSX 语法
    vueJsx(),
    // 处理 SVG 图标
    svgLoader(),
    // TailwindCSS 4 新增
    Tailwindcss(),
    // 代码定位工具，按住 alt + shift 点击页面上的组件可直接跳转到 vscode 对应代码段哦 😍
    codeInspectorPlugin({
      bundler: 'vite',
      hideConsole: true,
    }),
    // 手搓 vite 构建信息 plugin 😎
    buildInfo(),
    // 手搓 mock plugin，不参与打包，仅在dev环境下生效
    lifecycle === 'dev'
      ? fakerServer()
      : null,
    removeConsole(),
    // 打包分析，看看哪个老六最占打包体积 😠
    lifecycle === 'report'
      ? visualizer({ brotliSize: true, open: true, filename: 'report.html' })
      : null,
  ]
}
