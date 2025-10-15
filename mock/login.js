// import { defineMockModule } from '../build/mock'
import { faker } from '@faker-js/faker'

export default [
  {
    url: '/api/loginByUsername',
    method: 'POST',
    response: ({ body }) => {
      if (body?.account === '菜虚鲲' && body?.password === 'ctrl') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            id: '114514',
            username: '菜虚鲲',
            avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
            tags: [
              { label: '天秤座', icon: 'discount' },
              { label: '深圳', icon: 'location' },
            ],
            token: faker.internet.jwt(),
            expires: 86400000,
          },
        }
      }

      return {
        code: 400,
        message: '用户或密码错误',
      }
    },
  },
  {
    url: '/api/loginByPhone',
    method: 'POST',
    response: ({ body }) => {
      if (body?.code === '114514' && body?.codeId === '1919810') {
        return {
          code: 200,
          message: '登录成功',
          data: {
            id: '114514',
            username: '菜虚鲲',
            avatar: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
            tags: [
              { label: '天秤座', icon: 'discount' },
              { label: '深圳', icon: 'location' },
            ],
            token: faker.internet.jwt(),
            expires: 86400000,
          },
        }
      }

      return {
        code: 400,
        message: '验证码错误',
      }
    },
  },
  {
    url: '/api/sendVerifyCode',
    method: 'POST',
    response: ({ body }) => {
      return {
        code: 200,
        message: '发送验证码成功',
        data: {
          codeId: '1919810',
        },
      }
    },
  },
]
