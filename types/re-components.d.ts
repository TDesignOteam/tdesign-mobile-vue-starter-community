/**
 * 此处放一些二次封装、以及原创的**全局组件**类型
 */
declare module 'vue' {
  export interface GlobalComponents {
    Banner: typeof import('@/components/Banner')['default']
  }
}

export {}
