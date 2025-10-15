# Login Page {#login}

## Design Concept {#design}

A multi-step login page built with TDesign Mobile Vue components, supporting both account-password login and mobile verification code login, providing a complete user authentication flow.

## Module Structure {#structure}

```
src/views/login/
├── index.vue              # Main login page component
├── hooks.tsx              # Login logic hook function
└── components/            # Subcomponent directory
    ├── PasswordForm.vue   # Account-password form
    ├── PhoneForm.vue      # Mobile number input form
    ├── VerifyCodeForm.vue # Verification code input form
    ├── TermsForm.vue      # Agreement terms consent
    ├── RecoverPwd.vue     # Password recovery link
    └── Other.vue          # Other login methods
```

## Technical Implementation {#implementation}

**Login Flow**

```
A[Account-password login] --> B[Login success]
C[Mobile verification] --> D[Verification code] --> E[Login success]
```

**State Management**

```typescript
const _form = reactive({
  account: '', // account
  password: '', // password
  phone: '', // mobile number
  verCode: '', // verification code
  region: '+86', // region code
  isAgree: false, // agreement consent
})
```

## Component Details {#components}

**index.vue**

Main container for the login page, coordinates the display and interaction of subcomponents

**hooks.tsx**

Encapsulates all login-related business logic

- Step state management (`currStep`)
- Reactive form data binding
- Button state calculation (`allowClick`)
- Login flow control (`handleClick`)

**PasswordForm**

Provides account and password input interface

> Supports mobile/email input (max 20 chars), password box with eye icon, auto-trim spaces, transparent background style

**PhoneForm**

Mobile number input and region selection

> Project supports 6 countries/regions, region code selector, 11-digit number validation, auto-registration prompt, can be extended as needed

**VerifyCodeForm**

Verification code input and sending

> 6-digit code input, auto-send code, 60s countdown for resend, mobile number display confirmation

**TermsForm**

User agreement consent confirmation

> Checkbox component, borderless style, small font, required validation

RecoverPwd

Provides password recovery link

> Simple text link, blue theme color, click event trigger

**Other**

Login method switching and third-party login

> Login method switch, third-party login button, round icon design

The project has preset form validation steps, see table below

| Field           | Validation Rule      | Description                |
|-----------------|---------------------|----------------------------|
| **Account/Password** | Not empty validation | Max length 20 chars        |
| **Mobile Number**    | 11-digit validation  | Supports international code|
| **Verification Code**| 6-digit validation   | 60s countdown for resend   |
| **Agreement Consent**| Required validation  | Affects login button state |

## Contributors {#contributors}

[hikari](https://github.com/liuyax0818), [Kotone Fujita](https://github.com/FunEnn)
