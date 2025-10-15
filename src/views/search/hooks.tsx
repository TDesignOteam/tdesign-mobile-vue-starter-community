import { useDebounceFn } from '@vueuse/core'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSearchDiscApi } from '@/api/search'

export function useSearchHook() {
  const router = useRouter()
  const searchValue = ref('')

  // 历史记录的数据
  const historyTags = ref([
    'AI绘画',
    'Stable Diffusion',
    '版权素材',
    '星空',
    'Illustration',
    'AI绘画',
  ])

  // 历史记录的最大条数
  const maxHistoryTags = 10

  // 搜索发现的数据
  const searchSuggestions = ref([])

  // 添加执行搜索的函数
  function performSearch(keyword: string) {
    if (!keyword.trim())
      return
    // 如果历史记录中不存在该关键词，则添加到历史记录的最前面
    if (!historyTags.value.includes(keyword)) {
      historyTags.value.unshift(keyword)
      // 最多只保存maxHistoryTags条历史记录
      if (historyTags.value.length > maxHistoryTags) {
        historyTags.value.pop()
      }
    }
  }

  // enter键触发搜索
  function onEnterKeyPress() {
    // 输入框具有最大输入限制，因此这里不对输入最大值进行限制
    if (searchValue.value.trim()) {
      performSearch(searchValue.value)
      // 清空输入框迎接下一次输入 : )
      searchValue.value = ''
    }
  }

  /** 输入事件，防抖时间 500ms */
  const onChange = useDebounceFn((val: string) => {
    console.log(val)
    // 此处作其他业务处理（如：搜索联想等等）
  }, 500)

  function onCancel() {
    searchValue.value = ''
    router.back()
  }

  function clearHistory() {
    historyTags.value = []
  }

  function onHistoryTagClick(tag: string) {
    searchValue.value = tag
  }

  function onSuggestionClick(suggestion: string) {
    searchValue.value = suggestion
  }

  function getSearchSuggList() {
    getSearchDiscApi().then((res) => {
      searchSuggestions.value = res.data
    }).catch(() => {})
  }

  return {
    searchValue,
    historyTags,
    searchSuggestions,
    onCancel,
    onChange,
    clearHistory,
    getSearchSuggList,
    onHistoryTagClick,
    onSuggestionClick,
    onEnterKeyPress,
  }
}
