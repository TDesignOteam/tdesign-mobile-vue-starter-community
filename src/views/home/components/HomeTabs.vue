<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stickyProps = {
  zIndex: 999,
}
const tabPanels = [
  {
    value: 'first',
    label: '选项',
  },
  {
    value: 'second',
    label: '选项',
  },
  {
    value: 'third',
    label: '选项',
  },
  {
    value: 'four',
    label: '选项',
  },
]

const tabPanelsNext = [
  {
    value: '1',
    label: '选项',
  },
  {
    value: '2',
    label: '选项',
  },
  {
    value: '3',
    label: '选项',
  },
  {
    value: '4',
    label: '选项',
  },
  {
    value: '5',
    label: '选项',
  },
]
function onChange($event: number, label: string) {
  console.log(`change to ${$event}`, label)
}

function onNextChange($event: number) {
  console.log(`changeNext to ${$event}`)
}
</script>

<template>
  <div class="demo-tab-bar text-[16px] sticky top-0 bg-white z-50">
    <t-tabs default-value="first" size="large">
      <t-tab-panel value="first">
        <template #label>
          {{ t('pages.home.tabs.recommended') }}
        </template>
      </t-tab-panel>
      <t-tab-panel value="second">
        <template #label>
          {{ t('pages.home.tabs.following') }}
        </template>
      </t-tab-panel>
    </t-tabs>
  </div>
</template>

<style lang="scss" scoped>
</style>
