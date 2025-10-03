<script setup lang="ts">
import type { PropType } from 'vue'
import type { RegionColumn, VideoStatistics } from '@/api/datacenter'
import { useI18n } from 'vue-i18n'

defineProps({
  data: {
    type: Array as PropType<VideoStatistics[]>,
    required: true,
  },
  columns: {
    type: Array as PropType<RegionColumn[]>,
    required: true,
  },
})

defineEmits<{
  (e: 'rowClick', payload: any): void
  (e: 'cellClick', payload: any): void
  (e: 'scroll', payload: any): void
}>()

const { t } = useI18n()
</script>

<template>
  <div class="region-section">
    <div class="region-header">
      <div class="region-title">
        {{ t('pages.datacenter.region.title') }}
      </div>
    </div>
    <div class="region-content">
      <t-table
        :fixed-rows="[1, 2]"
        row-key="index"
        :data="data"
        :columns="columns"
        :stripe="true"
        :show-header="true"
        cell-empty-content="-"
        class="region-table"
        @row-click="$emit('rowClick', $event)"
        @cell-click="$emit('cellClick', $event)"
        @scroll="$emit('scroll', $event)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.region-section {
  background-color: #fff;
  border-radius: 9px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 0 16px 16px;

  .region-header {
    margin-bottom: 16px;
  }

  .region-title {
    font-size: 16px;
    font-weight: 600;
    color: #000000e6;
  }

  .region-content {
    overflow-x: auto;

    .region-table {
      border: 1px solid #e7e7e7;
      border-radius: 6px;
    }
  }
}
</style>
