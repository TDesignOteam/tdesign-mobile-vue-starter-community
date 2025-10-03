<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps<{ overview: { views: string, pv: string, uv: string } | null }>()

const { t } = useI18n()
</script>

<template>
  <div class="overview-section">
    <div class="overview-header">
      <div class="overview-title">
        {{ t('pages.datacenter.overview.title') }}
      </div>
      <div class="overview-note">
        {{ t('pages.datacenter.overview.note') }}
      </div>
    </div>
    <div class="overview-content">
      <div class="overview-item">
        <div class="overview-label">
          {{ t('pages.datacenter.overview.views') }}
        </div>
        <div class="overview-number views-number">
          {{ props.overview?.views ?? '—' }}
        </div>
      </div>
      <div class="overview-item">
        <div class="overview-label">
          {{ t('pages.datacenter.overview.pv') }}
        </div>
        <div class="overview-number">
          {{ props.overview?.pv ?? '—' }}
        </div>
      </div>
      <div class="overview-item">
        <div class="overview-label">
          {{ t('pages.datacenter.overview.uv') }}
        </div>
        <div class="overview-number">
          {{ props.overview?.uv ?? '—' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.overview-section {
  background-color: #fff;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;

  .overview-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .overview-title {
    font-size: 16px;
    font-weight: 600;
    color: #000000e6;
  }

  .overview-content {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .overview-item {
    text-align: left;
    flex: 1 1 0;
    min-width: 0;

    .overview-label {
      font-size: 12px;
      color: #999;
      margin-bottom: 4px;
    }

    .overview-number {
      font-size: 24px;
      font-weight: 700;
      color: #000000e6;
    }

    .overview-number.views-number {
      color: #0052d9;
    }
  }

  .overview-note {
    font-size: 12px;
    color: #999;
    line-height: 1.2;
  }
}
</style>
