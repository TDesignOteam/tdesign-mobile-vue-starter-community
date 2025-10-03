<script setup lang='ts'>
interface Props {
  id: string | number
  name: string
  picture: string
  message: any
  count?: number
  truncateMessage: (text: string) => string
  getLastMessage: (message: any) => string
}

const props = defineProps<Props>()

const emit = defineEmits<{ (e: 'click', id: string | number): void }>()
</script>

<template>
  <t-cell
    :key="props.id"
    class="list-item"
    style="background-color: var(--td-bg-color-container);"
  >
    <t-avatar size="48px" :image="props.picture" class="avatar" />

    <div class="flex-auto ml-4 content">
      <div class="detail" style="background-color: var(--td-bg-color-container);" @click="emit('click', props.id)">
        <span class="upper" style="color: var(--td-text-color-secondary);">{{ props.name }}</span>
        <span class="down" style="color: var(--td-text-color-placeholder);">
          {{ props.truncateMessage(props.getLastMessage(props.message)) }}
        </span>
      </div>
    </div>
    <div v-if="props.count" class="count-wrap">
      <t-badge :count="props.count ?? 0" />
    </div>
  </t-cell>
</template>

<style lang='scss' scoped>
.list-item {
  width: 100%;
  height: 82px;
  opacity: 1;
  padding: 17px 17px 16px 0px;
  border-bottom: 0.5px solid #e7e7e7;
  position: relative;
  .avatar {
    margin-left: 16px;
  }
}
.content {
  display: flex;
  align-items: center;
  padding-right: 36px;
}
.detail {
  height: 50px;
  width: 90%;
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0;
}
.detail .upper {
  width: 100%;
  height: 24px;
  opacity: 1;
  color: var(--td-text-color-primary);
  font-size: 16px;
  font-weight: 400;
  font-family: 'PingFang SC';
  text-align: left;
  line-height: 24px;
}
.detail .down {
  width: 100%;
  height: 22px;
  opacity: 1;
  color: var(--td-text-color-placeholder);
  font-size: 14px;
  font-weight: 400;
  font-family: 'PingFang SC';
  text-align: left;
  line-height: 22px;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.count-wrap {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
