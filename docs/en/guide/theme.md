---
title: Theme & Styles
---

# Theme & Style System

Modern styling solution based on Tailwind CSS 4 + TDesign Token, supporting dark mode, responsive design, and high-DPI displays.

## Tailwind CSS Integration

This project adopts Tailwind CSS 4 as the styling framework, combined with the TDesign Token system, providing a modern CSS development experience. Through the combination of atomic class names and design tokens, we achieve efficient, consistent, and maintainable styling solutions.

### Core Architecture

Utilizing CSS Layers technology for precise control of style precedence, ensuring predictable and maintainable styles. The Layer hierarchical mechanism allows us to clearly define the loading order of styles and avoid style conflicts.

The project uses Tailwind CSS 4 + CSS Layers for hierarchical management:

```css
/* src/style/tailwind.css */
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/utilities.css" layer(utilities);
```

**Important Notes:**

- ⚠️ Avoid global `* { ... }` styles, which will override Tailwind layers
- Recommend setting specific element styles as needed

### Atomic Development

Adopting atomic CSS development pattern, breaking down styles into the smallest functional units. Each class name corresponds to a specific style property, achieving complex interface effects through combination. This approach significantly improves development efficiency, reduces CSS file size, and enhances style reusability.

```vue
<template>
  <!-- Tailwind atomic classes + TDesign Token -->
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h2
      class="text-lg font-semibold"
      style="color: var(--td-text-color-primary)"
    >
      Title
    </h2>
    <p class="mt-2 text-sm" style="color: var(--td-text-color-placeholder)">
      Description
    </p>
  </div>
</template>
```

### Global Style Customization

Performing global style overrides and customization for specific needs. Mainly used for adjusting default styles of third-party component libraries and defining common business component styles for the project. Through unified style file management, ensuring visual consistency across the entire project.

```scss
/* src/style/index.scss */
// TDesign component style customization
.t-dropdown-menu {
  background: transparent !important;
  &::after {
    display: none !important;
  }
}

// Business component styles
.auth-primary-button {
  margin: 16px;
  width: calc(100% - 32px);
  height: 48px;
  border-radius: 6px;
}
```

## Dark Mode Implementation

Complete dark mode solution supporting system-level theme switching and user preference memory. Implementing seamless theme switching through CSS variables and attribute selectors, providing excellent user experience and visual comfort.

### Theme Management

Providing reactive theme state management, supporting manual switching and automatic saving of user preferences. Encapsulating theme logic through Composition API for easy reuse and management of theme state across different components.

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

### CSS Variable Switching

Theme switching mechanism based on CSS custom properties, implementing variable value switching for different themes through attribute selectors on the root element. This approach offers excellent performance and enables smooth theme transition effects.

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

## Responsive & High-DPI

Comprehensive multi-device adaptation solution covering high-resolution screens, mobile device safe areas, and touch interaction optimization. Ensuring optimal visual effects and user experience across different devices and screen densities.

### Image Adaptation

Utilizing modern CSS image-set() feature for high-DPI image adaptation, automatically selecting appropriate resolution image resources based on device pixel density, balancing display quality and loading performance.

```scss
/* High-DPI images */
.hero-background {
  background: image-set(
      url("@/assets/images/bg.png") 1x,
      url("@/assets/images/bg@2x.png") 2x
    )
    no-repeat;
  background-size: contain;
}
```

### Mobile Adaptation

Style optimizations specifically for mobile devices, including safe area avoidance, touch target size optimization, and gesture behavior control. Ensuring native app-like interaction experience across various mobile devices.

```css
/* Safe area adaptation */
.mobile-safe-area {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}

/* Touch optimization */
.touch-optimized {
  min-height: 44px;
  touch-action: manipulation;
}
```

## TDesign Token Usage

Deep integration with Tencent TDesign system's design tokens, ensuring visual consistency across the entire application through standardized design variables. Design tokens cover core design elements like colors, sizes, and spacing, supporting theme customization and brand adaptation.

### Common Tokens

Showcasing the most commonly used design token categories in the project, including background colors, text colors, spacing, border radius, and other fundamental style properties. These tokens form the basic visual language of the application interface.

```scss
.component-example {
  /* Background & text */
  background: var(--td-bg-color-container);
  color: var(--td-text-color-primary);

  /* Spacing & border radius */
  padding: var(--td-comp-paddingTB-xs) var(--td-comp-paddingLR-s);
  border-radius: var(--td-radius-default);

  /* Border & shadow */
  border: 1px solid var(--td-border-level-1-color);
  box-shadow: var(--td-shadow-1);
}
```

### Component Customization

Overriding default styles of TDesign components through CSS custom properties to achieve personalized component appearance. This approach maintains component functionality integrity while providing flexible style customization capabilities.

```vue
<template>
  <!-- Custom TDesign component styles -->
  <t-divider style="--td-divider-color: #ff0000;" />
  <t-drawer style="--td-drawer-title-font-size: 24px;" />
</template>
```

## Build Optimization

Build process optimization for style files, including CSS compression, code splitting, and performance optimization strategies. Improving application loading speed and runtime performance through build-time processing.

### PostCSS Configuration

Configuration management for post-processing CSS, supporting automatic browser prefix addition, CSS compression, and code optimization. Automatically enabling compression plugins in production environment to reduce CSS file size.

```javascript
// postcss.config.js
export default {
  plugins: {
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
```

### Performance Optimization

Multi-dimensional performance optimization strategies, comprehensively improving application performance from CSS file size, loading speed, and runtime performance perspectives.

- **On-demand loading**: Only import used Tailwind classes
- **CSS splitting**: Independent style file packaging
- **Compression optimization**: Automatic compression in production

## Best Practices

Style development best practices summarized from actual project development experience, covering code standards, team collaboration, and maintainability aspects. Following these practices can improve development efficiency and ensure code quality.

### Development Standards

Unified CSS code writing standards, including property order, naming conventions, and code organization methods. Good standards facilitate team collaboration and code maintenance.

```scss
/* ✅ Recommended approach */
.good-example {
  /* 1. Layout properties */
  display: flex;
  position: relative;

  /* 2. Appearance properties */
  background: var(--td-bg-color-container);
  border-radius: var(--td-radius-default);

  /* 3. Text properties */
  color: var(--td-text-color-primary);
  font-size: var(--td-font-size-m);
}

/* ❌ Avoid these patterns */
.bad-example {
  color: #333333; // Hardcoded colors
  margin-left: 23px; // Magic numbers
}
```

### Team Standards

Development guiding principles for team collaboration, emphasizing consistency, efficiency, and maintainability. Improving overall team development quality through unified development concepts and tool usage.

- **Prioritize TDesign Tokens**: Ensure theme consistency
- **Embrace Tailwind Atomic Classes**: Improve development efficiency
- **Regular Style Cleanup**: Keep code clean
- **Mobile-first Design**: Start designing from small screens
