# Introduction {#introduction}

Tdesign Mobile Vue Starter Community is a pure frontend template based on the [TDesign Mobile Vue](https://tdesign.tencent.com/mobile-vue/overview) mobile component library, developed with `Vue3`, `Vite`, and `TypeScript`. It includes five main modules: `Home`, `Message Center`, `Profile Center`, `Settings Center`, and `Login/Register`, and supports personalized theme configuration.

## Design Philosophy {#design-concept}

This project does not use the [TDesign Starter](https://github.com/tencent/tdesign-vue-next-starter) structure. During the initial engineering phase, we referred to the directory design and some implementation ideas of [vue-pure-admin](https://github.com/pure-admin/vue-pure-admin) (Github Star `18k+`), and made further innovations and optimizations based on that.

We always adhere to the **principles of originality**, **beginner-friendliness**, **high scalability**, and **sustainable maintenance**, aiming to provide developers with a template that is easy to use, clearly structured, and convenient for secondary development. The project emphasizes code standards and best practices, encourages community collaboration, and continuously optimizes the architecture to ensure long-term usability and flexible adaptation to diverse business needs.

> Some team members are perfectionists and cannot tolerate any `warning` or `error`.

::: tip Design Draft
[Click to view the design draft](https://codesign.qq.com/s/567449555703953), password: `F2FO`
:::

## Developer Experience {#developer-experience}

This project focuses on developer experience. Most third-party dependencies are **community-active**, **well-maintained**, and **highly downloaded** libraries, ensures efficient and stable solutions for developers.

The following practical dependencies are preset and integrated to streamline the development process:

- [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components)

  Automatically imports third-party components, eliminates the need for manual `import` and improves development efficiency.
- [unplugin-vue-router](https://github.com/posva/unplugin-vue-router)

  Automatically detects the structure of the `src/views` directory and generates routes, simplifies route configuration.
- [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import)

  Automatically imports commonly used functions, so you don't need to manually `import` them.
- [code-inspector-plugin](https://github.com/zh-lx/code-inspector)

  Hold `Alt` + `⇧ Shift` (or `⌥ Option` + `⇧ Shift` on Mac) in the browser to quickly locate component source code, greatly improves debugging efficiency.
- [vite-svg-loader](https://github.com/jpkleemans/vite-svg-loader)

  Supports importing `SVG` as components, greatly enhances the development experience for icons and vector resources. Over 300k weekly downloads on npm.
- [@vitejs/plugin-vue-jsx](https://www.npmjs.com/package/@vitejs/plugin-vue-jsx)

  Officially maintained JSX syntax support plugin, trustworthy and flexible.

In addition, we have developed some custom `Vite` plugins to further improve development efficiency:

- `buildInfo`

  Outputs key information to the console at each stage of Vite and provides build analysis and suggestions for continuous optimization.
- `fakerServer`

  Handles data mocking by intercepting HTTP requests. The data source uses the cutting-edge [@faker-js/faker](https://github.com/faker-js/faker) for greater security and flexibility.
  ::: info Why not use [mockjs](https://github.com/nuysoft/Mock) + [vite-plugin-mock](https://github.com/vbenjs/vite-plugin-mock)?

  `mockjs` has many security vulnerabilities, and `vite-plugin-mock` is heavily dependent on `mockjs`, so we do not use this combination.
  :::
- `removeConsole`

  This plugin is used to remove `console.log` statements in the production environment. The plugin works by interfering with the build process to simply filter out the code, rather than using an `AST-based` approach.

## Contributors {#contributors}

[hikari](https://github.com/liuyax0818), [Kotone Fujita](https://github.com/FunEnn), [Yi ZiXiong](https://github.com/neikun25), [Reuse5653](https://github.com/Reuse5653), [Tonite14](https://github.com/Tonite14)
