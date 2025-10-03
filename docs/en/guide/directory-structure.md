# Directory Structure

> This document provides a detailed explanation of the project's overall architecture and directory organization to help developers quickly understand the project structure.

## Project Root Directory

```text
tdesign-mobile-vue-starter-community/
├── Configuration Files
│   ├── .browserslistrc          # Browser compatibility configuration
│   ├── .env*                    # Environment variable configuration files
│   ├── .eslintcache            # ESLint cache file
│   ├── .gitignore              # Git ignore configuration
│   ├── .lintstagedrc           # Pre-commit code check configuration
│   ├── .npmrc                  # npm configuration
│   ├── .nvmrc                  # Node.js version specification
│   ├── commitlint.config.js    # Commit message standard configuration
│   ├── eslint.config.js        # ESLint code standard configuration
│   ├── postcss.config.js       # PostCSS configuration
│   ├── tsconfig.json           # TypeScript configuration
│   ├── vite.config.ts          # Vite build tool configuration
│   └── package.json            # Project dependencies & scripts
│
├── Development Tools
│   ├── .github/                # GitHub Actions configuration
│   ├── .husky/                 # Git Hooks configuration
│   ├── .vscode/                # VS Code editor configuration
│   └── build/                  # Build scripts & tools
│       ├── info.ts             # Project information getter
│       ├── plugins.ts          # Vite plugin configuration
│       └── utils.ts            # Build utility functions
│
├── Documentation & Resources
│   ├── docs/                   # Project documentation
│   │   ├── guide/              # Chinese development guide
│   │   ├── en/guide/           # English development guide
│   │   ├── images/             # Documentation image resources
│   │   └── pages/              # Page description documentation
│   ├── locales/                # Internationalization language packs
│   │   ├── zh-cn.yaml          # Chinese language pack
│   │   └── en-us.yaml          # English language pack
│   └── README.md               # Project description documentation
│
├── Static Resources
│   ├── public/                 # Public static resources
│   │   ├── config.json         # Runtime configuration file
│   │   ├── favicon.ico         # Website icon
│   │   └── mockServiceWorker.js # MSW Service Worker
│   └── index.html              # HTML entry file
│
├── Development & Testing
│   ├── mock-server/            # Mock server configuration
│   └── types/                  # Global type definitions
│       ├── assets.d.ts         # Asset file types
│       ├── auto-imports.d.ts   # Auto-import types
│       ├── components.d.ts     # Component types
│       ├── global.d.ts         # Global types
│       ├── shims-tsx.d.ts      # TSX support
│       ├── shims-vue.d.ts      # Vue file types
│       └── vue-router.d.ts     # Router types
│
└── Dependency Management
    ├── node_modules/           # Project dependency packages
    └── pnpm-lock.yaml          # pnpm lock file
```

## Core Source Code Structure

