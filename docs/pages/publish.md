# 发布页 Publish

- 表单：标题、正文、标签、图片/视频（可选）
- 操作：草稿/发布；校验、压缩、上传进度；成功后导航

## 数据接口（Mock）

- `GET /api/publish/tags`：热门/常用标签

## 交互

- 支持多选标签与图片上传（示例图见 `src/assets/images`）

## 实现亮点

- 表单分步校验：失焦校验 + 提交前整体验证，错误聚合提示
- 媒体处理：图片压缩与尺寸限制，避免占用带宽；上传进度可视化
- 草稿箱：自动保存草稿，离开页面二次确认，避免误操作
- 并发控制：发布按钮防抖与提交态屏蔽，防止重复提交

## UI 预览

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../images/publish.png" alt="Login Placeholder" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>