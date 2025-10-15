# Directives {#directives}

## Implementation Principle {#principle}

The logic for custom directives is in the `src/directives` folder, integrated through a single entry file `index.ts`.

In `main.ts`, all custom directives are imported from `index.ts` and registered globally.

## Usage {#usage}

Create a new `ts` file under `src/directives`, ensure it uses `ESM` style, then write your directive logic. When exporting, do not use `export default`; instead, export each directive as `export const xxx`.

After writing your custom directive, add your module to `index.ts`.

This approach keeps modules clear, avoids unnecessary non-business code, and is friendly to `Tree Shaking`.

## Types {#types}

Refer to the official Vue directive type definitions: [Documentation >>](https://vuejs.org/guide/reusability/custom-directives.html)

## Example Code {#example}

**custom.ts**

```ts
import type { Directive, DirectiveBinding } from 'vue'

export const custom: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    // Write directive logic here...
  },
}
```

**index.ts**
```ts
export * from './custom'
```

## Contributors {#contributors}

[Reuse5653](https://github.com/Reuse5653), [hikari](https://github.com/liuyax0818)
