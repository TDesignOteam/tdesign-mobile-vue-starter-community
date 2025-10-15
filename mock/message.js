import { fakerZH_CN as faker } from '@faker-js/faker'

export default [
  {
    url: '/api/getMessageList',
    method: 'GET',
    response: () => {
      const data = []

      for (let i = 0; i < 40; i++) {
        data.push({
          id: `${i + 1}`,
          avatar: `https://tdesign.gtimg.com/mobile/demos/avatar${i % 5 + 1}.png`,
          title: faker.person.fullName(),
          content: faker.lorem.sentence({ min: 3, max: 15 }),
          count: faker.number.int({ min: 0, max: 20 }),
        })
      }

      return {
        code: 200,
        message: 'success',
        data,
      }
    },
  },
  {
    url: '/api/readMessage',
    method: 'POST',
    response: ({ body }) => {
      return {
        code: 200,
        message: 'success',
        data: body?.id,
      }
    },
  },
  {
    url: '/api/getUnReadCount',
    method: 'GET',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: faker.number.int({ min: 0, max: 20 }),
      }
    },
  },
]
