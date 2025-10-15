# 导航栏 {#navbar}

导航栏组件的代码位置在 `src/components/Banner`

## 使用说明 {#usage}

该组件为每个页面设置顶部导航栏，并提供了三个参数

| 参数名      | 类型                       | 说明                                                         | 默认值 |
| ----------- | -------------------------- | ------------------------------------------------------------ | ------ |
| func        | 'back' \| 'menu' \| 'none' | 导航栏左侧按钮功能。'back' 为返回前一个页面，'menu' 则显示目录，'none' 则不显示左侧按钮 | 'back' |
| border      | Boolean                    | 控制边框显示                                                 | true   |
| transparent | Boolean                    | 控制背景透明                                                 | false  |

组件完全兼容 `t-navbar` 原生插槽，可以直接当原生组件使用

## 示例代码 {#example}

组件已挂载至全局，无需再手动 `import`

```vue
<script setup lang="ts">
</script>

<template>
  <Banner />
</template>
```

## 遗留问题 {#issue}

对于组件传参尚未完全兼容，使用 `v-bind="$attrs"` 似乎不生效

## 贡献者 {#contributors}

[hikari](https://github.com/liuyax0818)、[Kotone Fujita](https://github.com/FunEnn)、[Yi ZiXiong](https://github.com/neikun25)、[Reuse5653](https://github.com/Reuse5653)、[Tonite14](https://github.com/Tonite14)
