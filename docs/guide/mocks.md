# Mock 数据方案

基于 MSW（Mock Service Worker）构建的浏览器端网络拦截系统，在不修改业务代码的前提下，提供完整的后端 API 模拟能力。

## 技术架构

MSW (Mock Service Worker) 采用浏览器原生 Service Worker 技术，在网络层面拦截请求，实现了完全透明## 端点清单

完整的 Mock 端点列表提供了项目中所有可用的模拟接口概览，便于开发者快速了解和使用已有的 Mock 功能。

详见《接口与 Mock》文档的"Mock 端点清单"小节：[接口与 Mock](/guide/api)，覆盖认证、首页、Profile、数据中心、搜索、聊天等全链路示例。PI 模拟。这种架构设计让开发者能够在不修改任何业务代码的情况下，获得与真实后端完全一致的开发体验。

```
业务组件 → API 层 → HTTP Client → MSW 拦截器
                                    │
                          ┌─────────┴─────────┐
                          │                   │
                       匹配？                未匹配
                          │                   │
                          ▼                   ▼
                    Mock 处理器           真实后端
                          │                   │
                          ▼                   ▼
                     模拟响应              真实响应
```

### 核心优势

MSW 相比传统的 Mock 方案具有显著的技术优势，能够提供更接近生产环境的开发体验，同时保持高度的灵活性和可维护性。

- **零侵入**：与真实接口同 URL、同请求方式，无需切换 baseURL
- **真实体验**：完整的网络生命周期、延迟、错误注入、缓存语义
- **灵活切换**：支持半 Mock 半真实的混合开发模式
- **易于维护**：处理器集中管理，数据模块化组织

## 集成方式总览

项目集成 MSW 采用条件启动策略，确保在开发阶段提供便利的同时，不影响生产环境的正常运行。通过环境变量和运行时开关的双重控制，实现灵活的启用机制。

- 启动入口：`src/mocks/index.ts` 的 `startMsw()` 在应用启动阶段按条件注册 Worker
- 启用条件：DEV 环境或显式开启（`VITE_MSW=true` 或 `window.__MSW_ENABLED__=true`）
- Worker 路径：`${import.meta.env.BASE_URL || '/'}mockServiceWorker.js`（来自 `public/`）
- 未处理请求策略：`onUnhandledRequest: 'bypass'`（未匹配的请求直接放行到真实后端）

```ts
// src/mocks/index.ts（节选）
export async function startMsw() {
  if (typeof window === "undefined") return;
  const enabled =
    (window as any).__MSW_ENABLED__ ?? import.meta.env.VITE_MSW === "true";
  if (!enabled) return;
  const { worker } = await import("./browser");
  const swUrl = `${import.meta.env.BASE_URL || "/"}mockServiceWorker.js`;
  await worker.start({
    serviceWorker: { url: swUrl },
    onUnhandledRequest: "bypass",
  } as any);
}
```

在 `src/main.ts` 中，仅当 `import.meta.env.DEV` 或 `VITE_MSW==='true'` 时才尝试调用 `startMsw()`，避免影响真实接口联调。

## 目录结构

清晰的目录组织有助于团队协作和代码维护。Mock 相关文件按功能分层，数据与逻辑分离，便于扩展和管理。

- `src/mocks/browser.ts`：注册 Worker 并聚合 `handlers`
- `src/mocks/handlers.ts`：所有拦截规则（端点）与业务逻辑
- `src/mocks/data/*`：示例数据（首页、Profile、数据中心、聊天、用户等）

## 编写处理器（handlers）

处理器是 MSW 的核心组件，负责定义具体的请求拦截规则和响应逻辑。通过标准化的处理器编写模式，确保 Mock 数据的一致性和可维护性。

处理器使用 `msw` 提供的 `http.get/post/put/...` 来匹配请求；本项目以 `*/api/...` 形式匹配任意域下的 `/api` 前缀，便于与不同环境的 `baseURL` 对齐。

常用工具：

- `delay(ms)`：注入网络延迟
- `HttpResponse.json(body, { status })`：返回 JSON 响应
- 项目内封装：

```ts
function ok<T>(data: T, message = "Success") {
  return HttpResponse.json(
    { code: 200, message, data, success: true },
    { status: 200 }
  );
}
function error(message = "Error", status = 400) {
  return HttpResponse.json(
    { code: status, message, success: false },
    { status }
  );
}
```

示例：验证码登录流（含 5 分钟验证码有效期、错误提示与用户初始化）

