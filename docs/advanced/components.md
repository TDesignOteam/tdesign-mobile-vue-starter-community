# Components {#components}

This project has pre-packaged the `Banner` component for developers to reference and reuse.

## Packaging Concept {#concept}

Global components should be placed in `src/components`. To improve maintainability and standardization, it is recommended to use the following directory structure:

```
├── ComponentName/
│   ├── src/
│   │   ├── index.vue
│   │   └── ...
│   └── index.ts
```

**index.ts**

It is recommended to use the internal `withInstall` method to register the component globally. Example code:

```ts
import { withInstall } from '@/utils/global'
import comp from './src/index.vue'

const Comp = withInstall(comp)

export default Comp
```

Here, `comp` should be replaced with your actual component name.

**index.vue**

The component implementation can be freely designed according to actual needs, but please make sure to set a unique `name` property for the component.

After writing the component, if you need to mount it globally, please import it manually in `main.ts`. For global type hints, you can add them in `types/re-components.d.ts`.

Even if you do not want to follow the above logic, you must ensure **one component corresponds to one folder**, not just a single `.vue` file thrown in directly.

## Tips {#tip}

### Slot Handling {#slot}

When wrapping components, you don't need to write slots one by one. Remember: **slots are essentially functions**.

For example, using `t-input`, this method is suitable for all secondary component wrappers:

```vue
<template>
  <t-input v-bind="$attrs">
    <template v-for="(val, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </t-input>
</template>
```

### Method Exposure {#expose}

Some developers like to expose component methods like this when wrapping:

```vue
<script setup lang="ts">
defineOptions({
  name: 'ReForm',
})

const formRef = ref()

function getRef() {
  return formRef.value
}
defineExpose({ getRef })
</script>

<template>
  <t-form ref="formRef">
    ...
  </t-form>
</template>
```

Usage:

```vue
<script setup lang="ts">
const formRef = ref()

function foo() {
  formRef.value.getRef().validate()
}
</script>

<template>
  <re-form ref="formRef">
    ...
  </re-form>
</template>
```

But this approach is not very native. We can use the idea from the `Vue` source code and use `Proxy`:

```vue
<script setup lang="ts">
defineOptions({
  name: 'ReForm',
})

const formRef = ref()

defineExpose(new Proxy(
  {},
  {
    get(target, key) {
      return formRef.value?.[key]
    },
    has(target, key) {
      return key in formRef.value
    }
  }
))
</script>

<template>
  <t-form ref="formRef">
    ...
  </t-form>
</template>
```

Usage:

```vue
<script setup lang="ts">
const formRef = ref()

function foo() {
  formRef.value.validate()
}
</script>

<template>
  <re-form ref="formRef">
    ...
  </re-form>
</template>
```

Isn't this much closer to native? And type definitions can be migrated seamlessly.

## Contributors {#contributors}

[hikari](https://github.com/liuyax0818)
