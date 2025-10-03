# 状态管理架构

基于 Pinia 构建的现代状态管理方案，集成持久化、重置机制与类型安全，为移动端应用提供高效的数据流管理。

## 核心架构设计

项目采用分层的状态管理架构，通过工厂模式和插件系统实现高度可扩展和可维护的状态管理解决方案。这种设计确保了状态的一致性、持久化的灵活性以及全局控制的便利性。

### Store 工厂与插件系统

通过 Pinia 的插件机制，实现了自动化的 Store 实例管理和统一的功能增强。工厂模式的使用使得 Store 的创建和配置变得标准化和可预测。

```ts
// src/store/index.ts - 核心实例管理
const store = createPinia();

// 1. 持久化插件
store.use(piniaPluginPersistedstate);

// 2. 自动注册插件（收集 store 实例）
const registeredStores = new Set<any>();
store.use((ctx) => {
  registeredStores.add(ctx.store);
});

export function setupStore(app: App) {
  app.use(store);
}
```

### 全局重置机制

提供统一的状态重置能力，特别适用于用户登出、测试环境清理等场景。通过自动收集机制，无需手动维护 Store 列表，确保重置操作的完整性和可靠性。

```ts
// 一键重置所有状态（登出、测试等场景）
export function resetAllStores() {
  registeredStores.forEach((storeInstance) => {
    if (typeof storeInstance.$reset === "function") {
      storeInstance.$reset();
    }
  });
}
```

### 智能持久化配置

基于全局配置的动态持久化策略，支持多种存储方式和环境适配。通过命名空间机制避免不同应用间的数据冲突，提供了灵活且安全的数据持久化解决方案。

```ts
// 统一持久化策略
export function getPersistConfig(key: string) {
  const storagePrefix = getGlobalConfig("storageNS") || "tdesign-mobile-";
  return {
    key: `${storagePrefix}${key}`,
    storage:
      getGlobalConfig("storage") === "sessionStorage"
        ? sessionStorage
        : localStorage,
  };
}
```

**设计优势**：

- 🔧 **配置化**：根据全局配置自动选择存储类型
- 🏷️ **命名空间**：避免多应用间的存储冲突
- 🔄 **自动收集**：无需手动注册，支持动态重置

## 实战案例：用户状态管理

用户状态管理是应用中最核心的状态模块，涉及认证、权限、个人信息等多个维度。通过完整的生命周期管理和副作用处理，为应用提供稳定可靠的用户状态服务。

### 用户认证 Store

展示了完整的用户状态管理实现，包括认证状态、用户信息、计算属性和核心操作方法。特别注重副作用的正确处理和状态的一致性维护。

```ts
// src/store/user.ts - 完整用户状态管理
export const useUserStore = defineStore(
  "user",
  () => {
    // 响应式状态
    const token = ref<string>("");
    const userInfo = ref<UserInfo | null>(null);

    // 计算属性
    const isLoggedIn = computed(() => !!token.value);
    const userName = computed(() => userInfo.value?.name || "");
    const userAvatar = computed(() => userInfo.value?.avatar || "");

    // 核心 Actions
    const setToken = (newToken: string) => {
      token.value = newToken;
      if (newToken) {
        httpClient.setAuthToken(newToken); // 副作用：注入请求头
      }
    };

    const handleLoginSuccess = (newToken: string, user: UserInfo) => {
      setToken(newToken);
      userInfo.value = user;
      return { success: true };
    };

    const resetUserState = () => {
      token.value = "";
      userInfo.value = null;
      httpClient.clearAuthToken(); // 副作用：清除请求头
    };

    // 初始化逻辑
    const initUserData = async () => {
      if (token.value) {
        httpClient.setAuthToken(token.value);
        const success = await fetchUserInfo();
        if (!success) resetUserState();
      }
    };

    return {
      // 状态
      token,
      userInfo,
      // 计算属性
      isLoggedIn,
      userName,
      userAvatar,
      // 方法
      setToken,
      handleLoginSuccess,
      resetUserState,
      initUserData,
    };
  },
  {
    // 持久化配置：仅持久化关键数据
    persist: {
      ...getPersistConfig(STORAGE_KEYS.USER_INFO),
      pick: ["token", "userInfo"], // 选择性持久化
    },
  }
);
```

### 其他业务 Store 示例

展示了业务特定的状态管理模式，如消息列表的管理。每个业务 Store 都遵循相同的设计原则，但根据具体业务需求进行了定制化的状态结构和操作方法设计。

```ts
// src/store/talklist.ts - 消息列表状态
export const useTalklistStore = defineStore(
  "talklist",
  () => {
    const chatList = ref<Chat[]>([]);
    const activeChat = ref<string>("");

    const addMessage = (chatId: string, message: ChatMessage) => {
      const chat = chatList.value.find((c) => c.id === chatId);
      if (chat) {
        chat.message.push(message);
        chat.count += 1;
      }
    };

    return { chatList, activeChat, addMessage };
  },
  {
    persist: getPersistConfig("talklist"),
  }
);
```

## 最佳实践

基于项目实际开发经验总结的状态管理最佳实践，涵盖设计原则、性能优化和维护策略。遵循这些实践可以确保状态管理系统的健壮性、可维护性和高性能。

### Store 设计原则

良好的 Store 设计是状态管理成功的基础。这些原则帮助开发者构建清晰、可维护且类型安全的状态管理架构。

- **原子化**：每个 Store 负责单一业务域
- **类型安全**：充分利用 TypeScript 类型推导
- **副作用隔离**：仅在 Actions 中处理副作用
- **选择性持久化**：使用 `pick` 避免过度存储

### 状态生命周期

理解状态的完整生命周期有助于更好地设计和维护状态管理系统。从初始化到销毁的每个阶段都有其特定的关注点和最佳实践。

```
初始化 → 数据加载 → 用户交互 → 状态更新 → 持久化
   ↓                                        ↑
  重置 ← ← ← ← ← ← ← 登出/错误 ← ← ← ← ← ← ← ←
```

### 性能优化策略

在移动端应用中，状态管理的性能直接影响用户体验。通过合理的优化策略，可以在保证功能完整性的同时提升应用的响应速度和流畅度。

- **计算属性缓存**：复杂计算使用 `computed`
- **浅层响应**：大对象使用 `shallowRef`
- **按需持久化**：仅存储关键状态
- **批量更新**：避免频繁的状态变更

## 使用指南

为开发者提供具体的使用示例和操作指导，涵盖组件集成、状态管理和全局操作等常见场景。这些指南帮助快速上手并正确使用状态管理系统。

### 在组件中使用

展示了在 Vue 组件中正确使用 Pinia Store 的方法，包括响应式数据的解构和计算属性的使用。注意使用 `storeToRefs` 保持响应性。

```vue
<template>
  <div v-if="isLoggedIn">欢迎，{{ userName }}</div>
</template>

<script setup>
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const { isLoggedIn, userName } = storeToRefs(userStore);
</script>
```

### 全局状态重置

在用户登出、切换账户或测试场景中，需要彻底清理应用状态。全局重置机制确保了状态的完全清理，避免数据泄露和状态污染。

```ts
// 登出时重置所有状态
async function logout() {
  await userStore.resetUserState();
  resetAllStores(); // 清理所有 Store
  router.push("/login");
}
```
