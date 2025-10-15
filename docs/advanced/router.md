# Router {#router}

This project uses [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) to automatically generate the routing structure based on `src/views`, so developers do not need to manually configure routes.

## Routing Structure

The project uses a layered routing design, with the overall structure divided into two levels:

- First-level routes: Use `layout` as the main framework, responsible for overall page layout and navigation.
- Second-level routes: Carry various specific pages, all managed as children of `layout`.

This structure helps unify page layouts, improves routing management flexibility, and is convenient for future expansion.

## Metadata {#metadata}

The project predefines several route metadata fields, with type definitions in `types/global.d.ts`. Developers can add or modify them as needed.

How to configure metadata for a page? The official `unplugin-vue-router` solution is to add a `route` tag in the `vue` file. **Note: Only matched files are effective.**

**Example**

```vue
<script setup lang='ts'>
</script>

<route lang="json5">
{
  meta: {
    // Route metadata
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

## Contributors {#contributors}

[hikari](https://github.com/liuyax0818)
