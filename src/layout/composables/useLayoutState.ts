import { computed } from 'vue'
import { useRoute } from 'vue-router'

export function useLayoutState() {
  const route = useRoute()

  // 是否显示返回按钮
  const showBackButton = computed(() => {
    const path = route.path
    return path === '/publish'
      || path.includes('/login')
      || path.startsWith('/notice')
      || path.includes('/my')
      || path.includes('search')
      || path.includes('datacenter')
  })

  // 是否显示底部导航
  const showBottomNav = computed(() => {
    const path = route.path
    return path.includes('/home')
      || path === '/my'
      || path.startsWith('/talklist')
  })

  // 是否显示标题
  const showTitle = computed(() => {
    const path = route.path
    return path !== '/home' && !path.includes('/login')
  })

  // 是否为登录页面
  const isLoginPage = computed(() => {
    return route.path.includes('/login')
  })

  // 是否为个人中心页面
  const isMyPage = computed(() => {
    return route.path === '/my' || route.path.includes('/login')
  })

  return {
    showBackButton,
    showBottomNav,
    showTitle,
    isLoginPage,
    isMyPage,
  }
}
