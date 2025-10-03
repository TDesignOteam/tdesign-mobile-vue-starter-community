<script setup lang="ts">
import enConfig from 'tdesign-mobile-vue/es/locale/en_US'
import zhConfig from 'tdesign-mobile-vue/es/locale/zh_CN'
import { computed, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useGlobal } from './utils/global'

const { $storage } = useGlobal()
const { locale } = useI18n()

const currentLocale = computed(() => {
  const storagelocale: string = $storage.locale
  switch (storagelocale) {
    case 'zh-cn':
      return { ...zhConfig }
    case 'en-us':
      return { ...enConfig }
    default:
      return { ...zhConfig }
  }
})

onBeforeMount(() => {
  // 解决刷新、首次加载恢复默认语言的情况
  locale.value = $storage.locale
})
</script>

<template>
  <t-config-provider :global-config="currentLocale">
    <router-view />
  </t-config-provider>
</template>
