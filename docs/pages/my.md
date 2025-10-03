# 个人中心 My

- 组成：用户卡片、服务网格、设置/资料编辑

## 数据接口（Mock）

- `GET /api/profile/services`：服务网格与菜单项
- `GET /api/profile/stats`：统计项（全部发布/审核中/已发布/草稿箱）
- `POST /api/profile/stats`：更新指定统计项
- `POST /api/profile/service-click`：记录服务点击

## 登录态演示

- 侧边栏提供“已登录/未登录”快速切换（仅 UI 预览），通过 `useNavigation()` 模拟 `token` 与 `userInfo`

## 亮点

- 登录态模拟：基于 store，切换后组件自动响应
- 服务网格：自适应与可达性优化
- 设置入口：路由懒加载，减少无关开销

## UI 预览

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../images/user1.png" alt="My Placeholder" style="flex: 1 1 0; max-width: 30%; height: auto;" />
    <img src="../images/user2.png" alt="My Placeholder" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>