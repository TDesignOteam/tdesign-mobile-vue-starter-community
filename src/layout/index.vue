<script setup lang='ts'>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useTheme } from '../composables/useTheme'
import BottomNavigation from './components/BottomNavigation.vue'
import PageHeader from './components/PageHeader.vue'
import { useLayoutState } from './composables/useLayoutState'
import { useNavigation } from './composables/useNavigation'

defineOptions({
  name: 'Layout',
})

// 侧边栏显示状态
const visible = ref(false)
const { t } = useI18n()
const router = useRouter()

useTheme()
const {
  activeTab,
  tabList,
  baseSidebar,
  getPageTitle,
  handleTabChange,
  changeToSearch,
  handleSidebarItemClick,
} = useNavigation()
const {
  showBackButton,
  showBottomNav,
  showTitle,
  isLoginPage,
  isMyPage,
} = useLayoutState()

// 侧边栏项目点击处理（包装函数，用于关闭侧边栏）
function itemClick(index: number, item: any, context: { e: MouseEvent }) {
  handleSidebarItemClick(index, item, context)
  visible.value = false
}

// 打开侧边栏
function openDrawer() {
  visible.value = true
}
</script>

<template>
  <t-drawer
    v-model:visible="visible" style="--td-drawer-title-font-size:24px;--td-drawer-sidebar-height:90vh;"
    class="drawer-c" placement="left" :title="t('common.navigation.page_directory')" :items="baseSidebar" @item-click="itemClick"
  />
  <div class="layout-container" :class="{ 'login-layout': isLoginPage, 'show-background': isMyPage }">
    <!-- 页面标题栏 -->
    <PageHeader
      :show-back-button="showBackButton"
      :show-title="showTitle"
      :is-my-page="isMyPage"
      :get-page-title="getPageTitle"
      :change-to-search="changeToSearch"
      @open-drawer="openDrawer"
    />

    <!-- 主内容区域 -->
    <div class="main-content">
      <router-view />
    </div>

    <!-- 底部导航栏 -->
    <BottomNavigation
      v-if="showBottomNav"
      :tab-list="tabList"
      :active-tab="activeTab"
      @tab-change="handleTabChange"
    />
  </div>
</template>

<style lang='scss' scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  height: 100dvh;
  background-color: var(--td-bg-color-page);
  overflow: hidden;
  &.login-layout {
    // light 模式下透明背景
    background-color: transparent;
  }
}

// dark 模式下登录页面恢复原背景色
:root[theme-mode='dark'] .layout-container.login-layout {
  background-color: var(--td-bg-color-page);
}

.show-background {
  // 二倍图处理
  background: image-set(url('@/assets/images/bg.png') 1x, url('@/assets/images/bg@2x.png') 2x) no-repeat;
  background-size: contain;
  background-color: var(--td-bg-color-page);
}

// 主内容区域
.main-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
</style>
