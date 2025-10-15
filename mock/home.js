export default {
  url: '/api/getTagList',
  method: 'GET',
  response: () => {
    return {
      code: 200,
      message: 'success',
      data: [
        { id: '1', label: '#AI绘画' },
        { id: '2', label: '#版权素材' },
        { id: '3', label: '#原创' },
        { id: '4', label: '#风景' },
        { id: '5', label: '#鬼畜' },
      ],
    }
  },
}
