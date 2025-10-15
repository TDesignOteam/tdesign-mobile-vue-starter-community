import type { BannerProps } from './type'

export function useBannerHook() {
  const openCatalog = ref<boolean>(false)
  const router = useRouter()

  function handleOpenCatalog() {
    openCatalog.value = true
  }

  function handleBack() {
    router.back()
  }

  function handleLeftClick(func: BannerProps['func']) {
    switch (func) {
      case 'back':
        handleBack()
        break
      case 'menu':
        handleOpenCatalog()
        break
      case 'none':
        break
    }
  }

  return {
    openCatalog,
    handleLeftClick,
  }
}
