# ADR 0003: Spike, Taro components under happy-dom

- Status: accepted (GO)
- Date: 2026-10-09
- Time box: ~45 min
- Code: `packages/taro/spike/` (`pnpm vitest run --project taro`)

## Versions (verified on npm, 2026-10-09)

`@tarojs/components`, `@tarojs/components-react`, `@tarojs/taro`,
`@tarojs/runtime`, `@tarojs/shared`: 4.3.0 (`latest`). `@tarojs/react`
(mini-program renderer) peers `react ^18`, hence the `taro` catalog on
**react ^18.3.1** (`@testing-library/react` 16 supports React 18 and 19).

## Setup

`packages/taro/vitest.config.ts`:

- alias **exactly** `@tarojs/components` → `@tarojs/components-react` (the H5
  React implementation); its own subpath imports
  (`@tarojs/components/lib/react`, `.../dist/components`) must still reach the
  real package;
- alias `@tarojs/taro` → `spike/support/taro-mock.ts` (spy-able APIs:
  `showToast`, `navigateTo`, `getSystemInfoSync`...). Aliasing to
  `@tarojs/taro-h5` does not work: it only has named exports and Taro's build
  rewrites `Taro.xxx` with a Babel plugin;
- alias `tlbs-map-react` (only used by `<Map>`, ships only a `module` field)
  to an empty module;
- `define` the build-time globals that `@tarojs/runtime` reads at import
  (`ENABLE_INNER_HTML`, `ENABLE_ADJACENT_HTML`, ..., `DEPRECATED_ADAPTER_COMPONENT`,
  `process.env.TARO_ENV = "h5"`...);
- pnpm: `allowBuilds` entries for `@swc/core` / `esbuild` pulled by
  `@tarojs/helper`.

## Findings

- `View` → `div`, `Text` → `span.taro-text`; `className` / `style` reach the DOM.
- H5 `<Button>` renders a `div.taro-button-core` (no implicit `button` role,
  no native `disabled`): the library must add `role="button"` /
  `aria-disabled` itself; `disabled` is honoured in JS (`taro-btn-disabled`).
- The components barrel registers the Stencil `taro-*-core` custom elements in
  happy-dom: works, negligible cost.
- happy-dom keeps named colors as written: assert raw style values.

## Decision

GO: Taro components are tested with Vitest + happy-dom + Testing Library
through the H5 React implementation.
