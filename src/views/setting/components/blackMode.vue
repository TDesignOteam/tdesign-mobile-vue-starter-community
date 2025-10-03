<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'
import SettingsMenu from './SettingsMenu.vue'

defineOptions({
  name: 'MyBlackMode',
})

const { isDarkMode, toggleTheme } = useTheme()
const { t } = useI18n()

const currentThemeText = computed(() => {
  return isDarkMode.value ? t('pages.my.theme.dark') : t('pages.my.theme.light')
})

const themeSettings = computed(() => [
  {
    name: t('pages.my.theme.title'),
    icon: 'image',
    type: 'switch' as const,
    switchValue: isDarkMode.value,
    currentValue: currentThemeText.value,
  },
])

function handleThemeChange(value: boolean) {
  toggleTheme(value)
}
</script>

<template>
  <div class="theme-settings-page">
    <SettingsMenu :items="themeSettings" @switch-change="handleThemeChange" />
  </div>
</template>

<style lang='scss' scoped>
.theme-settings-page {
  background-color: var(--td-bg-color-page);
  padding-bottom: 20px;
}

/* 容器样式保留外层，内部由 SettingsMenu 负责 */
</style>
