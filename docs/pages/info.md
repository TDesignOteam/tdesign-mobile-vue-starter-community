# Profile info page {#info}

This page is the `Personal Info Page`. Entered by clicking the edit icon on the right side of the user info in the `Personal Center` page. It is mainly used to display and edit the user's basic profile information, consisting of three parts: **Top Banner**, **Info Form**, and **Bottom Save Button**.

## Page Design {#design-idea}

- Page structure from top to bottom: `Banner` → `Info Form` → `Bottom Save Button`.
- Bottom button is fixed for convenient operation.
- Birthday/address use popup components to keep the main interface clean.

## Module Structure {#structure}

**Page Modules**

- **Top Banner**: Uses the public `Banner` component to display the "Personal Info" title
- **Info Form**: Based on `t-form`, includes fields for username, gender, birthday, address, bio, and photo wall
- **Bottom Save Button**: Fixed position, controlled by `allowSubmit` state

**Code Structure**

```
src/views/profile/info/
├── index.vue          // Main page component: layout + form structure + popup + button
└── utils/
    ├── hooks.tsx      // Business logic and state encapsulation (useInfoHook)
    ├── data.ts        // Static area data source areaList
    ├── rules.ts       // Form validation rules
    └── types.ts       // Form and upload file type definitions
```

**index.vue**

- Imports `useInfoHook` to destructure required state and functions, loads user data on `onMounted`.
- Organizes multiple `t-form-item` sections; uses `t-popup` for date and address selection popups.
- Uses `dayjs` to handle date range and default values.

**hooks.tsx**

- Encapsulates all interactions and state: `formData`, popup visibility, dynamic city list, image upload handling, submission and initialization loading.
- `loadProfileInfo`: Calls `getProfileInfoApi` to fetch and fill existing data.
- `handleSubmit`: Validates form → calls `updateProfileInfoApi` → Toast feedback.
- Address linkage: Updates city list after the first column changes (`onAddressColumnChange`).
- `birthdayValue`: Computed property for the date picker default value (20 years old).

**data.ts**

The project presets some province/city hierarchical data `areaList`, which can be replaced with backend APIs.

**rules.ts**

Centralizes validation logic for unified maintenance and reuse. Preset validation rules:

| Field   | Rule Highlights |
| ------- | -------------- |
| Username | Not empty; length 2~20; allows Chinese/English/numbers/underscore/space; regex for illegal chars |
| Gender   | Not empty (male/female/secret) |
| Birthday | Not empty; date cannot exceed current year; age range 0~150 |
| Address  | Not empty (must complete two-level selection) |
| Bio      | Not empty |
| Photo    | No more than 12 |

**types.ts**

Declares the `ProfileForm` type for better type hints and maintainability during development.

## Development Guide {#development-guide}

1. Page layout: Use TDesign components to build the form structure in `index.vue`.
2. Business encapsulation: Centralize state/computed/methods in `hooks.tsx`; split extra logic as needed.
3. Validation integration: Define rules by field in `rules.ts` and bind to the `rules` prop of `t-form`.
4. Style handling: Adjust component styles as needed. It is recommended to use TDesign's default styles as much as possible to avoid compatibility issues from custom styles.

## Contributors {#contributors}

[Reuse5653](https://github.com/Reuse5653), [hikari](https://github.com/liuyax0818)
