import { onMounted, ref } from 'vue'

export function useTheme() {
  const isDarkMode = ref(false)

  // 初始化主题
  function initTheme() {
    const savedTheme = localStorage.getItem('theme-mode')
    isDarkMode.value = savedTheme === 'dark'
    applyTheme(isDarkMode.value)
  }

  // 应用主题
  function applyTheme(dark: boolean) {
    const mode = dark ? 'dark' : 'light'
    document.documentElement.setAttribute('theme-mode', mode)
    localStorage.setItem('theme-mode', mode)
  }

  // 切换主题（支持传参和自动切换）
  function toggleTheme(dark?: boolean) {
    const newTheme = dark !== undefined ? dark : !isDarkMode.value
    isDarkMode.value = newTheme
    applyTheme(newTheme)
  }

  // 获取当前主题
  function getCurrentTheme(): string {
    return document.documentElement.getAttribute('theme-mode') || 'light'
  }

  // 组件挂载时初始化
  onMounted(() => {
    initTheme()
  })

  return {
    isDarkMode,
    initTheme,
    toggleTheme,
    getCurrentTheme,
  }
}
