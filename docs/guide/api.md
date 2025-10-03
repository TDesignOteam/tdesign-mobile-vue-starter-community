# API 接口规范

基于标准化的 HTTP 客户端，提供类型安全的接口调用与统一的错误处理机制。所有接口遵循 RESTful 设计原则，返回一致的响应格式。

## 响应格式规范

建立统一的数据交换格式是前后端协作的基础。标准化的响应结构确保了客户端处理逻辑的一致性，减少了错误处理的复杂度，同时为自动化测试和文档生成提供了可靠的基础。

### 统一响应结构

```ts
interface ApiResponse<T = any> {
  code: number; // HTTP 状态码
  message: string; // 响应消息
  data?: T; // 业务数据
  success: boolean; // 业务状态（仅当 code=200 且 HTTP 状态正常时为 true）
}
```

### 分页响应格式

针对列表数据的标准化分页机制，提供完整的分页信息和导航能力。这种统一的分页格式简化了列表组件的实现，支持多种分页模式和加载策略。

```ts
interface PaginationResponse<T> {
  items: T[]; // 数据列表
  pagination: {
    page: number; // 当前页码
    limit: number; // 每页条数
    total: number; // 总记录数
    totalPages: number; // 总页数
    hasMore: boolean; // 是否有更多数据
  };
}
```

## 认证模块 (`src/api/auth.ts`)

用户认证是应用安全的核心，提供多种登录方式和完整的用户生命周期管理。认证模块与状态管理系统深度集成，确保用户状态在整个应用中的一致性和安全性。

### 验证码登录流程

基于手机验证码的安全登录方式，适用于快速注册和登录场景。流程包括验证码发送、有效期验证和用户身份确认，提供良好的用户体验和安全保障。

```ts
import { sendVerifyCode, verifyCodeLogin } from "@/api/auth";

// 1. 发送验证码
const codeResult = await sendVerifyCode({
  phone: "13800138000",
  countryCode: "+86",
});

if (codeResult.success) {
  console.log(`验证码已发送，${codeResult.data.countdown}秒后可重新发送`);
}

// 2. 验证码登录
const loginResult = await verifyCodeLogin({
  phone: "13800138000",
  code: "123456",
  countryCode: "+86",
});

if (loginResult.success) {
  const { token, user } = loginResult.data;
  // 自动触发 useUserStore().handleLoginSuccess(token, user)
}
```

### 密码登录

传统的用户名密码登录方式，支持用户名、邮箱等多种账号类型。提供密码强度验证、登录失败保护等安全机制，确保用户账户安全。

```ts
import { passwordLogin } from "@/api/auth";

const result = await passwordLogin({
  account: "username_or_email",
  password: "user_password",
});

if (result.success) {
  const { token, user } = result.data;
  // 处理登录成功逻辑
}
```

### 用户信息管理

提供用户资料的查询、更新和维护功能。支持头像上传、个人信息编辑和偏好设置，同时处理认证状态的更新和安全退出。

```ts
import { updateUserInfo, refreshToken, logout } from "@/api/auth";

// 更新用户信息（需要认证）
const updateResult = await updateUserInfo({
  name: "新用户名",
  avatar: "https://example.com/avatar.jpg",
  bio: "个人简介",
});

// 刷新 Token
const tokenResult = await refreshToken();

// 退出登录
const logoutResult = await logout();
```

## 业务接口模块

核心业务功能的接口实现，涵盖内容展示、用户交互、数据分析等主要应用场景。每个模块都遵循统一的设计原则，提供完整的功能覆盖和优异的性能表现。

### 首页内容 (`src/api/home.ts`)

首页是用户进入应用的主要入口，提供内容发现、推荐算法和个性化展示功能。支持分页加载、内容刷新和详情查看，确保良好的浏览体验。

```ts
import {
  getHomeContent,
  getHomeContentById,
  refreshHomeContent,
} from "@/api/home";

// 分页获取首页内容
const contentResult = await getHomeContent({
  page: 1,
  limit: 10,
});

if (contentResult.success) {
  const { items, pagination } = contentResult.data;

  // 渲染内容列表
  items.forEach((item) => {
    console.log(item.title, item.description);
  });

  // 检查是否有更多数据
  if (pagination.hasMore) {
    // 可以加载下一页
  }
}

// 获取单个内容详情
const detailResult = await getHomeContentById("content_id_123");

// 刷新内容（随机获取新内容）
const refreshResult = await refreshHomeContent();
```

### 搜索功能 (`src/api/search.ts`)

