# Mock {#mock}

This project includes a custom Vite plugin `fakerServer` for intercepting HTTP requests and returning local mock data in the development environment, greatly improving the front-end and back-end separation experience.

Note: `mock` is only effective in the **development environment**. The logic will be removed in production builds.

## Implementation Principle {#principle}

The `fakerServer` plugin uses `Vite`'s middleware mechanism to intercept all HTTP requests, automatically loads JS modules under the `mock/` directory, and matches the corresponding mock handler function based on the request URL and method.

The plugin supports parsing `query` parameters and `body` data, is compatible with streaming upload scenarios, and supports hot-update when the mock directory changes without restarting the server.

The `code` field in the mock response object will automatically be used as the HTTP status code, and the content is output in JSON format.

## Usage {#usage}

1. Create a new JS file under the `mock/` directory and export a compliant mock configuration (supports single object or array).
2. Each mock configuration should include `url`, `method` (optional, default is GET), and `response` (function returning mock data).
3. After starting the dev server, access the corresponding API to get mock data.

**Example:**

```js
// mock/user.js
export default {
  url: '/api/user',
  method: 'GET',
  response: ({ query, body }) => ({
    code: 200,
    data: { name: 'Zhang San', age: 18 },
  }),
}
```

## API Description {#api}

- `url`: The request path to intercept, supports prefix matching.
- `method`: HTTP method (GET, POST), default is GET if omitted.
- `response({ query, body })`: Function returning mock data, parameters include query (URL params) and body (request body).
- The `code` field in the returned object will be used as the HTTP status code.

## Known Issues {#issues}

Currently, only JS format mock files are supported. TS files are not supported yet.

## Advanced Usage {#advanced}

You can use [@faker-js/faker](https://github.com/faker-js/faker) to generate richer random data in mock responses. In a single mock file, you can use an array to handle multiple HTTP APIs at once.

```js
import { fakerZH_CN as faker } from '@faker-js/faker'

export default [
  {
    url: '/api/list',
    response: () => ({
      code: 200,
      data: Array.from({ length: 10 }, () => ({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
      })),
    }),
  },
  ...{
    // other mock logic
  }
]
```

## Type Definitions {#types}

Refer to `types/global.d.ts`

```ts
interface MockModule {
  url: string
  method: 'GET' | 'POST'
  response: (params: { query: URLSearchParams, body: any }) => any
}
```

## Contributors {#contributors}

[hikari](https://github.com/liuyax0818)
