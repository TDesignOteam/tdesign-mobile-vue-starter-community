---
title: Message
---

# Message

A thin wrapper around TDesign `Message` is provided in `src/plugins/message.ts`, exposing a stable API and friendly defaults.

## Usage

```ts
import { message } from '@/plugins/message'

message.success('Operation succeeded')
message.error('Request failed, please try again later')
message.warning('Please complete the form')
message.info('Processing...')

// close all
message.closeAll()
```

## Options

```ts
message.success('OK', {
  duration: 2000,
  icon: true,
  offset: [16, 24],
})
```

- `duration`: display duration in ms, default 2000
- `icon`: whether to show icon or use a custom one
- `offset`: viewport offset `[x, y]`
- `context`: mount container, defaults to `document.body`
- `zIndex`: z-index

## With the HTTP client

In `src/api/request.ts`, `message.error` is triggered automatically when a request fails to keep error hints consistent.

## Defaults & Container Mounting

- Default duration: `2000ms`
- Default offset: `offset: [108, 16]` (fits immersive header/safe-area)
- Default mount container: `document.body`. You can mount to a specific area via `context`.

```ts
message.success('Done', {
  context: document.querySelector('.content') as Element,
  offset: [16, 80],
})
```

## One-time "Publish Success" Toast

Show a one-time toast on returning to Home after publishing to avoid repeated prompts:

```ts
// src/views/home/index.vue (excerpt)
const { checkAndNotifyOnce } = usePublishSuccessMessage({ contextSelector: '.content' })
onMounted(() => {
  void checkAndNotifyOnce()
})
```
