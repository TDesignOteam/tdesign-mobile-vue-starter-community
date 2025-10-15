<script setup lang='tsx'>
import type { Component, VNode } from 'vue'

import dayjs from 'dayjs'
import { Avatar as TAvatar } from 'tdesign-mobile-vue'

const props = defineProps<{
  avatar: string | VNode | Component
  content: string | VNode | Component
  time?: dayjs.ConfigType
  position?: 'left' | 'right'
}>()

const buildAvatar = computed(() => {
  if (typeof props.avatar === 'string') {
    return (
      <TAvatar
        size="40px"
        image={props.avatar}
      />
    )
  }

  return props.avatar
})

const buildContent = computed(() => {
  if (typeof props.content === 'string') {
    return (
      <div class="msg-content" style="white-space: pre-wrap;">
        {props.content}
      </div>
    )
  }

  return props.content
})

const showTime = ref<boolean>(false)
function handleMessageClick() {
  if (showTime.value) {
    return
  }
  showTime.value = true
  setTimeout(() => {
    showTime.value = false
  }, 2000)
}
</script>

<template>
  <div
    class="w-full flex gap-2 pb-[16px]"
    :class="[props?.position === 'right' && 'flex-row-reverse']"
  >
    <div>
      <component :is="buildAvatar" />
    </div>
    <div
      class="flex flex-col"
      :class="[props?.position === 'right' ? 'items-end' : 'items-start']"
      @click="handleMessageClick"
    >
      <div :class="[props?.position === 'right' ? 'right-content' : 'left-content']">
        <component :is="buildContent" />
      </div>
      <div v-if="showTime" class="text-xs mt-1 text-[#00000066]">
        {{ dayjs(props.time).format('YYYY-MM-DD HH:mm:ss') }}
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.left-content {
  border-radius: 0 12px 12px 12px;
  background-color: #f3f3f3;
}

.right-content {
  border-radius: 12px 0 12px 12px;
  background-color: #d9e1ff;
}

.msg-content {
  padding: 12px;
  max-width: 68vw; // 255 / 375
  font-size: 14px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
}
</style>
