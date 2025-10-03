<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const props = defineProps<{ title?: string, description?: string }>()
const emit = defineEmits<{ (e: 'retry'): void }>()
const { t } = useI18n()
</script>

<template>
  <div class="error-container">
    <t-result theme="error" :title="props.title || t('common.errors.load_failed')" :description="props.description || t('common.errors.load_failed_retry')">
      <template #action>
        <t-button theme="primary" @click="emit('retry')">
          {{ t('common.buttons.refresh') }}
        </t-button>
      </template>
    </t-result>
  </div>
</template>

<style lang='scss' scoped>
.error-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
}
</style>