智能搜索系统提供关键词搜索、历史记录和内容发现功能。支持搜索建议、结果排序和过滤，同时提供搜索历史管理和个性化推荐。

```ts
import { searchContent, getSearchHistory, getDiscoveries } from "@/api/search";

// 搜索内容（支持取消请求）
const controller = new AbortController();
const searchResult = await searchContent("搜索关键词", controller.signal);

if (searchResult.success) {
  const { suggestions, results } = searchResult.data;
  // 处理搜索建议和结果
}

// 获取搜索历史标签
const historyResult = await getSearchHistory();

// 获取发现内容
const discoveryResult = await getDiscoveries();

// 在组件卸载时取消请求
onUnmounted(() => {
  controller.abort();
});
```

### 发布功能 (`src/api/publish.ts`)

内容创作和发布系统，支持富文本编辑、图片上传和多媒体内容管理。提供草稿保存、预览功能和发布流程，确保内容创作的便捷性和安全性。

```ts
import { publishContent, uploadImage, getDraftList } from "@/api/publish";

// 上传图片
const uploadResult = await uploadImage(file);
if (uploadResult.success) {
  const imageUrl = uploadResult.data.url;
}

// 发布内容
const publishResult = await publishContent({
  title: "内容标题",
  content: "内容正文",
  images: ["image_url_1", "image_url_2"],
  tags: ["标签1", "标签2"],
});

// 获取草稿列表
const draftResult = await getDraftList();
```

### 聊天功能 (`src/api/chat.ts`)

实时通讯系统提供消息发送、接收和管理功能。支持未读消息统计、消息状态同步和聊天历史记录，为用户提供流畅的沟通体验。

```ts
import {
  getChatList,
  sendMessage,
  markAsRead,
  getUnreadCount,
} from "@/api/chat";

// 获取聊天列表
const chatListResult = await getChatList();

if (chatListResult.success) {
  const chats = chatListResult.data;
  chats.forEach((chat) => {
    console.log(`${chat.name}: ${chat.count} 条未读消息`);
  });
}

// 发送消息
const messageResult = await sendMessage("chat_id_123", {
  message: "你好！",
});

// 标记已读
const readResult = await markAsRead("chat_id_123");

// 获取总未读数
const unreadResult = await getUnreadCount();
```

### 数据中心 (`src/api/datacenter.ts`)

数据分析和统计展示模块，提供多维度的数据洞察和可视化图表。支持实时数据更新、自定义统计周期和多种图表类型，帮助用户了解数据趋势。

```ts
import { getDataCenterStats, getVideoStats } from "@/api/datacenter";

// 获取数据中心统计
const statsResult = await getDataCenterStats();

if (statsResult.success) {
  const { overview, interaction, completion, regionData, regionColumns } =
    statsResult.data;

  // 渲染各种统计图表
  renderOverviewChart(overview);
  renderInteractionChart(interaction);
  renderCompletionChart(completion);
  renderRegionChart(regionData, regionColumns);
}

// 获取特定视频统计
const videoResult = await getVideoStats("video_id_456");
```

### 个人中心 (`src/api/profile.ts`)

用户个人信息和服务管理中心，提供个人资料展示、服务导航和使用统计功能。支持个性化配置、服务快捷访问和用户行为分析。

```ts
import {
  getProfileServices,
  getProfileStats,
  reportServiceClick,
} from "@/api/profile";

// 获取服务列表
const servicesResult = await getProfileServices();

if (servicesResult.success) {
  const { serviceGroups, menuItems } = servicesResult.data;
  // 渲染服务网格和菜单
}

// 获取用户统计
const statsResult = await getProfileStats();

// 上报服务点击（用于数据分析）
const clickResult = await reportServiceClick({
  serviceId: "service_123",
  action: "click",
  timestamp: Date.now(),
});
```

## 请求取消与错误处理

在现代移动应用中，网络请求的生命周期管理至关重要。合理的请求取消和错误处理机制能够提升应用性能，避免资源浪费，同时为用户提供更好的交互体验。

### 请求取消机制

基于标准的 AbortController API，提供精确的请求控制能力。在组件卸载、路由切换或用户主动取消时，及时终止未完成的请求，避免内存泄漏和状态污染。

```ts
import { get } from "@/api/request";

// 创建取消控制器
const controller = new AbortController();

try {
  const result = await get("/search?q=keyword", undefined, controller.signal);

  if (result.success) {
    // 处理成功响应
  } else {
    // 处理业务错误（自动显示错误提示）
  }
} catch (error) {
  // 处理网络错误或请求被取消
  if (error.name === "AbortError") {
    console.log("请求已取消");
  }
} finally {
  // 清理资源
}

// 在组件卸载或路由切换时取消请求
onUnmounted(() => {
  controller.abort();
});
```

