<script setup lang='ts'>
import LayoutBody from './components/layout-body/index.vue'
import LayoutFooter from './components/layout-footer/index.vue'

defineOptions({
  name: 'Layout',
})

const route = useRoute()

const showFooter = computed<boolean>(() => {
  return route.meta?.showFooter ?? false
})
const hideHeader = computed<boolean>(() => {
  return route.meta?.hideHeader ?? false
})
const showBackground = computed<boolean>(() => {
  return route.meta?.showBackground ?? false
})
const backgroundColor = computed<string>(() => {
  return route.meta?.backgroundColor ?? 'var(--tmv-body-bg-color)'
})
</script>

<template>
  <div class="layout-wrapper">
    <LayoutBody
      :hide-header="hideHeader"
      :show-footer="showFooter"
      :show-background="showBackground"
      :background-color="backgroundColor"
    />
    <LayoutFooter v-if="showFooter" />
  </div>
</template>

<style lang='scss' scoped>
.layout-wrapper {
  position: relative;
  height: 100vh;
  background-color: var(--tmv-bg-color);
}
</style>
