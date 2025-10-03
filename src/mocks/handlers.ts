import type { Chat, LoginResponse, SendMessageResponse, UserInfo } from '@/api/types'
import { delay, http, HttpResponse } from 'msw'
// 示例内存数据
import { talklist } from './data/chat'
import { completion, interaction, overview, regionColumns, videoStatistics } from './data/datacenter'
import { homeItems } from './data/home'

import { menuItems, serviceGroups, userStats } from './data/profile'
import { publishTags } from './data/publish'
import { searchDiscoveries, searchHistoryTags } from './data/search'
import { users } from './data/users'

function ok<T>(data: T, message = 'Success') {
  return HttpResponse.json({ code: 200, message, data, success: true }, { status: 200 })
}

function error(message = 'Error', status = 400) {
  return HttpResponse.json({ code: status, message, success: false }, { status })
}

const chats: Chat[] = talklist as unknown as Chat[]

// 模拟登录态用户数据
let currentUser: UserInfo | null = null

// 验证码存储与校验（对齐 mock-server 行为）
const verifyCodes = new Map<string, { code: string, expiresAt: number }>()
function generateVerifyCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
function storeVerifyCode(phone: string, code: string) {
  const expiresAt = Date.now() + 5 * 60 * 1000 // 5 分钟
  verifyCodes.set(phone, { code, expiresAt })
}
function validateVerifyCode(phone: string, code: string): boolean {
  const entry = verifyCodes.get(phone)
  if (!entry)
    return false
  const valid = entry.code === code && Date.now() < entry.expiresAt
  if (valid)
    verifyCodes.delete(phone)
  return valid
}

