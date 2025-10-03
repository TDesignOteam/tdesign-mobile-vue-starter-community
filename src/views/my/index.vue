<script setup lang='ts'>
import { MenuItem, ServiceGrid, StatsSection } from '@/components'
import UserInfoCard from './components/UserInfoCard.vue'
import { useMyPage } from './composables/useMyPage'

defineOptions({
  name: 'My',
})

const {
  t,
  isLoggedIn,
  displayUserInfo,
  guestInfo,
  stats,
  serviceGroups,
  menuItems,
  handleLogin,
  handleEdit,
  handleServiceClick,
  handleStatClick,
  handleMenuClick,
} = useMyPage()
</script>

<template>
  <div class="my-page">
    <!-- 用户信息和统计数据合并卡片 -->
    <div class="user-stats-card">
      <!-- 用户信息区域 -->
      <UserInfoCard
        :is-logged-in="isLoggedIn" :user-info="displayUserInfo" :guest-text="guestInfo.nickname"
        @user-click="handleLogin" @edit-click="handleEdit"
      />

      <!-- 分隔线 -->
      <div class="divider" />

      <!-- 统计数据 -->
      <StatsSection :stats="stats" @stat-click="handleStatClick" />
    </div>

    <!-- 推荐服务卡片 -->
    <ServiceGrid :title="t('pages.my.services.title')" :services="serviceGroups" @service-click="handleServiceClick" />

    <!-- 菜单项 -->
    <div class="menu-section">
      <MenuItem v-for="(item, index) in menuItems" :key="index" :item="item" @click="handleMenuClick" />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.my-page {
  padding-bottom: 62px;
  color: var(--td-text-color-primary);
}

// 用户信息和统计数据合并卡片
.user-stats-card {
  background-color: var(--td-bg-color-container);
  margin: 0px 16px 16px 16px;
  border-radius: 12px;
  overflow: hidden;
}

// 分隔线
.divider {
  height: 1px;
  background: #f3f3f3;
  margin: 0;
}

// 菜单项容器
.menu-section {
  background-color: var(--td-mask-background);
  margin: 0 16px;
  border-radius: 12px;
  overflow: hidden;
}

// 适配安全区域
@supports (padding: max(0px)) {
  .my-page {
    padding-bottom: max(20px, env(safe-area-inset-bottom));
  }
}
</style>
