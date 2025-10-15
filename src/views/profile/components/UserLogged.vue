<script setup lang='ts'>
defineProps<{
  avatar?: string
  title: string
  tags: any[]
}>()
</script>

<template>
  <t-cell>
    <template #image>
      <t-avatar :image="avatar" size="64px" />
    </template>
    <template #rightIcon>
      <Edit1Icon size="20px" />
    </template>
    <template #title>
      <span class="font-semibold mt-[6px]">
        {{ title }}
      </span>
    </template>
    <template #description>
      <div class="flex gap-2 mt-2">
        <t-tag v-for="item in tags" :key="item.label" size="small" variant="light">
          <template #icon>
            <t-icon :name="item.icon" size="10px" />
          </template>
          <span>
            {{ item.label }}
          </span>
        </t-tag>
      </div>
    </template>
  </t-cell>
</template>

<style lang='scss' scoped>
.t-cell::after {
  border-bottom: 0;
}

:deep(.t-tag) {
  --td-tag-small-padding: 6px;
}
</style>
