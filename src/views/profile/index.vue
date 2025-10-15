<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import UserLogged from './components/UserLogged.vue'
import UserUnLogged from './components/UserUnLogged.vue'
import { useProfileHook } from './hooks'

const { t } = useI18n()

const {
  services,
  userInfo,
  loginStatus,
  publishStatus,
  goToEdit,
  goToLogin,
  goToSettings,
  logout,
} = useProfileHook(t)
</script>

<route lang="json5">
{
  meta: {
    title: '个人中心',
    i18n: 'menus.info',
    showFooter: true,
    showBackground: true,
    backgroundColor: '#f5f6f7'
  }
}
</route>

<template>
  <div class="h-full">
    <!-- 导航栏 -->
    <Banner :title="t('pageMine.title')" func="menu" :border="false" transparent />

    <div class="h-full pb-4 overflow-y-auto">
      <div class="t-cell-group--card bg-white !mb-4">
        <UserLogged
          v-if="loginStatus"
          :avatar="userInfo.avatar"
          :title="userInfo.username"
          :tags="userInfo.tags"
          @click="goToEdit"
        />
        <UserUnLogged v-else @click="goToLogin" />

        <t-divider class="!m-0 !mt-1" />

        <t-grid class="publish-area py-4" :column="4">
          <t-grid-item
            v-for="(item, index) in publishStatus"
            :key="index"
            :text="t(item.name)"
            :icon="item.icon"
          />
        </t-grid>
      </div>

      <div class="t-cell-group--card bg-white !mb-4">
        <div class="text-sm font-semibold mt-4 ml-5">
          {{ t('pageMine.serTitle') }}
        </div>

        <t-grid :column="4">
          <t-grid-item
            v-for="(item, index) in services"
            :key="index"
            :text="t(item.label)"
            :image="item.icon"
            @click="item?.click"
          />
        </t-grid>
      </div>

      <t-cell-group theme="card">
        <t-cell :title="t('pageMine.funcService')" arrow>
          <template #leftIcon>
            <t-icon name="service" size="22px" />
          </template>
        </t-cell>
        <t-cell :title="t('pageMine.funcSetting')" arrow @click="goToSettings">
          <template #leftIcon>
            <SettingIcon size="22px" />
          </template>
        </t-cell>

        <t-cell
          v-if="loginStatus"
          :title="t('pageMine.funcLogout')"
          arrow
          @click="logout"
        >
          <template #leftIcon>
            <t-icon name="logout" size="22px" />
          </template>
        </t-cell>
      </t-cell-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.publish-area {
  :deep(.t-grid-item) {
    padding: 0;
    font-size: 22px;

    &:nth-child(1) {
      border-right: 1px solid #e7e7e7;
    }
  }
}
</style>
