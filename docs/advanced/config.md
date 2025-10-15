# Global Config {#config}

## Environment Variables {#env}

The project includes three commonly used `Vite` runtime environment variables:

- `.env`: Basic environment variables, lowest priority
- `.env.development`: Development environment variables
- `.env.production`: Production environment variables

Type definitions for all environment variables can be found in `types/global.d.ts` under `VITE_ENV`.

To add custom environment variables, follow these steps:

1. Add them to the corresponding `.env*` file. Variable names must start with `VITE_`, otherwise `Vite` cannot recognize them.
2. Supplement the new variable type in the `VITE_ENV` type definition.
3. If you need to set a default value, you can add it in the `processEnv` method in `build/utils.ts`.

## Project Configuration {#conf}

Careful developers may notice a `config.json` file under the `public` directory, which is used to store some global configuration items across versions.

You can use the `useGlobal` method provided by `src/utils/global.ts` to get these configurations.

For more details, refer to the `GlobalConfig` and `GlobalProperties` type definitions in `types/global.d.ts`.

**Note: `config.json` is not suitable for frequent changes, as it is not friendly to caching. Please ensure configuration items are stable before modifying.**

## Contributors {#contributors}

[hikari](https://github.com/liuyax0818)
