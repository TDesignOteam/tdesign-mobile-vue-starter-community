<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { sendVerifyCodeApi } from '@/api/user'
import { notifyError } from '@/utils/notify'
import { filterNonDigits } from '@/utils/value'

const props = defineProps<{ phone: string, region: string }>()

const verCodeId = defineModel<string>('verCodeId')
const verCode = defineModel<string>('verCode')

const { t } = useI18n()
const status = reactive({
  countdown: 60,
  isSend: false,
})

function onChange(val: string) {
  verCode.value = filterNonDigits(val)
}

let timer: NodeJS.Timeout = null
async function onSend() {
  if (timer) {
    return
  }
  try {
    const res = await sendVerifyCodeApi({ phone: props.phone, region: props.region })
    verCodeId.value = res.data.codeId
  }
  catch (error) {
    notifyError(error.message)
  }

  status.isSend = true
  status.countdown = 5
  timer = setInterval(() => {
    if (status.countdown === 1) {
      clearInterval(timer)
      timer = null
      status.isSend = false
    }
    status.countdown--
  }, 1000)
}

onMounted(() => {
  onSend()
})
</script>

<template>
  <div>
    <div class="mb-6 text-xs text-[#00000066]">
      {{ t('pageLogin.TVerifyCode') }} {{ phone }}
    </div>
    <t-input v-model.trim="verCode" :maxlength="6" type="tel" @change="onChange">
      <template #suffix>
        <div class="pl-4 h-[24px] border-l-[0.5px] border-l-[#e7e7e7]">
          <div v-if="!status.isSend" class="cursor-pointer text-[#0052D9]" @click="onSend">
            {{ t('pageLogin.btnSendVer') }}
          </div>
          <div v-else class="text-[#B5C7FF] cursor-not-allowed">
            {{ status.countdown }} {{ t('pageLogin.btnSendVerWait') }}
          </div>
        </div>
      </template>
    </t-input>
  </div>
</template>

<style lang='scss' scoped>
:deep() {
  --td-input-bg-color: transparent;
  --td-input-vertical-padding: 16px 0;
  --td-input-border-left-space: 0;
}
</style>
