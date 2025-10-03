# HTTP 与请求封装

本项目使用基于 `fetch` 的轻量客户端封装（`src/api/request.ts`），统一了响应结构、错误提示与取消请求，避免在各业务模块重复样板代码。

## 设计目标

HTTP 客户端的设计遵循现代前端开发的最佳实践，通过统一的接口标准和错误处理机制，简化业务层的网络请求代码，提升开发效率和代码质量。

- 统一返回：始终返回 `{ code, message, data, success }`
- 一致提示：失败时集中由 `plugins/message` 提示
- 易于取消：内置 `AbortSignal` 支持，组件退出安全
- 可注入 Token：登录后自动注入 `Authorization` 头

## 核心实现

基于原生 `fetch` API 构建的轻量级 HTTP 客户端，避免了重型依赖库的引入，同时提供了完整的请求生命周期管理和错误处理能力。

```ts
// src/api/request.ts（核心）
class HttpClient {
  private baseURL: string = "http://localhost:3001/api";
  private defaultHeaders: any = { "Content-Type": "application/json" };
  private showToastOnError = true;

  setAuthToken(token: string) {
    this.defaultHeaders.Authorization = `Bearer ${token}`;
  }
  clearAuthToken() {
    delete this.defaultHeaders.Authorization;
  }

  async request(endpoint: string, cfg: RequestConfig = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const { method = "GET", headers = {}, body, signal } = cfg;
    try {
      const response = await fetch(url, {
        method,
        headers: { ...this.defaultHeaders, ...headers },
        body: body ? JSON.stringify(body) : undefined,
        signal,
      });
      const data = await response.json();
      const result = {
        code: response.status,
        message: data.message || (response.ok ? "Success" : "Error"),
        data: data.data || data,
        success: response.ok && data.code === 200,
      };
      if (!result.success && this.showToastOnError) {
        import("@/plugins/message").then(({ message }) =>
          message.error(result.message || "请求失败")
        );
      }
      return result;
    } catch (e: any) {
      if (e?.name === "AbortError") {
        return { code: 499, message: "请求已取消", success: false };
      }
      if (this.showToastOnError) {
        import("@/plugins/message").then(({ message }) =>
          message.error("网络请求失败")
        );
      }
      return { code: 500, message: "网络请求失败", success: false };
    }
  }
}
```

## 快速使用

简洁的 API 设计让开发者能够快速上手，通过预定义的便捷方法减少重复代码，同时保持高度的灵活性。

```ts
import { get, post } from "@/api/request";

const controller = new AbortController();
const res = await get("/home/list", undefined, controller.signal);
if (res.success) {
  // 使用 res.data
}
// 离开页面时：controller.abort()
```

## 与用户状态集成

HTTP 客户端与用户认证系统深度集成，自动处理登录状态的变化，确保认证信息的一致性和安全性。

登录成功后通过 `useUserStore()` 注入 Token：

```ts
// src/store/user.ts（节选）
const setToken = (newToken: string) => {
  token.value = newToken;
  if (newToken) httpClient.setAuthToken(newToken);
};
```

## 业务 API 约定

统一的 API 层设计规范有助于团队协作和代码维护。通过标准化的函数签名和返回类型，确保业务层代码的一致性和可预测性。

- 每个业务域一个文件：`src/api/<domain>.ts`
- 函数返回 `Promise<ApiResponse<T>>`
- API 层不做 UI 逻辑，仅做参数与类型约束

```ts
// src/api/search.ts（示例）
import type { ApiResponse } from "./types";
import { get } from "./request";

export function search(
  keyword: string,
  signal?: AbortSignal
): Promise<ApiResponse<{ list: any[] }>> {
  return get(`/search?q=${encodeURIComponent(keyword)}`, undefined, signal);
}
```

## 常见模式

针对前端开发中常见的网络请求场景，提供了标准化的处理模式和最佳实践，帮助开发者避免常见的坑点和问题。

### 取消过时请求（输入搜索）

在用户快速输入的场景下，及时取消过时的请求可以避免竞态条件和不必要的网络开销，提升用户体验。

```ts
let lastController: AbortController | null = null;
function onInput(keyword: string) {
  lastController?.abort();
  lastController = new AbortController();
  search(keyword, lastController.signal).then((res) => {
    if (res.success) {
      // 渲染列表
    }
  });
}
```

### 错误统一提示

集中化的错误处理机制减少了重复代码，确保错误信息的一致性展示。这种设计让开发者专注于业务逻辑，而不需要在每个请求点都处理错误提示。

无需在每个调用点处理提示，统一由 `HttpClient` 触发。需要静默时可加开关（未来扩展为每次请求可自定义 `showToastOnError`）。

## 与 Mock 的协作

HTTP 客户端与 Mock 系统的无缝集成是项目开发流程的重要组成部分。通过条件启动和透明代理，实现开发环境和生产环境的平滑切换。

当 `DEV` 或 `VITE_MSW=true` 时，`src/main.ts` 在挂载前启动 MSW：

```ts
if (import.meta.env.DEV || import.meta.env.VITE_MSW === "true") {
  const { startMsw } = await import("@/mocks");
  await startMsw();
}
```

Mock 的响应结构与真实接口保持一致，以便随时切换。
