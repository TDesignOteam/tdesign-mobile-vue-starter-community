# 快速开始 {#quick-start}

## 前置准备 {#prerequisites}

- 系统环境为 `Windows` 或 `macOS`

- 推荐 IDE：`VSCode`

- `Node.js` 版本在 `20.19.0` 或以上，如果没有，请移步 [Node.js 官网](https://nodejs.org/en) 下载安装或更新

  > 从 `Vite 7` 开始，不再支持 `node 18` [详情>>](https://vite.dev/blog/announcing-vite7.html#node-js-support)

- `pnpm` 包管理器，如果没有，请在安装 `Node.js` 的基础上运行以下命令来进行安装

  ```bash
  npm install -g pnpm
  ```

## 本地开发 {#local-dev}

### 安装依赖 {#installation}

```bash
pnpm install
```
::: tip 注意
如果遇到 `pnpm :无法加载文件xxx，因为在此系统上禁止运行脚本...` 问题，请打开 `PowerShell` 并输入以下命令

```bash
set-ExecutionPolicy RemoteSigned
```

根据提示输入 `Y` 后确定即可
:::

### 运行 {#run}

```bash
pnpm dev
```

### 打包 {#build}

```bash
pnpm build
# 打包 & 分析
pnpm report
```

### 预览 {#preview}

```bash
pnpm preview
# 打包 & 预览
pnpm preview:build
```

## 浏览器兼容性 {#browser}

- Chrome: 110+
- Edge: 110+
- Firefox: 104+
- Safari: 16+

**不支持 IE 🤡**
