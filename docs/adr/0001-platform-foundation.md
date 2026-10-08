# ADR 0001: Platform foundation (one headless core, native renderers)

- Status: accepted
- Date: 2026-10-09

## Context

Minerva ships React 19 (DOM) components and Lit Web Components. The owner
decided that every other platform gets a **native** implementation (not Web
Component wrappers): Vue 3 (SFC), Angular (standalone components), React
Native + Expo, Taro (React-syntax mini-programs + H5), WeChat native custom
components and uni-app (Vue 3). All of them ship inside the single published
`minerva-design` package:

| Platform            | Entry                                       |
| ------------------- | ------------------------------------------- |
| React (web)         | `minerva-design`                            |
| Web Components      | `minerva-design/web-components`             |
| Vue 3               | `minerva-design/vue`                        |
| Angular             | `minerva-design/angular`                    |
| React Native + Expo | `minerva-design/native`                     |
| Taro                | `minerva-design/taro`                       |
| uni-app             | `minerva-design/uni`                        |
| WeChat mini-program | `package.json` `miniprogram` → `dist/weapp` |

Eight renderers must not diverge in behaviour, API or look.

## Decision

1. **Platform-neutral core** (`packages/core`, `@minerva/core` → `dist/core`):
   no DOM access at all (ESLint `no-restricted-globals` /
   `no-restricted-imports`, no `DOM` lib in `tsconfig.json`, Node test
   environment, `src/platform-neutral.test.ts` imports every module with the
   browser globals and `Intl.PluralRules` removed). It holds the design tokens
   (TypeScript source of truth and generators), theme data and design presets,
   i18n (with built-in plural rules for engines without `Intl.PluralRules`),
   the headless state machines (`machines/`), the component contracts
   (`contracts/`), keyboard navigation / typeahead math, validation and the
   pure helpers.
2. **DOM layer** (`packages/dom`, `@minerva/dom` → `dist/dom`): focus scope,
   dismissable layers, scroll lock, hide-others, roving focus (DOM binding),
   portal, positioning (`@floating-ui/dom`), pointer grace, presence,
   direction, theme DOM / cookie helpers. Only web renderers import it.
   `minerva-design/core` is `dist/dom/core-web.*` (`core` + `dom`), the same
   API it exposed before the split.
3. **One build output per private workspace package**, renderer builds keep
   `@minerva/core` / `@minerva/dom` external and `tools/core-imports.mjs`
   rewrites them to relative paths, so the core is shipped once.
4. **Behaviour as state machines** (`{ getState, send, subscribe }`) in the
   core; renderers are thin adapters (React `useSyncExternalStore`, Lit
   controllers, later Vue refs / Angular signals / mini-program `setData`).
5. **Component contracts** (props, enums, defaults, events, slots, tracks,
   per-platform status) validated against the React types and
   `custom-elements.json`; they drive the docs support matrix and the shared
   contract test suites (`tests/contracts/`), which every renderer runs
   through its own driver.
6. **Tokens** are TypeScript data generating `tokens.css` (golden-tested
   byte-identical to the former Sass output), class-based `tokens.mini.css`
   for mini-programs (split per palette for package size budgets) and
   `resolveTokens()` concrete values (sRGB `color-mix` implemented to match
   CSS) for React Native.
7. **pnpm catalogs** pin one React per family: `web` (react ^19.3),
   `native` (react 19.2.3 + react-native ~0.86.3, Expo SDK 57), `taro`
   (react ^18.3), plus `vue`, `uni`, `angular`, `weapp`. The planned renderer
   packages (`packages/{vue,angular,native,taro,weapp,uni}`) are private, have
   a no-op build and a placeholder entry that is **not** exported by
   `minerva-design` until implemented (`PLANNED_RENDERERS` in
   `packages/minerva-design/scripts/sync-package.mjs`).
8. **Testing: Vitest only** (unit and e2e, never Playwright). Each platform's
   component-testing setup was spiked (ADR 0002 to 0007) and is kept as a
   passing Vitest project in the renderer package (`spike/`).

## Consequences

- Moving a module between core and dom: `node tools/codemods/core-dom-imports.mjs`.
- Toolchain floor: Vitest 5 declares Node `^22.12 || ^24 || >=26`; Angular 22
  declares Node `^22.22.3 || ^24.15`; `@testing-library/react-native` 14
  declares Node `^22.13 || >=24`. Tests therefore run on Node 22 (CI,
  `.nvmrc`) / 24. Building the package and the docs (`deploy.yml`) still
  works on Node 20.19+ (Vite 8, the renderer packages build nothing yet).
- Installing the workspace pulls the spike toolchains (Angular, React Native,
  Taro, miniprogram-simulate). They are dev dependencies of private packages
  and never reach `minerva-design`'s dependencies.
