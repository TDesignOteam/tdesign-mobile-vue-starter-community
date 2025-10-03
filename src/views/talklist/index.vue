<script setup lang='ts'>
import { EmptyState, ErrorState, LoadingOverlay } from '@/components'
import VirtualList from '@/components/VirtualList.vue'
import TalkListItem from './components/TalkListItem.vue'
import { useTalklist } from './composables/useTalklist'

defineOptions({
  name: 'Talklist',
})

const {
  isLoading,
  error,
  mytalklist,
  itemSize,
  bufferPx,
  goToDetail,
  truncateMessage,
  getLastMessage,
  refreshTalkList,
} = useTalklist()
</script>

<template>
  <div class="messege h-full" style="background-color: var(--td-bg-color-page);">
    <!-- 加载状态 -->
    <LoadingOverlay v-if="isLoading" />

    <!-- 错误状态 -->
    <ErrorState v-else-if="error" :description="error || undefined" @retry="refreshTalkList" />

    <!-- 聊天列表（虚拟滚动） -->
    <div v-else class="list-container">
      <!-- 空状态 -->
      <EmptyState v-if="mytalklist.length === 0" @refresh="refreshTalkList" />

      <VirtualList
        v-else
        mode="recycle"
        :items="mytalklist"
        :item-size="itemSize"
        :buffer-px="bufferPx"
        key-field="id"
        class="list-container-inner"
        @update="() => {}"
      >
        <template #default="{ item }">
          <TalkListItem
            :id="item.id"
            :name="item.name"
            :picture="item.picture"
            :message="item.message"
            :count="item?.count"
            :truncate-message="truncateMessage"
            :get-last-message="getLastMessage"
            @click="goToDetail(item.id)"
          />
        </template>
      </VirtualList>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.messege {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.custom-divider {
  margin: 0px 0;
  --td-divider-color: #ff0000;
  --td-divider-content-line-style: none;
}
.list-container {
  background-color: var(--td-bg-color-container);
  width: 100%;
  border-top: 0.5px solid #e7e7e7;
  height: 100%;
  overflow-y: auto;
  flex: 1 1 auto;
}
.count-badge {
  background-color: #ff3b30;
  color: #ffffff;
  border-radius: 999px;
  padding: 0 6px;
  min-width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  text-align: center;
}
</style>
