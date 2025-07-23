// eslint.config.mjs
import antfu from '@antfu/eslint-config';

export default antfu({
  stylistic: {
    semi: true, // 强制分号
    indent: 2,
  },
  vue: {
    overrides: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
  },
});
