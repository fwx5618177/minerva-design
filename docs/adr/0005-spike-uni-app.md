# ADR 0005: Spike, uni-app components with Vue Test Utils

- Status: accepted (GO)
- Date: 2026-10-09
- Time box: ~25 min
- Code: `packages/uni/spike/` (`pnpm vitest run --project uni`)

## Setup

- Vue 3.5.43, `@vitejs/plugin-vue` 6.0.9 (supports Vite 8), `@vue/test-utils`
  2.5.1, happy-dom; `@dcloudio/types` 3.4.32 for the global `uni` typings
  (zero dependencies). No `@dcloudio/*` runtime: `@dcloudio/uni-h5`'s `vue3`
  tag pins vue 3.4.21 and pulls the whole H5 toolchain.
- uni built-ins collide with HTML / SVG tags (`view`, `text` are SVG,
  `button`, `input`, `image` HTML), so Vue compiles them as native elements
  and stubs never apply. The package's Vite config overrides the compiler's
  `isNativeTag` to exclude them (like uni-app's own compiler), which turns
  them into `resolveComponent("view")`; `spike/support/uni-built-ins.ts`
  registers shims (`View` → `div`, `Text` → `span`, `Button` → `button`, `tap`
  mapped from DOM `click`) in `config.global.components` (capitalized names:
  lowercase ones trigger Vue's reserved-tag warning).
- `globalThis.uni` is a `vi.fn()` mock installed with `vi.stubGlobal` in the
  setup file, reset before each test.
- Keep the `isNativeTag` override in the uni package only (plain Vue keeps
  native `<button>` / `<input>`).

## Decision

GO: uni-app components are tested like Vue components, with built-in shims
and a mocked `uni` API.
