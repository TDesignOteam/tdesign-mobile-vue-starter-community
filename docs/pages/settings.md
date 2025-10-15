# Settings Page {#settings}

## Design Concept {#design}

Uses card-style grouped layout, built with the TDesign Mobile Vue `t-cell` component, with a unified icon system and visual hierarchy.

## Module Structure {#structure}

```
src/views/setting/
└── index.vue          # Main file for the settings page, includes layout and styles
```

## Development Steps {#development-guide}

**Add to existing group**

```vue
<t-cell title="New Setting Item" arrow hover @click="handleNewSetting">
  <template #left-icon>
    <TIcon name="icon-name" size="20px" color="#0052d9" />
  </template>
</t-cell>
```

**Create a new settings group**

```vue
<div class="setting-group">
  <t-cell title="New Group Setting 1" arrow hover @click="() => {}">
    <template #left-icon>
      <TIcon name="icon1" size="20px" color="#0052d9" />
    </template>
  </t-cell>
  <t-cell title="New Group Setting 2" arrow hover @click="() => {}">
    <template #left-icon>
      <TIcon name="icon2" size="20px" color="#0052d9" />
    </template>
  </t-cell>
</div>
```

## Contributors {#contributors}

[Kotone Fujita](https://github.com/FunEnn)
