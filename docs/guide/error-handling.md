# 错误处理与容错

现代前端应用的错误处理需要从多个层面进行设计，包括网络层、状态层、UI层等。本项目通过分层设计和统一处理机制，确保在各种异常情况下都能提供稳定的用户体验和开发体验。

## HTTP 层

HTTP 层的错误处理是整个应用容错机制的基础，通过统一的响应格式和智能的错误处理策略，为上层业务提供可靠的数据通信保障。

### 统一响应格式

所有API响应都遵循标准化格式，便于统一处理和错误判断：

- 统一响应：`{ code, message, data, success }`，由 `src/api/request.ts` 标准化
- 自动提示：当 `success=false` 且开启提示时，触发 `plugins/message.error`
- 取消请求：组件卸载/路由切换使用 `AbortController`，主动取消返回 `code=499`

```ts
// 组件内请求与取消
const controller = new AbortController();
try {
  const res = await get("/search?q=xx", undefined, controller.signal);
  if (res.success) {
    // 处理数据
  }
} finally {
  controller.abort();
}
```

### 多层错误处理机制

HTTP客户端实现了完善的错误分类和处理策略：

```ts
// src/api/request.ts（节选）
const result = {
  code: response.status,
  message: data.message || (response.ok ? "Success" : "Error"),
  data: data.data || data,
  success: response.ok,
  // 业务层错误判断
  bizCode,
  bizSuccess:
    bizCode === undefined ? true : this.bizSuccessWhitelist.has(bizCode),
};

// 错误提示处理
if (this.showToastOnError && (!result.success || !bizSuccess)) {
  import("@/plugins/message")
    .then(({ message }) => {
      message.error(result.message || "请求失败");
    })
    .catch(() => {});
}
```

### 超时与取消处理

智能的请求超时和取消机制，避免长时间等待和资源浪费：

```ts
// 超时处理
const timeoutId =
  timeoutMs > 0
    ? setTimeout(() => {
        didTimeout = true;
        controller.abort(new DOMException("Request timeout", "AbortError"));
      }, timeoutMs)
    : null;

// 错误分类处理
try {
  // ... 请求逻辑
} catch (_error) {
  if ((_error as any)?.name === "AbortError") {
    if (didTimeout) {
      return { code: 408, message: "请求超时", success: false };
    }
    return { code: 499, message: "请求已取消", success: false };
  }
  // 网络错误
  return { code: 500, message: "网络请求失败", success: false };
}
```

### 业务码白名单机制

灵活的业务成功码配置，适应不同后端接口规范：

```ts
class HttpClient {
  private bizSuccessWhitelist: Set<number | string>;

  constructor() {
    // 默认成功码：200, 0
    this.bizSuccessWhitelist = new Set([200, 0]);
  }

  // 配置业务成功码白名单
  setBizSuccessWhitelist(codes: Array<number | string>) {
    this.bizSuccessWhitelist = new Set(codes);
  }

  // 新增业务成功码
  addBizSuccessCode(code: number | string) {
    this.bizSuccessWhitelist.add(code);
  }
}
```

## Store 层

状态管理层通过合理的错误处理策略，确保应用状态的一致性和可恢复性，为用户提供稳定的数据体验。

### 全局状态重置

提供统一的状态重置能力，特别适用于错误恢复、用户登出等场景：

- 提供 `resetAllStores()` 快速重置状态
- 仅在 Action 中做副作用，确保可预测

```ts
// src/store/index.ts（节选）
export function resetAllStores() {
  registeredStores.forEach((s) => {
    if (typeof s.$reset === "function") s.$reset();
  });
}
```

### 异步操作错误处理

在状态管理中，异步操作需要特别关注错误处理和状态一致性：

```ts
// 状态管理中的异步错误处理示例
const fetchUserInfo = async () => {
  try {
    const result = await httpClient.get("/api/user/info");
    if (result.success && result.bizSuccess) {
      userInfo.value = result.data;
      return { success: true, data: result.data };
    } else {
      // 业务错误，记录但不重置状态
      console.warn("获取用户信息失败:", result.message);
      return { success: false, error: result.message };
    }
  } catch (error) {
    // 网络或系统错误，可能需要重置状态
    console.error("用户信息请求异常:", error);
    if (error.name === "NetworkError" || error.code === 500) {
      // 严重错误时重置用户状态
      resetUserState();
    }
    return { success: false, error: "网络连接异常" };
  }
};
```

### 持久化错误容错

状态持久化过程中的错误处理，确保数据的完整性：

