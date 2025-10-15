<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import Error500 from '@/assets/error/500.svg?component'

defineOptions({
  name: '500',
})

const { t } = useI18n()
const router = useRouter()

function handleGoHome() {
  router.push('/home')
}
</script>

<route lang="json5">
{
  meta: {
    title: '500页面',
    i18n: 'menus.fzz',
  }
}
</route>

<template>
  <Banner func="back" title="500" />
  <div class="h-full flex items-center flex-col justify-center px-4">
    <t-result>
      <template #image>
        <Error500 />
      </template>
      <template #title>
        <div>500 Internal Server Error</div>
      </template>
      <template #description>
        <div>{{ t('page500.msg') }}</div>
      </template>
    </t-result>
    <div class="mt-10">
      <t-button theme="primary" size="medium" @click="handleGoHome">
        {{ t('page403.btn') }}
      </t-button>
    </div>
  </div>
</template>
