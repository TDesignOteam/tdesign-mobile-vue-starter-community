# 会话列表 Talklist

- 数据：`/api/chat` 列表；发送消息、标记已读、未读总数
- 行为：徽标聚合到底部 Tab；进入会话、已读处理、时间分割

## 数据接口（Mock）

- `GET /api/chat`：会话聚合
- `POST /api/chat/:chatId/message`：发送消息
- `PUT /api/chat/:chatId/read`：标记已读
- `GET /api/chat/unread-count`：未读总数

## 本地工具

- `formatMessageTime(timestamp)`：今天/昨天/日期格式
- `shouldShowTimeDivider(cur, prev)`：超过 5 分钟显示时间分隔

## 实现亮点

- 未读聚合：底部 Tab 徽标与会话内已读联动，实时一致
- 性能优化：长列表虚拟滚动与消息分组渲染，避免回流
- 输入体验：发送键态与失败重试机制，弱网可用性更高

## UI 预览

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../images/talklist.png" alt="Talklist Placeholder" style="flex: 1 1 0; max-width: 30%; height: auto;" />
  <img src="../images/notice.png" alt="Talklist Placeholder" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>