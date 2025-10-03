<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { EmptyState, ErrorState } from '@/components'
import VirtualList from '@/components/VirtualList.vue'
import HomeCard from './components/HomeCard.vue'
import HomeFab from './components/HomeFab.vue'
import HomeSwiper from './components/HomeSwiper.vue'
import HomeTabs from './components/HomeTabs.vue'
import { useHomeContent } from './composables/useHomeContent'
import { useHomeGrid } from './composables/useHomeGrid'
import { usePublishSuccessMessage } from './composables/usePublishSuccessMessage'

defineOptions({ name: 'Home' })

const { t } = useI18n()

const {
  refreshing,
  loading,
  homeItems,
  currentPage,
  hasMore,
  loadHomeContent,
  handleRefreshContent,
  tryLoadMore,
} = useHomeContent({ pageLimit: 40 })

// Grid 虚拟列表参数（与 HomeCard/HomeSwiper 固定尺寸匹配）
const {
  contentRef,
  gridCols,
  itemSecondarySize,
  itemSize,
  computeGridCols,
  setupResizeObserver,
  teardownResizeObserver,
} = useHomeGrid({ minCardWidth: 170, itemSize: 256, horizontalPadding: 24 })

const { checkAndNotifyOnce } = usePublishSuccessMessage({ contextSelector: '.content' })

// 组件挂载/卸载
onMounted(() => {
  loadHomeContent()
  computeGridCols()
  setupResizeObserver()
  void checkAndNotifyOnce()
})
onUnmounted(() => {
  teardownResizeObserver()
})

function handleRefresh() {
  void handleRefreshContent()
}

function handleScrolltolower() {
  tryLoadMore()
}

function onVListUpdate(startIndex: number, endIndex: number, visibleStartIndex?: number, visibleEndIndex?: number) {
  const vEnd = visibleEndIndex ?? endIndex
  if (hasMore.value && !loading.value && vEnd >= homeItems.value.length - gridCols.value)
    tryLoadMore()
}
</script>

<template>
  <div class="h-full flex flex-col overflow-hidden">
    <!-- 顶部 -->
    <HomeTabs />

    <!-- 中间滚动区 -->
    <t-pull-down-refresh
      v-model="refreshing" :loading-bar-height="80" :max-bar-height="100"
      :loading-texts="[t('pages.home.content.refresh.pull_down'), t('pages.home.content.refresh.release'), t('pages.home.content.refresh.refreshing'), t('pages.home.content.refresh.completed')]"
      class="flex-1 bg-[var(--td-bg-color-page)]" @refresh="handleRefresh" @scrolltolower="handleScrolltolower"
    >
      <div ref="contentRef" class="content h-full flex flex-col">
        <ErrorState
          v-if="!loading && !refreshing && homeItems.length === 0 && !hasMore"
          :title="t('pages.home.ui.error_title')" :description="t('pages.home.errors.load_failed_retry')"
          @retry="handleRefresh"
        />
        <EmptyState
          v-else-if="!loading && !refreshing && homeItems.length === 0"
          :title="t('pages.home.ui.empty_title')" :description="t('pages.home.ui.empty_description')"
          :action-text="t('common.buttons.refresh')" @action="handleRefresh"
        />
        <div v-else class="cardContainer flex-1 min-h-0">
          <VirtualList
            mode="recycle"
            class="h-full" :items="homeItems" :item-size="itemSize" :grid-items="gridCols"
            :item-secondary-size="itemSecondarySize" :add-recycle-buffer="300" list-class="grid-list"
            @update="onVListUpdate"
          >
            <template #default="{ item, index }">
              <div
                class="grid-cell" :class="{
                  'grid-cell-left': gridCols > 1 && index % gridCols === 0,
                  'grid-cell-right': gridCols > 1 && (index % gridCols) === gridCols - 1,
                }"
              >
                <template v-if="item.type === 'card'">
                  <HomeCard :title="item.title" :image-src="item.image" :tags="item.tags" />
                </template>
                <template v-else-if="item.type === 'swiper'">
                  <HomeSwiper :images="item.images" />
                </template>
              </div>
            </template>
          </VirtualList>
        </div>
      </div>
    </t-pull-down-refresh>

    <!-- 底部 -->
    <HomeFab />
  </div>
</template>

<style lang="scss" scoped>
.content {
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.cardContainer {
  margin: 12px;
}

/* 虚拟网格列表容器：左右贴边，列宽等分，间距自适应 */
.grid-list {
  background: var(--td-bg-color-page);
}

.grid-cell {
  display: flex;
  justify-content: center;
}

.grid-cell-left {
  justify-content: flex-start;
}

.grid-cell-right {
  justify-content: flex-end;
}
</style>
