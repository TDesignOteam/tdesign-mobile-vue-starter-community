# 项目介绍 {#introduction}

Tdesign Mobile Vue Starter Community 是一个基于 [TDesign Mobie Vue](https://tdesign.tencent.com/mobile-vue/overview) 移动端组件库，使用 `Vue3`、`Vite`、`TypeScript` 开发，包含 `首页`、`消息中心`、`个人中心`、`设置中心`、`登陆注册` 等五大功能模块，可进行个性化主题配置的纯前端页面模版。

## 设计理念 {#design-concept}

本项目未采用 [TDesign Starter](https://github.com/tencent/tdesign-vue-next-starter) 的项目结构，而是在初期工程化阶段，参考了 Github Star `18k+` 的 [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin) 的目录设计和少部分实现方式，并在此基础上进行了创新和优化。

我们始终坚持**原创性**、**小白友好**、**高扩展性**、**可持续维护**的理念，致力于为开发者打造一个易上手、结构清晰、便于二次开发的模板。项目注重代码规范与最佳实践，鼓励社区共建，持续优化架构，确保长期可用与灵活适配多样化业务需求。

> 团队里有成员洁癖程序员出身，不能容忍任何一个 `warning`、`error`

::: tip 视觉稿地址
[点击查看视觉稿](https://codesign.qq.com/s/567449555703953)，访问密码：`F2FO`
:::

## 开发体验 {#developer-experience}

本项目注重开发者体验，所选用的第三方依赖大多数为**社区活跃**、**长期维护**、**高下载量**的优质库，确保为开发者提供高效、稳定的解决方案。

项目预设并集成了以下实用依赖，助力开发流程：

- [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)

  自动导入第三方组件，无需手动 `import`，提升开发效率。
- [unplugin-vue-router](https://github.com/posva/unplugin-vue-router)

  自动检测 `src/views` 目录结构并生成路由，简化路由配置。
- [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)

  自动导入常用函数，无需手动 `import`。
- [code-inspector-plugin](https://github.com/zh-lx/code-inspector)

  在浏览器中按住 `Alt` + `⇧ Shift`（Mac 为 `⌥ Option` + `⇧ Shift`）即可快速定位组件源码，极大提升调试效率。
- [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader)

  支持以组件方式引入 `SVG`，极大提升图标与矢量资源的开发体验，npm 周下载量 `30w+`
- [@vitejs/plugin-vue-jsx](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx)

  `JSX` 语法支持插件，官方维护，值得信赖。

此外，我们还手搓了部分 `Vite` 插件，进一步提升开发效率：

- `buildInfo`

  在 `Vite` 各阶段于控制台输出关键信息，并提供打包分析与建议，便于持续优化构建流程。
- `fakerServer`

  用于数据 mock 处理，拦截 http 请求，数据源采用前沿的 [@faker-js/faker](https://github.com/faker-js/faker)，更安全灵活。
  ::: info 为什么不用 [mockjs](https://github.com/nuysoft/Mock) + [vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock)？

  `mockjs` 存在诸多安全漏洞，而 `vite-plugin-mock` 又强依赖于 `mockjs`，因此未采用该组合。
  :::
- `removeConsole`

  该插件用于在生产环境删除 `console.log`，插件逻辑是通过干涉打包过程，进行代码的简单过滤，未通过 `AST` 的方式来进行处理

## 贡献者 {#contributors}

[hikari](https://github.com/liuyax0818)、[Kotone Fujita](https://github.com/FunEnn)、[Yi ZiXiong](https://github.com/neikun25)、[Reuse5653](https://github.com/Reuse5653)、[Tonite14](https://github.com/Tonite14)
