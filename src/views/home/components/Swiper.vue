<script setup lang='ts'>
defineProps<{
  imgs: string[]
}>()
</script>

<template>
  <div class="w-[170px] h-[240px] rounded-[9px] mb-3 bg-white">
    <t-swiper :autoplay="true" :navigation="{ type: 'dots-bar' }" height="240px">
      <t-swiper-item
        v-for="(item, index) in imgs"
        :key="index"
      >
        <img :src="item" class="w-full h-full object-cover">
      </t-swiper-item>
    </t-swiper>
  </div>
</template>
