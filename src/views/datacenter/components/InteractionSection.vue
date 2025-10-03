<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const props = defineProps<{ interaction: { views: number, likes: number, shares: number, favorites: number } | null }>()

const { t } = useI18n()
</script>

<template>
  <div class="interaction-section">
    <div class="interaction-header">
      <div class="interaction-title">
        {{ t('pages.datacenter.interaction.title') }}
      </div>
    </div>
    <div class="interaction-content">
      <div class="interaction-item">
        <div class="interaction-label">
          {{ t('pages.datacenter.interaction.views') }}
        </div>
        <div class="interaction-number">
          <span class="number">{{ props.interaction?.views ?? '—' }}</span>
          <span class="unit">{{ t('pages.datacenter.interaction.unit') }}</span>
        </div>
      </div>
      <div class="interaction-item">
        <div class="interaction-label">
          {{ t('pages.datacenter.interaction.likes') }}
        </div>
        <div class="interaction-number">
          <span class="number">{{ props.interaction?.likes ?? '—' }}</span>
          <span class="unit">{{ t('pages.datacenter.interaction.unit') }}</span>
        </div>
      </div>
      <div class="interaction-item">
        <div class="interaction-label">
          {{ t('pages.datacenter.interaction.shares') }}
        </div>
        <div class="interaction-number">
          <span class="number">{{ props.interaction?.shares ?? '—' }}</span>
          <span class="unit">{{ t('pages.datacenter.interaction.unit') }}</span>
        </div>
      </div>
      <div class="interaction-item">
        <div class="interaction-label">
          {{ t('pages.datacenter.interaction.favorites') }}
        </div>
        <div class="interaction-number">
          <span class="number">{{ props.interaction?.favorites ?? '—' }}</span>
          <span class="unit">{{ t('pages.datacenter.interaction.unit') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.interaction-section {
  background-color: #fff;
  border-radius: 9px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  margin: 0 16px 16px;

  .interaction-header {
    margin-bottom: 16px;
  }

  .interaction-title {
    font-size: 16px;
    font-weight: 600;
    color: #000000e6;
  }

  .interaction-content {
    display: flex;
    justify-content: space-between;
    gap: 16px;
  }

  .interaction-item {
    text-align: left;
    flex: 1 1 0;
    min-width: 0;

    .interaction-label {
      font-size: 12px;
      color: #999;
      margin-bottom: 4px;
    }

    .interaction-number {
      .number {
        font-size: 24px;
        font-weight: 700;
        color: #000000e6;
      }

      .unit {
        font-size: 12px;
        color: #999;
        margin-left: 2px;
      }
    }
  }
}
</style>
