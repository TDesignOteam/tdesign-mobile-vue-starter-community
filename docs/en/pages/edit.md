# Edit

- Composition: profile editing (avatar, nickname, gender, birthday, bio, address, album)
- Route: `/my/edit` (entered from the My page)

## Modules

- Form fields: `src/views/edit/components/*` (modularized field components)
- Address picker: `AddressPickerModal.vue` + `useAddressPicker.ts`, data from `src/utils/area.ts`
- Modal interactions: date picker, address picker, album upload

## Interactions

- Fields update in real time; pickers emit values back to the form
- Image upload shows placeholder and progress (demo uses local preview)

## Implementation Highlights

- Modular field components: reduce page complexity, enable reuse and testing
- Decoupled pickers: logic in composables, components focus on presentation
- Form validation: basic required and length constraints to ensure data quality

## Code Locations

- Page: `src/views/edit/index.vue`
- Components: `src/views/edit/components/*`
- Composables: `src/views/edit/composables/*`

## UI Preview

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../../images/edit.png" alt="Edit Preview" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>