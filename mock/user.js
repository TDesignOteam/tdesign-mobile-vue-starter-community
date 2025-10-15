import { fakerZH_CN as faker } from '@faker-js/faker'
import dayjs from 'dayjs'

export default [
  {
    url: '/api/getUserList',
    method: 'GET',
    response: ({ query }) => {
      return {
        code: 200,
        message: '成功',
        total: 0,
        data: [],
      }
    },
  },
  {
    url: '/api/getUserInfo',
    method: 'GET',
    response: ({ headers }) => {
      const token = headers?.authorization
      if (!token) {
        return {
          code: 401,
          message: '未登录',
          data: null,
        }
      }

      return {
        code: 200,
        message: '成功',
        data: {
          username: '菜虚鲲',
          age: 25,
          address: faker.location.city(),
          avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
        },
      }
    },
  },
  {
    url: '/api/getProfileInfo',
    method: 'GET',
    response: ({ query }) => {
      return {
        code: 200,
        message: 'success',
        data: {
          id: query.get('id'),
          username: faker.person.fullName(),
          gender: faker.helpers.arrayElement(['man', 'women', 'secret']),
          birthday: dayjs(faker.date.birthdate()).format('YYYY-MM-DD'),
          address: '广东省 深圳市',
          bio: faker.person.bio(),
          photos: [
            {
              url: 'https://tdesign.gtimg.com/mobile/demos/upload4.png',
              name: 'photo1.png',
              status: 'success',
              type: 'image',
            },
            {
              url: 'https://tdesign.gtimg.com/mobile/demos/upload6.png',
              name: 'photo2.png',
              status: 'success',
              type: 'image',
            },
          ],
        },
      }
    },
  },
  {
    url: '/api/updateProfileInfo',
    method: 'POST',
    response: ({ body }) => {
      return {
        code: 200,
        message: '个人信息更新成功',
        data: body,
      }
    },
  },
]
