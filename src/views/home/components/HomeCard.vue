<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  title: string
  tags: { label: string, theme: 'primary' | 'success' | 'default' | 'danger' | 'warning' }[]
  imageSrc: string
}>()
</script>

<template>
  <div class="w-full max-w-[170px] rounded-[9px] flex flex-col overflow-hidden">
    <div class="h-[170px] bg-blue-100">
      <t-image class="image-container" fit="fill" :src="props.imageSrc" :lazy="true" />
    </div>
    <div class="h-[74px] w-full box-border bg-[var(--td-bg-color-container)] py-[12px] px-[16px]">
      <div class="text-[14px] font-[400] mb-[8px] text-[var(--td-text-color-primary)] whitespace-nowrap overflow-hidden text-ellipsis">
        {{ props.title }}
      </div>
      <div>
        <t-tag
          v-for="(tag, index) in props.tags" :key="index" variant="light" size="small" :theme="tag.theme"
          class="mr-[8px] max-w-[80px] whitespace-nowrap overflow-hidden text-ellipsis"
        >
          {{ tag.label }}
        </t-tag>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
