# Markdown 扩展示例

本页面演示了 VitePress 提供的一些内置 Markdown 扩展功能。

## 语法高亮 {#syntax-highlighting}

VitePress 提供了由 [Shiki](https://github.com/shikijs/shiki) 驱动的语法高亮，并支持行高亮等功能：

**输入示例**

````md
```js{4}
export default {
  data () {
    return {
      msg: '高亮显示！'
    }
  }
}
```
````

**输出示例**

```js{4}
export default {
  data () {
    return {
      msg: '高亮显示！'
    }
  }
}
```

## 自定义容器 {#custom-containers}

**输入示例**

```md
::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险警告。
:::

::: details
这是一个详情块。
:::
```

**输出示例**

::: info
这是一个信息框。
:::

::: tip
这是一个提示。
:::

::: warning
这是一个警告。
:::

::: danger
这是一个危险警告。
:::

::: details
这是一个详情块。
:::

## 更多 {#more}

查看[文档](https://vitepress.dev/guide/markdown)以获取 Markdown 扩展的完整列表。
