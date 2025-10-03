---
layout: home

hero:
  name: "TDesign Mobile Starter"
  text: "更快落地，更稳交付"
  tagline: 以 TDesign Mobile Vue 为内核，预置“路由·状态·Mock·i18n·主题·工程化”，从原型到生产，一条龙。
  image:
    src: /logo.svg
    alt: "TDesign"
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/getting-started
    - theme: alt
      text: 页面示例
      link: /pages/
    - theme: alt
      text: GitHub
      link: https://github.com/TDesignOteam/tdesign-mobile-vue-starter-community

features:
  - icon: ⚡️
    title: 极速上手
    details: Vite + Vue 3 + TS，脚手架即生产基线。
  - icon: 📱
    title: 移动体验先行
    details: 沉浸式手势、底部导航、状态栏适配，一套到位。
  - icon: 🧩
    title: 组件即构件
    details: Layout / FormContainer / ServiceGrid / VirtualList 开箱复用。
  - icon: 🌐
    title: i18n 懒加载
    details: 多语言零白屏切换，与 TDesign Provider 联动。
  - icon: 🔒
    title: 统一网络语义
    details: 成功/失败同语义，内置取消与重试策略。
  - icon: 🧪
    title: Mock 与联调
    details: MSW 可开关，真实接口与 Mock 可无缝切换。
  - icon: 🧭
    title: 融合式路由
    details: 约定自动 + 手写增强，自动挂载至 Layout。
  - icon: 🎯
    title: 工程化全家桶
    details: Pinia 持久化、ESLint/Prettier、主题 Token、打包与部署指南。
---

## 这套模板为谁准备

- 需要快速交付的移动端产品团队
- 追求稳定与规范的工程实践者
- 想二次封装 TDesign Mobile 的开发者

## 你会得到

- 一致的网络语义，少写分支
- i18n 懒加载，切换丝滑
- MSW 按需启用，Mock/联调两不误
- Store 原子化 + 持久化，状态即开即用
- 主题 Token 与暗色模式，视觉统一且可扩展

> 想直接看交互？从“页面/概览”开始，或在侧边栏选择页面详情。

<style>
/* 渐变标题配色 */
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: linear-gradient(120deg, #bd34fe 30%, #41d1ff);
}

/* 放大首页 Hero 区域的 logo 图片尺寸 */
.VPHero .image .VPImage {
  width: 480px;
  max-width: 92vw;
  height: auto;
}

@media (min-width: 960px) {
  .VPHero .image .VPImage {
    width: 480px;
  }
}

@media (max-width: 640px) {
  .VPHero .image .VPImage {
    width: 360px;
  }
}

.VPHome {
  background-image: radial-gradient(1200px 600px at 20% -10%, rgba(189, 52, 254, 0.08), transparent),
    radial-gradient(1200px 600px at 80% -10%, rgba(65, 209, 255, 0.08), transparent);
}

.VPHero .name,
.VPHero .text,
.VPHero .name .text {
  font-size: 36px;
  line-height: 1.1;
}

@media (min-width: 960px) {
  .VPHero .name,
  .VPHero .name .text {
    font-size: 48px;
  }
}

@media (max-width: 640px) {
  .VPHero .name,
  .VPHero .name .text {
    font-size: 30px;
  }
}
</style>
