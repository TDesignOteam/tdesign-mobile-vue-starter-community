# 搜索 Search

- 数据：历史标签、发现、`q` 查询联想/结果
- 行为：输入节流/防抖；点历史/建议填充并触发搜索

## 数据接口（Mock）

- `GET /api/search/history-tags`
- `GET /api/search/discoveries`
- `GET /api/search?q=keyword`（支持 `AbortSignal` 取消）

## 交互

- 输入框变更触发搜索；在组件卸载或下一次输入前取消上一次请求，避免竞态

## 实现亮点

- 防抖 + 请求取消：输入节流与 `AbortController` 配合，降低服务压力
- 智能联想：根据历史/发现权重融合排序，优先展示高相关项
- 空态与错误：统一空态占位与错误重试按钮，保障体验一致

### 输入防抖与请求竞态处理

配方：`debounce + AbortController`，在下一次输入/组件卸载时取消上一次请求，确保结果一致性：

```ts
// 伪代码（与项目实现一致）
let currentController: AbortController | null = null
const performSearch = async (q: string) => {
  // 取消上一个请求
  currentController?.abort()
  if (!q.trim()) return
  currentController = new AbortController()
  try {
    const res = await get(`/api/search?q=${encodeURIComponent(q)}`, undefined, currentController.signal)
    if (res.success && !currentController.signal.aborted) {
      // 渲染结果
    }
  } catch (e) {
    if ((e as any)?.name !== 'AbortError') {
      message.error('搜索失败，请重试')
    }
  } finally {
    currentController = null
  }
}
```

## UI 预览

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../images/search.png" alt="Login Placeholder" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>