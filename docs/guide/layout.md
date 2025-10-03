# 布局系统

移动端应用的核心交互框架：统一的页面容器、响应式导航与状态驱动的 UI 显示逻辑。所有业务路由均嵌套在 `Layout` 下渲染。

## 架构设计

```
                Layout 根容器
                     │
        ┌────────────┼────────────┐
        │            │            │
  PageHeader     Content      BottomNavigation
   顶部栏        内容区          底部导航
        │                          │
   ┌────┼────┐                ┌────┼────┐
   │    │    │                │    │    │
 返回  标题  搜索             Home Message My
 按钮        入口             首页  消息   个人
                              
        Drawer 侧边栏
        │
    ┌───┴───┐
    │       │
  导航菜单  登录状态演示
```

## 核心模块

### `src/layout/index.vue` - 根布局
- **职责**：统一页面框架，集成头部、内容、底部、侧边栏
- **状态管理**：基于 `useLayoutState()` 响应式控制各区域显示

### `src/layout/components/PageHeader.vue` - 页面头部
- **返回逻辑**：智能判断是否显示返回按钮（如发布、登录、个人页面）
- **标题策略**：动态获取页面标题，支持参数化路由（如 `/notice/:id`）
- **搜索入口**：仅在首页显示，一键跳转搜索页

### `src/layout/components/BottomNavigation.vue` - 底部导航
- **三段式设计**：Home/Message/My，符合移动端主流交互
- **徽标支持**：消息页面支持未读数量显示
- **路由联动**：与 `vue-router` 深度集成，自动高亮当前页面

## 状态驱动的显示逻辑

### `useLayoutState()` - 布局状态管理
```ts
// 基于路由动态控制 UI 元素显示
const showBackButton = computed(() => {
  const path = route.path
  return path === '/publish'
    || path.includes('/login')
    || path.startsWith('/notice')
    || path.includes('/my')
    || path.includes('search')
    || path.includes('datacenter')
})

const showBottomNavigation = computed(() => 
  !path.includes('/login') && !path.includes('/error')
)
```

### `useNavigation()` - 导航数据与行为
- **侧边栏配置**：`baseSidebar` 提供统一的页面导航入口
- **Tab 配置**：`tabList` 定义底部导航结构
- **标题解析**：`getPageTitle(path)` 根据路径返回页面标题
- **交互行为**：`handleTabChange()`、`changeToSearch()` 等导航方法

## 典型使用场景

### 新增页面接入
1. 在 `src/views/<feature>/index.vue` 创建页面
2. 自动路由会将页面注册为 `Layout` 子路由
3. 如需在侧边栏显示，更新 `useNavigation()` 的 `baseSidebar`
4. 如需自定义标题，在 `PAGE_TITLES` 中添加映射

### 控制布局元素显示
```ts
// 新页面需要隐藏底部导航
const showBottomNavigation = computed(() => 
  !route.path.includes('/special-page')
)
```

### 动态标题设置
```ts
// 支持参数化路由标题
const getPageTitle = (path: string) => {
  if (path.startsWith('/notice/')) {
    return '消息详情'
  }
  return PAGE_TITLES[path] || '默认标题'
}
```

## 设计优势

- **状态驱动**：所有 UI 显示逻辑基于路由状态响应式计算
- **组件解耦**：页面组件专注业务逻辑，布局组件处理导航与交互
- **易于扩展**：新增页面只需关注业务实现，布局自动适配
- **用户体验**：统一的交互模式，符合移动端使用习惯

## 最佳实践

- **标题管理**：在 `useNavigation()` 中集中维护 `PAGE_TITLES`
- **状态计算**：复杂显示逻辑通过 `computed` 响应式计算
- **过渡动画**：为 Drawer 与 Tab 切换添加平滑过渡效果
- **无障碍性**：为导航元素添加适当的 `aria-label` 属性

## 滚动与容器高度规范

为确保移动端滚动性能与虚拟列表的稳定渲染，建议遵循以下规范：

- **谁负责滚动**：页面主体在 `Layout` 内部滚动，避免 `body` 滚动。
- **明确可滚动区域高度**：给主内容区设置 `flex: 1; min-height: 0; overflow-y: auto;`。
- **iOS 惯性滚动**：开启 `-webkit-overflow-scrolling: touch;`。

示例（节选自 `src/layout/index.vue`）：

```scss
.main-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
```

与虚拟列表的配合：

- `VirtualList` 内部容器 `.vl-container` 已设置 `height: 100%; overflow-y: auto;`，父容器需具备明确高度（例如父级使用 `flex: 1; min-height: 0;`）。
- 若希望使用“页面滚动”，可在 `VirtualList` 传入 `page-mode` 启用。
