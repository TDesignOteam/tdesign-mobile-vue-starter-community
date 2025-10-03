<script setup lang='ts'>
import { computed, defineProps } from 'vue'
import VirtualList from '@/components/VirtualList.vue'

interface MessageItem {
  id: string | number
  tag: 'me' | 'other' | 'time'
  value: string
  showTimeDivider?: boolean
  timeText?: string
  picture?: string
}

const props = defineProps<{ messages: MessageItem[], avatar?: string }>()

const renderMessages = computed(() => props.messages.filter(m => m.tag !== 'time'))
</script>

<template>
  <VirtualList
    mode="dynamic" class="messages-area" :items="renderMessages" key-field="id" :item-size="68"
    :buffer-px="300"
  >
    <template #default="{ item }">
      <div class="itemContent">
        <div v-if="item.showTimeDivider" class="time-badge">
          {{ item.timeText }}
        </div>

        <div v-if="item.tag === 'me'" class="msg-row right">
          <div class="msg-bubble self">
            {{ item.value }}
          </div>
          <t-avatar size="40px" :image="props.avatar || item.picture" />
        </div>

        <div v-else-if="item.tag === 'other'" class="msg-row left">
          <t-avatar size="40px" :image="props.avatar || item.picture" />
          <div class="msg-bubble other">
            {{ item.value }}
          </div>
        </div>
      </div>
    </template>
  </VirtualList>
</template>

<style lang='scss' scoped>
.itemContent {
  box-sizing: border-box;
  padding: 16px 12px 0 12px;
}

.messages-area {
  flex: 1;
  border-top: 0.5px solid #e7e7e7;
  padding: 8px 12px 80px 12px;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--td-bg-color-container);
  min-height: 0;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }
}

.time-badge {
  text-align: center;
  margin: 8px 0 16px 0;
  color: #999;
  font-size: 12px;
}

.msg-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.msg-row.left {
  justify-content: flex-start;
}

.msg-row.right {
  justify-content: flex-end;
}

.msg-bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 400;
  font-family: 'PingFang SC';
  text-align: left;
  line-height: 22px;
  opacity: 1;
  background: #f3f3f3;
  position: relative;
  padding: 12px;
}

.msg-bubble.other {
  background: var(--td-bg-color-page);
  color: var(--td-text-color-primary);
  border-radius: 0 12px 12px 12px;
}

.msg-bubble.self {
  background: #d9e1ff;
  color: var(--td-text-color-primary);
  border-radius: 12px 0 12px 12px;
}
</style>
