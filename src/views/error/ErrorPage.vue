<script setup lang='ts'>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import errorIllustration from '@/assets/svgs/errorPage.svg'

defineOptions({
  name: 'ErrorPage',
})

const props = withDefaults(defineProps<{
  code?: '403' | '404' | '500'
  title?: string
  message?: string
  imageSrc?: string
}>(), {
  code: '404',
})

const { t } = useI18n()
const router = useRouter()

const configMap = {
  403: { titleKey: 'common.error.403_title', msgKey: 'common.error.403_message' },
  404: { titleKey: 'common.error.404_title', msgKey: 'common.error.404_message' },
  500: { titleKey: 'common.error.500_title', msgKey: 'common.error.500_message' },
} as const

const i18nInfo = computed(() => configMap[props.code ?? '404'] ?? configMap['404'])
const displayTitle = computed(() => props.title ?? t(i18nInfo.value.titleKey))
const displayMessage = computed(() => props.message ?? t(i18nInfo.value.msgKey))
const displayImage = computed(() => props.imageSrc ?? errorIllustration)

function goHome() {
  router.replace('/home')
}
</script>

<template>
  <div class="error-page">
    <t-image class="error-illustration" :src="displayImage" fit="contain" :lazy="false" />
    <h3 class="error-title">
      {{ displayTitle }}
    </h3>
    <p class="error-message">
      {{ displayMessage }}
    </p>
    <div class="actions">
      <t-button size="large" theme="primary" @click="goHome">
        返回首页
      </t-button>
    </div>
    <slot />
  </div>
</template>

<style scoped>
.error-page {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
  gap: 12px;
}
.error-illustration {
  width: 220px;
  height: 220px;
}
.error-title {
  font-size: 18px;
  font-weight: 600;
}
.error-message {
  color: var(--td-text-color-secondary);
}
.actions {
  margin-top: 8px;
  width: 100%;
}
.actions :deep(.t-button) {
  width: 100%;
}
</style>
