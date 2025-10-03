<script setup lang="ts">
import { Icon as TIcon } from 'tdesign-icons-vue-next'

interface TabItem {
  value: string
  label: string
  icon: string
  path: string
  badge?: string
}

interface Props {
  tabList: TabItem[]
  activeTab: string
}

defineProps<Props>()

defineEmits<{
  tabChange: [value: string]
}>()
</script>

<template>
  <div class="bottom-container">
    <div class="bottom-navigation">
      <div class="tab-bar">
        <div
          v-for="tab in tabList" :key="tab.value" class="tab-item" :class="{ active: activeTab === tab.value }"
          @click="$emit('tabChange', tab.value)"
        >
          <div class="tab-content">
            <div class="tab-icon">
              <TIcon
                :name="tab.icon" size="20"
                :color="activeTab === tab.value ? 'var(--td-brand-color-7)' : 'var(--td-text-color-primary)'"
              />
              <t-badge v-if="tab.badge" :count="tab.badge" size="medium" class="tab-badge" />
            </div>
            <div class="tab-label" :class="{ 'tab-label--active': activeTab === tab.value }">
              {{ tab.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom-container {
  height: 56px;
  // 底部导航栏
  .bottom-navigation {
    background-color: var(--td-bg-color-container);
    border-top: 0.5px solid var(--td-border-level-1-color);
    padding: 8px;
    display: flex;
    align-items: center;

    .tab-bar {
      display: flex;
      justify-content: space-between;
      width: 100%;
      gap: 8px;

      .tab-item {
        flex: 1;
        height: 40px;
        border-radius: 999px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        background-color: transparent;
        padding: 0 47.17px;
        min-width: 0;
        -webkit-tap-highlight-color: transparent;
        user-select: none;

        &.active {
          background-color: var(--td-brand-color-1);

          .tab-label {
            color: var(--td-brand-color-7);
          }
        }

        .tab-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;

          .tab-icon {
            position: relative;
            margin-bottom: 2px;

            .tab-badge {
              position: absolute;
              top: -8px;
              right: -8px;
            }
          }

          .tab-label {
            height: 16px;
            font-size: 10px;
            font-weight: 600;
            font-family: 'PingFang SC', sans-serif;
            text-align: center;
            line-height: 16px;
            color: var(--td-text-color-secondary);
            transition: color 0.3s ease;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            &--active {
              color: var(--td-brand-color-7);
            }
          }
        }
      }
    }
  }
}
</style>
