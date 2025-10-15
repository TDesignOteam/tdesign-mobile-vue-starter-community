import { $t } from '@/plugins/i18n'

export function useStatisticsHook() {
  const overallData = ref({
    update: '2025-09-19 20:25',
    data: [
      { label: $t('pageDataCenter.general.views'), value: 2020000, light: true },
      { label: $t('pageDataCenter.general.pv'), value: 2330000, light: false },
      { label: $t('pageDataCenter.general.uv'), value: 1020000, light: false },
    ],
  })

  const interData = ref([
    { label: $t('pageDataCenter.interaction.views'), value: 919, unit: $t('pageDataCenter.interaction.unit') },
    { label: $t('pageDataCenter.interaction.likes'), value: 887, unit: $t('pageDataCenter.interaction.unit') },
    { label: $t('pageDataCenter.interaction.shares'), value: 104, unit: $t('pageDataCenter.interaction.unit') },
    { label: $t('pageDataCenter.interaction.stars'), value: 47, unit: $t('pageDataCenter.interaction.unit') },
  ])

  const compList = ref([
    { label: '12:00', value: 80 },
    { label: '14:00', value: 60 },
    { label: '16:00', value: 85 },
    { label: '18:00', value: 43 },
    { label: '20:00', value: 60 },
    { label: '22:00', value: 95 },
  ])

  const areaData = ref([
    { title: '视频A', global: 4442, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频B', global: 1234, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频C', global: 12312, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频D', global: 5666, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频E', global: 1234, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频F', global: 6356, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频G', global: 14455, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频H', global: 1513, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频I', global: 1556, northChina: 456, eastChina: 456, southChina: 456 },
    { title: '视频J', global: 9184, northChina: 456, eastChina: 456, southChina: 456 },
  ])

  return {
    overallData,
    interData,
    compList,
    areaData,
  }
}
