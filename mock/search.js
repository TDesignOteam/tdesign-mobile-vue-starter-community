export default {
  url: '/api/getSearchDiscovery',
  method: 'GET',
  response: () => {
    return {
      code: 200,
      message: 'success',
      data: [
        '科比大战布莱恩特',
        '喜欢马嘉祺的7种特征，看看你中了几个',
        '滑雪大冒险的兵来了！哈基米音乐登场',
        '小时候看这集吃成大伟带了',
        '爆了！嘉然锐评虚环PV中自己的画：画得很可爱！',
        '把我放在唐代肯定比过苏轼',
        '天津美食吃法之剩包子篇',
      ],
    }
  },
}
