# Chat Page {#chat}

## Page Overview {#inst}

The chat page provides a complete real-time chat experience, using a modern message interface design. It supports sending, receiving, and displaying text messages. The page is built with advanced frontend technology stacks to ensure smooth interaction and good performance.

## Core Features {#core-func}

**Message Display**

- **Bidirectional Layout**: Left side shows messages from others, right side shows your own messages
- **Time Context**: Smart time grouping to avoid excessive time stamps

**Message Interaction**

- **Real-time Sending**: Supports instant sending of text messages
- **Message Echo**: Immediately displays after sending, providing instant feedback
- **Simulated Reply**: Built-in reply simulation to enhance demo effect

**User Experience**

- **Auto Scroll**: New messages automatically scroll into view
- **Time Display**: Click a message to show detailed time info
- **Virtual Scroll**: A large number of message records will not cause page lag

## Route Parameters {#route}

The chat page title and user ID are obtained via route parameters:

```text
Route path: '/message/[id]/[name]/'
```

## Components {#component}

**Message Component**

Displays each message content, distinguishes sender by `position`.

**Footer Component**

Displays the input box and send button at the bottom.

Uses `t-textarea` for input, with some style adjustments for UI effect.

Provides a `send` event to notify the parent component when the send button is clicked. Also exposes a `clearMsg` method to manually clear the input content.

**TimeBar Component**

Displays time blocks, separating messages sent at different times.

## Extension Suggestions {#ext}

- **Image Lazy Loading**: Load message images on demand
- **Memory Management**: Proper component destruction and state cleanup

## Contributors {#contributors}

[hikari](https://github.com/liuyax0818), [Yi ZiXiong](https://github.com/neikun25)
