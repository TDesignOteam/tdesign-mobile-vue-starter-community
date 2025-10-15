import type { Plugin } from 'vite'

interface ConsoleOptions {
  exclude?: string[]
}

export function removeConsole(options: ConsoleOptions = {}): Plugin {
  const { exclude = [] } = options
  return {
    name: 'removeConsole',
    enforce: 'post',
    apply: 'build',
    // https://rollupjs.org/plugin-development/#transform
    transform(code, id) {
      if (id.includes(`node_modules`)) {
        return { code, map: null }
      }

      if (exclude.some(pattern => new RegExp(pattern).test(id))) {
        return { code, map: null }
      }

      if (/\.(?:js|ts|jsx|tsx|vue)$/.test(id) && /console\.log\(.*?\);?/.test(code)) {
        // 按正常流程来讲，应该通过干涉 AST 来删除 console.log，但是为了临时解决需求，先这样应付一下
        // 仅删除 console.log (保留 warn 和 error)
        const strippedCode = code.replace(/console\.log\(.*?\);?/g, ';')
        return {
          code: strippedCode,
          map: null,
        }
      }

      return {
        code,
        map: null,
      }
    },
  }
}
