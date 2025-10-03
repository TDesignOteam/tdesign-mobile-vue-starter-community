import type { ConfigEnv, UserConfigExport } from 'vite'

import process from 'node:process'
import { loadEnv } from 'vite'

import { usePlugins } from './build/plugins'
import { alias, processEnv, root } from './build/utils'

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT, VITE_BASE_PATH } = processEnv(loadEnv(mode, root))

  return {
    base: VITE_BASE_PATH,
    root,
    css: {
      // 使用 lightningcss 做兼容与转换（替代传统 PostCSS 流程）
      transformer: 'lightningcss',
    },
    resolve: {
      alias,
    },
    server: {
      port: VITE_PORT,
      host: '0.0.0.0',
      proxy: {},
    },
    plugins: usePlugins(),
    // 通过 esbuild 丢弃 console/debugger（仅生产）
    esbuild: process.env.NODE_ENV === 'production'
      ? {
          drop: ['console', 'debugger'],
          pure: ['console.log'],
        }
      : undefined,
    build: {
      // 最大兼容，👀 参考 https://vite.dev/guide/build.html#browser-compatibility
      target: 'es2020',
      // 仅在报告模式下开启 sourcemap，生产默认关闭
      sourcemap: mode === 'report',
      // 去除打包过大警告
      chunkSizeWarningLimit: 4000,
      // 打包分类 😎
      minify: 'esbuild',
      // 使用 lightningcss 压缩 CSS
      cssMinify: 'lightningcss',
      terserOptions: undefined,
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          // Vendor 拆包，提升浏览器缓存命中与按需加载
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('/vue') || id.includes('vue-router') || id.includes('pinia'))
                return 'vue-vendor'
              if (id.includes('tdesign-mobile-vue') || id.includes('tdesign-icons-vue-next'))
                return 'tdesign'
              if (id.includes('vue-i18n'))
                return 'i18n'
              if (id.includes('dayjs'))
                return 'dayjs'
              if (id.includes('@vueuse'))
                return 'vueuse'
              if (id.includes('vue-virtual-scroller'))
                return 'virtual-scroller'
              if (id.includes('pinia-plugin-persistedstate'))
                return 'pinia-persist'
              if (id.includes('countries-phone-masks'))
                return 'countries-phone-masks'
              if (id.includes('/phone/'))
                return 'phone'
              if (id.includes('/lcn/'))
                return 'lcn'
              return 'vendor'
            }
          },
        },
      },
    },
  }
}
