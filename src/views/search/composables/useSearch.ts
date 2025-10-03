import { DialogPlugin } from 'tdesign-mobile-vue'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { cancelRequest } from '@/api/request'
import { getSearchDiscoveries, getSearchHistoryTags, search as searchApi } from '@/api/search'
import 'tdesign-mobile-vue/es/dialog/style/index.css'

export function useSearch() {
  const { t } = useI18n()
  const router = useRouter()

  const taglist = ref<string[]>([])
  const findlist = ref<string[]>([])

  const searchQuery = ref('')
  let searchTimer: number | null = null
  let currentRequestId: number | null = null

  onMounted(async () => {
    const [tagsRes, discRes] = await Promise.all([
      getSearchHistoryTags(),
      getSearchDiscoveries(),
    ])
    if (tagsRes.success && tagsRes.data)
      taglist.value = tagsRes.data.tags || []
    if (discRes.success && discRes.data)
      findlist.value = discRes.data.items || []
  })

  watch(searchQuery, (q) => {
    if (searchTimer)
      clearTimeout(searchTimer)
    const text = q?.trim() || ''
    if (!text) {
      if (currentRequestId)
        cancelRequest(currentRequestId)
      currentRequestId = null
      return
    }
    searchTimer = window.setTimeout(async () => {
      // 取消之前的请求
      if (currentRequestId)
        cancelRequest(currentRequestId)

      try {
        const response = await searchApi(text)
        currentRequestId = response.requestId || null
        // 如果后续需要使用搜索结果，可在此扩展返回值
      }
      catch (error) {
        // 忽略取消的请求错误
        if ((error as any)?.name !== 'AbortError') {
          console.error('搜索失败:', error)
        }
      }
    }, 300)
  })

  onBeforeUnmount(() => {
    if (searchTimer)
      clearTimeout(searchTimer)
    if (currentRequestId)
      cancelRequest(currentRequestId)
  })

  function handleCancelClick() {
    router.push('/home')
  }

  function handleClearHistoryClick() {
    DialogPlugin.confirm({
      title: t('pages.search.clear_confirm_title') || t('common.buttons.confirm'),
      content: t('pages.search.clear_confirm_body') || '',
      confirmBtn: t('common.buttons.confirm'),
      cancelBtn: t('common.buttons.cancel'),
      preventScrollThrough: true,
      onConfirm: () => {
        taglist.value = []
      },
    })
  }

  return {
    t,
    taglist,
    findlist,
    searchQuery,
    handleCancelClick,
    handleClearHistoryClick,
  }
}

export type UseSearchReturn = ReturnType<typeof useSearch>
