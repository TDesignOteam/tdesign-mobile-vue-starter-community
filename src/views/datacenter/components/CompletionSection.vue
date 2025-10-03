<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps<{ completion: Array<{ time: string, percentage: number }> }>()

const { t } = useI18n()
</script>

<template>
  <div class="completion-section">
    <div class="completion-header">
      <div class="completion-title">
        {{ t('pages.datacenter.completion.title') }}
      </div>
    </div>
    <div class="completion-content">
      <div v-for="item in props.completion" :key="item.time" class="completion-item">
        <div class="completion-time">
          {{ item.time }}
        </div>
        <div class="completion-progress">
          <t-progress :percentage="item.percentage" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.completion-section {
  background-color: #fff;
  border-radius: 9px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 0 16px 16px;

  .completion-header {
    margin-bottom: 16px;
  }

  .completion-title {
    font-size: 16px;
    font-weight: 600;
    color: #000000e6;
  }

  .completion-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .completion-item {
    display: flex;
    align-items: center;
    gap: 16px;

    .completion-time {
      font-size: 14px;
      color: #666;
      min-width: 50px;
    }

    .completion-progress {
      flex: 1;
    }
  }
}
</style>
