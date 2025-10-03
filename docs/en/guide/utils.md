---
title: Utility Functions
---

# Utility Functions

## useGlobal

Get global properties (injected during config initialization) inside components.

```ts
import { useGlobal } from '@/utils/global'

const { $config, $storage } = useGlobal()
```

- `$config`: runtime merged global config
- `$storage`: reactive storage config (e.g., locale)

## useStorage

Unified local/session storage read/write.

```ts
import { useStorage } from '@/utils/global'

const { getItem, setItem, removeItem, clearAll } = useStorage('local')
setItem('demo', { a: 1 })
const val = getItem('demo')
```

## validators

Phone and verification-code validation, and phone input cleanup.

```ts
import { validatePhone, validateCode, cleanPhoneNumber } from '@/utils/validators'

validatePhone('13800138000') // true/false
validateCode('123456')       // true/false
cleanPhoneNumber('+86 138 0013 8000') // 8613800138000
```
