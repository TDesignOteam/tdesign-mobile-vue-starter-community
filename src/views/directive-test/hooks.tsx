export function useDirectiveTest() {
  // Copy 测试
  const copyText = ref('这是一个可复制的文本')

  // Touch 测试
  const tapCount = ref(0)
  const longpressResult = ref('')
  const swipeResult = ref('')

  function handleTap() {
    tapCount.value++
  }

  function handleLongPress() {
    longpressResult.value = '长按成功!'
    setTimeout(() => {
      longpressResult.value = ''
    }, 2000)
  }

  function handleSwipe(direction: string) {
    swipeResult.value = `滑动: ${direction}`
    setTimeout(() => {
      swipeResult.value = ''
    }, 2000)
  }

  // Debounce 测试
  const debounceCount = ref(0)
  function handleDebounceClick() {
    debounceCount.value++
  }

  // Throttle 测试
  const throttleCount = ref(0)
  function handleThrottleClick() {
    throttleCount.value++
  }

  // ImgLazy 测试
  const imageLoaded = ref(false)
  function handleImageLoad() {
    imageLoaded.value = true
  }

  return {
    // Copy 相关
    copyText,

    // Touch 相关
    tapCount,
    longpressResult,
    swipeResult,
    handleTap,
    handleLongPress,
    handleSwipe,

    // Debounce 测试
    debounceCount,
    handleDebounceClick,

    // Throttle 测试
    throttleCount,
    handleThrottleClick,

    // ImgLazy 测试
    imageLoaded,
    handleImageLoad,
  }
}
