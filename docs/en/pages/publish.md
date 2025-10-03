---
title: Publish
---

# Publish

- Form: title, body, tags, images/videos (optional)
- Actions: draft/publish; validation, compression, upload progress; navigate after success

## APIs (Mock)

- `GET /api/publish/tags`: popular/common tags

## Interactions

- Supports multi-select tags and image upload (see examples in `src/assets/images`)

## Implementation Highlights

- Stepwise validation: on-blur checks + full validation before submit, with aggregated error messages
- Media handling: image compression and size limits to save bandwidth; upload progress visualization
- Drafts: auto-save drafts and confirm on leave to avoid accidental loss
- Concurrency control: debounce publish button and block during submitting to prevent duplicate posts

## UI Preview

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../../images/publish.png" alt="Publish Preview" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>
