# 自定义指令 {#directives}

## 实现原理 {#principle}

自定义指令的逻辑在 `src/directives` 文件夹下，通过 `index.ts` 一个文件入口，整合所有的自定义指令。

`main.ts` 中会通过导入 `index.ts` 来一次性读取所有的自定义指令，并将其挂载至全局

## 使用方式 {#usage}

在 `src/directives` 下新建一个 `ts` 文件，确保风格为 `esm`，之后编写指令逻辑，注意在导出的时候，不推荐使用 `export default`，推荐每个指令以 `export const xxx` 的形式导出。

在编写完自定义指令之后，请在 `index.ts` 里加上你刚刚写好的模块。

这样做的好处就是模块清晰，无需多余的非业务代码干扰，而且对 `Tree Shaking` 也友好

## 相关类型 {#types}

参考 vue 官方指令类型定义，[文档地址>>](https://vuejs.org/guide/reusability/custom-directives.html)

## 示例代码 {#example}

**custom.ts**

```ts
import type { Directive, DirectiveBinding } from 'vue'

export const custom: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // 在此编写指令逻辑...
  },
}
```

**index.ts**
```ts
export * from './custom'
```

## 贡献者 {#contributors}

[Reuse5653](https://github.com/Reuse5653)、[hikari](https://github.com/liuyax0818)
