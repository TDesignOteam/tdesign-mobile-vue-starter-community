<script setup lang='ts'>
const props = withDefaults(defineProps<{
  avatar?: string
  title?: string
  sub?: string
  count?: number
}>(), {
  avatar: '',
  title: '',
  sub: '',
  count: 0,
})
</script>

<template>
  <div class="message-item w-full flex items-center">
    <t-avatar size="48px" :image="props.avatar" />

    <div class="flex-1 min-w-0 px-[12px]">
      <div class="message-title truncate">
        {{ props.title }}
      </div>
      <div class="message-sub truncate">
        {{ props.sub }}
      </div>
    </div>

    <div v-if="props?.count" class="w-[24px]">
      <t-badge :count="props?.count ?? 0" :offset="[-8, 0]" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.message-item {
  border-bottom: 0.5px solid #e7e7e7;
  background: #ffffff;
  height: 82px;
  padding: 16px;

  .message-title {
    color: #000000e6;
    line-height: 24px;
  }

  .message-sub {
    width: 100%;
    font-size: 14px;
    line-height: 22px;
    color: #00000099;
  }
}
</style>
