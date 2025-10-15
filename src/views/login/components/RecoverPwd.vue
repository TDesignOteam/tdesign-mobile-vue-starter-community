<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['rev'])
const { t } = useI18n()
function revPwd() {
  emits('rev')
}
</script>

<template>
  <div class="text-xs">
    <span>{{ t('pageLogin.TForget') }}</span>
    <span class="text-[#0052D9] cursor-pointer ml-1" @click="revPwd">
      {{ t('pageLogin.TFind') }}
    </span>
  </div>
</template>
