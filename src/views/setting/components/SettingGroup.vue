<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

defineProps<{
  items: any[]
}>()
const { t } = useI18n()
</script>

<template>
  <div class="setting-group">
    <t-cell
      v-for="(item, index) in items"
      :key="index"
      :title="t(item.title)"
      arrow
      hover
      @click="item.onClick && item.onClick()"
    >
      <template #left-icon>
        <TIcon :name="item.icon" size="20px" :color="item.color || '#0052d9'" />
      </template>
    </t-cell>
  </div>
</template>

<style lang="scss" scoped>
.setting-group {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 16px;
  overflow: hidden;
}

:deep(.t-cell__left) {
  display: flex;
  align-items: center;
}
</style>
