<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Footer from './components/Footer.vue'
import Message from './components/Message.vue'
import TimeBar from './components/TimeBar.vue'

import { useChatHook } from './hooks'

const { t } = useI18n()

const {
  userInfo,
  footerRef,
  messageList,
  chatContainerRef,
  sendMessage,
  buildMessageList,
} = useChatHook()

onMounted(() => {
  buildMessageList()
})
</script>

<template>
  <div class="chat-page h-full">
    <Banner :title="userInfo?.name ?? t('pageChat.unknown')" />

    <DynamicScroller
      ref="chatContainerRef"
      :items="messageList"
      :min-item-size="57"
      class="flex-1"
    >
      <template #default="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :data-index="index"
          class="px-[12px]"
        >
          <TimeBar
            v-if="item.isTime" :time="item.time"
          />
          <Message
            v-else
            :avatar="item.userAvatar"
            :content="item.content"
            :position="item.me ? 'right' : 'left' "
            :time="item.time"
          />
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>

    <Footer ref="footerRef" @send="sendMessage" />
  </div>
</template>

<style scoped>
.chat-page {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}
</style>
