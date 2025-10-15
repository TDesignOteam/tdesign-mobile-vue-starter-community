import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    vue: true,
    rules: {
      // 全局允许 console.log()，为方便调试，警告即可
      'no-console': 'warn',
      'unused-imports/no-unused-vars': 'off', // 与下面覆盖配置项冲突
      'unused-imports/no-unused-imports': 'off',
    },

  },
  // 以下为覆盖配置项
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
      'eslint-comments/no-unlimited-disable': 'off',
      'import/no-duplicates': 'off',
      'unused-imports/no-unused-vars': 'off',
    },
  },
  {
    files: ['**/*.?([cm])ts', '**/*.?([cm])tsx'],
    rules: {
      '@typescript-eslint/no-empty-function': 'off', // 允许空函数
      // 有些时候，需要预留一些变量，设置 error 会导致 eslint 报错，设置 warn 即可
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          // 对于一些下划线开头的·常·量·将其忽略
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // 同上
      // 'no-undef': 'warn', // 这里不知道为啥，在使用 vue-router 相关方法的时候提示未定义，types里面明明有です
      'no-unused-vars': 'warn',
      'vue/no-v-html': 'off', // 允许 v-html，一些特殊业务会出现（富文本预览），也要注意避免 XSS 风险
      'vue/require-default-prop': 'off', // 关闭组件强制 prop 默认值
      // https://eslint.vuejs.org/rules/html-self-closing.html#vue-html-self-closing
      'vue/html-self-closing': ['error', {
        html: {
          void: 'never',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
    },
  },
  {
    files: ['**/*.md'],
    rules: {
      'format/prettier': 'off',
    },
  },
)
