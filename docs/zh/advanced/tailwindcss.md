# Tailwind CSS {#tailwind-css}

本项目集成了 [Tailwind CSS](https://tailwindcss.com/)，用于高效地进行原子化样式开发，提升开发效率和样式一致性。

## 使用方法 {#usage}

Tailwind CSS 的入口文件为 `src/style/tailwind.css`，已在 `src/main.ts` 中全局引入。开发者可以直接在 Vue 组件的 `class` 属性中使用 Tailwind 的原子类进行样式开发。

示例：

```vue
<template>
  <div class="p-4 bg-white rounded shadow">
    <span class="text-lg font-bold text-gray-800">Ciallo~</span>
  </div>
</template>
```

::: tip 提示
推荐安装 `vscode` 插件 `bradlc.vscode-tailwindcss` 来获取更好的开发体验
:::

## 注意事项 {#notice}

Tailwind CSS v4 默认使用 CSS Layers，部分全局样式优先级可能会被覆盖。建议将自定义全局样式拆分到 `reset.scss`、`index.scss` 等文件，并合理调整引入顺序。

## 小技巧 {#tip}

如果一套 `Tailwind CSS` 样式在多处用到，可以考虑将多个类封装成一个，以重用样式

**示例**

```vue
<template>
  <div class="flex items-center justify-between">
    <span class="mx-2 bg-gray-400">Ciallo~</span>
    <span class="mx-2 bg-gray-400">Ciallo~</span>
    <span class="mx-2 bg-gray-400">Ciallo~</span>
  </div>
</template>
```

上面的 `div` 中的类可以抽离到 `src/style/tailwind.css` 中

```css
@utility flex-c {
  @apply flex items-center justify-between;
}
```

此时，上述代码就可以改为

```vue
<template>
  <div class="flex-c">
    <span class="mx-2 bg-gray-400">Ciallo~</span>
    <span class="mx-2 bg-gray-400">Ciallo~</span>
    <span class="mx-2 bg-gray-400">Ciallo~</span>
  </div>
</template>
```

## 参考文档 {#document}

- [Tailwind CSS 官方文档](https://tailwindcss.com/docs/installation)
- [Vite + Tailwind CSS 官方集成指南](https://tailwindcss.com/docs/guides/vite)

## 贡献者 {#contributors}

[hikari](https://github.com/liuyax0818)
