# Error Handling & Fault Tolerance

Modern frontend application error handling requires design from multiple layers, including network layer, state layer, UI layer, etc. This project ensures stable user experience and development experience under various exceptional circumstances through layered design and unified handling mechanisms.

## HTTP Layer

HTTP layer error handling is the foundation of the entire application's fault tolerance mechanism, providing reliable data communication guarantee for upper-level business through unified response format and intelligent error handling strategies.

### Unified Response Format

All API responses follow standardized format for unified handling and error judgment:

- Unified response: `{ code, message, data, success }`, standardized by `src/api/request.ts`
- Auto prompts: When `success=false` and prompts enabled, trigger `plugins/message.error`
- Request cancellation: Use `AbortController` for component unmount/route switching, active cancellation returns `code=499`

```ts
// Request and cancellation in components
const controller = new AbortController();
try {
  const res = await get("/search?q=xx", undefined, controller.signal);
  if (res.success) {
    // Process data
  }
} finally {
  controller.abort();
}
```

### Multi-layer Error Handling Mechanism

HTTP client implements comprehensive error classification and handling strategies:

```ts
// src/api/request.ts (excerpt)
const result = {
  code: response.status,
  message: data.message || (response.ok ? "Success" : "Error"),
  data: data.data || data,
  success: response.ok,
  // Business layer error judgment
  bizCode,
  bizSuccess:
    bizCode === undefined ? true : this.bizSuccessWhitelist.has(bizCode),
};

// Error prompt handling
if (this.showToastOnError && (!result.success || !bizSuccess)) {
  import("@/plugins/message")
    .then(({ message }) => {
      message.error(result.message || "Request failed");
    })
    .catch(() => {});
}
```

### Timeout & Cancellation Handling

Intelligent request timeout and cancellation mechanism to avoid long waits and resource waste:

```ts
// Timeout handling
const timeoutId =
  timeoutMs > 0
    ? setTimeout(() => {
        didTimeout = true;
        controller.abort(new DOMException("Request timeout", "AbortError"));
      }, timeoutMs)
    : null;

// Error classification handling
try {
  // ... request logic
} catch (_error) {
  if ((_error as any)?.name === "AbortError") {
    if (didTimeout) {
      return { code: 408, message: "Request timeout", success: false };
    }
    return { code: 499, message: "Request cancelled", success: false };
  }
  // Network error
  return { code: 500, message: "Network request failed", success: false };
}
```

### Business Code Whitelist Mechanism

Flexible business success code configuration to adapt to different backend interface standards:

```ts
class HttpClient {
  private bizSuccessWhitelist: Set<number | string>;

  constructor() {
    // Default success codes: 200, 0
    this.bizSuccessWhitelist = new Set([200, 0]);
  }

  // Configure business success code whitelist
  setBizSuccessWhitelist(codes: Array<number | string>) {
    this.bizSuccessWhitelist = new Set(codes);
  }

  // Add business success code
  addBizSuccessCode(code: number | string) {
    this.bizSuccessWhitelist.add(code);
  }
}
```

## Store Layer

The state management layer ensures application state consistency and recoverability through reasonable error handling strategies, providing users with stable data experience.

### Global State Reset

Provides unified state reset capability, especially suitable for error recovery, user logout scenarios:

- Provide `resetAllStores()` for quick state reset
- Only handle side effects in Actions, ensuring predictability

```ts
// src/store/index.ts (excerpt)
export function resetAllStores() {
  registeredStores.forEach((s) => {
    if (typeof s.$reset === "function") s.$reset();
  });
}
```

### Async Operation Error Handling

In state management, async operations require special attention to error handling and state consistency:

```ts
// Async error handling example in state management
const fetchUserInfo = async () => {
  try {
    const result = await httpClient.get("/api/user/info");
    if (result.success && result.bizSuccess) {
      userInfo.value = result.data;
      return { success: true, data: result.data };
    } else {
      // Business error, log but don't reset state
      console.warn("Failed to fetch user info:", result.message);
      return { success: false, error: result.message };
    }
  } catch (error) {
    // Network or system error, may need to reset state
    console.error("User info request exception:", error);
    if (error.name === "NetworkError" || error.code === 500) {
      // Reset user state on severe errors
      resetUserState();
    }
    return { success: false, error: "Network connection error" };
  }
};
```

