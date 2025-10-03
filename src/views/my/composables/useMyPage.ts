import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { getProfileServices, getUserStats, trackServiceClick } from '@/api/profile'
import defaultAvatarUrl from '@/assets/svgs/Avatar.svg?url'
import { useUserStore } from '@/store/user'

interface DisplayTagItem {
  label: string
  icon: string
  type: string
}

interface DisplayUserInfo {
  avatar: string
  nickname: string
  tags: DisplayTagItem[]
}

function extractCityName(address: string): string {
  if (!address)
    return ''

  const parts = address.split(' ').filter(Boolean)

  if (parts.length >= 2) {
    const cityPart = parts.find(part => part.includes('市'))
    if (cityPart)
      return cityPart

    const firstPart = parts[0]
    if (firstPart.includes('北京') || firstPart.includes('天津')
      || firstPart.includes('上海') || firstPart.includes('重庆')) {
      return firstPart
    }

    return parts[1]
  }

  return parts[0] || address
}

export function useMyPage() {
  const router = useRouter()
  const { t } = useI18n()
  const userStore = useUserStore()
  const { isLoggedIn, userInfo } = userStore

  const displayUserInfo = computed<DisplayUserInfo | null>(() => {
    if (isLoggedIn && userInfo) {
      return {
        avatar: userInfo.avatar || defaultAvatarUrl,
        nickname: userInfo.name,
        tags: userInfo.constellation || userInfo.location
          ? [
              ...(userInfo.constellation ? [{ label: userInfo.constellation, icon: 'tag', type: 'constellation' }] : []),
              ...(userInfo.location ? [{ label: extractCityName(userInfo.location), icon: 'location', type: 'location' }] : []),
            ]
          : [],
      }
    }
    return null
  })

  const guestInfo = computed(() => ({
    nickname: t('pages.my.login_register'),
  }))

  const stats = ref<any[]>([])
  const serviceGroups = ref<any[][]>([])
  const menuItems = ref<any[]>([])
  const loading = ref(false)

  function getServiceName(name: string): string {
    const nameMap: Record<string, string> = {
      微信: t('pages.my.services.wechat'),
      QQ: t('pages.my.services.qq'),
      TDoc: t('pages.my.services.tdoc'),
      TMap: t('pages.my.services.tmap'),
      数据中心: t('pages.my.services.data_center'),
    }
    return nameMap[name] || name
  }

  function getMenuItemName(name: string): string {
    const nameMap: Record<string, string> = {
      联系客服: t('pages.my.contact_service'),
      设置: t('pages.my.settings'),
    }
    return nameMap[name] || name
  }

  function getStatLabel(key: string): string {
    const labelMap: Record<string, string> = {
      all_posts: t('pages.my.stats.all_posts'),
      under_review: t('pages.my.stats.under_review'),
      published: t('pages.my.stats.published'),
      drafts: t('pages.my.stats.drafts'),
    }
    return labelMap[key] || key
  }

  function handleLogin() {
    if (!isLoggedIn)
      router.push('/login')
    else
      router.push('/my/edit')
  }

  function handleEdit() {
    router.push('/my/edit')
  }

  function handleContact() {
    console.warn('联系客服')
  }

  function handleSettings() {
    router.push('/my/settings')
  }

  function getMenuAction(name: string) {
    const actionMap: Record<string, () => void> = {
      联系客服: handleContact,
      设置: handleSettings,
    }
    return actionMap[name] || (() => { })
  }

  async function handleServiceClick(service: any) {
    console.warn('点击服务:', service.name)

    try {
      await trackServiceClick({
        serviceName: service.name,
        serviceType: service.type || 'internal',
      })
    }
    catch (error) {
      console.error('记录服务点击失败:', error)
    }

    if (service.url) {
      if (service.type === 'external')
        window.open(service.url, '_blank')
      else
        router.push(service.url)
    }
    else if (service.name === t('pages.my.services.data_center')) {
      router.push('/datacenter')
    }
  }

  function handleStatClick(stat: any, index: number) {
    console.warn('点击统计:', stat, index)
  }

  function handleMenuClick(item: any) {
    if (item && typeof item.action === 'function')
      item.action()
  }

  async function loadProfileData() {
    try {
      loading.value = true
      const [servicesResponse, statsResponse] = await Promise.all([
        getProfileServices(),
        getUserStats(userInfo?.id),
      ])

      if (servicesResponse.success) {
        serviceGroups.value = servicesResponse.data.serviceGroups.map(group =>
          group.map(service => ({
            ...service,
            name: getServiceName(service.name),
          })),
        )

        menuItems.value = servicesResponse.data.menuItems.map(item => ({
          ...item,
          name: getMenuItemName(item.name),
          action: getMenuAction(item.name),
        }))
      }

      if (statsResponse.success) {
        stats.value = statsResponse.data.stats.map(stat => ({
          ...stat,
          label: getStatLabel(stat.key),
        }))
      }
    }
    catch (error) {
      console.error('加载个人页面数据失败:', error)
    }
    finally {
      loading.value = false
    }
  }

  onMounted(() => {
    loadProfileData()
  })

  return {
    // i18n
    t,
    // user
    isLoggedIn,
    userInfo,
    displayUserInfo,
    guestInfo,
    // data
    stats,
    serviceGroups,
    menuItems,
    loading,
    // actions
    handleLogin,
    handleEdit,
    handleSettings,
    handleContact,
    handleServiceClick,
    handleStatClick,
    handleMenuClick,
  }
}

export type UseMyPageReturn = ReturnType<typeof useMyPage>
