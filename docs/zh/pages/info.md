# 个人信息页 {#info}

本界面是移动端通用场景页面模板的 `个人信息页`，通过点击 `个人中心` 页面用户信息右侧的编辑图标进入。页面主要用于展示与编辑用户的基础资料信息，由 **顶部 Banner**、**信息表单** 与 **底部保存按钮** 三个部分组成。

## 页面思路 {#design-idea}

- 页面结构自上而下：`Banner` → `信息表单` → `底部保存按钮`。
- 底部按钮固定，确保操作便捷。
- 生日 / 地址采用弹出层组件，主界面保持简洁。

## 模块结构 {#structure}

**页面模块**

- **顶部 Banner**：使用公共 `Banner` 组件展示"个人信息"标题
- **信息表单**：基于 `t-form` 包含用户名、性别、生日、地址、简介、相片墙等字段
- **底部保存按钮**：固定位置，依据 `allowSubmit` 状态控制可用性

**代码结构**

```
src/views/profile/info/
├── index.vue          // 页面主组件：布局 + 表单结构 + 弹出层 + 按钮
└── utils/
    ├── hooks.tsx      // 业务逻辑与状态封装（useInfoHook）
    ├── data.ts        // 地址（省市）静态数据源 areaList
    ├── rules.ts       // 表单校验规则集合
    └── types.ts       // 表单与上传文件类型定义
```

**index.vue**

- 引入 `useInfoHook` 解构所需状态与操作函数，在 `onMounted` 时加载用户数据。
- 组织多个 `t-form-item` 分区；以 `t-popup` 实现日期与地址的底部弹出选择。
- 使用 `dayjs` 处理日期范围与默认值。

**hooks.tsx**

- 封装所有交互与状态：`formData`、弹层可见性、动态城市列表、图片上传处理、提交与初始化加载。
- `loadProfileInfo`：调用 `getProfileInfoApi` 拉取已有资料并回填。
- `handleSubmit`：执行表单校验 -> 调用 `updateProfileInfoApi` -> Toast 反馈。
- 地址联动：监听第一列切换后更新第二列城市集合（`onAddressColumnChange`）。
- `birthdayValue`：计算属性，为日期选择器提供默认值（20岁）。

**data.ts**

项目预设了一些省市层级数据 `areaList`，可替换为后端接口。

**rules.ts**

将校验逻辑集中，便于统一维护与复用，项目预设了以下校验规则：

| 字段 | 规则要点 |
| ---- | -------- |
| 用户名 | 非空；长度 2~20；允许 中文/英文/数字/下划线/空格；正则校验非法字符 |
| 性别 | 非空（男/女/保密）|
| 生日 | 非空；日期不能超出当前年份；年龄区间 0~150 合理性校验 |
| 地址 | 非空（需完成两级选择）|
| 简介 | 非空 |
| 照片 | 数量不超过 12 |

**types.ts**

声明 `ProfileForm` 类型，提升开发时的类型提示和可维护性。

## 开发指南 {#development-guide}

1. 页面布局：在 `index.vue` 中使用 TDesign 组件搭建表单结构。
2. 业务封装：在 `hooks.tsx` 中集中声明状态 / 计算属性 / 方法；按需拆分额外逻辑。
3. 校验接入：按字段在 `rules.ts` 定义并绑定至 `t-form` 的 `rules`。
4. 样式处理：根据需求调整组件样式，建议尽量使用 `TDesign` 组件库的默认样式，避免自定义样式导致的兼容性问题。

## 贡献者 {#contributors}

[Reuse5653](https://github.com/Reuse5653)、[hikari](https://github.com/liuyax0818)
