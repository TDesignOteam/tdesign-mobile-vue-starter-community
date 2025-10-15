# 设置页 {#settings}

## 设计思路 {#design}

采用卡片式分组布局，基于 TDesign Mobile Vue 的 `t-cell` 组件构建，统一图标系统和视觉层次

## 模块结构 {#structure}

```
src/views/setting/
└── index.vue          # 设置页面主文件，包含页面布局和样式
```

## 开发步骤 {#development-guide}

**在现有分组中添加**

```vue
<t-cell title="新设置项" arrow hover @click="handleNewSetting">
  <template #left-icon>
    <TIcon name="icon-name" size="20px" color="#0052d9" />
  </template>
</t-cell>
```

**创建新的设置分组**

```vue
<div class="setting-group">
  <t-cell title="新分组设置1" arrow hover @click="() => {}">
    <template #left-icon>
      <TIcon name="icon1" size="20px" color="#0052d9" />
    </template>
  </t-cell>
  <t-cell title="新分组设置2" arrow hover @click="() => {}">
    <template #left-icon>
      <TIcon name="icon2" size="20px" color="#0052d9" />
    </template>
  </t-cell>
</div>
```

## 贡献者 {#contributors}

[Kotone Fujita](https://github.com/FunEnn)
