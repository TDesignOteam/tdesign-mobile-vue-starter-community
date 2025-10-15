# 路由 {#router}

项目使用了 [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) 来根据 `src/views` 自动生成路由结构，开发者无需特别关注路由配置

## 路由结构

本项目采用分层路由设计，整体结构分为两级：

- 一级路由：以 `layout` 作为主框架，负责页面的整体布局和导航。
- 二级路由：承载各类具体业务页面，所有业务页面均作为 `layout` 的子路由进行管理。

这种结构有助于统一页面布局、提升路由管理的灵活性，并便于后续扩展。

## 元信息 {#metadata}

项目预设了几条路由元信息，其类型定义在 `types/global.d.ts` 中，开发者可以自行新增或修改

如何对页面配置元信息？`unplugin-vue-router` 官方已经给出了答案，只需在 `vue` 文件中新增一个 `route` 标签即可，**注意：只有被匹配到的文件才有效**

**示例**

```vue
<script setup lang='ts'>
</script>

<route lang="json5">
{
  meta: {
    // 路由元信息
    title: 'Ciallo',
  }
}
</route>

<template>
  <div>Ciallo~</div>
</template>

<style lang="scss" scoped>

</style>
```

## 贡献者 {#contributors}

[hikari](https://github.com/liuyax0818)
