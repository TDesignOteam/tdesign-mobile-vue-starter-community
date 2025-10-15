<script setup lang='ts'>
import type { TagProps } from 'tdesign-mobile-vue'

defineProps<{
  img: string
  title: string
  tags: { label: string, type: TagProps['theme'] }[]
}>()
</script>

<template>
  <div class="w-[170px] h-[240px] rounded-[9px] mb-3 bg-white">
    <div class="w-full h-[170px]">
      <img class="w-full h-full" :src="img">
    </div>
    <div class="px-4 py-3">
      <div class="text-sm truncate">
        {{ title }}
      </div>
      <div class="mt-2 flex gap-2">
        <t-tag
          v-for="(item, index) in tags"
          :key="index"
          size="small"
          variant="light"
          :content="item.label"
          :theme="item.type"
        />
      </div>
    </div>
  </div>
</template>