```text
src/                            # Main source code directory
├── Application Entry
│   ├── App.vue                 # Root component
│   └── main.ts                 # Application startup entry
│
├── Network & API
│   └── api/                    # API interface layer
│       ├── request.ts          # Unified HTTP client configuration
│       ├── types.ts            # Interface type definitions
│       ├── auth.ts             # Authentication related interfaces
│       ├── chat.ts             # Chat functionality interfaces
│       ├── datacenter.ts       # Data center interfaces
│       ├── home.ts             # Homepage data interfaces
│       ├── profile.ts          # User profile interfaces
│       ├── publish.ts          # Publishing functionality interfaces
│       └── search.ts           # Search functionality interfaces
│
├── UI Components & Resources
│   ├── components/             # Common component library
│   │   ├── index.ts            # Component export entry
│   │   ├── FormContainer.vue   # Form container component
│   │   ├── MenuItem.vue        # Menu item component
│   │   ├── ServiceGrid.vue     # Service grid component
│   │   ├── StatsSection.vue    # Statistics info component
│   │   └── VirtualList.vue     # Virtual list component
│   │
│   ├── assets/                 # Static resources
│   │   ├── images/             # Image resources (PNG, JPG, etc.)
│   │   └── svgs/               # SVG vector icons
│   │
│   └── style/                  # Style files
│       ├── index.scss          # Global style entry
│       ├── reset.scss          # Style reset
│       └── tailwind.css        # Tailwind CSS configuration
│
├── Pages & Layout
│   ├── layout/                 # Layout framework
│   │   ├── index.vue           # Main layout container
│   │   ├── components/         # Layout related components
│   │   │   ├── BottomNavigation.vue # Bottom navigation
│   │   │   └── PageHeader.vue  # Page header
│   │   └── composables/        # Layout logic reuse
│   │       ├── useLayoutState.ts   # Layout state management
│   │       └── useNavigation.ts    # Navigation logic
│   │
│   └── views/                  # Page views
│       ├── home/               # Homepage
│       │   └── index.vue
│       ├── login/              # Login page
│       │   └── index.vue
│       ├── search/             # Search page
│       │   └── index.vue
│       ├── publish/            # Publishing page
│       │   ├── index.vue
│       │   └── components/     # Publishing page specific components
│       ├── talklist/           # Message list page
│       │   └── index.vue
│       ├── my/                 # Personal center page
│       │   └── index.vue
│       ├── datacenter/         # Data center page
│       │   └── index.vue
│       ├── notice/             # Notice page
│       │   └── index.vue
│       └── error/              # Error pages
│           └── index.vue
│
├── Core Functional Modules
│   ├── router/                 # Route configuration
│   │   ├── index.ts            # Route definition & configuration
│   │   └── utils.ts            # Route utility functions
│   │
│   ├── store/                  # State management
│   │   ├── index.ts            # Pinia instance & persistence configuration
│   │   ├── user.ts             # User state management
│   │   └── talklist.ts         # Message list state management
│   │
│   ├── composables/            # Composable functions
│   │   └── useTheme.ts         # Theme switching logic
│   │
│   ├── config/                 # Configuration management
│   │   ├── index.ts            # Configuration export entry
│   │   ├── app.config.ts       # Application configuration
│   │   ├── constants.ts        # Constant definitions
│   │   └── theme.config.ts     # Theme configuration
│   │
│   ├── plugins/                # Plugin system
│   │   ├── i18n.ts             # Internationalization plugin
│   │   └── message.ts          # Message notification plugin
│   │
│   ├── utils/                  # Utility functions
│   │   ├── index.ts            # Utility function exports
│   │   ├── global.ts           # Global utility functions
│   │   └── validators.ts       # Form validation tools
│   │
│   ├── directives/             # Custom directives
│   │   └── index.ts            # Directive registration entry
│   │
│   └── mocks/                  # Development environment mock data
│       ├── index.ts            # MSW startup configuration
│       ├── browser.ts          # Browser-side Mock configuration
│       ├── handlers.ts         # API Mock handlers
│       └── data/               # Mock data collections
```

## Key Module Responsibilities

### 📡 Network Layer (api/)

- **`request.ts`** - Core HTTP client
  - Unified request/response interceptors
  - Error handling & retry mechanisms
  - Request cancellation & timeout control
  - Response data standardization

- **Business Interface Modules** - Organized by functional domains
  - `auth.ts` - User authentication (login/register/logout)
  - `home.ts` - Homepage data fetching
  - `search.ts` - Search functionality interfaces
  - `publish.ts` - Content publishing related
  - `chat.ts` - Messaging & chat features
  - `datacenter.ts` - Data statistics & charts
  - `profile.ts` - User profile management

### Layout System (layout/)

- **`index.vue`** - Main application layout container
  - Page header (PageHeader)
  - Content area (router-view)
  - Bottom navigation (BottomNavigation)
  - Sidebar drawer menu

- **`components/`** - Layout components
  - `PageHeader.vue` - Configurable page header
  - `BottomNavigation.vue` - Bottom tab navigation

- **`composables/`** - Layout logic
  - `useLayoutState.ts` - Layout state control
  - `useNavigation.ts` - Navigation logic & route management

### Routing System (router/)

- **`index.ts`** - Route configuration & registration
  - Nested route structure definition
  - Route guards & permission control
  - Automatic page collection mechanism

- **`utils.ts`** - Route utilities
  - History/Hash mode switching
  - Route navigation wrapper functions

### State Management (store/)

- **`index.ts`** - Pinia configuration center
  - State persistence plugin configuration
  - Store reset & initialization
  - Development tools integration

- **Business State Modules**
  - `user.ts` - User information & login state
  - `talklist.ts` - Message list state management

