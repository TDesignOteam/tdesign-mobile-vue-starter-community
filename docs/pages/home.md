# Home Page {#home}

This page is the `Home Page`, the first page entered after launching the app. Users can access any page they want from here.

## Page Design {#design-idea}

**The visual draft of this page is as shown below**

![Home Page Visual Draft](/images/home.png)

Based on the visual draft, the page is divided into five functional modules: `Top Navigation Bar Module`, `Tab Card Module`, `Pull-down Refresh Module`, `Content Card Module`, and `Publish Button`. The `Content Card Module` is the core, with two types of cards: normal cards and carousel cards. The `Banner` part is managed uniformly in `layout`.

## Module Features {#features}

**Top Navigation Bar**

- Provides a search entry, click to jump to the full search page
- Provides a left menu button, click to open the left menu

**Tab Card Module**

- Provides two tabs: "Recommended" and "My Follows"
- Supports tab switching to display different content categories

**Pull-down Refresh Module**

Uses the `t-pull-down-refresh` component to refresh page content

**Content Card Module**

- Two types: image cards and carousel cards
- Image cards include image, title, and tag info
- Carousel cards support automatic image carousel
- Both are rendered based on the `type` property

**Publish Button**

Fixed at the bottom right, does not move with the page, provides a jump to the publish page, supports long-press to move the button

## Module Structure {#structure}

**Code Structure**

```
src/views/home/
├── index.vue       // Main component for the home page, includes structure and layout
├── hooks.tsx       // Business logic for the home page, including state management and event handling
└── components/     // Subcomponents for the home page
    ├── Card.vue    // Content card component
    ├── MiniSearch.vue // Mini search box component
    └── Swiper.vue  // Carousel card component
```

**index.vue**

Responsible for the main structure and layout of the home page

- Logic is integrated in `hooks.tsx`, imports and uses `useHomeHook` to get related state and methods
- Imports required subcomponents: `Card`, `MiniSearch`, and `Swiper`
- The template includes the top navigation bar, search box, content category tags, pull-down refresh area, and floating publish button
- Uses TDesign component library as much as possible, such as `t-tabs`, `t-pull-down-refresh`, etc.

**hooks.tsx**

Abstracts the business logic of the home page

- Defines the `ContentType` interface to standardize content data structure
- Uses `ref` to create reactive state (data list, current selected tag, pull-down refresh state, etc.)
- Uses `useRouter` to get the router instance and implement page navigation
- Defines event handler functions (tab switching, pull-down refresh, page scroll, etc.)
- Uses `useDebounceFn` to optimize scroll event handling and improve performance

**Subcomponents**

- **Card.vue**: Displays single image content cards, including image, title, and tag info
- **MiniSearch.vue**: Provides a mini search entry, click to jump to the search page
- **Swiper.vue**: Implements carousel card functionality, supports auto carousel and sliding display

## Development Guide {#development-guide}

1. **Subcomponent Development**: Modify `Card.vue`, `MiniSearch.vue`, and `Swiper.vue` under `components`, or implement new components
2. **Business Logic Development**: Modify home page state management and business logic in `hooks.tsx`
3. **Page Integration**: Import subcomponents and hooks in `index.vue`, build your own complete page layout and interaction logic
4. **Style Adjustment**: Adjust component styles as needed

## Extension Suggestions {#ext}

1. **Personalized Recommendation**: Integrate real backend APIs to implement personalized content recommendation based on user interests
2. **Interaction Experience Optimization**: Add more animation and transition effects to improve user experience

## Contributors {#contributors}

[Tonite14](https://github.com/Tonite14), [hikari](https://github.com/liuyax0818)
