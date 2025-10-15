<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

defineProps<{
  data: { label: string, value: number, unit: string }[]
}>()
const { t } = useI18n()
</script>

<template>
  <div class="t-cell-group--card bg-white p-4">
    <div class="text-sm font-semibold">
      {{ t('pageDataCenter.interaction.title') }}
    </div>
    <div class="flex justify-between mt-3">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="min-w-[60px]"
      >
        <div class="text-[10px] text-[#00000066]">
          {{ t(item.label) }}
        </div>
        <div class="mt-1">
          <span class="text-xl font-semibold">
            {{ item.value }}
          </span>
          <span class="ml-1 text-[10px] text-[#00000066]">
            {{ t(item.unit) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