### Plugin System (plugins/)

- **`i18n.ts`** - Internationalization solution
  - Language pack lazy loading strategy
  - Dynamic language switching
  - Local cache optimization

- **`message.ts`** - Message notification system
  - Unified message prompt interface
  - Multiple notification type support
  - Global error handling integration

### Mock Data (mocks/)

- **`index.ts`** - MSW startup configuration
  - Development/production environment control
  - Service Worker registration

- **`handlers.ts`** - API Mock handlers
  - RESTful API simulation
  - Real data structure matching

- **`data/`** - Static data sets
  - User information mock data
  - Business data templates

### Component Library (components/)

- **Common Components** - Cross-page reuse
  - `FormContainer.vue` - Form container wrapper
  - `ServiceGrid.vue` - Service entry grid layout
  - `VirtualList.vue` - High-performance virtual scrolling list
  - `MenuItem.vue` - Unified menu item component
  - `StatsSection.vue` - Data statistics display component

### Page Views (views/)

- **Functional Pages** - Organized by business functions
  - `home/` - Homepage & service entries
  - `login/` - User authentication pages
  - `search/` - Content search functionality
  - `publish/` - Content publishing & editing
  - `talklist/` - Message conversation list
  - `my/` - Personal center & settings
  - `datacenter/` - Data visualization charts
  - `notice/` - System notification list
  - `error/` - Error page handling

### Style System (style/)

- **`index.scss`** - Global style entry
  - TDesign component style overrides
  - Business-level common style classes

- **`reset.scss`** - Browser style reset
  - Cross-browser compatibility handling
  - Basic element standardization

- **`tailwind.css`** - Tailwind CSS configuration
  - CSS Layers hierarchy management
  - Custom utility class extensions

### Configuration Management (config/)

- **`app.config.ts`** - Application global configuration
- **`constants.ts`** - Constant definitions
- **`theme.config.ts`** - Theme configuration options

### Utility Functions (utils/)

- **`global.ts`** - Global utility functions
- **`validators.ts`** - Form validation rules
- **`index.ts`** - Utility function unified exports

## Module Relationship Diagram

```
                    ┌─────────────────────────────────────────┐
                    │              main.ts                │
                    │        Application Startup Entry       │
                    └─────────────┬───────────────────────────┘
                                  │
                    ┌─────────────▼───────────────────────────┐
                    │           config/                   │
                    │    Application Config & Constants      │
                    └─────────────┬───────────────────────────┘
                                  │
                    ┌─────────────▼───────────────────────────┐
                    │           plugins/                  │
                    │      i18n & message Plugin System      │
                    └─────────────┬───────────────────────────┘
                                  │
                    ┌─────────────▼───────────────────────────┐
                    │           layout/                   │
                    │      Main Layout & Navigation Framework │
                    │    ┌─────────┴─────────┐                │
                    │    │   components/     │   composables/ │
                    │    │  Layout Comps     │   Layout Logic │
                    └────┼─────────┬─────────┼────────────────┘
                         │         │         │
                ┌────────▼─────┐   │   ┌─────▼─────┐
                │ router/   │   │   │ store/  │
                │ Route System │   │   │State Mgmt │
                └────────┬─────┘   │   └─────┬─────┘
                         │         │         │
                ┌────────▼─────────▼─────────▼─────┐
                │          views/              │
                │          Page Views             │
                │  ┌─────┬─────┬─────┬─────┬─────┐ │
                │  │home │login│pub..│talk │ my  │ │
                │  └─────┴─────┴─────┴─────┴─────┘ │
                └──────────────┬───────────────────┘
                               │
                ┌──────────────▼───────────────────┐
                │         components/           │
                │       Common Component Library   │
                └──────────────┬───────────────────┘
                               │
                ┌──────────────▼───────────────────┐
                │          api/                │
                │     Interface Layer & HTTP Client│
                │  ┌─────────────┴─────────────┐   │
                │  │ request.ts  │Business APIs│   │
                │  └─────────────┬─────────────┘   │
                └────────────────┼─────────────────┘
                                 │
                ┌────────────────▼─────────────────┐
                │         mocks/               │
                │   Development Data Simulation   │
                │     (Optional, Dev Environment) │
                └─────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   Support Systems                    │
├─────────────────┬─────────────────┬─────────────────────┤
│   style/     │  utils/      │  directives/     │
│   Style System  │ Utility Funcs   │  Custom Directives  │
│                │                 │                     │
│ • Global styles│ • Common funcs  │ • DOM operation ext │
│ • Theme config │ • Validation    │ • Functional dirs   │
│ • Tailwind     │ • Format tools  │                     │
└─────────────────┴─────────────────┴─────────────────────┘
```

