<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  text: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { t } = useI18n()

interface Props {
  modelValue?: boolean
  text?: string
}

// 如果没有提供文本，则使用默认的国际化文本
const agreementText = computed(() => props.text || t('pages.login.agreement_text'))

const agreed = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value),
})
</script>

<template>
  <div class="agreement-section auth-flex-center">
    <t-checkbox v-model="agreed" borderless />
    <span class="agreement-text">{{ agreementText }}</span>
  </div>
</template>

<style lang="scss" scoped>
.agreement-section {
  :deep(.t-checkbox) {
    --td-checkbox-icon-size: 14px;
    margin: 1px 0 0 16px !important;
    padding: 0 !important;
  }
}

.agreement-text {
  font-family: 'PingFang SC';
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  color: var(--td-text-color-primary);
}
</style>
