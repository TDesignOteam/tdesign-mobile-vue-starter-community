<script setup lang="ts">
import { onMounted } from 'vue'
import CompletionSection from './components/CompletionSection.vue'
import InteractionSection from './components/InteractionSection.vue'
import OverviewSection from './components/OverviewSection.vue'
import RegionSection from './components/RegionSection.vue'
import { useDataCenterStats } from './composables/useDataCenterStats'

defineOptions({
  name: 'DataCenter',
})

const { regionData, regionColumns, overview, interaction, completion, loadDataCenterStats } = useDataCenterStats()

// 表格事件处理
function handleRowClick(e: any) {
  console.warn('[row-click]', e)
}

function handleCellClick(e: any) {
  console.warn('[cell-click]', e)
}

function handleScroll(e: any) {
  console.warn('[scroll]', e)
}

onMounted(() => {
  loadDataCenterStats()
})
</script>

<template>
  <div class="datacenter-container">
    <OverviewSection :overview="overview" />
    <InteractionSection :interaction="interaction" />
    <CompletionSection :completion="completion" />
    <RegionSection
      :data="regionData"
      :columns="regionColumns"
      @row-click="handleRowClick"
      @cell-click="handleCellClick"
      @scroll="handleScroll"
    />
  </div>
</template>

<style lang="scss" scoped>
.datacenter-container {
  background-color: #f5f5f5;
}
</style>
