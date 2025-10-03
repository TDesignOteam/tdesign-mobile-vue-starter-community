<script setup lang='ts'>
import { MenuItem } from '@/components'

interface SettingsItem {
  name: string
  icon: string
  type?: 'switch' | 'normal'
  switchValue?: boolean
  currentValue?: string
}

const props = defineProps<{ items: SettingsItem[] }>()
const emit = defineEmits<{
  (e: 'switchChange', value: boolean): void
}>()

function handleSwitchChange(value: boolean) {
  emit('switchChange', value)
}
</script>

<template>
  <div class="menu-section">
    <MenuItem
      v-for="(setting, index) in props.items"
      :key="index"
      :item="setting"
      @switch-change="handleSwitchChange"
    />
  </div>
</template>

<style lang='scss' scoped>
.menu-section {
  background-color: var(--td-bg-color-container);
  margin: 16px 16px 0;
  border-radius: 12px;
  overflow: hidden;
}
</style>