```ts
// 安全的持久化配置
export function getSafePeristConfig(key: string) {
  return {
    ...getPersistConfig(key),
    // 数据验证和错误处理
    beforeRestore: (context) => {
      try {
        const data = context.store.$state;
        // 验证关键字段完整性
        if (key === "user" && data && !validateUserData(data)) {
          console.warn("用户数据格式异常，跳过恢复");
          return false;
        }
        return true;
      } catch (error) {
        console.error("状态恢复验证失败:", error);
        return false; // 阻止恢复异常数据
      }
    },
  };
}

// 存储错误处理
const handleStorageError = (error: Error, operation: string) => {
  if (error.name === "QuotaExceededError") {
    // 存储空间不足，清理非关键数据
    clearNonEssentialStorage();
    message.warning("存储空间不足，已清理缓存");
  } else if (error.name === "SecurityError") {
    // 隐私模式等安全限制
    message.info("当前环境不支持数据持久化");
  }
};
```

### 状态同步验证

定期验证状态与服务端的一致性，及时发现和修复数据不一致问题：

```ts
// 状态验证和自动修复
const validateAndSyncState = async () => {
  try {
    if (!isLoggedIn.value) return;

    // 验证token有效性
    const tokenValid = await httpClient.get("/api/auth/validate");
    if (!tokenValid.success) {
      // token失效，清理状态并引导重新登录
      resetUserState();
      router.push("/login");
      return;
    }

    // 验证关键数据完整性
    if (!userInfo.value?.id) {
      const fetchResult = await fetchUserInfo();
      if (!fetchResult.success) {
        console.warn("用户信息同步失败，保持当前状态");
      }
    }
  } catch (error) {
    console.error("状态同步检查失败:", error);
    // 非关键错误，不影响用户使用
  }
};
```

## 交互层

UI交互层的错误处理注重用户体验，通过合理的降级策略和友好的错误提示，确保用户能够继续使用应用的核心功能。

### 列表三态（加载/错误/空）模式

标准化的列表页面三态处理，避免闪烁与空白：

```vue
<!-- src/views/talklist/index.vue（节选） -->
<LoadingOverlay v-if="isLoading" />
<ErrorState v-else-if="error" :description="error || undefined" @retry="refreshTalkList" />
<div v-else class="list-container">
  <EmptyState v-if="mytalklist.length === 0" @refresh="refreshTalkList" />
  <VirtualList v-else mode="recycle" :items="mytalklist" @update="() => {}">
    <!-- 列表项 -->
  </VirtualList>
  
</div>
```

要点：

- 加载优先于错误和内容渲染；错误优先于内容；空状态优先于渲染列表。
- 保证容器高度固定（`flex: 1; min-height: 0;`），避免布局跳动。

### 路由错误处理

完善的路由错误处理和页面降级机制：

- PageHeader 返回逻辑、登录/未登录视图切换均有兜底
- 路由 `/:pathMatch(.*)*` 重定向到 `/error/404`
- 权限路由的错误降级和重定向

```ts
// 路由错误处理示例
const router = createRouter({
  routes: [
    // ... 其他路由
    {
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      redirect: "/error/404",
    },
    {
      path: "/error/:code",
      component: ErrorPage,
      props: true,
    },
  ],
});

// 路由守卫中的错误处理
router.beforeEach(async (to, from, next) => {
  try {
    // 权限验证逻辑
    const hasPermission = await checkRoutePermission(to);
    if (!hasPermission) {
      next("/error/403");
      return;
    }
    next();
  } catch (error) {
    console.error("路由验证失败:", error);
    next("/error/500");
  }
});
```

### 组件错误边界

组件级别的错误处理和降级显示：

```ts
// 组件错误处理 Hook
export const useErrorBoundary = () => {
  const error = ref<Error | null>(null);
  const hasError = computed(() => !!error.value);

  const captureError = (err: Error) => {
    error.value = err;
    console.error("组件错误:", err);

    // 错误上报
    if (import.meta.env.PROD) {
      reportError(err);
    }
  };

  const resetError = () => {
    error.value = null;
  };

  return { error, hasError, captureError, resetError };
};
```

### 移动端特殊处理

针对移动端环境的特殊错误处理：

```ts
// 网络状态监听
const useNetworkStatus = () => {
  const isOnline = ref(navigator.onLine);

  const handleOnline = () => {
    isOnline.value = true;
    message.success("网络连接已恢复");
    // 重试失败的请求
    retryFailedRequests();
  };

  const handleOffline = () => {
    isOnline.value = false;
    message.warning("网络连接已断开");
  };

  onMounted(() => {
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
  });

  onUnmounted(() => {
    window.removeEventListener("online", handleOnline);
    window.removeEventListener("offline", handleOffline);
  });

  return { isOnline };
};
```

## 常见场景

针对实际开发中的常见错误场景，提供标准化的处理方案和最佳实践。

### 列表搜索竞态

搜索场景中的请求竞态处理，确保显示正确的搜索结果：

- 每次输入创建独立 `AbortController`；新请求发起时取消旧请求
- 在渲染前校验 `res.success`，仅在成功时更新 UI

