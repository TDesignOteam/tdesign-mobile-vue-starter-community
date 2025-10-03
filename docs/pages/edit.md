# 个人信息表单 Edit

- 组成：资料编辑（头像、昵称、性别、生日、简介、地址、相册）
- 路由：`/my/edit`（由“我的”页面入口进入）

## 模块组成

- 表单字段：`src/views/edit/components/*`（分模块字段组件）
- 地址选择：`AddressPickerModal.vue` + `useAddressPicker.ts`，数据源 `src/utils/area.ts`
- 交互弹窗：日期选择、地址选择、相册上传等组件化弹窗

## 交互

- 字段编辑实时回填；选择器组件通过事件回传表单字段
- 图片上传提供占位与进度提示（示例为本地预览）

## 实现亮点

- 模块化字段组件：降低页面复杂度，便于复用与测试
- 选择器解耦：`composables` 管理选择逻辑，组件仅负责展示
- 表单校验：基础必填与长度校验，保证数据质量

## 代码位置

- 页面：`src/views/edit/index.vue`
- 组件：`src/views/edit/components/*`
- 组合式：`src/views/edit/composables/*`

## UI 预览

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../images/edit.png" alt="Edit Preview" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>