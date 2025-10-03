# 快速开始

## 环境

- Node.js ≥ 18
- 包管理器：推荐 pnpm（亦支持 npm/yarn）

## 安装依赖

```bash
pnpm install
```

## 启动开发

```bash
pnpm dev
```

- 默认地址：`http://localhost:5173`
- 端口与基础路径：`.env.*` → `VITE_PORT`、`VITE_BASE_PATH`
- 路由模式：`.env.*` → `VITE_ROUTER_MODE=history|hash`
- Mock：`.env.*` → `VITE_MSW=true`；或控制台 `window.__MSW_ENABLED__ = true`

## 构建与预览

```bash
pnpm build
pnpm preview
```

## 常用脚本（片段）

```json
{
  "scripts": {
    "dev": "pnpm run dev:app",
    "dev:app": "cross-env NODE_OPTIONS=--max-old-space-size=4096 vite",
    "build": "rimraf dist && cross-env NODE_OPTIONS=--max-old-space-size=8192 vite build",
    "preview": "vite preview",
    "report": "rimraf dist && cross-env NODE_OPTIONS=--max-old-space-size=8192 vite build --mode report",
    "lint": "eslint --cache --max-warnings 0 \"{src,mock,build}/**/*.{vue,js,ts,tsx,css,scss}\" --fix"
  }
}
```

## 环境变量速查

- `VITE_BASE_PATH`：应用基础路径（影响路由与静态资源）
- `VITE_PORT`：开发服务器端口（见 `vite.config.ts`）
- `VITE_ROUTER_MODE`：`history | hash`（见 `src/router/utils.ts`）
- `VITE_MSW`：是否启用 MSW Mock（见 `src/mocks/index.ts`）

## 目录一览（简）

```text
src/
  api/            # 请求封装与业务接口
  layout/         # 布局：Header/BottomNav/全局导航
  views/          # 业务页面
  store/          # Pinia 与持久化
  plugins/        # i18n、消息等插件
  mocks/          # MSW Mock 与数据
  router/         # 路由与工具
  style/          # 样式与主题
```

> DX：已预置 auto-import/组件按需、自动路由、i18n 编译、SVG 组件、Tailwind 4、构建压缩与体积报告等能力；详见各章节。
