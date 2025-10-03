<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const props = defineProps<{ title?: string, description?: string, actionText?: string }>()
const emit = defineEmits<{ (e: 'action'): void }>()
const { t } = useI18n()
</script>

<template>
  <div class="empty-container">
    <t-result theme="default" :title="props.title || t('common.empty.title')" :description="props.description || t('common.empty.description')">
      <template #action>
        <t-button theme="primary" @click="emit('action')">
          {{ props.actionText || t('common.buttons.refresh') }}
        </t-button>
      </template>
    </t-result>
  </div>
</template>

<style lang='scss' scoped>
.empty-container {
  padding-top: 40px;
}
</style>