### 批量请求管理

针对复杂场景的请求管理解决方案，支持同类请求的自动取消和批量控制。通过键值映射机制，实现精确的请求生命周期管理，特别适用于搜索、筛选等高频交互场景。

```ts
class RequestManager {
  private controllers = new Map<string, AbortController>();

  async request<T>(
    key: string,
    requestFn: (signal: AbortSignal) => Promise<T>
  ): Promise<T> {
    // 取消同 key 的旧请求
    this.cancel(key);

    // 创建新的控制器
    const controller = new AbortController();
    this.controllers.set(key, controller);

    try {
      return await requestFn(controller.signal);
    } finally {
      this.controllers.delete(key);
    }
  }

  cancel(key: string) {
    const controller = this.controllers.get(key);
    if (controller) {
      controller.abort();
      this.controllers.delete(key);
    }
  }

  cancelAll() {
    this.controllers.forEach((controller) => controller.abort());
    this.controllers.clear();
  }
}

// 使用示例
const requestManager = new RequestManager();

// 搜索时自动取消之前的搜索请求
async function search(keyword: string) {
  return requestManager.request("search", (signal) =>
    get(`/search?q=${keyword}`, undefined, signal)
  );
}
```

## 最佳实践

基于项目实际开发经验总结的接口使用最佳实践，涵盖类型安全、错误处理和性能优化等方面。遵循这些实践能够提升代码质量，减少运行时错误，确保应用的稳定性和可维护性。

### 类型安全

TypeScript 的强类型特性为接口调用提供了编译时检查和智能提示。通过精确的类型定义，可以在开发阶段发现潜在问题，提升开发效率和代码质量。

```ts
// 定义具体的响应类型
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number;
}

// 使用泛型确保类型安全
const loginResult = (await passwordLogin(
  credentials
)) as ApiResponse<LoginResponse>;

if (loginResult.success) {
  const { token, user, expiresIn } = loginResult.data;
  // TypeScript 会提供完整的类型提示
}
```

### 错误处理策略

统一的错误处理机制简化了业务层的代码复杂度。通过全局错误拦截和分类处理，确保用户获得一致的错误反馈，同时为开发者提供详细的调试信息。

```ts
// 全局错误处理已在 httpClient 中实现
// 业务层只需关注成功逻辑
const result = await someApiCall();

if (result.success) {
  // 处理成功情况
  processData(result.data);
} else {
  // 错误已被自动提示，这里可以处理特殊逻辑
  if (result.code === 401) {
    // 未授权，跳转登录
    router.push("/login");
  }
}
```

### 性能优化

针对移动端网络环境的性能优化策略，包括请求防抖、缓存机制和并发控制。这些优化措施能够显著提升应用响应速度，减少网络开销，改善用户体验。

```ts
// 接口请求防抖
import { debounce } from "@/utils/validators";

const debouncedSearch = debounce(async (keyword: string) => {
  const result = await searchContent(keyword);
  // 处理搜索结果
}, 300);

// 请求缓存
const cache = new Map<string, { data: any; timestamp: number }>();

async function getCachedData(
  key: string,
  fetcher: () => Promise<any>,
  ttl = 60000
) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data;
  }

  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}
```

## Mock 数据开发

开发阶段的 Mock 数据系统为前端开发提供了独立的工作环境。通过模拟真实的后端接口行为，开发者可以在后端接口尚未完成时进行功能开发和测试，大大提升了开发效率。

在开发环境中，所有接口都提供了对应的 Mock 实现：

```ts
// Mock 数据在以下场景自动启用：
// 1. 开发环境 (import.meta.env.DEV)
// 2. 显式开启 VITE_MSW=true
// 3. 控制台设置 window.__MSW_ENABLED__ = true

// Mock 与真实接口具有相同的响应格式，确保无缝切换
```

### Mock 功能特性

高度仿真的 Mock 系统提供了接近生产环境的开发体验。支持网络延迟模拟、错误场景注入和数据持久化，帮助开发者构建更健壮的应用程序。

- **零侵入**：与真实接口 URL 完全相同
- **延迟模拟**：模拟真实网络延迟
- **错误注入**：支持模拟各种错误场景
- **数据持久**：Mock 数据在页面刷新后保持
- **混合模式**：部分接口使用 Mock，部分使用真实后端
