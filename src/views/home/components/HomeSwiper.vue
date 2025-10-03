<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  images: string[]
}>()
</script>

<template>
  <div class="w-full max-w-[170px] h-[244px] rounded-[9px] flex flex-col overflow-hidden bg-red-50">
    <t-swiper :autoplay="true" class="h-full" :navigation="{ type: 'dots-bar' }">
      <t-swiper-item v-for="(item, index) in props.images" :key="index">
        <t-image :src="item" :lazy="index !== 0" fit="cover" class="w-[170px] h-[244px]" />
      </t-swiper-item>
    </t-swiper>
  </div>
</template>

<style lang="scss" scoped>

</style>
