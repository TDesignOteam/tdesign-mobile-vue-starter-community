<script lang="ts" setup>
import { FileCopyIcon, UploadIcon } from 'tdesign-icons-vue-next'
import { h } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()

const { t } = useI18n()
const uploadIcon = () => h(UploadIcon, { size: '24px' })
const fileCopyIcon = () => h(FileCopyIcon, { size: '24px' })

function handlePublish() {
  router.push({ path: '/home', query: { success: '1' } })
}
</script>

<template>
  <div class="row h-[80px] items-center justify-around flex flex-row">
    <t-button size="large" class="w-[164px]" theme="light" :icon="fileCopyIcon">
      {{ t('pages.publish.save_draft') }}
    </t-button>
    <t-button size="large" class="w-[164px]" theme="primary" :icon="uploadIcon" @click="handlePublish">
      {{ t('pages.publish.publish_action') }}
    </t-button>
  </div>
</template>
