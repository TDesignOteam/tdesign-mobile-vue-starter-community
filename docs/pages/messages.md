# Message List Page {#messages}

## Page Overview {#inst}

The message list page is the entry for users to view all chat conversations, built with the TDesign Mobile Vue component library, providing a clear message management experience.

This page follows the principles of **information priority** and **operational convenience**:

- **Clear visual hierarchy**: Uses avatar, name, preview content, and unread count to form a clear message hierarchy
- **Instant feedback**: Unread messages use eye-catching red dots, and status updates instantly after clicking
- **Smooth navigation**: Smooth page transitions and intuitive interaction design reduce user cognitive load

The page uses a list layout, each conversation item contains complete context information, supporting quick browsing and precise operations.

## Components {#component}

**MessageItem**

Initially considered using `t-cell`, but `t-cell` had issues with text overflow and style penetration. To simplify logic, this component was encapsulated and provides parameters for rendering.

## Contributors {#contributors}

[hikari](https://github.com/liuyax0818), [Yi ZiXiong](https://github.com/neikun25)
