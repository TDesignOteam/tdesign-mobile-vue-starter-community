<script setup lang='ts'>
import MessageInput from './components/MessageInput.vue'
import MessageList from './components/MessageList.vue'
import { useNotice } from './composables/useNotice'

defineOptions({
  name: 'Notice',
})

const { t, message, sending, current, messagesWithTimeInfo, handleSendMessage } = useNotice()
</script>

<template>
  <div class="chat-container">
    <MessageList :messages="messagesWithTimeInfo" :avatar="current?.picture" />
    <MessageInput
      v-model="message"
      :sending="sending"
      :placeholder="t('pages.notice.input_placeholder')"
      @send="handleSendMessage"
    />
  </div>
</template>

<style lang='scss' scoped>
.chat-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--td-bg-color-page);
  position: relative;
  overflow: hidden;
  background-color: #fff;
}
</style>