export const handlers = [
  // Auth
  http.post('*/api/auth/send-code', async ({ request }) => {
    await delay(400)
    const body = await request.json().catch(() => ({} as any)) as { phone?: string }
    if (!body?.phone)
      return error('手机号不能为空', 400)
    const code = generateVerifyCode()
    storeVerifyCode(body.phone, code)
    console.warn(`验证码已发送到 ${body.phone}: ${code}`)
    return ok({ countdown: 60 }, '验证码发送成功')
  }),
  http.post('*/api/auth/verify-login', async ({ request }) => {
    await delay(400)
    const body = await request.json().catch(() => ({} as any)) as { phone?: string, code?: string }
    if (!body?.phone || !body?.code) {
      return error('手机号和验证码不能为空', 400)
    }
    if (!validateVerifyCode(body.phone, body.code)) {
      return error('验证码错误或已过期', 400)
    }
    const phone = body.phone as string
    let base = users.find(u => u.phone === phone || u.phone.endsWith(phone))
    if (!base) {
      const purePhone = phone.replace(/^\+\d{1,4}/, '')
      base = {
        id: Date.now().toString(),
        name: `企鹅${purePhone.slice(-4)}`,
        phone,
        email: '',
        password: '',
        avatar: '',
        gender: '',
        birthday: '',
        address: '',
        bio: '',
        photos: [],
        constellation: '',
        location: '',
      } as any
      ;(users as any[]).push(base)
    }
    const user: UserInfo = {
      id: base!.id,
      name: base!.name,
      phone: base!.phone,
      avatar: base!.avatar,
      gender: base!.gender,
      birthday: base!.birthday,
      address: base!.address,
      bio: base!.bio,
      photos: base!.photos,
      constellation: base!.constellation,
      location: base!.location,
    }
    currentUser = user
    const data: LoginResponse = { token: 'mock-token', user }
    return ok(data, '登录成功')
  }),
  http.post('*/api/auth/password-login', async ({ request }) => {
    await delay(400)
    const body = await request.json().catch(() => ({} as any)) as { account?: string, password?: string }
    if (!body?.account || !body?.password) {
      return error('账号和密码不能为空', 400)
    }
    const account = body.account as string
    const base = users.find(u => u.phone === account || u.email === account)
    if (!base) {
      return error('账号不存在', 400)
    }
    if (base.password !== body.password) {
      return error('密码错误', 400)
    }
    const user: UserInfo = {
      id: base.id,
      name: base.name,
      phone: base.phone,
      avatar: base.avatar,
      gender: base.gender,
      birthday: base.birthday,
      address: base.address,
      bio: base.bio,
      photos: base.photos,
      constellation: base.constellation,
      location: base.location,
    }
    currentUser = user
    const data: LoginResponse = { token: 'mock-token', user }
    return ok(data, '登录成功')
  }),
  http.post('*/api/auth/logout', async () => ok(true, '退出成功')),
  http.post('*/api/auth/refresh-token', async () => ok({ token: 'mock-token' }, 'Success')),
  http.put('*/api/auth/update-user-info', async ({ request }) => {
    const update = await request.json().catch(() => ({})) as Partial<UserInfo>
    const auth = request.headers.get('authorization') || ''
    if (!auth || !auth.toLowerCase().startsWith('bearer ')) {
      return error('未提供认证信息', 401)
    }
    if (!currentUser) {
      // 若内存丢失，兜底为已知第一个用户，保持可用体验
      const base = users[0]
      currentUser = {
        id: base.id,
        name: base.name,
        phone: base.phone,
        avatar: base.avatar,
        gender: base.gender,
        birthday: base.birthday,
        address: base.address,
        bio: base.bio,
        photos: base.photos,
        constellation: base.constellation,
        location: base.location,
      }
    }
    currentUser = { ...currentUser, ...update }
    return ok(currentUser, '用户信息更新成功')
  }),

  // Home
  http.get('*/api/home/content', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || '1')
    const limit = Number(url.searchParams.get('limit') || '10')
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const items = homeItems.slice(startIndex, endIndex)
    return ok({
      items,
      pagination: {
        page,
        limit,
        total: homeItems.length,
        totalPages: Math.ceil(homeItems.length / limit),
        hasMore: endIndex < homeItems.length,
      },
    }, '获取首页内容成功')
  }),
  http.get('*/api/home/content/:id', async ({ params }) => {
    const id = Number(params.id)
    const item = homeItems.find(i => i.id === id)
    return ok(item || homeItems[0])
  }),
  http.post('*/api/home/refresh', async () => {
    const refreshed = [...homeItems].sort(() => Math.random() - 0.5)
    return ok({ items: refreshed.slice(0, 10), refreshTime: new Date().toISOString() }, '刷新成功')
  }),

  // Profile
  http.get('*/api/profile/services', async () => ok({ serviceGroups, menuItems }, '获取个人服务数据成功')),
  http.get('*/api/profile/stats', async () => ok({ stats: userStats }, '获取用户统计数据成功')),
  http.post('*/api/profile/stats', async () => ok({ stat: { label: '点赞', icon: '', count: 1, key: 'like' } }, 'Success')),
  http.post('*/api/profile/service-click', async () => ok({ serviceName: 'demo', serviceType: 'internal', timestamp: new Date().toISOString() }, '服务点击记录成功')),

  // Datacenter
  http.get('*/api/datacenter/stats', async () => ok({
    regionData: videoStatistics,
    regionColumns,
    overview,
    interaction,
    completion,
  }, '获取数据中心统计数据成功')),

  // Search
  http.get('*/api/search/history-tags', async () => ok({ tags: searchHistoryTags }, '获取搜索历史标签成功')),
  http.get('*/api/search/discoveries', async () => ok({ items: searchDiscoveries }, '获取搜索发现成功')),
  http.get('*/api/search', async ({ request }) => {
    await delay(300)
    const url = new URL(request.url)
    const q = (url.searchParams.get('q') || '').trim().toLowerCase()
    if (!q)
      return ok({ items: [] }, '搜索成功')
    // 模拟搜索：用 discoveries 做简单包含匹配
    const items = searchDiscoveries.filter(text => text.toLowerCase().includes(q)).slice(0, 10)
    return ok({ items }, '搜索成功')
  }),

  // Publish
  http.get('*/api/publish/tags', async () => ok({ tags: publishTags }, '获取发布页标签成功')),
  http.get('*/api/datacenter/video/:id', async ({ params }) => {
    const id = Number(params.id)
    const video = videoStatistics.find(v => v.index === id) || videoStatistics[0]
    return ok(video)
  }),

  // Chat
  http.get('*/api/chat', async () => ok(chats, '获取聊天列表成功')),
  http.post('*/api/chat/:chatId/message', async ({ params, request }) => {
    const body = await request.json() as { message: string }
    const chat = chats.find(c => c.id === params.chatId)
    if (!chat)
      return error('聊天记录不存在', 404)
    if (!body?.message || !body.message.trim()) {
      return error('消息内容不能为空', 400)
    }
    const msg: SendMessageResponse = { id: String(Date.now()), tag: 'me', value: body.message.trim(), time: Date.now() }
    chat.message.push(msg as any)
    return ok(msg, '消息发送成功')
  }),
  http.put('*/api/chat/:chatId/read', async ({ params }) => {
    const chat = chats.find(c => c.id === params.chatId)
    if (!chat)
      return error('聊天记录不存在', 404)
    chat.count = 0
    const res = { id: chat.id, count: 0 }
    return ok(res as any, '标记为已读成功')
  }),
  http.get('*/api/chat/unread-count', async () => ok({ count: chats.reduce((n, c) => n + (c.count || 0), 0) }, '获取未读消息总数成功')),
]
