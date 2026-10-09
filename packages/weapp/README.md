# @minerva/weapp (private workspace)

Native WeChat component definitions for Minerva forms, selection, navigation, overlays, layout and data display. Composition parts are expressed through parent properties, named slots or instance methods where documented; see `src/manifest.ts` and the [platform guide](https://fwx5618177.github.io/minerva-design/#/platform-support). The assembled package writes native assets to `packages/minerva-design/dist/weapp`. This private workspace package is not published separately.

Use native `event.detail` payloads and `selectComponent` for public instance methods. Function-valued configuration belongs in the component's `configure(options)` API, not WXML properties. Native file selection depends on supported WeChat picker APIs; view and rich-text implementations follow the documented host contract. Monaco and browser DOM focus/iframe/portal behavior cannot run in the native WeChat component host. Taro and uni-app expose their own optional H5 Monaco entries; that does not add Monaco to native WeApp.

Unit and contract tests cover the documented component state, events, translations and tokens. `spike/device` is an app using the built native component assets. On 2026-10-09, WeChat DevTools Stable 2.01.2510280 with base library 3.17.2 exercised button/retry actions, disabled choices, committed selection, modal opening and scoped theme changes. Screenshots and exact observations are in `spike/device/evidence/verification.json` and its adjacent PNGs.

These are **developer-tool simulator results, not physical-device results**. The tourist-account runtime reported `webapi_getwxaasyncsecinfo:fail` and restricted platform API behavior. Official `miniprogram-automator` connected but page RPC timed out; `verify.cjs` fails after 45 seconds instead of claiming a pass. The 19:17 recheck verified native keyboard input with uppercase controlled owner feedback (`hello` → `HELLO`). Deprecated system-info calls now use focused SDK APIs when available, and provider styles import component-safe token selectors; both component warning categories disappeared on recompilation. Physical devices, authenticated platform APIs and complete API/visual equivalence remain unverified.

```sh
pnpm --filter @minerva/weapp typecheck
pnpm exec vitest run --project weapp
pnpm --filter @minerva/weapp build
npm ci --prefix packages/weapp/spike/device
npm run prepare:fixture --prefix packages/weapp/spike/device
npm run verify --prefix packages/weapp/spike/device
```

Build shared core token artifacts first. The fixture README documents CLI selection, reuse of an existing automation connection and the manual interaction flow. The CI `mini-sdk-build` job separately compiles the Taro and uni-app WeChat target fixtures; it does not run DevTools or validate all WeApp APIs. No upload or publication is performed. The fixture, its dependencies and simulator screenshots are outside the npm package's `files` allowlist.