### Data Flow

```
┌─────────────┐   Trigger   ┌─────────────┐    Call    ┌─────────────┐
│  Page    │ ──────────→ │  Component│ ─────────→ │  API     │
│   Page      │             │  Component  │            │ Interface   │
└─────────────┘             └─────────────┘            └─────────────┘
       │                           │                           │
       │ Update State              │ State Response            │ HTTP Request
       ▼                           ▼                           ▼
┌─────────────┐             ┌─────────────┐             ┌─────────────┐
│ Store    │             │  Message  │             │  Mocks    │
│State Mgmt   │             │Notification │             │ Mock Data   │
└─────────────┘             └─────────────┘             └─────────────┘
```

## Startup & Initialization Flow

The startup sequence can be found in `src/main.ts`, with key steps as follows:

```typescript
// 1. Application Configuration Initialization
await initGlobalConfig(app);
// Merge external configuration file public/config.json
// Inject global configuration object $config

// 2. State Management Initialization
useStore(app);
// Install Pinia state management
// Configure state persistence plugin
// Register all Store modules

// 3. Storage Configuration Injection
injectStorageConfig(app);
// Inject local storage accessor $storage
// Configure language preferences and other persistent settings

// 4. Internationalization System Startup
useI18n(app);
await initializeI18n();
// Only load user's preferred language pack (lazy loading strategy)
// Configure language switching mechanism

// 5. Plugin System Installation
app.use(MessagePlugin); // Message notification plugin
app.use(router); // Routing system

// 6. Development Environment Mock Startup
if (import.meta.env.DEV || import.meta.env.VITE_MSW === "true") {
  await startMsw(); // Start MSW Service Worker
}

// 7. Application Mounting
app.mount("#app");
```

### Initialization Timeline

```
Timeline │  Module          │  Operation Description
─────────┼──────────────────┼──────────────────────────────
   T1    │  Build Config │  Read public/config.json
         │                  │  Merge environment variables
─────────┼──────────────────┼──────────────────────────────
   T2    │  Pinia        │  Initialize state management
         │                  │  Configure persistence plugin
─────────┼──────────────────┼──────────────────────────────
   T3    │  Storage      │  Inject local storage accessor
         │                  │  Restore user preferences
─────────┼──────────────────┼──────────────────────────────
   T4    │  i18n         │  Detect user language preference
         │                  │  Lazy load corresponding language pack
─────────┼──────────────────┼──────────────────────────────
   T5    │  Plugins      │  Install message notification plugin
         │  🚦 Router       │  Register routing system
─────────┼──────────────────┼──────────────────────────────
   T6    │  MSW          │  (Optional) Start API simulation
         │                  │  Register Service Worker
─────────┼──────────────────┼──────────────────────────────
   T7    │  Mount        │  Mount Vue application instance
         │                  │  Render initial page
```

## Naming & Convention Standards

### File & Directory Naming

- **Page Files** - `src/views/<feature>/index.vue`

  ```
  src/views/home/index.vue          ✅ Correct
  src/views/userProfile/index.vue   ❌ CamelCase naming
  src/views/user-profile/index.vue  ✅ Correct
  ```

- **Composable Functions** - `src/**/composables/useXxx.ts`

  ```
  useLayoutState.ts     ✅ State management type
  useNavigation.ts      ✅ Functional logic type
  useTheme.ts          ✅ Theme control type
  ```

- **Store Modules** - `useXxxStore` naming + `persist` persistence

  ```typescript
  // store/user.ts
  export const useUserStore = defineStore('user', {
    state: () => ({ ... }),
    persist: true  // Enable persistence
  })
  ```

- **API Interfaces** - `src/api/<domain>.ts` return `ApiResponse<T>`

  ```typescript
  // api/auth.ts
  export const login = (data: LoginData): ApiResponse<UserInfo> => {
    return httpClient.post("/auth/login", data);
  };
  ```

