<script setup lang='ts'>
import type { BaseTableCol, TableRowData } from 'tdesign-mobile-vue'
import { useI18n } from 'vue-i18n'

defineProps<{
  data: any[]
}>()
const { t } = useI18n()

const tableCol: BaseTableCol<TableRowData>[] = [
  {
    title: t('pageDataCenter.area.label'),
    colKey: 'title',
    width: 91.75,
    align: 'center',
    fixed: 'left',
  },
  {
    title: t('pageDataCenter.area.global'),
    colKey: 'global',
    width: 93.75,
    align: 'center',
  },
  {
    title: t('pageDataCenter.area.nc'),
    colKey: 'northChina',
    width: 93.75,
    align: 'center',
  },
  {
    title: t('pageDataCenter.area.ec'),
    colKey: 'eastChina',
    width: 93.75,
    align: 'center',
  },
  {
    title: t('pageDataCenter.area.sc'),
    colKey: 'southChina',
    width: 93.75,
    align: 'center',
  },
]
</script>

<template>
  <div class="t-cell-group--card bg-white p-4">
    <div class="text-sm font-semibold">
      {{ t('pageDataCenter.area.title') }}
    </div>
    <div class="mt-3">
      <t-table
        :data="data"
        :columns="tableCol"
        row-key="title"
        size="small"
        :max-height="400"
        stripe
        bordered
        class="area-table"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.area-table {
  :deep(.t-table__content) {
    border-radius: 6px;
    .t-table__header--fixed:not(.t-table__header--multiple) > tr > th {
      background-color: #fff;
    }
  }
}
</style>
