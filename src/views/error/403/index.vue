<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import Error403 from '@/assets/error/403.svg?component'

defineOptions({
  name: '403',
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
    title: '403页面',
    i18n: 'menus.fzt',
  }
}
</route>

<template>
  <Banner func="back" title="403" />
  <div class="h-full flex items-center flex-col justify-center px-4">
    <t-result>
      <template #image>
        <Error403 />
      </template>
      <template #title>
        <div>403 Forbidden</div>
      </template>
      <template #description>
        <div>{{ t('page403.msg') }}</div>
      </template>
    </t-result>
    <div class="mt-10">
      <t-button theme="primary" size="medium" @click="handleGoHome">
        {{ t('page403.btn') }}
      </t-button>
    </div>
  </div>
</template>
