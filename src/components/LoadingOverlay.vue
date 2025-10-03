<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const props = defineProps<{ text?: string, size?: string }>()
const { t } = useI18n()
</script>

<template>
  <div class="loading-container">
    <t-loading :text="props.text || t('common.messages.loading')" :size="props.size || '32px'" />
  </div>
</template>

<style lang='scss' scoped>
.loading-container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
</style>
