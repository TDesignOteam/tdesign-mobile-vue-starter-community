<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { removeWhitespace } from '@/utils/value'

const { t } = useI18n()
const account = defineModel<string>('account')
const password = defineModel<string>('password')

function onAccChange(val: string) {
  account.value = removeWhitespace(val)
}
function onPwdChange(val: string) {
  password.value = removeWhitespace(val)
}
</script>

<template>
  <div>
    <t-input
      v-model="account"
      :placeholder="t('pageLogin.plhAccount')"
      :maxlength="20"
      :label="t('pageLogin.LAccount')"
      @change="onAccChange"
    />
    <t-input
      v-model="password"
      :label="t('pageLogin.LPassword')"
      :placeholder="t('pageLogin.plhPassword')"
      type="password"
      :maxlength="20"
      @change="onPwdChange"
    >
      <template #suffixIcon>
        <BrowseOffIcon />
      </template>
    </t-input>
  </div>
</template>

<style lang='scss' scoped>
:deep() {
  --td-input-bg-color: transparent;
  --td-input-vertical-padding: 16px 0;
  --td-input-border-left-space: 0;
  .t-input__label {
    width: 80px;
  }
}
</style>
