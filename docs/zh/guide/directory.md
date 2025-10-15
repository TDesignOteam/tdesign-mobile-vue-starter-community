# 目录结构 {#directory}

```
├── .github/                # 工作流相关
├── .husky/                 # git 的一些 commit 前校验
├── .vitepress/             # 项目文档框架配置
├── .vscode/                # vscode 的一些个性化配置项
│   ├── extensions.json       # vscode 插件相关配置
│   ├── launch.json           # 调试配置
│   ├── setting.json          # 个性化配置
│   └── vue.code-snippets     # 快速代码片段
├── build/                  # 构建相关配置项
│   ├── info.ts               # 构建信息相关
│   ├── mock.ts               # mock相关
│   ├── plugins.ts            # vite 插件相关处理
│   └── utils.ts              # 构建相关工具库
├── docs/                   # 项目文档目录
├── locales/                # 国际化文件目录
├── mock/                   # mock文件目录
├── patches/                # pnpm补丁包目录
├── public/                 # 公共文件目录
│   ├── config.json           # 项目全局配置项
│   └── favicon.ico
├── src/                    # 业务代码目录
│   ├── api/                  # http请求相关目录
│   ├── assets/               # 静态资源目录
│   ├── components/           # 自定义组件、二次封装组件目录
│   ├── config/               # 处理全局配置
│   ├── directives/           # 自定义指令
│   │   └── ...
│   ├── layout/               # 布局相关
│   │   └── ...
│   ├── plugins/              # 插件相关
│   │   └── i18n.ts             # 国际化配置插件
│   ├── router/               # 路由配置
│   │   └── ...
│   ├── store/                # 状态管理相关配置
│   │   └── ...
│   ├── style/                # 公共样式目录
│   │   ├── index.scss          # 全局样式
│   │   ├── reset.scss          # 重置样式
│   │   └── tailwind.css        # TailwindCSS 相关配置
│   ├── utils/                # 工具函数相关
│   │   └── ...
│   ├── views/                # 业务页面
│   │   └── ...
│   ├── App.vue
│   ├── main.ts
├── types/                  # 全局类型相关
│   ├── auto-imports.d.ts     # unplugin-auto-import 自动生成
│   ├── components.d.ts       # unplugin-vue-components 自动生成
│   ├── global.d.ts           # 全局样式
│   ├── re-components.d.ts    # 自定义组件类型
│   ├── shims-tsx.d.ts        # ts 默认不认 tsx，在此补充
│   ├── shims-vue.d.ts        # ts 默认不认 vue、scss，在此补充
│   └── vue-router.d.ts       # unplugin-vue-router 自动生成
├── .browserslistrc         # 浏览器环境限制
├── .cnb.yml                # 工作流相关
├── .env                    # 全局环境变量
├── .env.development        # 开发环境有效
├── .env.production         # 打包环境有效
├── .gitignore              # git 忽略文件配置
├── .lintstagedrc           # git commit 前的校验配置
├── .npmrc                  # 包管理器相关配置
├── .nvmrc                  # nvm 相关配置
├── commitlint.config.js    # git commit 校验配置
├── eslint.config.js        # 语法检查配置
├── index.html              # 页面主入口
├── package.json            # 依赖包版本及启动配置
├── pnpm-lock.yaml          # 依赖包版本锁文件
├── postcss.config.js       # postcss 相关配置
├── README.md               # 自述文件
├── tsconfig.json           # ts 配置
├── vite.config.ts          # vite 配置
```
