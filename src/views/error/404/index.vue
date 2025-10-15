<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import Error404 from '@/assets/error/404.svg?component'

defineOptions({
  name: '404',
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
    title: '404页面',
    i18n: 'menus.fzf',
  }
}
</route>

<template>
  <Banner func="back" title="404" />
  <div class="h-full flex items-center flex-col justify-center px-4">
    <t-result>
      <template #image>
        <Error404 />
      </template>
      <template #title>
        <div>404 Not Found</div>
      </template>
      <template #description>
        <div>{{ t('page404.msg') }}</div>
      </template>
    </t-result>
    <div class="mt-10">
      <t-button theme="primary" size="medium" @click="handleGoHome">
        {{ t('page403.btn') }}
      </t-button>
    </div>
  </div>
</template>
