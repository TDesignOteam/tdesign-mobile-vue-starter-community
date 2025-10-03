---
title: API & Mock
---

# API & Mock

Use the unified `get/post/put/del` exports or `httpClient` from `src/api/request.ts`. Responses follow a standardized shape:

```ts
{
  code: number,
  message: string,
  data?: any,
  success: boolean
}
```

Conventions:

- Only `success === true` means a business success; `code` is HTTP status; `message` is the hint text
- Pagination results should be under `data.pagination` with `page/limit/total/totalPages/hasMore`

## Auth (`src/api/auth.ts`)

The authentication module provides comprehensive user identity management, supporting multiple login methods and complete user lifecycle operations. It integrates deeply with the state management system to ensure consistent and secure user state across the entire application.

- `sendVerifyCode({ phone })`: send verification code
- `verifyCodeLogin(params)`: login by verification code
- `passwordLogin(params)`: password login
- `logout()`: logout
- `refreshToken()`: refresh token
- `updateUserInfo(partialUser)`: update user info

Example:

```ts
import { sendVerifyCode, verifyCodeLogin } from "@/api/auth";

await sendVerifyCode({ phone: "13800138000" });
const res = await verifyCodeLogin({ phone: "13800138000", code: "123456" });
if (res.success) {
  // use res.data
}
```

## Search / Home / Publish / Chat / DataCenter / Profile

Core business functionality modules covering content display, user interaction, and data analytics. Each module follows unified design principles while providing complete feature coverage and excellent performance for specific business scenarios.

See each module: `src/api/search.ts`, `home.ts`, `publish.ts`, `chat.ts`, `datacenter.ts`, `profile.ts`.

### Example: home pagination

Demonstrates the standard implementation pattern for paginated content loading, including response handling, data rendering, and loading state management for optimal user experience.

```ts
const { success, data } = await getHomeContent({ page: 1, limit: 10 });
if (success && data) {
  const { items, pagination } = data;
  // render items, and decide whether to continue loading by pagination.hasMore
}
```

## Cancel requests

Proper request lifecycle management is crucial for modern mobile applications. The cancellation mechanism prevents resource waste, avoids memory leaks, and provides better user interaction experience by terminating unnecessary requests promptly.

```ts
const controller = new AbortController();
const res = await get("/search?q=xx", undefined, controller.signal);
controller.abort();
```

> Cancel in-flight requests on route change/component unmount to avoid noise and waste.

---

## Mock endpoints (from `src/mocks/handlers.ts`)

Comprehensive mock API implementation providing a complete development environment independent of backend services. All endpoints maintain identical response formats with production APIs, enabling seamless switching between mock and real data.

These endpoints are enabled only in DEV or when `VITE_MSW=true` is explicitly set.

### Auth

Authentication-related endpoints providing secure user identity verification, session management, and profile updates. Includes verification code workflows, password authentication, and token lifecycle management.

- POST `/api/auth/send-code`: send verify code (returns countdown)
- POST `/api/auth/verify-login`: code login (returns token + user)
- POST `/api/auth/password-login`: password login
- POST `/api/auth/logout`: logout
- POST `/api/auth/refresh-token`: refresh token
- PUT `/api/auth/update-user-info`: update user info (Bearer required)

### Home

Content discovery and presentation endpoints for the main application interface. Supports paginated content loading, individual content details, and dynamic content refresh for personalized user experiences.

- GET `/api/home/content?page&limit`: content pagination
- GET `/api/home/content/:id`: content detail
- POST `/api/home/refresh`: random refresh

### Profile

User profile and service management endpoints providing personal information display, service navigation, and usage analytics. Supports personalized configurations and user behavior tracking.

- GET `/api/profile/services`: service groups + menus
- GET `/api/profile/stats`: user stats
- POST `/api/profile/stats`: add a stat item (example)
- POST `/api/profile/service-click`: click report (example)

### Data Center

Analytics and statistics endpoints providing multi-dimensional data insights and visualization charts. Supports real-time data updates, custom statistical periods, and various chart types for comprehensive data analysis.

- GET `/api/datacenter/stats`: returns `overview`, `interaction`, `completion`, `regionData`, `regionColumns`
- GET `/api/datacenter/video/:id`: returns metrics for a video

### Search

Intelligent search system endpoints providing keyword search, history management, and content discovery features. Supports search suggestions, result ranking, and personalized recommendations.

- GET `/api/search/history-tags`: history tags
- GET `/api/search/discoveries`: discoveries
- GET `/api/search?q=xxx`: suggestions/results

### Chat

Real-time communication system endpoints providing message sending, receiving, and management functionality. Supports unread message tracking, message status synchronization, and chat history for seamless communication experiences.

- GET `/api/chat`: conversation list
- POST `/api/chat/:chatId/message`: send message
- PUT `/api/chat/:chatId/read`: mark as read
- GET `/api/chat/unread-count`: unread total
