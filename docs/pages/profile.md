# Profile page {#profile}

## Page Overview {#inst}

The personal center page is the core interface for users to manage personal information and access related functions. It integrates user info display, data statistics, service recommendations, and system settings. The page uses modular design, providing a clear information structure and intuitive operation paths.

## Module Features {#features}

**User Info**

Displays `Logged In` and `Not Logged In` states by reading login status info.

**Publish Module** and **Recommended Services**

Uses the `t-grid` component for layout, with style tweaks to closely match the UI effect.

**Function Menu**

The bottom function menu uses `t-cell-group` for layout, written in the native style of the component.

## Components {#component}

For different login states, we encapsulated two components: `UserLogged` and `UserUnLogged`.

Before encapsulation, we considered using a parameter to combine both states, but in practice, the styles differ greatly, so we split them for simplicity.

## Contributors {#contributors}

[hikari](https://github.com/liuyax0818), [Yi ZiXiong](https://github.com/neikun25)