```ts
// 搜索防抖和竞态处理
const useSearch = () => {
  const searchQuery = ref("");
  const searchResults = ref([]);
  const loading = ref(false);
  let currentController: AbortController | null = null;

  const performSearch = async (query: string) => {
    // 取消上一个请求
    if (currentController) {
      currentController.abort();
    }

    if (!query.trim()) {
      searchResults.value = [];
      return;
    }

    currentController = new AbortController();
    loading.value = true;

    try {
      const response = await get(
        `/api/search?q=${encodeURIComponent(query)}`,
        undefined,
        currentController.signal
      );

      // 验证响应有效性
      if (response.success && !currentController.signal.aborted) {
        searchResults.value = response.data;
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("搜索请求失败:", error);
        message.error("搜索失败，请重试");
      }
    } finally {
      loading.value = false;
      currentController = null;
    }
  };

  // 防抖搜索
  const debouncedSearch = debounce(performSearch, 300);

  return { searchQuery, searchResults, loading, search: debouncedSearch };
};
```

### Token 失效处理

用户认证失效的检测和处理流程：

- 后端返回 `code != 200`，触发统一错误提示
- 业务可在用户模块执行清空 token → 引导登录（示例中未强跳）

```ts
// Token失效处理策略
const handleTokenExpired = () => {
  // 清理用户状态
  resetUserState();

  // 清理本地存储
  localStorage.removeItem("token");

  // 提示用户
  message.warning("登录已过期，请重新登录");

  // 跳转到登录页
  router.push({
    path: "/login",
    query: { redirect: router.currentRoute.value.fullPath },
  });
};

// HTTP拦截器中的token处理
httpClient.addResponseInterceptor((response) => {
  if (response.code === 401 || response.bizCode === 401) {
    handleTokenExpired();
  }
  return response;
});
```

### Mock/真实接口切换

开发和生产环境的接口切换错误处理：

- 控制台设置 `window.__MSW_ENABLED__=true` 或 `.env.*` 中 `VITE_MSW=true`
- Mock 与真实接口响应结构保持一致，确保切换无感

```ts
// 环境切换错误处理
const initializeMockService = async () => {
  try {
    if (import.meta.env.VITE_MSW === "true" || window.__MSW_ENABLED__) {
      const { worker } = await import("@/mocks/browser");
      await worker.start();
      console.log("🔧 Mock Service Worker 已启动");
    }
  } catch (error) {
    console.error("Mock服务启动失败:", error);
    // 降级到真实接口
    console.log("降级使用真实接口");
  }
};

// 接口响应验证
const validateApiResponse = (response: any) => {
  // 验证响应结构一致性
  if (!response || typeof response !== "object") {
    throw new Error("响应格式异常");
  }

  if (!("success" in response) || !("data" in response)) {
    console.warn("响应结构不标准，可能来自不同环境");
  }

  return response;
};
```

### 离线处理策略

移动端离线场景的错误处理和数据同步：

```ts
// 离线数据管理
const useOfflineSync = () => {
  const pendingRequests = ref([]);
  const isOnline = ref(navigator.onLine);

  const queueRequest = (requestFn: () => Promise<any>) => {
    if (isOnline.value) {
      return requestFn();
    } else {
      pendingRequests.value.push(requestFn);
      message.info("当前离线，操作将在网络恢复后执行");
    }
  };

  const syncPendingRequests = async () => {
    if (!isOnline.value || pendingRequests.value.length === 0) return;

    const requests = [...pendingRequests.value];
    pendingRequests.value = [];

    for (const requestFn of requests) {
      try {
        await requestFn();
      } catch (error) {
        console.error("离线同步失败:", error);
        // 失败的请求重新入队
        pendingRequests.value.push(requestFn);
      }
    }
  };

  // 监听网络状态变化
  watch(isOnline, (newStatus) => {
    if (newStatus) {
      syncPendingRequests();
    }
  });

  return {
    queueRequest,
    isOnline,
    pendingCount: computed(() => pendingRequests.value.length),
  };
};
```

### 错误监控与上报

生产环境的错误收集和分析：

```ts
// 错误监控系统
interface ErrorReport {
  message: string;
  stack?: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
  timestamp: number;
  userAgent: string;
  userId?: string;
}

const reportError = (error: Error | ErrorEvent, context?: string) => {
  if (import.meta.env.DEV) return;

  const report: ErrorReport = {
    message: error.message || "未知错误",
    stack: error.stack,
    url: window.location.href,
    lineNumber: (error as ErrorEvent).lineno,
    columnNumber: (error as ErrorEvent).colno,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    userId: getCurrentUserId(),
    context,
  };

  // 发送错误报告
  fetch("/api/errors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  }).catch(() => {
    // 错误上报失败时的降级处理
    console.error("错误上报失败", report);
  });
};

// 全局错误捕获
window.addEventListener("error", (event) => {
  reportError(event, "global-error");
});

window.addEventListener("unhandledrejection", (event) => {
  reportError(new Error(event.reason), "unhandled-promise");
});
```
