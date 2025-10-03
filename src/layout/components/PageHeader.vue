<script setup lang="ts">
import { Icon as TIcon } from 'tdesign-icons-vue-next'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

interface Props {
  showBackButton: boolean
  showTitle: boolean
  isMyPage: boolean
  getPageTitle: () => string
  changeToSearch: () => void
}

defineProps<Props>()

defineEmits<{
  openDrawer: []
}>()
const { t } = useI18n()
const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="page-header" :class="{ 'page-header--transparent': isMyPage }">
    <div class="header-left">
      <!-- 根据条件显示返回按钮或菜单图标 -->
      <TIcon
        v-if="showBackButton" name="chevron-left" size="24" color="var(--td-text-color-primary)"
        @click="router.back()"
      />
      <TIcon v-else name="view-list" size="24" color="var(--td-text-color-primary)" @click="$emit('openDrawer')" />
      <!-- 首页显示搜索框 -->
      <t-search
        v-if="route.path === '/home'" class="navbar-search" :placeholder="t('common.search.placeholder')"
        shape="round"
        @click="changeToSearch()"
      >
        <template #left-icon>
          <TIcon name="search" size="15px" />
        </template>
      </t-search>
    </div>
    <div class="header-title">
      <span v-if="showTitle">{{ getPageTitle() }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
// 页面标题栏样式
.page-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px 0 12px;
  background-color: var(--td-bg-color-container);
  height: 48px;
  position: relative;

  &--transparent {
    background-color: transparent;
  }

  .header-left {
    position: absolute;
    left: 12px;
    display: flex;
    align-items: center;
    height: 100%;

    .navbar-search {
      --td-search-height: 32px;
      width: 189px !important;
      height: 32px;
      margin-left: 10px;
      display: flex;
      align-items: center;
    }

    :deep(.t-input__keyword) {
      max-width: 140px;
      font-size: 14px;
    }
  }

  .header-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--td-text-color-primary);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    height: 26px;
    line-height: 26px;
    display: flex;
    align-items: center;
  }
}
</style>
