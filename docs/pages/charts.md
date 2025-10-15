# Charts page {#charts}

This page is the `Charts Page`, used for data statistics and visualization, accessible from the `Personal Center` page. It mainly displays the application's overall operation status, interactive data, content completion rate, and data statistics by region.

## Page Design {#design-idea}

**The visual draft of this page is as shown below**

![Data Charts Page Visual Draft](/images/charts.png)

Based on the features of the visual draft, the page is divided into five functional modules: `Top Navigation Bar Module`, `Overall Status Module`, `Interaction Status Module`, `Completion Rate Module`, and `Regional Statistics Module`. Card-style layout is used, and each module independently displays statistical results of different dimensions.

## Module Features {#features}

**Top Navigation Bar Module**

Centered bold display of "Data Center" title, provides a back button to return to the previous page.

**Overall Status Module**

Displays the application's core operation data, including page views, PV (page visits), and UV (unique visitors). Related numbers are shown in blue or black, bold and enlarged.

**Interaction Status Module**

Displays user interaction statistics, including page views, likes, shares, and favorites.

**Completion Rate Module**

Shows content completion rates for different time periods, using progress bars to visually display the completion percentage for each period.

**Regional Statistics Module**

Displays video visit data in different regions (global, North China, East China, etc.) in a table format, supporting horizontal scrolling to view more regional data.

## Module Structure {#structure}

**Code Structure**
```
src/views/statistics/
├── index.vue            # Overall page structure and layout for the data charts page
├── hooks.tsx            # Business logic related to the data charts page
└── components/          # Subcomponents for the data charts page
    ├── Overall.vue      # Overall status module
    ├── Interaction.vue  # Interaction status module
    ├── CompleRate.vue   # Completion rate module
    └── Area.vue         # Regional statistics module
```

**index.vue**

- Integrates business logic for the data charts page in `hooks.tsx`, imports and uses `useStatisticsHook` to get related state and data
- Combines subcomponents (`Overall`, `Interaction`, `CompleRate`, `Area`) to display statistical results of different dimensions
- Each module independently displays statistical results, implementing the overall layout and style of the page

**hooks.tsx**

- Defines and exports the `useStatisticsHook` function, encapsulating the required state and logic
- Uses `ref` to create four main data categories: `overallData`, `interData`, `compList`, and `areaData`, corresponding to the data needed by each module. Developers can update the data as needed.

**Overall.vue**

Displays the application's overall operation data, receives `time` and `data` as props, where `data` includes page views, PV, and UV statistics.

**Interaction.vue**

Displays user interaction data, including page views, likes, shares, and favorites.

**CompleRate.vue**

Displays completion rates for six different time periods, using the `t-progress` component for visual progress bars.

**Area.vue**

Displays regional statistics using the `t-table` component, including video visit data for each region, with custom styles such as borders and stripes.

## Development Guide {#development-guide}

**Subcomponent Development**

Modify or create subcomponents under the `components` directory, define props for each component, receive and render data, and implement layout and styles as required.

**Business Logic Development**

Implement state management and business logic for the data charts page in `hooks.tsx`.

**Page Integration**

Import all required subcomponents in `index.vue`, and don't forget to pass the data provided by `useStatisticsHook` to the corresponding components.

**Style Adjustment**

Adjust component styles as needed.

## Extension Suggestions {#ext}

- Currently, the data on this page is hardcoded. You can use `mock` to simulate data and fetch it via HTTP API in `hooks` as needed.
- Support exporting statistical data as Excel or CSV format.
- Add more statistical modules, such as user portraits, content classification statistics, etc.

## Contributors {#contributors}

[Tonite14](https://github.com/Tonite14), [hikari](https://github.com/liuyax0818)
