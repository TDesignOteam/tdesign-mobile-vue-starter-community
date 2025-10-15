# Search Page {#search}

This page is the `Search Page`, entered from the search bar in the `Home Page` navigation bar.

## Page Design {#design-idea}

**The visual draft of this page is as shown below**

![Search Page Visual Draft](/images/search.png)

Based on the visual draft, the page is divided into four functional modules following the **mobile layout from top to bottom**: `Top Navigation Bar`, `Search Input Module`, `History Module`, and `Search Discovery Module`.

## Module Features {#features}

**Top Navigation Bar**

Includes a back button and search page title, centered title display.

**Search Input Module**

- Basic input box functionality
- Supports clear button to quickly clear search history
- Supports cancel button on the right to return to the previous page
- Maximum input length is `20` characters
- When there is input, provides a one-click clear button

**History Module**

- Displays user's search history
- Supports clicking history tags to quickly fill the search box
- Provides a clear button to delete all history records
- History is displayed as tags, click to reuse search terms
- Currently, history data is hardcoded in `hooks.tsx`, but in practice, such data is usually stored locally. It can also be changed to `mock` simulation later.

**Search Discovery Module**

- Displays cloud-based hot search suggestions
- Each suggestion is identified by a search icon
- Supports clicking suggestions to quickly fill the search box
- Currently, module data is obtained via `mock` API requests, but in real applications, it should be fetched from the backend server. This can be switched to real backend APIs as needed.

## Module Structure {#structure}

**Code Structure**

```
src/views/search/
├── index.vue  # Main component for the search page, includes structure and layout
└── hooks.tsx  # Business logic for the search page, including event handling
```

**index.vue**

The main component for the search page, includes the structure and layout:
- Uses `<script setup>` for component logic
- Imports and uses the custom hook `useSearchHook` to get related state and methods
- Defines route metadata, sets the page title
- The template includes the top navigation bar, search input module, history module, and search discovery module
- When customizing components, use TDesign components as much as possible, such as Search, Tag, and Icon

**hooks.tsx**

Contains the business logic for the search page, implemented with the Composition API:
- Uses `ref` to create reactive state (search value, history, suggestions)
- Uses `useRouter` to get the router instance and implement page navigation
- Defines event handler functions (cancel search, clear history, click history tag, click suggestion)
- Implements API call functions to get search suggestions
- Exposes state and methods as an object for component use

## Development Guide {#development-guide}

1. **Page Structure Development**: Build or modify the page framework in `index.vue`, import required components
2. **Business Logic Development**: Implement state management and business logic for search in `hooks.tsx`, call related methods in `index.vue`
3. **Event Handling**: Add or remove logic for search input, history click, suggestion click, etc. based on the template
4. **Style Adjustment**: Adjust component styles as needed. It is recommended to use TDesign's default styles as much as possible to avoid compatibility issues from custom styles.

## Extension Suggestions {#ext}

Currently, history is hardcoded in `hooks.tsx`, but it can be extended to persistent storage with localStorage, or simulated with `mock`.

## Contributors {#contributors}

[Tonite14](https://github.com/Tonite14)
