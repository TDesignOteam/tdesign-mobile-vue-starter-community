# 数据 Mock {#mock}

本项目内置了自定义的 Vite 插件 `fakerServer`，用于在开发环境下拦截 HTTP 请求并返回本地 mock 数据，极大提升前后端分离开发体验。

注意：`mock` 只在 **开发环境** 有效，打包会去掉 `mock` 逻辑

## 实现原理 {#principle}

`fakerServer` 插件通过 `Vite` 的中间件机制拦截所有 HTTP 请求，自动加载 `mock/` 目录下的 JS 模块，根据请求的 URL 和 Method 匹配对应的 mock 处理函数。

插件支持解析 `query` 参数和 `body` 数据，兼容流式上传场景，并能在 mock 目录变更时自动热更新，无需重启服务。

mock 响应对象中的 `code` 字段会自动作为 HTTP 状态码返回，内容以 JSON 格式输出。

## 使用方式 {#usage}

1. 在 `mock/` 目录下新建 JS 文件，导出符合规范的 mock 配置（支持单个对象或数组）。
2. 每个 mock 配置需包含 `url`、`method`（可选，默认 GET）、`response`（函数，返回 mock 数据）。
3. 启动开发服务后，访问对应接口即可获得 mock 数据。

**示例：**

```js
// mock/user.js
export default {
  url: '/api/user',
  method: 'GET',
  response: ({ query, body }) => ({
    code: 200,
    data: { name: '张三', age: 18 },
  }),
}
```

## 接口说明 {#api}

- `url`：需要拦截的请求路径，支持前缀匹配。
- `method`：HTTP 方法（GET、POST），不填默认为 GET。
- `response({ query, body })`：返回 mock 数据的函数，参数包含 query（URL 查询参数）和 body（请求体）。
- 返回对象中的 `code` 字段会自动作为 HTTP 状态码。

## 遗留问题 {#issues}

目前仅支持 JS 格式的 mock 文件，TS 文件暂不支持。

## 高级用法 {#advanced}

可结合 [@faker-js/faker](https://github.com/faker-js/faker) 在 mock 响应中生成更丰富的随机数据，单个mock文件中，可以使用数组一次性处理多个HTTP接口

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
    // 其他 mock 逻辑
  }
]
```

## 类型定义 {#types}

参考 `types/global.d.ts`

```ts
interface MockModule {
  url: string
  method: 'GET' | 'POST'
  response: (params: { query: URLSearchParams, body: any }) => any
}
```

## 贡献者 {#contributors}

[hikari](https://github.com/liuyax0818)
