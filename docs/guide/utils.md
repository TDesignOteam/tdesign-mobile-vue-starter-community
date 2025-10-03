# 工具函数库

提供全局配置访问、存储管理、数据验证等核心工具函数，提升开发效率和代码复用性。

## 全局配置访问

### `useGlobal()` - 全局属性获取
```ts
import { useGlobal } from '@/utils/global'

// 在组件中获取全局配置
const { $config, $storage } = useGlobal<GlobalProperties>()

// 使用配置
console.log($config.apiBase)  // 当前 API 基础地址
console.log($storage.locale)  // 当前语言设置
```

**核心实现**：
```ts
export function useGlobal<T = GlobalProperties>(): T {
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('请在使用 setup 的 vue 组件内使用此函数')
  }
  return instance.appContext.config.globalProperties as T
}
```

**使用场景**：
- 访问运行时配置（`$config`）
- 获取响应式存储（`$storage`）
- 组件内访问全局状态

## 存储管理

### `useStorage()` - 统一存储接口
```ts
import { useStorage } from '@/utils/global'

// 本地存储（默认）
const { getItem, setItem, removeItem, clearAll } = useStorage('local')

// 会话存储
const sessionStorage = useStorage('session')

// 使用示例
setItem('userPreferences', { theme: 'dark', locale: 'zh-cn' })
const preferences = getItem<UserPreferences>('userPreferences')
```

**特性**：
- **类型安全**：泛型支持，自动类型推导
- **JSON 序列化**：自动处理对象序列化/反序列化
- **错误处理**：解析失败时提供友好错误信息
- **统一接口**：localStorage 和 sessionStorage 相同 API

**核心实现**：
```ts
export function useStorage(type: 'local' | 'session' = 'local') {
  const storage = type === 'local' ? localStorage : sessionStorage

  function getItem<T>(key: string): T | null {
    const value = storage.getItem(key)
    if (value === null) return null
    
    try {
      return JSON.parse(value) as T
    } catch {
      throw new Error(`Failed to parse ${type}Storage key "${key}"`)
    }
  }

  function setItem<T>(key: string, value: T) {
    storage.setItem(key, JSON.stringify(value))
  }

  return { getItem, setItem, removeItem, clearAll }
}
```

## 数据验证

### 手机号验证 `validatePhone()`
```ts
import { validatePhone, cleanPhoneNumber, formatPhoneNumber } from '@/utils/validators'

// 验证手机号格式
validatePhone('13800138000')  // true
validatePhone('138001380')    // false

// 清理手机号（去除格式化字符）
cleanPhoneNumber('+86 138 0013 8000')  // '8613800138000'
cleanPhoneNumber('138-0013-8000')      // '13800138000'

// 格式化显示
formatPhoneNumber('13800138000')  // '138 0013 8000'
```

### 验证码验证 `validateCode()`
```ts
import { validateCode } from '@/utils/validators'

validateCode('123456')  // true (6位数字)
validateCode('12345')   // false (少于6位)
validateCode('1234ab')  // false (包含非数字)
```

### 扩展验证器
```ts
// 邮箱验证
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// 身份证验证
export function validateIdCard(idCard: string): boolean {
  const idCardRegex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return idCardRegex.test(idCard)
}

// 密码强度验证
export function validatePassword(password: string): {
  isValid: boolean
  strength: 'weak' | 'medium' | 'strong'
  issues: string[]
} {
  const issues = []
  let score = 0
  
  if (password.length < 8) issues.push('密码长度不少于8位')
  if (!/[a-z]/.test(password)) issues.push('需包含小写字母')
  if (!/[A-Z]/.test(password)) issues.push('需包含大写字母')
  if (!/\d/.test(password)) issues.push('需包含数字')
  if (!/[!@#$%^&*]/.test(password)) issues.push('需包含特殊字符')
  
  score = 5 - issues.length
  const strength = score >= 4 ? 'strong' : score >= 2 ? 'medium' : 'weak'
  
  return {
    isValid: issues.length === 0,
    strength,
    issues
  }
}
```

## 实用工具函数

### 防抖与节流
```ts
// 防抖
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 节流
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastFunc: NodeJS.Timeout | null = null
  let lastRan: number | null = null
  
  return (...args: Parameters<T>) => {
    if (lastRan === null) {
      func(...args)
      lastRan = Date.now()
    } else {
      if (lastFunc) clearTimeout(lastFunc)
      lastFunc = setTimeout(() => {
        if ((Date.now() - lastRan!) >= limit) {
          func(...args)
          lastRan = Date.now()
        }
      }, limit - (Date.now() - lastRan))
    }
  }
}
```

### 格式化工具
```ts
// 数字格式化
export function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

// 时间格式化
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`
  
  return new Date(timestamp).toLocaleDateString()
}

// 文件大小格式化
export function formatFileSize(bytes: number): string {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 B'
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i]
}
```

## 使用建议

### 导入规范
```ts
// 按需导入
import { useGlobal, useStorage } from '@/utils/global'
import { validatePhone, validateCode } from '@/utils/validators'

// 避免全量导入
// import * as utils from '@/utils' ❌
```

### 类型安全
```ts
// 使用泛型确保类型安全
interface UserConfig {
  theme: string
  locale: string
  autoSave: boolean
}

const config = getItem<UserConfig>('userConfig')
// config 的类型已推导为 UserConfig | null
```

### 性能考虑
```ts
// 对于频繁调用的验证函数，考虑结果缓存
const phoneValidationCache = new Map<string, boolean>()

export function validatePhoneWithCache(phone: string): boolean {
  if (phoneValidationCache.has(phone)) {
    return phoneValidationCache.get(phone)!
  }
  
  const result = validatePhone(phone)
  phoneValidationCache.set(phone, result)
  return result
}
```