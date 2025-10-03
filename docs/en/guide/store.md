# State Management Architecture

Modern state management solution based on Pinia, integrating persistence, reset mechanisms, and type safety, providing efficient data flow management for mobile applications.

## Core Architecture Design

The project adopts a layered state management architecture, implementing highly scalable and maintainable state management solutions through factory patterns and plugin systems. This design ensures state consistency, persistence flexibility, and global control convenience.

### Store Factory & Plugin System

Through Pinia's plugin mechanism, automated Store instance management and unified functional enhancement are achieved. The use of factory patterns makes Store creation and configuration standardized and predictable.

```ts
// src/store/index.ts - Core instance management
const store = createPinia();

// 1. Persistence plugin
store.use(piniaPluginPersistedstate);

// 2. Auto-registration plugin (collect store instances)
const registeredStores = new Set<any>();
store.use((ctx) => {
  registeredStores.add(ctx.store);
});

export function setupStore(app: App) {
  app.use(store);
}
```

### Global Reset Mechanism

Provides unified state reset capability, particularly suitable for user logout, test environment cleanup, and other scenarios. Through automatic collection mechanisms, there's no need to manually maintain Store lists, ensuring completeness and reliability of reset operations.

```ts
// One-click reset all states (logout, testing scenarios)
export function resetAllStores() {
  registeredStores.forEach((storeInstance) => {
    if (typeof storeInstance.$reset === "function") {
      storeInstance.$reset();
    }
  });
}
```

### Smart Persistence Configuration

Dynamic persistence strategy based on global configuration, supporting multiple storage methods and environment adaptation. Through namespace mechanisms, data conflicts between different applications are avoided, providing flexible and secure data persistence solutions.

```ts
// Unified persistence strategy
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

**Design Advantages**:

- 🔧 **Configurable**: Auto-select storage type based on global configuration
- 🏷️ **Namespaced**: Avoid storage conflicts between multiple applications
- 🔄 **Auto-collection**: No manual registration needed, supports dynamic reset

## Real-world Case: User State Management

User state management is the most core state module in applications, involving authentication, permissions, personal information, and other dimensions. Through complete lifecycle management and side effect handling, it provides stable and reliable user state services for applications.

### User Authentication Store

Demonstrates complete user state management implementation, including authentication state, user information, computed properties, and core operation methods. Special attention is paid to proper handling of side effects and maintaining state consistency.

```ts
// src/store/user.ts - Complete user state management
export const useUserStore = defineStore(
  "user",
  () => {
    // Reactive state
    const token = ref<string>("");
    const userInfo = ref<UserInfo | null>(null);

    // Computed properties
    const isLoggedIn = computed(() => !!token.value);
    const userName = computed(() => userInfo.value?.name || "");
    const userAvatar = computed(() => userInfo.value?.avatar || "");

    // Core Actions
    const setToken = (newToken: string) => {
      token.value = newToken;
      if (newToken) {
        httpClient.setAuthToken(newToken); // Side effect: inject request header
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
      httpClient.clearAuthToken(); // Side effect: clear request header
    };

    // Initialization logic
    const initUserData = async () => {
      if (token.value) {
        httpClient.setAuthToken(token.value);
        const success = await fetchUserInfo();
        if (!success) resetUserState();
      }
    };

    return {
      // State
      token,
      userInfo,
      // Computed properties
      isLoggedIn,
      userName,
      userAvatar,
      // Methods
      setToken,
      handleLoginSuccess,
      resetUserState,
      initUserData,
    };
  },
  {
    // Persistence config: only persist key data
    persist: {
      ...getPersistConfig(STORAGE_KEYS.USER_INFO),
      pick: ["token", "userInfo"], // Selective persistence
    },
  }
);
```

### Other Business Store Examples

Demonstrates business-specific state management patterns, such as message list management. Each business Store follows the same design principles but features customized state structures and operation methods tailored to specific business requirements.

```ts
// src/store/talklist.ts - Message list state
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

## Best Practices

State management best practices summarized from actual project development experience, covering design principles, performance optimization, and maintenance strategies. Following these practices ensures robustness, maintainability, and high performance of the state management system.

### Store Design Principles

Good Store design is the foundation of successful state management. These principles help developers build clear, maintainable, and type-safe state management architectures.

- **Atomic**: Each Store responsible for single business domain
- **Type Safe**: Fully utilize TypeScript type inference
- **Side Effect Isolation**: Only handle side effects in Actions
- **Selective Persistence**: Use `pick` to avoid over-storage

### State Lifecycle

Understanding the complete lifecycle of state helps in better designing and maintaining state management systems. Each stage from initialization to destruction has its specific concerns and best practices.

```
Initialize → Load Data → User Interaction → State Update → Persist
   ↓                                        ↑
  Reset ← ← ← ← ← ← Logout/Error ← ← ← ← ← ← ← ←
```

### Performance Optimization Strategies

In mobile applications, the performance of state management directly affects user experience. Through reasonable optimization strategies, application responsiveness and smoothness can be improved while maintaining functional completeness.

- **Computed Caching**: Use `computed` for complex calculations
- **Shallow Reactive**: Use `shallowRef` for large objects
- **On-demand Persistence**: Only store critical state
- **Batch Updates**: Avoid frequent state changes

## Usage Guide

Provides specific usage examples and operational guidance for developers, covering component integration, state management, and global operations. These guides help developers get started quickly and use the state management system correctly.

### Using in Components

Demonstrates the correct way to use Pinia Store in Vue components, including destructuring of reactive data and usage of computed properties. Note the use of `storeToRefs` to maintain reactivity.

```vue
<template>
  <div v-if="isLoggedIn">Welcome, {{ userName }}</div>
</template>

<script setup>
import { useUserStore } from "@/store/user";

const userStore = useUserStore();
const { isLoggedIn, userName } = storeToRefs(userStore);
</script>
```

### Global State Reset

In user logout, account switching, or testing scenarios, thorough cleanup of application state is needed. The global reset mechanism ensures complete state cleanup, avoiding data leakage and state pollution.

```ts
// Reset all state on logout
async function logout() {
  await userStore.resetUserState();
  resetAllStores(); // Clean all stores
  router.push("/login");
}
```
