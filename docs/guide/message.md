# 消息提示系统

基于 TDesign Mobile 的统一消息提示封装，解耦业务逻辑与 UI 提示，提供类型安全的 API 和一致的用户体验。

## 设计目标

- **统一接口**：封装 TDesign Message，提供稳定的 API
- **自动集成**：与 HTTP 层深度集成，接口错误自动提示
- **类型安全**：完整的 TypeScript 类型定义
- **灵活配置**：支持位置、时长、图标等个性化设置

## 核心实现

```ts
// src/plugins/message.ts（核心）
export interface UnifiedMessageApi {
  success: (msg: string, options?: MessageOptions) => void
  error: (msg: string, options?: MessageOptions) => void
  warning: (msg: string, options?: MessageOptions) => void
  info: (msg: string, options?: MessageOptions) => void
  closeAll: () => void
}

function show(type: MessageType, message: string, options?: MessageOptions) {
  const duration = options?.duration ?? 2000
  const payload = {
    content: message,
    duration,
    icon: options?.icon,
    offset: options?.offset,
    context: options?.context ?? document.body,
    zIndex: options?.zIndex,
  }
  
  const api = TMessage as any
  if (type === 'success' && typeof api.success === 'function') {
    api.success(payload)
  }
  // ... 其他类型处理
}
```

## 基础用法

```ts
import { message } from '@/plugins/message'

// 成功提示
message.success('保存成功')

// 错误提示
message.error('网络请求失败，请稍后重试')

// 警告提示
message.warning('请先完善必填信息')

// 信息提示
message.info('正在处理中，请稍候...')

// 关闭所有消息
message.closeAll()
```

## 高级配置

```ts
// 自定义显示时长和位置
message.success('操作完成', {
  duration: 3000,           // 3秒后自动关闭
  offset: [16, 80],         // 距离视口 [x, y] 偏移
  icon: 'check-circle',     // 自定义图标
  zIndex: 9999              // 自定义层级
})

// 指定挂载容器
message.error('验证失败', {
  context: document.querySelector('#form-container')
})
```

## 与 HTTP 层集成

消息系统与请求层深度集成，无需在每个 API 调用点手动处理错误提示：

```ts
// src/api/request.ts（节选）
if (!result.success && this.showToastOnError) {
  import('@/plugins/message').then(({ message }) => {
    message.error(result.message || '请求失败')
  }).catch(() => {})
}
```

**优势**：
- 异步导入避免循环依赖
- 统一的错误提示策略
- 支持通过 `showToastOnError` 控制是否提示

## 默认行为与容器挂载

- 默认显示时长：`2000ms`
- 默认偏移：`offset: [108, 16]`（适配沉浸式头部/安全区）
- 默认挂载容器：`document.body`，也可通过 `context` 将消息挂载到页面局部容器内

```ts
message.success('操作完成', {
  context: document.querySelector('.content') as Element,
  offset: [16, 80],
})
```

## 发布成功的一次性提醒

发布完成后回到首页显示一次性提示，避免重复打扰：

```ts
// src/views/home/index.vue（节选）
const { checkAndNotifyOnce } = usePublishSuccessMessage({ contextSelector: '.content' })
onMounted(() => {
  void checkAndNotifyOnce()
})
```

## 全局注册

```ts
// src/plugins/message.ts
export const MessagePlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$message = message
  },
}

// 在组件中使用
const { $message } = useGlobal()
$message.success('操作成功')
```

## 最佳实践

### 提示内容规范
- **成功**：简洁明确，如"保存成功"、"删除完成"
- **错误**：提供解决方案，如"网络连接失败，请检查网络后重试"
- **警告**：指导用户操作，如"请先选择文件后上传"
- **信息**：状态说明，如"正在加载中..."

### 时长控制
- 成功/信息：2-3秒自动关闭
- 警告：3-4秒，给用户足够时间阅读
- 错误：4-5秒，或需要用户手动关闭

### 防抖处理
```ts
// 避免重复提示
let lastErrorTime = 0
function showError(msg: string) {
  const now = Date.now()
  if (now - lastErrorTime > 1000) {
    message.error(msg)
    lastErrorTime = now
  }
}
```