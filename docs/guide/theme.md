# 主题与样式系统

基于 Tailwind CSS 4 + TDesign Token 的现代样式解决方案，支持暗色模式、响应式设计与高分屏适配。

## Tailwind CSS 集成

本项目采用 Tailwind CSS 4 作为样式框架，结合 TDesign Token 系统，提供现代化的 CSS 开发体验。通过原子化类名和设计令牌的组合，实现高效、一致且易维护的样式解决方案。

### 核心架构

使用 CSS Layers 技术实现样式优先级的精确控制，确保样式的可预测性和可维护性。Layer 分层机制让我们能够明确定义样式的加载顺序，避免样式冲突。

项目采用 Tailwind CSS 4 + CSS Layers 分层管理：

```css
/* src/style/tailwind.css */
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
```

**注意事项：**

- ⚠️ 避免全局 `* { ... }` 样式，会覆盖 Tailwind 层级
- 建议按需设置具体元素样式

### 原子化开发

采用原子化 CSS 开发模式，将样式拆分为最小的功能单元。每个类名对应一个具体的样式属性，通过组合使用实现复杂的界面效果。这种方式显著提升开发效率，减少 CSS 文件体积，并增强样式的复用性。

```vue
<template>
  <!-- Tailwind 原子类 + TDesign Token -->
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h2
      class="text-lg font-semibold"
      style="color: var(--td-text-color-primary)"
    >
      标题
    </h2>
    <p class="mt-2 text-sm" style="color: var(--td-text-color-placeholder)">
      描述内容
    </p>
  </div>
</template>
```

### 全局样式定制

针对特定需求进行全局样式覆盖和定制。主要用于调整第三方组件库的默认样式，以及定义项目通用的业务组件样式。通过统一的样式文件管理，确保全项目的视觉一致性。

```scss
/* src/style/index.scss */
// TDesign 组件样式定制
.t-dropdown-menu {
  background: transparent !important;
  &::after {
    display: none !important;
  }
}

// 业务组件样式
.auth-primary-button {
  margin: 16px;
  width: calc(100% - 32px);
  height: 48px;
  border-radius: 6px;
}
```

## 暗色模式实现

完整的暗色模式解决方案，支持系统级主题切换和用户偏好记忆。通过 CSS 变量和属性选择器实现主题的无缝切换，提供良好的用户体验和视觉舒适度。

### 主题管理

提供响应式的主题状态管理，支持手动切换和自动保存用户偏好。通过 Composition API 封装主题逻辑，便于在不同组件中复用和管理主题状态。

```typescript
// src/composables/useTheme.ts
export function useTheme() {
  const isDarkMode = ref(false);

  function applyTheme(dark: boolean) {
    const mode = dark ? "dark" : "light";
    document.documentElement.setAttribute("theme-mode", mode);
    localStorage.setItem("theme-mode", mode);
  }

  function toggleTheme() {
    isDarkMode.value = !isDarkMode.value;
    applyTheme(isDarkMode.value);
  }

  return { isDarkMode, toggleTheme };
}
```

### CSS 变量切换

基于 CSS 自定义属性的主题切换机制，通过根元素的属性选择器实现不同主题下的变量值切换。这种方式性能优异，且能够实现平滑的主题过渡效果。

```scss
:root {
  --td-bg-color-page: #f5f5f5;
  --td-text-color-primary: rgba(0, 0, 0, 0.9);
}

:root[theme-mode="dark"] {
  --td-bg-color-page: #181818;
  --td-text-color-primary: rgba(255, 255, 255, 0.9);
}
```

## 响应式与高分屏

全面的多设备适配解决方案，涵盖高分辨率屏幕、移动设备安全区域和触摸交互优化。确保应用在不同设备和屏幕密度下都能提供最佳的视觉效果和用户体验。

### 图片适配

利用现代 CSS 的 image-set() 特性实现高分屏图片适配，根据设备像素密度自动选择合适分辨率的图片资源，平衡显示质量和加载性能。

