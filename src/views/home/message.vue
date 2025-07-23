<template>
  <div class="message">
    <t-pull-down-refresh v-model="refreshing" @refresh="onRefresh">
      <t-cell :title="message.title" :description="message.desc" v-for="(message, index) of messageList" :key="index" @click="() => clickMessage(message)">
        <template #leftIcon>
          <t-avatar shape="circle" :image="message.img" />
        </template>
        <template #rightIcon v-if="message.count">
          <t-badge count="2" />
        </template>
      </t-cell>
    </t-pull-down-refresh>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { MOCK_CHAT_DATA } from '../chat/data';

const router = useRouter();

const computedList = Object.values(MOCK_CHAT_DATA).map(item => ({
  ...item,
  desc: item.list[item.list.length - 1].message || '',
  count: item.count || '',
}));
const messageList = ref(computedList);

const refreshing = ref(false);

function onRefresh() {
  refreshing.value = true;
  setTimeout(() => {
    refreshing.value = false;
  }, 1000);
}

function clickMessage(message: { title: string }) {
  router.push(`/chat?user=${message.title}`);
}
</script>

<style scoped lang="scss">
.message {
  height: 100vh;
  background-color: #f3f3f3;

  :deep(.t-cell__title) {
    overflow: hidden;
  }
  :deep(.t-cell__description) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
