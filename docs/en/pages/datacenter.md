---
title: DataCenter
---

# DataCenter

## Goals

- Aggregate key metrics: Overview, Interaction, Completion, Regional distribution

## Data Sources

- `GET /api/datacenter/stats`: returns `overview`, `interaction`, `completion`, `regionData`, `regionColumns`
- `GET /api/datacenter/video/:id`: regional statistics details for a single video

## Sections

- `OverviewSection`: Overview metrics
- `InteractionSection`: Interaction data
- `CompletionSection`: Completion rate
- `RegionSection`: Regional distribution

## Implementation Highlights

- Chart rendering: on-demand chart library and lazy component registration to reduce first-screen bundle size
- Data synchronization: unified data model and field mapping to ensure consistent multi-chart linkage
- Empty state strategy: consistent placeholders and explanations when data is missing to avoid confusion

## UI Preview

<div style="display: flex; gap: 12px; align-items: flex-start;">
  <img src="../../images/data.png" alt="DataCenter Preview" style="flex: 1 1 0; max-width: 30%; height: auto;" />
</div>
