export default {
  url: '/api/getPublishResult',
  method: 'POST',
  response: () => {
    // 模拟发布成功响应
    return {
      code: 200,
      message: '发布成功',
      data: {
        success: true,
      },
    }
  },
}
