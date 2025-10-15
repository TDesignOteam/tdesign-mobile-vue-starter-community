<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import MessageItem from './components/MessageItem.vue'
import { useMessageHook } from './hooks'

const { t } = useI18n()
const { msgList, goToChat, getMsgList } = useMessageHook()

onMounted(() => {
  getMsgList()
})
</script>

<route lang="json5">
{
  meta: {
    title: '消息',
    i18n: 'menus.message',
    showFooter: true
  }
}
</route>

<template>
  <div class="page-container h-full overflow-y-auto">
    <Banner :title="t('pageMessage.title')" func="menu" />
    <RecycleScroller class="h-full" :items="msgList" :item-size="82" key-field="id">
      <template #default="{ item }">
        <MessageItem
          :title="item.title"
          :sub="item.content"
          :avatar="item.avatar"
          :count="item.count"
          @click="goToChat(item.id, item.title)"
        />
      </template>
    </RecycleScroller>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  background-color: #f7f8fa;
}
</style>
