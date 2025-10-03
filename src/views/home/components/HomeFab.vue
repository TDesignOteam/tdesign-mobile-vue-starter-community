<script lang="ts" setup>
import { AddIcon } from 'tdesign-icons-vue-next'
import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import router from '@/router'

const { t } = useI18n()
const iconFunc = () => h(AddIcon, { size: '24px' })

function onClick() {
  router.push({ path: '/publish' })
}
</script>

<template>
  <t-fab :icon="iconFunc" style="right: 16px; bottom: 80px;" :text="t('pages.publish.publish_action')" @click="onClick" />
</template>
