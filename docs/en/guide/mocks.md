---
title: Mock
---

# Mock

This project uses MSW (Mock Service Worker) to provide network interception on the browser side, simulating real backend APIs without changing business code. It runs in the Service Worker layer, intercepting `fetch/XHR` and returning responses based on your `handlers`.

## Why MSW

MSW (Mock Service Worker) utilizes browser-native Service Worker technology to intercept requests at the network layer, providing completely transparent API simulation. This architectural design allows developers to achieve an identical development experience to real backends without modifying any business code.

- Non-intrusive: share the same URLs and methods with real APIs, no need for conditional compilation or switching `baseURL`
- Closer to reality: full network lifecycle, latency, error injection, cache and CORS semantics
- Maintainable: handlers centralized in `handlers.ts`, sample data in `data/`, with a clear structure

## Integration overview

The project integrates MSW using a conditional startup strategy, ensuring convenience during development while not affecting production environment operation. Through dual control of environment variables and runtime switches, flexible enabling mechanisms are achieved.

- Startup entry: `startMsw()` in `src/mocks/index.ts` registers the worker conditionally during app startup
- Enabling conditions: DEV or explicitly enabled (`VITE_MSW=true` or `window.__MSW_ENABLED__=true`)
- Worker path: `${import.meta.env.BASE_URL || '/'}mockServiceWorker.js` (from `public/`)
- Unhandled requests: `onUnhandledRequest: 'bypass'` to pass through to real backend

```ts
// src/mocks/index.ts (excerpt)
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

In `src/main.ts`, `startMsw()` is only called when `import.meta.env.DEV` or `VITE_MSW==='true'` to avoid affecting real API debugging.

## Directory structure

Clear directory organization facilitates team collaboration and code maintenance. Mock-related files are layered by function, with data and logic separated for easy extension and management.

- `src/mocks/browser.ts`: registers the worker and aggregates `handlers`
- `src/mocks/handlers.ts`: all intercept rules (endpoints) and logic
- `src/mocks/data/*`: sample datasets (home, profile, data center, chat, users, etc.)

## Writing handlers

Handlers are the core components of MSW, responsible for defining specific request interception rules and response logic. Through standardized handler writing patterns, we ensure consistency and maintainability of mock data.

Handlers use `msw` `http.get/post/put/...` to match requests. We use `*/api/...` to match any domain with `/api` prefix so it aligns with various environments' `baseURL`.

Utilities:

- `delay(ms)`: inject latency
- `HttpResponse.json(body, { status })`: return JSON
- Project helpers:

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

Example: verify-code login (includes 5-minute code validity, error hints and user init)

```ts
http.post("*/api/auth/verify-login", async ({ request }) => {
  await delay(400);
  const body = (await request.json().catch(() => ({}) as any)) as {
    phone?: string;
    code?: string;
  };
  if (!body?.phone || !body?.code)
    return error("Phone and code are required", 400);
  if (!validateVerifyCode(body.phone, body.code))
    return error("Code incorrect or expired", 400);
  // generate/find user, then return token + user
  return ok({ token: "mock-token", user }, "Login successful");
});
```

Read params and query:

```ts
// Path params
http.get("*/api/home/content/:id", async ({ params }) => {
  const id = Number(params.id);
});
// Query params
http.get("*/api/search", async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
});
```

Auth example: Bearer Token required

```ts
http.put("*/api/auth/update-user-info", async ({ request }) => {
  const auth = request.headers.get("authorization") || "";
  if (!auth || !auth.toLowerCase().startsWith("bearer "))
    return error("No auth provided", 401);
  return ok(updatedUser, "User info updated");
});
```

## Enable/disable and switching

- Enable:
  - Set `VITE_MSW=true` in `.env.*` and restart dev server; or
  - Run `window.__MSW_ENABLED__ = true` in the browser console and refresh
- Disable: ensure `VITE_MSW` is not enabled and remove `window.__MSW_ENABLED__`
- Partial passthrough: unmatched requests are bypassed to real backend thanks to `onUnhandledRequest: 'bypass'`

### Deployment & Fallback Strategy

- MSW is disabled by default in production. If you enable it for demo environments, ensure `public/mockServiceWorker.js` is deployed and `BASE_URL` matches the sub-path.
- If endpoints are not intercepted after enabling, stop the old worker in Application → Service Workers and perform a hard refresh.
- MSW only intercepts within its scope. For sub-path deployments, verify the scope and `serviceWorker.url` configuration.

## Latency and error injection

- Use `delay(300)` to simulate network conditions
- Use `error('message', 400|401|500)` to simulate various errors and exceptional paths
- In DevTools, enable network throttling to observe UX and retry strategies

## Relation with `baseURL`

- `HttpClient` default `baseURL` is `http://localhost:3001/api`
- Handlers use `*/api/...` to match any domain with `/api` prefix, so they can intercept regardless of env switching (as long as the same path prefix is used)
- If you adjust the prefix (e.g. `/v1`), update handlers accordingly

## How to add a new endpoint

1. Add sample data in `src/mocks/data/` if needed
2. Add a new `http.get/post/...` handler in `src/mocks/handlers.ts`
3. Return shape should follow `{ code, message, data, success }`
4. Refresh the page (do a hard refresh if needed to reload the service worker)
5. Create call functions under `src/api/*.ts` for pages/components to use

Example: add a report summary endpoint

```ts
// handlers.ts
http.get("*/api/reports/summary", async () => ok({ total: 120, today: 8 }));

// api/reports.ts
export function getReportSummary() {
  return get("/reports/summary");
}
```

## FAQ (Troubleshooting)

- Worker not registered: ensure `public/mockServiceWorker.js` exists and `BASE_URL` matches deployment path
- Not intercepted: ensure it is enabled (env/window variable) and the match pattern is correct (e.g., `*/api/...`)
- Old logic cached repeatedly: stop the Service Worker in Application → Service Workers, then hard refresh
- CORS errors: unhandled requests are bypassed; check real backend CORS config

## Endpoint list

See the “Mock Endpoints” section in the API doc: [API & Mock](/en/guide/api), covering auth, home, profile, data center, search, and chat.
