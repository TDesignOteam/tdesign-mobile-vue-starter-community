import type { RegionColumn, VideoStatistics } from '@/api/datacenter'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getDataCenterStats } from '@/api/datacenter'
import { message as $message } from '@/plugins/message'

export function useDataCenterStats() {
  const { t } = useI18n()

  // 按区域统计数据
  const regionData = ref<VideoStatistics[]>([])
  const regionColumns = ref<RegionColumn[]>([])
  // 概览/互动/完成度
  const overview = ref<{ views: string, pv: string, uv: string } | null>(null)
  const interaction = ref<{ views: number, likes: number, shares: number, favorites: number } | null>(null)
  const completion = ref<Array<{ time: string, percentage: number }>>([])
  const loading = ref(false)

  // 获取列标题翻译
  function getColumnTitle(colKey: string): string {
    const titleMap: Record<string, string> = {
      title: t('pages.datacenter.region.columns.title'),
      global: t('pages.datacenter.region.columns.global'),
      northChina: t('pages.datacenter.region.columns.north_china'),
      eastChina: t('pages.datacenter.region.columns.east_china'),
      westChina: t('pages.datacenter.region.columns.west_china'),
      southChina: t('pages.datacenter.region.columns.south_china'),
      index: t('pages.datacenter.region.columns.title'),
    }
    return titleMap[colKey] || colKey
  }

  // 加载数据中心统计数据
  async function loadDataCenterStats() {
    try {
      loading.value = true
      const response = await getDataCenterStats()
      if (response.success) {
        regionData.value = response.data.regionData
        // 合并翻译的列配置
        regionColumns.value = response.data.regionColumns.map(col => ({
          ...col,
          title: getColumnTitle(col.colKey),
        }))
        // 新增数据
        overview.value = response.data.overview
        interaction.value = response.data.interaction
        completion.value = response.data.completion
      }
      else {
        $message.error(response.message || t('common.messages.error'))
      }
    }
    catch (error) {
      console.error('load data center stats failed:', error)
      $message.error(t('pages.home.errors.load_failed_retry'))
    }
    finally {
      loading.value = false
    }
  }

  return {
    regionData,
    regionColumns,
    overview,
    interaction,
    completion,
    loading,
    loadDataCenterStats,
  }
}
