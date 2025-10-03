<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storagePrefix } from '@/config'
import { setLanguage } from '@/plugins/i18n'
import { useGlobal, useStorage } from '@/utils/global'
import SettingsMenu from './SettingsMenu.vue'

defineOptions({
  name: 'GeneralSettings',
})

const { t } = useI18n()
const { $storage } = useGlobal()

const isEnglish = computed(() => ($storage.locale === 'en-us'))

const currentLanguageText = computed(() => {
  return $storage.locale === 'zh-cn' ? t('common.language.zh_cn') : t('common.language.en_us')
})

const generalSettings = computed(() => [
  {
    name: t('pages.my.general_settings.language'),
    icon: 'translate',
    type: 'switch' as const,
    switchValue: isEnglish.value,
    currentValue: currentLanguageText.value,
  },
])

async function handleLanguageChange(value: boolean) {
  const newLocale = value ? 'en-us' : 'zh-cn'
  await setLanguage(newLocale)
  $storage.locale = newLocale
  useStorage().setItem(`${storagePrefix()}config`, $storage)
}
</script>

<template>
  <div class="general-settings-page">
    <SettingsMenu :items="generalSettings" @switch-change="handleLanguageChange" />
  </div>
</template>

<style lang='scss' scoped>
.general-settings-page {
  background-color: var(--td-bg-color-page);
  padding-bottom: 20px;
}

/* 容器样式保留外层，内部由 SettingsMenu 负责 */
</style>