### Persistence Error Tolerance

Error handling during state persistence to ensure data integrity:

```ts
// Safe persistence configuration
export function getSafePeristConfig(key: string) {
  return {
    ...getPersistConfig(key),
    // Data validation and error handling
    beforeRestore: (context) => {
      try {
        const data = context.store.$state;
        // Validate critical field integrity
        if (key === "user" && data && !validateUserData(data)) {
          console.warn("User data format anomaly, skipping restore");
          return false;
        }
        return true;
      } catch (error) {
        console.error("State restore validation failed:", error);
        return false; // Prevent restoring anomalous data
      }
    },
  };
}

// Storage error handling
const handleStorageError = (error: Error, operation: string) => {
  if (error.name === "QuotaExceededError") {
    // Storage space insufficient, clear non-essential data
    clearNonEssentialStorage();
    message.warning("Storage space insufficient, cache cleared");
  } else if (error.name === "SecurityError") {
    // Privacy mode and other security restrictions
    message.info("Current environment does not support data persistence");
  }
};
```

### State Sync Validation

Regularly validate state consistency with server, timely detect and fix data inconsistency issues:

```ts
// State validation and auto-repair
const validateAndSyncState = async () => {
  try {
    if (!isLoggedIn.value) return;

    // Validate token validity
    const tokenValid = await httpClient.get("/api/auth/validate");
    if (!tokenValid.success) {
      // Token expired, clear state and guide to re-login
      resetUserState();
      router.push("/login");
      return;
    }

    // Validate critical data integrity
    if (!userInfo.value?.id) {
      const fetchResult = await fetchUserInfo();
      if (!fetchResult.success) {
        console.warn("User info sync failed, maintaining current state");
      }
    }
  } catch (error) {
    console.error("State sync check failed:", error);
    // Non-critical error, doesn't affect user usage
  }
};
```

## Interaction Layer

UI interaction layer error handling focuses on user experience, ensuring users can continue using core application functions through reasonable degradation strategies and friendly error prompts.

### List Tri-state (Loading/Error/Empty) Pattern

Standardized tri-state handling for list pages to avoid flickers/blank screens:

```vue
<!-- src/views/talklist/index.vue (excerpt) -->
<LoadingOverlay v-if="isLoading" />
<ErrorState v-else-if="error" :description="error || undefined" @retry="refreshTalkList" />
<div v-else class="list-container">
  <EmptyState v-if="mytalklist.length === 0" @refresh="refreshTalkList" />
  <VirtualList v-else mode="recycle" :items="mytalklist" @update="() => {}">
    <!-- items -->
  </VirtualList>
</div>
```

Key points:

- Loading has higher priority than error/content; error has higher priority than content; empty state before rendering list.
- Keep container height fixed (`flex: 1; min-height: 0;`) to avoid layout shifts.

### Route Error Handling

Comprehensive route error handling and page degradation mechanisms:

- PageHeader return logic, login/logout view switching all have fallbacks
- Route `/:pathMatch(.*)*` redirects to `/error/404`
- Permission route error degradation and redirection

```ts
// Route error handling example
const router = createRouter({
  routes: [
    // ... other routes
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

// Error handling in route guards
router.beforeEach(async (to, from, next) => {
  try {
    // Permission validation logic
    const hasPermission = await checkRoutePermission(to);
    if (!hasPermission) {
      next("/error/403");
      return;
    }
    next();
  } catch (error) {
    console.error("Route validation failed:", error);
    next("/error/500");
  }
});
```

### Component Error Boundaries

Component-level error handling and degradation display:

