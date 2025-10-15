# Navbar {#navbar}

The code for the navigation bar component is located in `src/components/Banner`

## Usage {#usage}

This component sets the top navigation bar for each page and provides three parameters:

| Parameter Name | Type                        | Description                                                                 | Default |
| -------------- | --------------------------- | --------------------------------------------------------------------------- | ------- |
| func           | 'back' \| 'menu' \| 'none' | Function of the left button. 'back' returns to the previous page, 'menu' shows the menu, 'none' hides the left button | 'back' |
| border         | Boolean                     | Controls border display                                                     | true    |
| transparent    | Boolean                     | Controls background transparency                                           | false   |

The component is fully compatible with the native `t-navbar` slot and can be used as a native component.

## Example Code {#example}

The component is globally registered, no need to manually `import`.

```vue
<script setup lang="ts">
</script>

<template>
  <Banner />
</template>
```

## Known Issues {#issue}

Not all component parameters are fully compatible. Using `v-bind="$attrs"` may not work.

## Contributors {#contributors}

[hikari](https://github.com/liuyax0818), [Kotone Fujita](https://github.com/FunEnn), [Yi ZiXiong](https://github.com/neikun25), [Reuse5653](https://github.com/Reuse5653), [Tonite14](https://github.com/Tonite14)