```scss
/* 高分屏图片 */
.hero-background {
  background: image-set(
      url("@/assets/images/bg.png") 1x,
      url("@/assets/images/bg@2x.png") 2x
    )
    no-repeat;
  background-size: contain;
}
```

### 移动端适配

专门针对移动设备的样式优化，包括安全区域避让、触摸目标尺寸优化和手势行为控制。确保应用在各种移动设备上都能提供原生应用般的交互体验。

```css
/* 安全区域适配 */
.mobile-safe-area {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

/* 触摸优化 */
.touch-optimized {
  min-height: 44px;
  touch-action: manipulation;
}
```

## TDesign Token 使用

深度集成腾讯 TDesign 设计系统的设计令牌，通过标准化的设计变量确保整个应用的视觉一致性。设计令牌涵盖颜色、尺寸、间距等核心设计元素，支持主题定制和品牌适配。

### 常用 Token

展示项目中最常用的设计令牌类别，包括背景色、文字色、间距、圆角等基础样式属性。这些令牌构成了应用界面的基础视觉语言。

```scss
.component-example {
  /* 背景与文字 */
  background: var(--td-bg-color-container);
  color: var(--td-text-color-primary);

  /* 间距与圆角 */
  padding: var(--td-comp-paddingTB-xs) var(--td-comp-paddingLR-s);
  border-radius: var(--td-radius-default);

  /* 边框与阴影 */
  border: 1px solid var(--td-border-level-1-color);
  box-shadow: var(--td-shadow-1);
}
```

### 组件定制

通过 CSS 自定义属性覆盖 TDesign 组件的默认样式，实现个性化的组件外观。这种方式既保持了组件的功能完整性，又提供了灵活的样式定制能力。

```vue
<template>
  <!-- 自定义 TDesign 组件样式 -->
  <t-divider style="--td-divider-color: #ff0000;" />
  <t-drawer style="--td-drawer-title-font-size: 24px;" />
</template>
```

## 构建优化

针对样式文件的构建过程优化，包括 CSS 压缩、代码分割和性能优化策略。通过构建时的处理提升应用的加载速度和运行性能。

### PostCSS 配置

后处理 CSS 的配置管理，支持自动添加浏览器前缀、CSS 压缩和代码优化。在生产环境中自动启用压缩插件，减少 CSS 文件体积。

```javascript
// postcss.config.js
export default {
  plugins: {
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
```

### 性能优化

多维度的性能优化策略，从 CSS 文件大小、加载速度和运行时性能等方面全面提升应用表现。

- **按需加载**：仅引入使用的 Tailwind 类
- **CSS 分割**：样式文件独立打包
- **压缩优化**：生产环境自动压缩

## 最佳实践

基于项目实际开发经验总结的样式开发最佳实践，涵盖代码规范、团队协作和可维护性等方面。遵循这些实践能够提升开发效率，保证代码质量。

### 开发规范

统一的 CSS 代码编写标准，包括属性顺序、命名约定和代码组织方式。良好的规范有助于团队协作和代码维护。

```scss
/* ✅ 推荐写法 */
.good-example {
  /* 1. 布局属性 */
  display: flex;
  position: relative;

  /* 2. 外观属性 */
  background: var(--td-bg-color-container);
  border-radius: var(--td-radius-default);

  /* 3. 文字属性 */
  color: var(--td-text-color-primary);
  font-size: var(--td-font-size-m);
}

/* ❌ 避免的写法 */
.bad-example {
  color: #333333; // 硬编码颜色
  margin-left: 23px; // 魔法数字
}
```

### 团队规范

面向团队协作的开发指导原则，强调一致性、效率和可维护性。通过统一的开发理念和工具使用，提升整个团队的开发质量。

- **🎯 优先使用 TDesign Token**：确保主题一致性
- **🚀 拥抱 Tailwind 原子类**：提升开发效率
- **🔄 定期清理未使用样式**：保持代码整洁
- **📱 移动优先设计**：从小屏开始设计
