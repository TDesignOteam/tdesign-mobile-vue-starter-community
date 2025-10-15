<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import { $t } from '@/plugins/i18n'
import { useGlobal, useStorage } from '@/utils/global'
import SettingGroup from './components/SettingGroup.vue'

defineOptions({
  name: 'Setting',
})

const { locale } = useI18n()
const { $storage } = useGlobal()

function noop() {}

const localeState = reactive({
  show: false,
  locale: [locale.value],
  options: [
    { label: '中文（简体）', value: 'zh-cn' },
    { label: 'English (US)', value: 'en-us' },
  ],
})

function switchLang(val: string[]) {
  localeState.show = false
  // vue-i18n、storageConfig、localStorage 三处同步更新
  locale.value = val[0]
  $storage.locale = val[0]
  useStorage().setItem(`config`, $storage)
}

const groups = [
  [
    { title: $t('pageSetting.general'), icon: 'app', onClick: noop },
    { title: $t('pageSetting.notify'), icon: 'notification', onClick: noop },
    { title: $t('pageSetting.language'), icon: 'internet', onClick: () => { localeState.show = true } },
  ],
  [
    { title: $t('pageSetting.dark'), icon: 'image', onClick: noop },
    { title: $t('pageSetting.font'), icon: 'chart', onClick: noop },
    { title: $t('pageSetting.play'), icon: 'sound', onClick: noop },
  ],
  [
    { title: $t('pageSetting.account'), icon: 'secured', onClick: noop },
    { title: $t('pageSetting.privacy'), icon: 'info-circle', onClick: noop },
  ],
]
</script>

<route lang="json5">
{
  meta: {
    title: '设置',
    i18n: 'menus.setting',
  }
}
</route>

<template>
  <div class="setting-page h-full overflow-y-auto p-[16px]">
    <Banner title="设置" func="back" />

    <SettingGroup v-for="(items, idx) in groups" :key="idx" :items="items" />

    <t-popup v-model="localeState.show" placement="bottom">
      <t-picker
        v-model="localeState.locale"
        :columns="localeState.options"
        @confirm="switchLang"
        @cancel="() => {
          localeState.show = false
          localeState.locale = [locale]
        }"
      >
        <template #option="item">
          {{ item.label }}
        </template>
      </t-picker>
    </t-popup>
  </div>
</template>
