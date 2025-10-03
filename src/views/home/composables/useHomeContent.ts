import type { HomeItem } from '@/api/home'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getHomeContent, refreshHomeContent } from '@/api/home'
import { message as $message } from '@/plugins/message'

export interface UseHomeContentOptions {
  /** 每页条数 */
  pageLimit?: number
}

export function useHomeContent(options: UseHomeContentOptions = {}) {
  const { t } = useI18n()
  const PAGE_LIMIT = options.pageLimit ?? 40

  // 列表状态
  const refreshing = ref(false)
  const loading = ref(false)
  const homeItems = ref<HomeItem[]>([])
  const currentPage = ref(1)
  const hasMore = ref(true)

  // 加载首页内容
  async function loadHomeContent(page = 1, isRefresh = false) {
    try {
      if (!isRefresh)
        loading.value = true

      const response = await getHomeContent({ page, limit: PAGE_LIMIT })

      if (response.success) {
        if (isRefresh || page === 1)
          homeItems.value = response.data.items
        else
          homeItems.value.push(...response.data.items)

        if (response.data.pagination) {
          hasMore.value = response.data.pagination.hasMore
          currentPage.value = response.data.pagination.page
        }
      }
      else {
        $message.error(response.message || t('pages.home.errors.get_content_failed'))
      }
    }
    catch (error) {
      console.error('加载首页内容失败:', error)
      $message.error(t('pages.home.errors.load_failed_retry'))
    }
    finally {
      loading.value = false
      if (isRefresh)
        refreshing.value = false
    }
  }

  // 刷新首页内容
  async function handleRefreshContent() {
    try {
      refreshing.value = true
      await refreshHomeContent()
    }
    catch (error) {
      console.error('刷新首页内容失败:', error)
      $message.error(t('pages.home.errors.refresh_failed_retry'))
    }
    await loadHomeContent(1, true)
  }

  // 触底加载
  function tryLoadMore() {
    if (hasMore.value && !loading.value)
      void loadHomeContent(currentPage.value + 1)
  }

  return {
    // state
    refreshing,
    loading,
    homeItems,
    currentPage,
    hasMore,
    // actions
    loadHomeContent,
    handleRefreshContent,
    tryLoadMore,
  }
}
