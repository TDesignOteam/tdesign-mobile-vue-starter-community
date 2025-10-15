# TDesign 移动端页面模板

## 💡 简介

`tdesign-mobile-vue-starter-community` 是一个基于 `TDesign Mobie Vue` 移动端组件库，使用 `Vue3`、`Vite`、`TypeScript` 开发，包含首页、消息中心、个人中心、设置中心、登陆注册等五大功能模块，可进行个性化主题配置的纯前端页面模版。

- **首页**：该模块是用户进入应用的第一印象，需要展示核心功能和信息，引导用户进行下一步操作；
- **消息中心**：该模块负责集中展示各类消息通知，方便用户及时了解动态；
- **个人中心**：该模块是用户管理个人信息、查看历史发布记录、设置偏好等的集中区域；
- **设置中心**：该模块允许用户对应用的各项功能进行个性化配置，如通知设置、主题切换等；
- **登陆注册**：该模块是用户进入应用的入口，需要提供便捷、安全的登录注册方式，如验证码登陆、账号密码登录、第三方账号授权等。

## 🎨 视觉稿地址

移动端通用场景页面模版：https://codesign.qq.com/s/567449555703953

访问密码：`F2FO`

## 📘 安装使用

- 🍖 系统环境
  - `Windows` 或 `macOS`

  - 推荐 IDE：`VSCode`

  - `Node.js` 版本在 `20` 或以上，如果没有，请到 [官网](https://nodejs.org/en) 下载安装或更新

  - `pnpm` 包管理器，如果没有，请运行以下命令来进行安装

    ```bash
    npm install -g pnpm
    ```

- 📥 安装依赖

  ```bash
  pnpm install
  ```

  如果遇到 `pnpm :无法加载文件xxx，因为在此系统上禁止运行脚本...` 问题，请**以管理员的身份**打开 `PowerShell` 并输入以下命令

  ```bash
  set-ExecutionPolicy RemoteSigned
  ```

  输入 `Y` 后确定即可

- 🚀 运行

  ```bash
  pnpm dev
  ```

- 📦 打包

  ```bash
  pnpm build
  # 打包 & 分析
  pnpm report
  ```

- 👀 预览

  ```bash
  pnpm preview
  # 打包 & 预览
  pnpm preview:build
  ```

## 📑 Git 提交规范

以下基于 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md#git-commit-message-convention) 提交规范编写

- `feat` 业务新功能开发
- `fix` bug 修复
- `polish` 微调、润色代码或 UI，不影响逻辑（如命名优化、视觉细节调整）
- `docs` 文档、注释相关
- `style` 修改代码风格（格式化、空格、分号等相关，**非 CSS**）
- `refactor` 重构相关（函数拆分、hook 调整等等）
- `perf` 业务代码优化（涉及到逻辑变更，**非构建**相关）
- `test` 测试相关
- `workflow` 工作流相关
- `ci` 持续集成相关
- `chore` 杂项变更，不影响代码逻辑（如依赖更新、构建脚本修改）
- `types` 类型相关
- `revert` 撤销修改

- `build` 构建相关变更，例如 webpack/vite 配置修改
- `release` 版本发布相关
- `wip` 开发中

## ✨ 更多功能

请运行以下命令，进入文档站查看

```bash
pnpm docs:dev
```