```ts
http.post("*/api/auth/verify-login", async ({ request }) => {
  await delay(400);
  const body = (await request.json().catch(() => ({}) as any)) as {
    phone?: string;
    code?: string;
  };
  if (!body?.phone || !body?.code) return error("手机号和验证码不能为空", 400);
  if (!validateVerifyCode(body.phone, body.code))
    return error("验证码错误或已过期", 400);
  // 生成/查找用户，返回 token + user
  return ok({ token: "mock-token", user }, "登录成功");
});
```

读取参数与查询：

```ts
// 路径参数
http.get("*/api/home/content/:id", async ({ params }) => {
  const id = Number(params.id);
});
// 查询参数
http.get("*/api/search", async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
});
```

鉴权示例：需 Bearer Token 的接口

```ts
http.put("*/api/auth/update-user-info", async ({ request }) => {
  const auth = request.headers.get("authorization") || "";
  if (!auth || !auth.toLowerCase().startsWith("bearer "))
    return error("未提供认证信息", 401);
  return ok(updatedUser, "用户信息更新成功");
});
```

## 启用/关闭与切换

MSW 提供了灵活的启用控制机制，支持开发过程中的动态切换。这种设计允许开发者根据需要在 Mock 数据和真实接口之间无缝切换，提升开发调试效率。

- 启用：
  - `.env.*` 中设置 `VITE_MSW=true` 并重新启动 dev server；或
  - 浏览器控制台执行 `window.__MSW_ENABLED__ = true` 后刷新
- 关闭：确保 `VITE_MSW` 未开启，并移除 `window.__MSW_ENABLED__`
- 局部透传：未匹配的请求因 `onUnhandledRequest: 'bypass'` 会走真实后端，便于“半 Mock 半真实”联调

### 部署与回退策略

- 生产环境默认不启用 MSW；如需演示环境启用，请确保 `public/mockServiceWorker.js` 部署正确，且 `BASE_URL` 与实际子路径一致。
- 若开启后接口未拦截，首先在 Application → Service Workers 面板停止旧 Worker 并强刷新。
- MSW 仅拦截在当前作用域内的请求，跨子路径部署需检查作用域与 `serviceWorker.url` 配置。

## 延迟与错误注入

真实的网络环境充满不确定性，包括网络延迟、服务器错误等各种异常情况。通过模拟这些真实场景，帮助开发者构建更健壮的应用程序。

- 使用 `delay(300)` 等模拟网络状况
- 使用 `error('消息', 400|401|500)` 模拟各种错误与异常路径
- 在 DevTools 中开启网络节流，观察交互与重试策略表现

## 与 `baseURL` 的关系

项目的 Mock 系统设计充分考虑了不同环境下的接口地址变化，通过通配符匹配确保 Mock 功能在各种部署环境下都能正常工作。

- `HttpClient` 默认 `baseURL` 为 `http://localhost:3001/api`
- 处理器使用 `*/api/...` 通配匹配任意域下的 `/api` 前缀，因此无论切换到何处（同路径前缀），都可被拦截
- 若你调整了接口前缀（如 `/v1`），请同步更新 handlers 中的匹配前缀

## 如何新增一个端点

随着项目功能的扩展，需要不断添加新的 API 端点。遵循标准化的流程可以确保新增端点的质量和一致性，便于团队协作和维护。

1. 如需数据样例，在 `src/mocks/data/` 新增对应数据文件
2. 在 `src/mocks/handlers.ts` 中新增 `http.get/post/...` 处理器
3. 返回结构遵循 `{ code, message, data, success }` 统一语义
4. 刷新页面（必要时强制刷新以更新 Service Worker）
5. 在 `src/api/*.ts` 新增调用函数，供页面/组件使用

示例：新增报表摘要端点

```ts
// handlers.ts
http.get("*/api/reports/summary", async () => ok({ total: 120, today: 8 }));

// api/reports.ts
export function getReportSummary() {
  return get("/reports/summary");
}
```

## 常见问题（Troubleshooting）

开发过程中可能遇到的 MSW 相关问题及其解决方案。了解这些常见问题有助于快速定位和解决开发中的困扰。

- Worker 未注册：确认 `public/mockServiceWorker.js` 存在，`BASE_URL` 与部署路径一致
- 未被拦截：确认已启用（环境变量/窗口变量），且匹配规则正确（例如 `*/api/...`）
- 反复缓存旧逻辑：在浏览器 DevTools 的 Application → Service Workers 中停止并硬刷新
- CORS 报错：默认 `bypass` 未处理请求，注意真实后端的跨域配置

## 端点清单

详见《接口与 Mock》文档的“Mock 端点清单”小节：[接口与 Mock](/guide/api)，覆盖认证、首页、Profile、数据中心、搜索、聊天等全链路示例。
