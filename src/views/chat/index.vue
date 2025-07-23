<template>
  <div class="chat">
    <t-navbar :title="curUser.title" :fixed="false" left-arrow @left-click="clickBack" />
    <div class="chat__main" ref="mainRef">
      <template v-for="(message, index) of messageList" :key="index">
        <div class="chat__time"
             :class="{
               'chat__time--first': index === 0,
             }"
             v-if="message.time">{{ message.time }}</div>
        <div class="chat__line"
             :class="{
               'chat__line--other': !message.isMine,
               'chat__line--mine': message.isMine,
               'chat__line--first': index === 0,
             }"
             v-else>
          <t-avatar shape="circle" :image="message.isMine ? MINE_AVATAR : curUser.img" size="small"/>
          <div class="chat__message-wrapper">
            <t-loading theme="spinner" size="16px" class="chat__loading" v-if="message.loading"/>
            <div class="chat__message"
                 :class="{
                   'chat__message--other': !message.isMine,
                   'chat__message--mine': message.isMine,
                 }"
            >{{ message.message }}</div>
          </div>
        </div>
      </template>
    </div>
    <div class="chat__input-wrapper">
      <t-textarea class="chat__input" placeholder="请在此输入内容" bordered v-model="inputValue"/>
      <t-button theme="primary" :disabled="!inputValue" shape="round" @click="clickSend">发送</t-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Message } from './data';
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { MOCK_CHAT_DATA, MOCK_RECEIVED_MESSAGE_LIST } from './data';

const router = useRouter();
const route = useRoute();

const DEFAULT_USER = 'Sean';
const userId = ref(DEFAULT_USER);
const inputValue = ref('');
const tempList = ref<Message[]>([]);
const mainRef = ref<HTMLElement | null>(null);
let fakeReceivedTimer: ReturnType<typeof setTimeout> | null = null;

const curUser = computed(() => MOCK_CHAT_DATA[userId.value as keyof typeof MOCK_CHAT_DATA]);
const MINE_AVATAR = '/images/chat/avatar.png';
const messageList = computed(() => [...curUser.value.list, ...tempList.value] as Array<Message>);

function clickBack() {
  router.back();
}
onMounted(() => {
  userId.value = (route.query.user as string) || DEFAULT_USER;
});

function scrollToTBottom() {
  setTimeout(() => {
    if (mainRef.value) {
      mainRef.value.scrollTop = 100000;
    }
  });
}

function fakeReceived() {
  if (fakeReceivedTimer) {
    clearTimeout(fakeReceivedTimer);
  }
  fakeReceivedTimer = setTimeout(() => {
    const random = Math.floor(Math.random() * (MOCK_RECEIVED_MESSAGE_LIST.length - 1));
    tempList.value.push({
      message: MOCK_RECEIVED_MESSAGE_LIST[random],
      isMine: false,
    });
    scrollToTBottom();
  }, 1000);
}

function clickSend() {
  tempList.value.push({
    message: inputValue.value,
    isMine: true,
    loading: true,
  });
  setTimeout(() => {
    tempList.value.forEach(item => item.loading = false);
  }, 300);
  fakeReceived();
  scrollToTBottom();
  inputValue.value = '';
}
</script>

<style scoped lang="scss">
.chat {
  height: 100vh;
  display: flex;
  flex-direction: column;

  &__main {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    background: #fff;
    border-top: 0.5px solid #e7e7e7;
    padding: 16px 12px;
    flex: 1;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__time {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 28px;
    color: #00000066;
    font-size: 12px;
    line-height: 20px;
    margin-top: 16px;

    &--first {
      margin-top: 0;
    }
  }
  &__line {
    display: flex;
    align-items: flex-start;
    margin-top: 16px;

    &--mine {
      flex-direction: row-reverse;
    }
    &--first {
      margin-top: 0;
    }
  }
  &__message-wrapper {
    display: flex;
    align-items: center;
  }
  &__loading {
    margin-right: 8px;
  }
  &__message {
    position: relative;
    box-sizing: border-box;
    max-width: 255px;
    padding: 12px;
    font-size: 14px;
    line-height: 22px;
    margin-left: 8px;

    &--other {
      border-radius: 0 12px 12px 12px;
      background-color: #f3f3f3;
    }
    &--mine {
      border-radius: 12px 0 12px 12px;
      margin-left: auto;
      margin-right: 8px;
      background-color: #d9e1ff;
    }
  }

  &__input-wrapper {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    border-top: 0.5px solid #e7e7e7;
  }
  &__input {
    height: 40px;
    flex: 1;
    margin-right: 12px;
    --td-textarea-padding: 8px 16px;
    --td-textarea-border-radius: 20px;
  }
}
</style>
