# 运行时 API 示例

本页面演示了 VitePress 提供的一些运行时 API 的用法。

主要的 `useData()` API 可用于访问当前页面的站点、主题和页面数据。它可在 `.md` 和 `.vue` 文件中使用：

```md
<script setup>
import { useData } from 'vitepress'

const { theme, page, frontmatter } = useData()
</script>

## 结果

### 主题数据

<pre>{{ theme }}</pre>

### 页面数据

<pre>{{ page }}</pre>

### 页面 Frontmatter

<pre>{{ frontmatter }}</pre>
```

<script setup>
import { useData } from 'vitepress'

const { site, theme, page, frontmatter } = useData()
</script>

## 结果 {#results}

### 主题数据 {#theme-data}

<pre>{{ theme }}</pre>

### 页面数据 {#page-data}

<pre>{{ page }}</pre>

### 页面 Frontmatter {#page-frontmatter}

<pre>{{ frontmatter }}</pre>

## 更多 {#more}

查看[完整的运行时 API 列表](https://vitepress.dev/reference/runtime-api#usedata)文档。
