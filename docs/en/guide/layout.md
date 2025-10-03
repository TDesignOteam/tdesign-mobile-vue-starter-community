# Layout System

Core interaction framework for mobile applications: unified page containers, responsive navigation, and state-driven UI display logic. All business routes are nested and rendered under `Layout`.

## Architecture Design

```
                Layout Root Container
                     │
        ┌────────────┼────────────┐
        │            │            │
  PageHeader     Content      BottomNavigation
   Top Bar      Content Area     Bottom Nav
        │                          │
   ┌────┼────┐                ┌────┼────┐
   │    │    │                │    │    │
 Back  Title Search          Home Message My
Button       Entry           Home Message Profile
                              
        Drawer Sidebar
        │
    ┌───┴───┐
    │       │
  Nav Menu  Login Demo
```

## Core Modules

### `src/layout/index.vue` - Root Layout
- **Responsibility**: Unified page framework, integrating header, content, bottom, sidebar
- **State Management**: Responsive control of area display based on `useLayoutState()`

### `src/layout/components/PageHeader.vue` - Page Header
- **Back Logic**: Intelligently determine whether to show back button (e.g., publish, login, profile pages)
- **Title Strategy**: Dynamically get page title, support parameterized routes (e.g., `/notice/:id`)
- **Search Entry**: Only shown on homepage, one-click jump to search page

### `src/layout/components/BottomNavigation.vue` - Bottom Navigation
- **Three-section Design**: Home/Message/My, conforming to mainstream mobile interaction
- **Badge Support**: Message page supports unread count display
- **Route Integration**: Deep integration with `vue-router`, automatically highlight current page

## State-Driven Display Logic

### `useLayoutState()` - Layout State Management
```ts
// Dynamic control of UI element display based on routes
const showBackButton = computed(() => {
  const path = route.path
  return path === '/publish'
    || path.includes('/login')
    || path.startsWith('/notice')
    || path.includes('/my')
    || path.includes('search')
    || path.includes('datacenter')
})

const showBottomNavigation = computed(() => 
  !path.includes('/login') && !path.includes('/error')
)
```

### `useNavigation()` - Navigation Data & Behavior
- **Sidebar Configuration**: `baseSidebar` provides unified page navigation entries
- **Tab Configuration**: `tabList` defines bottom navigation structure
- **Title Resolution**: `getPageTitle(path)` returns page title based on path
- **Interaction Behavior**: `handleTabChange()`, `changeToSearch()` and other navigation methods

## Typical Use Cases

### New Page Integration
1. Create page in `src/views/<feature>/index.vue`
2. Auto-routing will register page as `Layout` child route
3. To display in sidebar, update `useNavigation()` `baseSidebar`
4. For custom title, add mapping in `PAGE_TITLES`

### Control Layout Element Display
```ts
// New page needs to hide bottom navigation
const showBottomNavigation = computed(() => 
  !route.path.includes('/special-page')
)
```

### Dynamic Title Setting
```ts
// Support parameterized route titles
const getPageTitle = (path: string) => {
  if (path.startsWith('/notice/')) {
    return 'Message Details'
  }
  return PAGE_TITLES[path] || 'Default Title'
}
```

## Design Advantages

- **State-Driven**: All UI display logic responsively calculated based on route state
- **Component Decoupling**: Page components focus on business logic, layout components handle navigation and interaction
- **Easy Extension**: New pages only need to focus on business implementation, layout automatically adapts
- **User Experience**: Unified interaction patterns, conforming to mobile usage habits

## Best Practices

- **Title Management**: Centrally maintain `PAGE_TITLES` in `useNavigation()`
- **State Calculation**: Complex display logic through `computed` reactive calculation
- **Transition Animation**: Add smooth transition effects for Drawer and Tab switching
- **Accessibility**: Add appropriate `aria-label` attributes for navigation elements

## Scrolling & Container Height Guidelines

To ensure smooth mobile scrolling and stable rendering of virtual lists, follow these rules:

- **Who scrolls**: Let the main content scroll inside `Layout`, avoid scrolling on `body`.
- **Explicit height**: Set `flex: 1; min-height: 0; overflow-y: auto;` on the main content area.
- **iOS inertia**: Enable `-webkit-overflow-scrolling: touch;`.

Example (excerpt from `src/layout/index.vue`):

```scss
.main-content {
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
```

Working with VirtualList:

- The internal `.vl-container` uses `height: 100%; overflow-y: auto;`. Ensure the parent has explicit height (e.g., parent uses `flex: 1; min-height: 0;`).
- Use `page-mode` on `VirtualList` if you prefer page-level scrolling.