```ts
// Component error handling Hook
export const useErrorBoundary = () => {
  const error = ref<Error | null>(null);
  const hasError = computed(() => !!error.value);

  const captureError = (err: Error) => {
    error.value = err;
    console.error("Component error:", err);

    // Error reporting
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

### Mobile-specific Handling

Special error handling for mobile environments:

```ts
// Network status monitoring
const useNetworkStatus = () => {
  const isOnline = ref(navigator.onLine);

  const handleOnline = () => {
    isOnline.value = true;
    message.success("Network connection restored");
    // Retry failed requests
    retryFailedRequests();
  };

  const handleOffline = () => {
    isOnline.value = false;
    message.warning("Network connection lost");
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

## Common Scenarios

Providing standardized handling solutions and best practices for common error scenarios in actual development.

### List Search Race Conditions

Request race condition handling in search scenarios to ensure correct search results display:

- Create independent `AbortController` for each input; cancel old request when new request is initiated
- Validate `res.success` before rendering, only update UI when successful

```ts
// Search debounce and race condition handling
const useSearch = () => {
  const searchQuery = ref("");
  const searchResults = ref([]);
  const loading = ref(false);
  let currentController: AbortController | null = null;

  const performSearch = async (query: string) => {
    // Cancel previous request
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

      // Validate response validity
      if (response.success && !currentController.signal.aborted) {
        searchResults.value = response.data;
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Search request failed:", error);
        message.error("Search failed, please retry");
      }
    } finally {
      loading.value = false;
      currentController = null;
    }
  };

  // Debounced search
  const debouncedSearch = debounce(performSearch, 300);

  return { searchQuery, searchResults, loading, search: debouncedSearch };
};
```

### Token Expiration Handling

User authentication expiration detection and handling workflow:

- Backend returns `code != 200`, triggers unified error prompt
- Business can execute in user module: clear token → guide to login (no forced jump in demo)

```ts
// Token expiration handling strategy
const handleTokenExpired = () => {
  // Clear user state
  resetUserState();

  // Clear local storage
  localStorage.removeItem("token");

  // Prompt user
  message.warning("Login expired, please login again");

  // Redirect to login page
  router.push({
    path: "/login",
    query: { redirect: router.currentRoute.value.fullPath },
  });
};

// Token handling in HTTP interceptor
httpClient.addResponseInterceptor((response) => {
  if (response.code === 401 || response.bizCode === 401) {
    handleTokenExpired();
  }
  return response;
});
```

### Mock/Real Interface Switching

Interface switching error handling between development and production environments:

- Console set `window.__MSW_ENABLED__=true` or `VITE_MSW=true` in `.env.*`
- Keep Mock and real interface response structures consistent, ensuring seamless switching

```ts
// Environment switching error handling
const initializeMockService = async () => {
  try {
    if (import.meta.env.VITE_MSW === "true" || window.__MSW_ENABLED__) {
      const { worker } = await import("@/mocks/browser");
      await worker.start();
      console.log("Mock Service Worker started");
    }
  } catch (error) {
    console.error("Mock service startup failed:", error);
    // Fallback to real interface
    console.log("Falling back to real interface");
  }
};

// API response validation
const validateApiResponse = (response: any) => {
  // Validate response structure consistency
  if (!response || typeof response !== "object") {
    throw new Error("Response format exception");
  }

  if (!("success" in response) || !("data" in response)) {
    console.warn(
      "Response structure non-standard, may come from different environment"
    );
  }

  return response;
};
```

### Offline Handling Strategy

Error handling and data sync for mobile offline scenarios:

```ts
// Offline data management
const useOfflineSync = () => {
  const pendingRequests = ref([]);
  const isOnline = ref(navigator.onLine);

  const queueRequest = (requestFn: () => Promise<any>) => {
    if (isOnline.value) {
      return requestFn();
    } else {
      pendingRequests.value.push(requestFn);
      message.info(
        "Currently offline, operation will execute when network recovers"
      );
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
        console.error("Offline sync failed:", error);
        // Re-queue failed requests
        pendingRequests.value.push(requestFn);
      }
    }
  };

  // Monitor network status changes
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

### Error Monitoring & Reporting

Error collection and analysis in production environment:

```ts
// Error monitoring system
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
    message: error.message || "Unknown error",
    stack: error.stack,
    url: window.location.href,
    lineNumber: (error as ErrorEvent).lineno,
    columnNumber: (error as ErrorEvent).colno,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    userId: getCurrentUserId(),
    context,
  };

  // Send error report
  fetch("/api/errors", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(report),
  }).catch(() => {
    // Fallback handling when error reporting fails
    console.error("Error reporting failed", report);
  });
};

// Global error capture
window.addEventListener("error", (event) => {
  reportError(event, "global-error");
});

window.addEventListener("unhandledrejection", (event) => {
  reportError(new Error(event.reason), "unhandled-promise");
});
```
