<script setup lang='ts'>
import { useI18n } from 'vue-i18n'
import Card from './components/Card.vue'
import MiniSearch from './components/MiniSearch.vue'
import Swiper from './components/Swiper.vue'
import { useHomeHook } from './hooks'

const { t } = useI18n()

const loadText = reactive([
  t('pageHome.load.pull'),
  t('pageHome.load.release'),
  t('pageHome.load.loading'),
  t('pageHome.load.loaded'),
])

const {
  dataList,
  activeTab,
  disRefresh,
  isRefreshing,
  goToSearch,
  goToPublish,
  handleScroll,
  handleRefresh,
  handleTabChange,
} = useHomeHook()

onMounted(() => {
  handleRefresh()
})
</script>

<route lang="json5">
{
  meta: {
    title: '首页',
    i18n: 'menus.home',
    showFooter: true
  }
}
</route>

<template>
  <div class="h-full">
    <Banner func="menu" :border="false">
      <template #title>
        <div class="w-full mx-[42px]">
          <MiniSearch @click="goToSearch" />
        </div>
      </template>
    </Banner>
    <t-tabs v-model="activeTab" size="large" @change="handleTabChange">
      <t-tab-panel value="recommend" :label="t('pageHome.tabRecom')" />
      <t-tab-panel value="following" :label="t('pageHome.tabFollow')" />
    </t-tabs>
    <t-pull-down-refresh
      v-model="isRefreshing"
      :disabled="disRefresh"
      :loading-bar-height="56"
      :max-bar-height="100"
      :loading-texts="loadText"
      @refresh="handleRefresh"
    >
      <div
        class="p-3 h-[calc(100%-48px)] overflow-y-auto flex flex-wrap justify-between"
        @scroll="handleScroll($event)"
      >
        <div
          v-if="dataList.length === 0"
          class="w-full text-sm text-gray-400 text-center"
        >
          {{ t('pageHome.empty') }}
        </div>
        <div v-for="item in dataList" :key="item.id">
          <Card
            v-if="item.type === 'card'"
            :img="item.img"
            :title="item.title"
            :tags="item.tags"
          />
          <Swiper v-else :imgs="item.imgs" />
        </div>
      </div>
    </t-pull-down-refresh>

    <t-fab
      :text="t('pageHome.btnPub')"
      :y-bounds="[48, 72]"
      style="right: 16px; bottom: 80px;"
      @click="goToPublish"
    >
      <template #icon>
        <AddIcon size="24" />
      </template>
    </t-fab>
  </div>
</template>
