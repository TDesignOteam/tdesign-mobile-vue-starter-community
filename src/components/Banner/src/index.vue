<script setup lang='ts'>
import type { BannerProps } from './type'

import Catalog from './Catalog.vue'
import { useBannerHook } from './hooks'

defineOptions({
  name: 'Banner',
})

const props = withDefaults(defineProps<BannerProps>(), {
  func: 'back',
  border: true,
  transparent: false,
})

const { openCatalog, handleLeftClick } = useBannerHook()
</script>

<template>
  <!-- TODO: v-bind="$attrs" 似乎不管用 -->
  <t-navbar
    :fixed="true"
    :title="props.title"
    :left-arrow="props.func === 'back'"
    v-bind="$attrs"
    :class="[props?.border && 'show-border', props?.transparent && 'transparent']"
    style="z-index: 9;"
    @left-click="handleLeftClick(func)"
  >
    <template v-if="func === 'menu'" #left>
      <ViewListIcon size="20px" />
      <slot />
    </template>

    <template v-for="(val, name) in $slots" #[name]="soltData">
      <slot :name="name" v-bind="soltData || {}" />
    </template>
  </t-navbar>

  <t-popup v-model="openCatalog" placement="left" destroy-on-close>
    <Catalog />
  </t-popup>
</template>

<style lang='scss' scoped>
.show-border {
  :deep(.t-navbar__center) {
    border-bottom: 0.5px solid #e7e7e7;
  }
}

.transparent {
  :deep(.t-navbar__content) {
    background-color: transparent;
  }
}
</style>
