<script setup lang="ts">
interface MenuItem {
  name: string
  icon: string
  action?: () => void
  type?: 'normal' | 'switch'
  switchValue?: boolean | string
  currentValue?: string
  disabled?: boolean
}

interface Props {
  item: MenuItem
}

defineProps<Props>()
defineEmits<{
  click: [item: MenuItem]
  switchChange: [value: boolean, item: MenuItem]
}>()
</script>

<template>
  <div
    class="menu-item"
    :class="{
      'menu-item-no-click': item.type === 'switch',
      'menu-item-disabled': item.disabled,
    }"
    @click="item.type !== 'switch' && !item.disabled && $emit('click', item)"
  >
    <div class="menu-content">
      <div class="menu-left">
        <t-icon :name="item.icon" size="24" color="#0052D9" class="menu-icon" />
        <span class="menu-title">{{ item.name }}</span>
      </div>
      <div class="menu-right">
        <template v-if="item.type === 'switch'">
          <span v-if="item.currentValue" class="current-value">{{ item.currentValue }}</span>
          <t-switch
            :model-value="item.switchValue as boolean"
            size="large"
            :disabled="item.disabled"
            @change="($event: boolean) => $emit('switchChange', $event, item)"
          />
        </template>
        <t-icon v-else name="chevron-right" size="24" color="var(--td-text-color-secondary)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menu-item {
  height: 56px;
  border-bottom: 0.5px solid var(--td-border-level-1-color);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:active {
    background-color: var(--td-bg-color-component);
  }

  &.menu-item-no-click {
    cursor: default;

    &:active {
      background-color: transparent;
    }
  }

  &.menu-item-disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:active {
      background-color: transparent;
    }
  }

  .menu-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 100%;

    .menu-left {
      display: flex;
      align-items: center;

      .menu-icon {
        margin-right: 12px;
      }

      .menu-title {
        font-size: 16px;
        color: var(--td-text-color-primary);
        font-weight: 400;
      }
    }

    .menu-right {
      display: flex;
      align-items: center;
      gap: 8px;

      .current-value {
        font-size: 14px;
        color: var(--td-text-color-secondary);
        margin-right: 8px;
      }
    }
  }
}
</style>
