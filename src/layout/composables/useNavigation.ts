import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { talklist } from '../../store/talklist'
import { useUserStore } from '../../store/user'

export function useNavigation() {
  const { t } = useI18n()
  const router = useRouter()
  const route = useRoute()
  const userStore = useUserStore()
  const activeTab = ref('home')

  // 页面标题映射
  const PAGE_TITLES = computed((): Record<string, () => string> => ({
    '/home': () => t('pages.home.title'),
    '/talklist': () => t('pages.talklist.title'),
    '/my': () => t('pages.my.title'),
    '/publish': () => t('pages.publish.title'),
    '/search': () => t('pages.home.search'),
    '/my/settings': () => t('pages.my.settings'),
    '/my/general-settings': () => t('pages.my.general_settings.title'),
    '/my/edit': () => t('pages.my.profile_info'),
    '/datacenter': () => t('pages.datacenter.title'),
  }))

  // 侧边栏配置
  const baseSidebar = computed(() => [
    {
      title: t('pages.home.title'),
      path: '/home',
    },
    {
      title: t('pages.home.search'),
      path: '/search',
    },
    {
      title: t('pages.publish.title'),
      path: '/publish',
    },
    {
      title: t('pages.talklist.title'),
      path: '/talklist',
    },
    {
      title: t('pages.notice.title'),
      path: '/notice/1',
    },
    {
      title: t('pages.my.logged_in_page'),
      path: '/my',
    },
    {
      title: t('pages.my.logged_out_page'),
      path: '/my',
    },
    {
      title: t('pages.my.profile_info'),
      path: '/my/edit',
    },
    {
      title: t('pages.my.settings'),
      path: '/my/settings',
    },
    {
      title: t('pages.datacenter.chart'),
      path: '/datacenter',
    },
    {
      title: t('pages.login.verify_login'),
      path: '/login/verify',
    },
    {
      title: t('pages.login.password_login'),
      path: '/login/password',
    },
  ])

  // 消息总数计算
  const messageSum = computed(() => {
    return talklist.reduce((acc, element) => {
      return (element.count || 0) + acc
    }, 0)
  })

  // 底部导航配置
  const tabList = computed(() => [
    {
      value: 'home',
      label: t('pages.home.title'),
      icon: 'home',
      path: '/home',
    },
    {
      value: 'message',
      label: t('common.navigation.message'),
      icon: 'chat',
      path: '/talklist',
      badge: messageSum.value > 0 ? messageSum.value.toString() : undefined,
    },
    {
      value: 'my',
      label: t('pages.my.title'),
      icon: 'user',
      path: '/my',
    },
  ])

  // 获取页面标题
  function getPageTitle(): string {
    const path = route.path

    // 直接匹配
    if (PAGE_TITLES.value[path]) {
      return PAGE_TITLES.value[path]()
    }

    // 特殊处理 notice 页面
    if (path.startsWith('/notice')) {
      const params = route.params as Record<string, string>
      const noticeId = params.id
      if (noticeId) {
        const currentChat = talklist.find(item => item.id === noticeId)
        return currentChat?.name || t('pages.notice.notification')
      }
      return t('pages.notice.notification')
    }

    return t('pages.home.title')
  }

  // 根据路径获取对应的tab
  function getActiveTabByPath(path: string): string {
    if (path === '/talklist' || path.startsWith('/notice')) {
      return 'message'
    }

    const tab = tabList.value.find(item => path.startsWith(item.path))
    return tab?.value || 'home'
  }

  // 处理tab切换
  function handleTabChange(value: string) {
    const tab = tabList.value.find(item => item.value === value)
    if (tab) {
      activeTab.value = value
      router.push(tab.path)
    }
  }

  function changeToSearch() {
    router.push('/search')
  }

  // 侧边栏项目点击处理
  function handleSidebarItemClick(index: number, item: any, _context: { e: MouseEvent }) {
    if (item.path) {
      if (item.title === t('pages.my.logged_in_page')) {
        simulateLogin()
      }
      else if (item.title === t('pages.my.logged_out_page')) {
        simulateLogout()
      }

      router.push(item.path)
    }
  }

  // 模拟登录状态（用于UI预览）
  function simulateLogin() {
    userStore.setToken('mock-token-for-preview')
    userStore.setUserInfo({
      id: '1',
      name: '小小轩',
      phone: '13800138000',
      avatar: '',
      gender: 'male',
      birthday: '1990-01-01',
      address: '北京市朝阳区',
      bio: '这是一个用于UI预览的模拟用户',
      photos: [],
      constellation: '天秤座',
      location: '深圳',
    })
  }

  // 模拟退出登录状态（用于UI预览）
  function simulateLogout() {
    userStore.resetUserState()
  }

  // 快速切换到已登录状态并跳转到个人中心
  function switchToLoggedInView() {
    simulateLogin()
    router.push('/my')
  }

  // 快速切换到未登录状态并跳转到个人中心页查看未登录UI
  function switchToLoggedOutView() {
    simulateLogout()
    router.push('/my')
  }

  // 监听路由变化更新激活状态
  watch(() => route.path, (newPath) => {
    activeTab.value = getActiveTabByPath(newPath)
  }, { immediate: true })

  return {
    activeTab,
    tabList,
    baseSidebar,
    messageSum,
    isLoggedIn: userStore.isLoggedIn,
    userInfo: userStore.userInfo,
    getPageTitle,
    getActiveTabByPath,
    handleTabChange,
    changeToSearch,
    handleSidebarItemClick,
    simulateLogin,
    simulateLogout,
    switchToLoggedInView,
    switchToLoggedOutView,
  }
}
