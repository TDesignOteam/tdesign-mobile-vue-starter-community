# Publish Page {#publish}

This page is the `Publish Page`, where users can jump from the main page's publish button to post their own dynamic content.

## Page Design {#design-idea}

**The visual draft of this page is as shown below**

![Publish Page Visual Draft](/images/publish.png)

Based on the visual draft, the whole page uses a vertical layout from top to bottom, divided into: `Top Navigation Bar Module`, `Image Upload Module`, `Description Input Module`, `Tag Selection Module`, `Location Selection Module`, and `Bottom Action Button Module`. The bottom action button is fixed to ensure convenient operation.

## Module Features {#features}

**Top Navigation Bar**

- Fixed at the top, displays the page title "Publish Post"
- Provides a back button to return to the previous page

**Image Upload Module**

- Provides an image upload area, supports multiple selection
- Only supports image format uploads

**Description Input Module**

- Provides a multi-line text input box for adding post descriptions
- Maximum input of `500` characters
- Displays the number of entered characters in real time

**Tag Selection Module**

- Provides a horizontally scrollable tag list
- Allows multiple tags for the edited content, selected tag state changes
- Tag content is obtained via the `getTagListApi` method from `mock` data

**Location Selection Module**

Provides a location selection entry, logic to be implemented by the developer

**Bottom Action Button Module**

- Fixed at the bottom, includes "Save Draft" and "Publish" buttons
- "Save Draft": Saves the current content as a draft, logic to be implemented by the developer
- "Publish": Publishes the current content to the main page as a formal post

## Module Structure {#structure}

**Code Structure**

```
src/views/publish/
├── index.vue       // Main component for the publish page, structure and layout
├── hooks.tsx       // Business logic for the publish page
└── types.ts        // TypeScript types for the publish page
```

**index.vue**

Responsible for the structure and layout of the publish page

- Logic is integrated in `hooks.tsx`, imports and uses `usePublishHook` to get related state and methods
- The template includes the top navigation bar, image upload area, description input box, tag selection area, location selection entry, and bottom action buttons
- Uses TDesign component library as much as possible, such as `t-upload`, `t-textarea`, `t-check-tag`, `t-cell`, and `t-button`

**hooks.tsx**

Abstracts the business logic of the publish page

- Defines the `usePublishHook` function, encapsulating all logic for the publish page
- Imports the `FormData` type from `types.ts`, uses `reactive` to create the `formData` state, including content, files, tags, and location info
- Uses `ref` to create a `tags` list, gets the tag list with `getTagListApi`
- `uploadConfig` configures basic upload parameters

**types.ts**

Defines `TypeScript` types related to the publish page

- `TagItem`: Tag item type, includes id and label
- `FormData`: Form data type, includes content, files, tags, and location
- Exports necessary types for use in `hooks`

## Development Guide {#development-guide}

1. **Type Definition**: Define required TypeScript types in `types.ts`
2. **Business Logic Development**: Implement state management and business logic for the publish page in `hooks.tsx`
3. **Page Integration**: Import hooks and required components in `index.vue`, build a complete page layout and interaction logic
4. **Style Adjustment**: Adjust component styles as needed

## Extension Suggestions {#ext}

1. **Image Upload**: Improve image upload restrictions, support image preview
2. **Image Editing**: Consider adding image cropping, filters, etc.
3. **Location Selection**: Integrate map API to implement location selection
4. **Draft Management**: Improve draft saving, support viewing and editing draft history

## Contributors {#contributors}

[Tonite14](https://github.com/Tonite14), [hikari](https://github.com/liuyax0818)