- **Static Resources** - Organized by type in directories
  ```
  src/assets/images/    # Bitmap resources (.png, .jpg, .webp)
  src/assets/svgs/      # Vector icons (.svg)
  public/               # Static files that don't need build processing
  ```

### Component & Variable Naming

- **Component Naming** - PascalCase

  ```vue
  FormContainer.vue ✅ Container type component ServiceGrid.vue ✅ Functional
  component VirtualList.vue ✅ Utility component
  ```

- **Variable Naming** - camelCase

  ```typescript
  const currentUser = ref()      ✅ Regular variables
  const isLoading = ref(false)   ✅ Boolean types
  const userList = ref([])       ✅ Array types
  ```

- **Constant Naming** - SCREAMING_SNAKE_CASE
  ```typescript
  const API_BASE_URL = 'https://api.example.com'  ✅
  const MAX_UPLOAD_SIZE = 1024 * 1024 * 5        ✅
  ```

## Typical Call Chain

### User Operation Flow

```
1. User Operation
   └── views/search/index.vue (Page component)
       └── Trigger search event

2. Interface Call
   └── api/search.ts (Interface wrapper)
       └── httpClient.get('/search', { params, signal })

3. Network Request
   └── api/request.ts (HTTP client)
       └── Request intercept → Send request → Response intercept

4. Data Processing
   └── Standardized response { code, message, data, success }
       ├── Success: Return business data
       └── Failure: plugins/message unified error prompts

5. State Update
   └── Store/Component state update
       └── Trigger UI re-rendering
```

### Error Handling Flow

```
API Request Error
├── Network Error (Network Error)
│   └── request.ts interceptor handling
│       └── Show "Network connection failed" prompt
│
├── HTTP Status Error (4xx/5xx)
│   └── Show corresponding error message based on status code
│       ├── 401: Redirect to login page
│       ├── 403: Show insufficient permissions
│       └── 500: Show server error
│
└── Business Logic Error (code !== 0)
    └── Show backend returned message field
        └── plugins/message.ts unified prompts
```

## New Page Integration Guide

### Standard Steps for Creating New Pages

1. **Create Page Files**

   ```bash
   # Create new functional module in views directory
   mkdir src/views/example
   touch src/views/example/index.vue

   # Create components subdirectory if specific components needed
   mkdir src/views/example/components
   ```

2. **Automatic Route Collection**

   ```typescript
   // Pages are automatically collected into the routing system
   // Path: /example
   // Nested under Layout component

   // For custom route configuration, manually add in router/index.ts
   ```

3. **Navigation Menu Configuration**

   ```typescript
   // layout/composables/useNavigation.ts
   const tabList = [
     // Bottom navigation configuration
     { value: "example", label: "Example", icon: IconExample },
   ];

   const baseSidebar = [
     // Sidebar menu configuration
     { value: "example", label: "Example Page" },
   ];
   ```

4. **API Layer Development**

   ```typescript
   // Create corresponding interface file
   // src/api/example.ts

   export interface ExampleData {
     id: string;
     name: string;
   }

   export const getExampleList = (): ApiResponse<ExampleData[]> => {
     return httpClient.get("/api/example/list");
   };
   ```

5. **State Management (Optional)**

   ```typescript
   // Create corresponding Store if global state needed
   // src/store/example.ts

   export const useExampleStore = defineStore("example", {
     state: () => ({
       list: [] as ExampleData[],
       loading: false,
     }),
     persist: true, // Enable persistence
   });
   ```

6. **Mock Data (Development Environment)**
   ```typescript
   // Add corresponding Mock handling in mocks/handlers.ts
   rest.get("/api/example/list", (req, res, ctx) => {
     return res(
       ctx.json({
         code: 0,
         data: mockExampleData,
         message: "Success",
       })
     );
   });
   ```

### Code Quality Checklist

- [ ] Page components use `<script setup>` syntax
- [ ] Interface calls use unified `ApiResponse<T>` type
- [ ] Error handling through `plugins/message` unified prompts
- [ ] States requiring persistence use Pinia + `persist` configuration
- [ ] Static resources placed in correct directories
- [ ] Component naming follows PascalCase convention
- [ ] Add necessary TypeScript type definitions
