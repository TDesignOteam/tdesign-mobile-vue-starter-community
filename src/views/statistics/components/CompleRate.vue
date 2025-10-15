<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

defineProps<{
  data: { label: string, value: number }[]
}>()
const { t } = useI18n()
</script>

<template>
  <div class="t-cell-group--card bg-white p-4">
    <div class="text-sm font-semibold">
      {{ t('pageDataCenter.compRete') }}
    </div>
    <div class="mt-3 flex flex-col gap-2">
      <div v-for="(item, index) in data" :key="index" class="flex text-sm">
        <div class="min-w-[35px]  mr-2">
          {{ item.label }}
        </div>
        <t-progress class="flex-1" :percentage="item.value" />
      </div>
    </div>
  </div>
</template>
