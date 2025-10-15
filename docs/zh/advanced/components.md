# 组件 {#components}

本项目已预封装了 `Banner` 组件，供开发者参考和复用。

## 封装思想 {#concept}

全局组件的位置应在 `src/components`，为提升可维护性和规范性，建议采用如下目录结构

```
├── 组件名/
│   ├── src/
│   │   ├── index.vue
│   │   └── ...
│   └── index.ts
```

**index.ts**

推荐通过项目内置的 `withInstall` 方法，将组件注册为全局组件，示例代码如下：

```ts
import { withInstall } from '@/utils/global'
import comp from './src/index.vue'

const Comp = withInstall(comp)

export default Comp
```

上面的 `comp` 则为你实际的组件名称

**index.vue**

组件实现可根据实际需求自由发挥，但请务必为组件设置唯一的 `name` 属性。

在编写完组件后，如需全局挂载，请在 `main.ts` 中自行引入。若需要全局类型提示，可在 `types/re-components.d.ts` 自行添加

即使开发者不想采用以上逻辑，也要确保 **一个组件对应一个文件夹**，而不是单纯的直接扔一个 `vue` 文件放上去

## 小技巧 {#tip}

### 插槽处理 {#slot}

在二次封装组件的时候，无需一个个地写插槽，要明确一点：**插槽的本质就是函数**

下面以 `t-input` 举例，这种方法适合所有组件的二次封装

```vue
<template>
  <t-input v-bind="$attrs">
    <template v-for="(val, name) in $slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData || {}" />
    </template>
  </t-input>
</template>
```

### 方法暴露 {#expose}

有些童鞋在封装的时候，对于处理组件方法喜欢这么做

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

在使用的时候就是这样

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
但是这种方法不够原生，我们可以借助 `vue` 源码的思想，使用 `Proxy` 来实现

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
在实际使用的时候就是这样

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

怎么样，是不是很贴近原生？而且类型定义几乎可以无缝迁移

## 贡献者 {#contributors}

[hikari](https://github.com/liuyax0818)
