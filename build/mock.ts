import type { Connect, HmrContext, Plugin, ViteDevServer } from 'vite'

import fs from 'node:fs'
import path from 'node:path'

// import { logger } from './utils'

export async function fakerServer(mockDir: string = 'mock'): Promise<Plugin> {
  let mods = await loadMockModules(mockDir)

  return {
    name: 'fakerServer',
    // https://vite.dev/guide/api-plugin.html#configureserver
    configureServer(server: ViteDevServer) {
      // https://github.com/senchalabs/connect#use-middleware
      server.middlewares.use(async (req, res, next) => {
        const method = req.method?.toUpperCase()
        const reqURL = req?.url ?? ''

        // url、method 皆匹配，method 默认 GET
        const matched = mods.find(v => reqURL.startsWith(v.url) && ((v?.method ?? 'GET') === method))

        if (matched) {
          // 匹配到了，拦截！
          const query = new URLSearchParams(reqURL.split('?')?.[1])
          const body = await parseBody(req)

          const result = await matched.response({
            query,
            body,
          })

          // logger.info(result)

          // 根据code字段自动设置HTTP状态码
          res.statusCode = result?.code ?? 200
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        }
        else {
          next()
        }
      })
    },

    // https://vite.dev/guide/api-plugin.html#handlehotupdate
    async handleHotUpdate(ctx: HmrContext) {
      const mockFullPath = path.resolve(mockDir) // mock 完整路径
      const hmrFullPath = path.resolve(ctx.file) // 当前 hmr 文件完整路径
      if (hmrFullPath.startsWith(mockFullPath)) {
        // 如果当前 hmr 的文件在 mock 文件夹下，则更新 mock 数据
        mods = await loadMockModules(mockDir)
      }
    },
  }
}

/** 解析请求体 */
function parseBody(req: Connect.IncomingMessage) {
  return new Promise((resolve) => {
    let raw = '' // 原始数据

    // 处理流式数据，将每一段拼接（如文件流式上传，虽然mock用不到，但还是要处理一下）
    req.on('data', chunk => (raw += chunk))

    // 将完整数据返回
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw))
      }
      catch {
        resolve(raw)
      }
    })
  })
}

/** 加载 Mock 模块 */
async function loadMockModules(dir: string): Promise<MockModule[]> {
  if (!fs.existsSync(dir)) {
    // 目录不存在则创建
    fs.mkdirSync(dir, { recursive: true })
    // 既然连 Mock 目录都没有，下面也没必要再执行了
    return []
  }

  // 读取 mock 目录下的文件
  const files = fs.readdirSync(dir)
  const mods: MockModule[] = []

  for (const file of files) {
    // logger.info(path.resolve(dir, file))
    // TODO: 动态加载 esm 模块，此处需寻找更优解决方案，解决 ts 问题
    // 加 t 是为了强制更新，排查了一下午才发现是缓存的锅 😡
    const meta = await import(`file://${path.resolve(dir, file)}?t=${Date.now()}`)
    const mod: MockModule | MockModule[] = meta.default

    if (!mod) {
      continue
    }

    // logger.info(mod)
    if (Array.isArray(mod)) {
      mods.push(...mod)
    }
    else {
      mods.push(mod)
    }
  }

  return mods
}

/** 定义 `Mock` 模块 */
export function defineMockModule(param: MockModule | MockModule[]) {
  return param
}
