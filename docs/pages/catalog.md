# Catalog {#catalog}

This module is integrated in the `Navigation Bar` component.

## Design Concept {#design}

The page catalog is automatically generated based on Vue Router route information. It recursively traverses the route configuration, extracts route items with `meta.title`, and provides a complete page navigation function.

## Module Structure {#structure}

```
src/components/Banner/src/
└── Catalog.vue          # Page catalog component, auto-generates route list
```

## Implementation Principle {#implementation}

### 1. Route Traversal Algorithm {#impl-step1}

```typescript
function _traverseRoutes(routes: readonly any[], basePath: string = ''): void {
  for (const route of routes) {
    // Check if the route has a title
    if (route.meta?.title) {
      const fullPath = normalizePath(basePath + route.path)
      cataList.push({
        path: fullPath,
        title: route.meta.title,
      })
    }

    // Recursively traverse child routes
    if (route.children?.length) {
      const newBasePath = route.path ? `${basePath}${route.path}/` : basePath
      traverseRoutes(route.children, newBasePath)
    }
  }
}
```

### 2. Path Normalization {#impl-step2}

```typescript
function _normalizePath(path: string): string {
  return path.replace(/\/+/g, '/').replace(/\/$/, '') || '/'
}
```

### 3. Reactive Data Response {#impl-step3}

- Use `reactive` to create a reactive route list
- Build the catalog in the `onBeforeMount` lifecycle

## Usage {#usage}

Use the `<route>` tag in Vue components to define the page title:

```vue
<script setup lang="ts">
// component logic
</script>

<template>
  <div>Page Content</div>
</template>

<route lang="json5">
{
  meta: {
    title: 'Settings',  // Required title property
  }
}
</route>
```

## Contributors {#contributors}

[Kotone Fujita](https://github.com/FunEnn)
