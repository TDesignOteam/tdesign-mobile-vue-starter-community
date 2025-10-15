# Tailwind CSS {#tailwind-css}

This project integrates [Tailwind CSS](https://tailwindcss.com/) for efficient atomic CSS development, improving development efficiency and style consistency.

## Usage {#usage}

The entry file for Tailwind CSS is `src/style/tailwind.css`, which is already globally imported in `src/main.ts`. Developers can use Tailwind utility classes directly in the `class` attribute of Vue components.

Example:

```vue
<template>
  <div class="p-4 bg-white rounded shadow">
    <span class="text-lg font-bold text-gray-800">Ciallo~</span>
  </div>
</template>
```

::: tip
It is recommended to install the VSCode extension `bradlc.vscode-tailwindcss` for a better development experience.
:::

## Notes {#notice}

Tailwind CSS v4 uses CSS Layers by default, so some global styles may be overridden. It is recommended to split custom global styles into `reset.scss`, `index.scss`, etc., and adjust the import order as needed.

## Tips {#tip}

If a set of Tailwind CSS styles is used in multiple places, consider encapsulating multiple classes into one for reuse.

**Example**

```vue
<template>
  <div class="flex items-center justify-between">
    <span class="mx-2 bg-gray-400">Ciallo~</span>
    <span class="mx-2 bg-gray-400">Ciallo~</span>
    <span class="mx-2 bg-gray-400">Ciallo~</span>
  </div>
</template>
```

The classes in the above `div` can be abstracted into `src/style/tailwind.css`:

```css
@utility flex-c {
  @apply flex items-center justify-between;
}
```

Now, the code can be changed to:

```vue
<template>
  <div class="flex-c">
    <span class="mx-2 bg-gray-400">Ciallo~</span>
    <span class="mx-2 bg-gray-400">Ciallo~</span>
    <span class="mx-2 bg-gray-400">Ciallo~</span>
  </div>
</template>
```

## Reference Documents {#document}

- [Tailwind CSS Official Docs](https://tailwindcss.com/docs/installation)
- [Vite + Tailwind CSS Official Guide](https://tailwindcss.com/docs/guides/vite)

## Contributors {#contributors}

[hikari](https://github.com/liuyax0818)
