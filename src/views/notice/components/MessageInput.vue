<script setup lang='ts'>
import { defineEmits, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  modelValue: string
  sending: boolean
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'send'): void
}>()

function handleEnter(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emit('send')
  }
}
const { t } = useI18n()
</script>

<template>
  <div class="input-area">
    <div class="input-wrapper flex items-center ">
      <input
        class="msg-input w-full"
        :placeholder="props.placeholder"
        :disabled="props.sending"
        :value="props.modelValue"
        @input="(e:any) => emit('update:modelValue', e?.target?.value ?? '')"
        @keypress="handleEnter"
      >
      <t-button
        size="medium"
        theme="primary"
        shape="round"
        class="send-btn"
        :disabled="(props.modelValue?.trim?.() ?? '') === '' || props.sending"
        :loading="props.sending"
        @click="emit('send')"
      >
        {{ props.sending ? t('pages.notice.sending') : t('pages.notice.send') }}
      </t-button>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.input-area {
  background: var(--td-bg-color-container);
  border-top: 1px solid var(--td-border-level-2-color);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 5px;
  z-index: 100;
  width: 100%;
  opacity: 1;
  border-top: 0.5px solid #e7e7e7;
}

.msg-input {
  background-color: var(--td-bg-color-component);
  margin: 12px;
  width: 100%;
  height: 40px;
  border-radius: 99px;
  border: 1px solid #dcdcdc;
  background: #f3f3f3;
  font-size: 14px;
  color: var(--td-text-color-primary);
  padding: 8px 16px;
  height: 24px;
  border-radius: 99px;
  opacity: 1;
  border: 1px solid #dcdcdc;

  &:focus {
    border-color: var(--td-brand-color);
  }
}

.send-btn {
  width: 64px;
  height: 40px;
  margin: 12px 12px 12px 0;
  border-radius: 100px;
}
</style>
