import fs from 'node:fs'
import path, { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

/** 启动 node 进程所在的目录 */
const root: string = process.cwd()

/** 统一日志入口 */
const logger = {
  log: (...args: unknown[]) => {
    // eslint-disable-next-line no-console
    console.log(...args)
  },
  info: (...args: unknown[]) => {
    // eslint-disable-next-line no-console
    console.log('✨ [INFO]', ...args)
  },
  warn: (...args: unknown[]) => {
    console.warn('⚠ [WARN]', ...args)
  },
  error: (...args: unknown[]) => {
    console.error('❌ [ERROR]', ...args)
  },
}

/**
 * 处理路径
 */
function processPath(dir = '.', base = import.meta.url) {
  const currDir = dirname(fileURLToPath(base)) // X:\\**\build
  const buildDir = resolve(currDir, 'build')
  const resolvedPath = resolve(currDir, dir)
  if (resolvedPath.startsWith(buildDir)) {
    // 若在 build 目录，则返回当前文件路径
    logger.info(base, fileURLToPath(base))
    return fileURLToPath(base)
  }

  return resolve(currDir, dir)
}

/** 设置别名 */
const alias: Record<string, string> = {
  '@': processPath('../src'),
  '@build': processPath(),
}

/**
 * 处理环境变量
 */
function processEnv(envConf: Record<string, any>): VITE_ENV {
  // 默认值（处理 .env* 不存在的值）
  const envs: VITE_ENV = {
    VITE_PORT: 4399,
    VITE_BASE_PATH: '',
    VITE_ROUTER_MODE: '',
    VITE_API_BASE_URL: '',
  }

  // logger.info(envConf)

  for (const eK of Object.keys(envConf)) {
    const eV = envConf[eK].replace(/\\n/g, '\n')
    let envValue = eV

    // 处理 Boolean 值
    if (eV === 'true') {
      envValue = true
    }

    if (eV === 'false') {
      envValue = false
    }

    // 端口号为数字
    if (eK === 'VITE_PORT') {
      envValue = Number(eV)
    }

    envs[eK] = envValue

    // 将环境变量挂载到 process.env 上
    // logger.info(eK, envValue)
    if (typeof eV === 'string') {
      process.env[eK] = envValue
    }
  }

  // logger.info(process.env)
  // logger.info(envs)
  return envs
}

/**
 * 读取目录大小，返回字节数
 * @param dir 目录路径
 * @param ignore 忽略文件或文件夹的正则表达式
 * @returns 返回该目录的总大小（单位：字节）
 */
function getDirSize(dir: string, ignore?: RegExp): number {
  let totalSize = 0

  /**
   * 递归计算当前目录大小
   */
  const calculateSize = (currentDir: string) => {
    // 当前目录下所有文件与文件夹
    const files = fs.readdirSync(currentDir, { withFileTypes: true })

    for (const file of files) {
      const filePath = path.join(currentDir, file.name)

      // 如果匹配 ignore，则跳过
      if (ignore && ignore.test(filePath)) {
        continue
      }

      if (file.isDirectory()) {
        // 文件夹
        calculateSize(filePath)
      }
      else if (file.isFile()) {
        // 文件
        const stat = fs.statSync(filePath)
        totalSize += stat.size
      }
    }
  }

  if (fs.existsSync(dir)) {
    calculateSize(dir)
  }

  return totalSize
}

/**
 * 格式化存储单位，将字节大小转换为合适的单位字符串
 * @param size 字节大小
 * @param acc 精度，默认 2 位小数
 * @returns 格式化后的字符串
 */
function formatSize(size: number, acc: number = 2): string {
  if (size <= 0) {
    return '0 B'
  }
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  let index = 0
  while (size >= 1024 && index < units.length - 1) {
    size /= 1024
    index++
  }
  return `${size.toFixed(acc)} ${units[index]}`
}

export {
  alias,
  formatSize,
  getDirSize,
  logger,
  processEnv,
  processPath,
  root,
}
