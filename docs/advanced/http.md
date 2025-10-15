# HTTP {#http}

## Design Ideas {#design}

### 1. Mobile Optimization Packaging {#design-step1}

- Based on the singleton pattern `TmvRequest`, with a built-in 3-second timeout
- Automatically adds `Authorization` header, supports `showError` config

### 2. Intelligent Retry Mechanism {#design-step2}

- Exponential backoff (1s, 2s, 4s), up to 3 retries
- Automatically retries for status codes `408`, `500`, `502`, `503`, `504` and network timeouts

### 3. Error Handling {#design-step3}

- Predefined Chinese error messages, automatically handles 401 authentication failure and clears token
- Supports silent error mode (`showError: false`) to avoid repeated popups

### 4. Type Safety {#design-step4}

- Restricts request methods to `GET | POST | PUT | DELETE | PATCH`
- Supports generic type inference: `request.get<BaseHttpResp<T>>('/api')`

## Module Structure {#structure}

```
src/utils/request/
├── index.ts          # TmvRequest class implementation, includes interceptors and retry logic
└── types.d.ts        # Type definitions, extends axios config interface
```

## Usage {#usage}

```typescript
import { request } from '@/utils/request'

// GET request
export function getUserInfoApi() {
  return request.get<BaseHttpResp>('/getUserInfo')
}

// POST request
export function handleLoginApi(username: string, password: string) {
  return request.post<BaseHttpResp>('/login', { username, password })
}
```

## Environment Variable Configuration {#env-config}

```bash
# .env*
VITE_API_BASE_URL = '/api'
```

## Contributors {#contributors}

[Kotone Fujita](https://github.com/FunEnn)
