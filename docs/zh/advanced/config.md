# 全局配置 {#config}

## 环境变量 {#env}

项目内置了三类常用的 `Vite` 运行时环境变量：

- `.env`：基础环境变量，优先级最低
- `.env.development`：开发环境专用变量
- `.env.production`：生产环境专用变量

所有环境变量的类型定义可参考 `types/global.d.ts` 中的 `VITE_ENV`。

如需新增自定义环境变量，请按如下流程操作：

1. 在对应的 `.env*` 文件中添加，变量名必须以 `VITE_` 开头，否则 `Vite` 无法识别。
2. 在 `VITE_ENV` 类型定义中补充新变量类型。
3. 若需设置默认值，可在 `build/utils.ts` 的 `processEnv` 方法中添加。

## 项目配置 {#conf}

细心的童鞋可能会注意到 `public` 目录下存在一个 `config.json` 文件，该文件用于存放部分跨版本的全局配置项。

可通过 `src/utils/global.ts` 提供的 `useGlobal` 方法获取这些配置。

更多细节请参考 `types/global.d.ts` 中的 `GlobalConfig` 和 `GlobalProperties` 类型定义，这里不再作多赘述。

**注意：`config.json` 不适合频繁变更，因其对缓存不友好。请确保配置项为长期稳定内容后再进行修改。**

## 贡献者 {#contributors}

[hikari](https://github.com/liuyax0818)
