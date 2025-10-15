<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { filterNonDigits } from '@/utils/value'

const { t } = useI18n()
const phone = defineModel<string>('phone')
const region = defineModel<string>('region')
const regState = reactive({
  show: false,
  currRegion: [''],
  options: [
    { label: '马拉西亚', value: '+60' },
    { label: '新加坡', value: '+65' },
    { label: '日本', value: '+81' },
    { label: '中国香港', value: '+852' },
    { label: '中国澳门', value: '+853' },
    { label: '中国大陆', value: '+86' },
  ],
})

function onChange(val: string) {
  phone.value = filterNonDigits(val)
}

function onConfirm(val: string[]) {
  region.value = val[0]
  regState.show = false
}

onMounted(() => {
  regState.currRegion = [region.value]
})
</script>

<template>
  <div>
    <t-input v-model="phone" type="tel" :maxlength="11" @change="onChange">
      <template #label>
        <div
          class="w-[65px] h-[24px] pr-2 flex items-center border-r-[0.5px] border-r-[#e7e7e7]"
          @click="regState.show = true"
        >
          <div class="flex-1">
            {{ region }}
          </div>
          <CaretDownSmallIcon size="16px" />
        </div>
      </template>
    </t-input>

    <div class="mt-3 text-xs text-[#00000066]">
      {{ t('pageLogin.TPhone') }}
    </div>

    <t-popup v-model="regState.show" placement="bottom">
      <t-picker
        v-model="regState.currRegion"
        :columns="regState.options"
        @confirm="onConfirm"
        @cancel="regState.show = false"
      >
        <template #option="item">
          {{ item.label }} ({{ item.value }})
        </template>
      </t-picker>
    </t-popup>
  </div>
</template>

<style lang='scss' scoped>
:deep() {
  --td-input-bg-color: transparent;
  --td-input-vertical-padding: 16px 0;
  --td-input-border-left-space: 0;
}
</style>
