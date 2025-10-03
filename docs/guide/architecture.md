# 架构与模块

以“页面即模块、组件做构件”为理念，分层清晰、边界明确：

- 视图层（`views/*`）：页面与业务逻辑
- 布局层（`layout/*`）：统一框架（Header / Drawer / BottomNav）
- 状态层（`store/*`）：Pinia + 模块持久化
- 数据层（`api/*`、`mocks/*`）：HTTP 客户端与 MSW 端点
- 工具层（`utils/*`、`config/*`、`plugins/*`）：工具函数、运行时配置、i18n、消息

## 分层职责·协作

- 视图层：按路由渲染页面，聚合组件与业务逻辑
- 布局层：统一导航与全局交互容器
- 状态层：跨页面共享状态；副作用入口（例如将 token 注入 httpClient）
- 数据层：标准化请求，统一返回语义
- 工具层：注入 `$config`、`$storage`，提供国际化与全局消息

## 数据流与边界

1. 组件通过 `api/*` 调用接口
2. `httpClient` 标准化返回与错误，发出可观测结果
3. 需要持久化的状态写入 `store/*`
4. 页面通过 `useNavigation()`、`useLayoutState()` 驱动 UI

## 设计要点

- 路由：约定自动 + 手写增强，灵活且一致
- i18n：懒加载 + 缓存，降低首屏压力
- Mock：可开关，独立于真实接口
- 配置：`initGlobalConfig()` 支持外部 `config.json` 注入

## 拆包策略

- 将核心依赖拆为：`vue-vendor`、`tdesign`、`i18n`、`dayjs`、`vueuse`、`vendor`
- 提升缓存命中与按需加载速度（见 `vite.config.ts#manualChunks`）

> 工程增强集中于 `build/plugins.ts`：自动导入、自动路由、i18n 编译、SVG 组件、Tailwind 4、资源预压缩与体积分析。

## 典型交互流

1. 启动：注入 `$config/$storage` → 安装 i18n/Router/Store → 初始化 i18n → 可选启动 Mock → `mount`
2. 登录：提交表单 → `auth.ts` → `useUserStore.handleLoginSuccess()` 写入 token/user → 请求头注入 Authorization
3. 搜索：输入变化 → 触发请求（传 `AbortSignal`）→ 路由切换或下一次输入中断上次请求