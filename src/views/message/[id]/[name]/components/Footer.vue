<script setup lang='ts'>
import { useI18n } from 'vue-i18n'

const emits = defineEmits(['send'])

const { t } = useI18n()

const msg = ref<string>('')

const allowSend = computed(() => {
  return msg.value.trim().length > 0
})

function handleSend() {
  if (!allowSend.value) {
    return
  }

  emits('send', msg.value)
}

function clearMsg() {
  msg.value = ''
}

defineExpose({ clearMsg })

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
  // Shift+Enter 允许换行
}
</script>

<template>
  <div class="input-area flex">
    <t-textarea
      v-model="msg"
      bordered
      :placeholder="t('pageChat.plhInput')"
      :maxlength="1000"
      :autosize="{ minRows: 1, maxRows: 3 }"
      @keydown="handleKeydown"
    />

    <button class="send-btn" :class="[!allowSend && 'is-disabled']" @click="handleSend">
      {{ t('pageChat.btnSend') }}
    </button>
  </div>
</template>

<style lang='scss' scoped>
.input-area {
  border-top: 0.5px solid #e7e7e7;
  background-color: #fff;
  padding: 12px;
  gap: 12px;
  /* 添加一些安全区域的适配 */
  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));
  z-index: 10;
}

:deep(.t-textarea) {
  flex: 1;
  padding: 8px 16px;
  background-color: #f3f3f3;
  border-radius: 20px;
}

// 添加自定义样式类，支持换行显示
:deep(.custom-textarea) {
  .t-textarea__inner {
    white-space: pre-wrap;
  }
}

.send-btn {
  width: 64px;
  height: 40px;

  background: #0052d9;
  color: #fff;
  font-size: 16px;
  border-radius: 100px;
  border: none;
  opacity: 1;

  cursor: pointer;
  user-select: none;

  &.is-disabled {
    cursor: not-allowed;
    background: #b5c7ff;
  }
}
</style>
