<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const value = defineModel<boolean>()
const { t } = useI18n()
</script>

<template>
  <t-radio v-model="value" borderless allow-uncheck :label="t('pageLogin.TTerms')" />
</template>

<style lang='scss' scoped>
:deep() {
  --td-radio-vertical-padding: 0;
  --td-radio-font-size: 12px;
  --td-radio-icon-size: 16px;
  --td-radio-label-line-height: 16px;
  --td-radio-bg-color: transparent;

  .t-radio__icon--left {
    margin-right: 4px;
  }
}
</style>
