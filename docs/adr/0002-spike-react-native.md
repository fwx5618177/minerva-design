# ADR 0002: Spike, React Native component tests under Vitest

- Status: accepted (GO for both options; A is the default, B the fallback)
- Date: 2026-10-09
- Time box: ~45 min
- Code: the spike became the test setup of `packages/native`
  (`test/rn-environment.ts`, `vitest.config.ts`, `vitest.web.config.ts`;
  `pnpm vitest run --project native`, `--project native-web`)

## Versions (verified on npm, 2026-10-09)

- Expo SDK 57 (`expo@57.0.27`, dist-tag `sdk-57` = `latest`) pins
  `react 19.2.3`, `react-dom 19.2.3`, `react-native 0.86.3`,
  `react-native-web ~0.21.0` (`bundledNativeModules.json`).
- `react-native` `0.86-stable` = 0.86.3 (`latest` is 0.87.1); peer
  `react ^19.2.3`; engines `^20.19.4 || ^22.13.0 || ^24.3.0 || >= 25`.
- `@testing-library/react-native` 14.1.0 (v14 is out; engines
  `^22.13.0 || >=24`); needs the `test-renderer` peer (react-test-renderer is
  gone). `test-renderer@1.3.0` pulls `react-reconciler@0.34` (react ^19.3):
  pin **`test-renderer@1.2.0`** with react 19.2.3.
- `react-native-testing-mocks` 1.7.0 (June 2025).

These are the `native` pnpm catalog.

## Option A: react-native-testing-mocks + @testing-library/react-native 14 (GO)

Setup (`packages/native/vitest.config.ts`, `test/rn-environment.ts`):

- a **local Vitest environment** instead of the package's
  `react-native-testing-mocks/vitest` plugin, which fails on Vitest 5
  (`TypeError: environment.setup is not a function`: it points Vitest at a
  CJS build exporting `exports.default`);
- the environment pre-seeds Node's require cache with an empty
  `react-native/Libraries/Core/InitializeCore` before importing
  `react-native-testing-mocks/register` (with RN 0.86 the mocks load the
  renderer, hence `InitializeCore`, before installing its mock:
  `Invariant Violation: __fbBatchedBridgeConfig is not set`);
- `execArgv: ["--no-experimental-detect-module"]`: RN ships untranspiled Flow
  `.js` files containing `import`; Node >= 22.7 would load them as ESM before
  `@babel/register` sees them (`SyntaxError: Unexpected token 'typeof'`);
- `server.deps.external: ["react-native", "@react-native"]` (Node `require`s
  RN through `@babel/register`, Vite never transforms it), `pool: "forks"`,
  `globals: true` (RNTL registers its matchers and cleanup on the globals);
- `@react-native/babel-preset` and `babel-plugin-module-resolver` must be
  resolvable by `@babel/register` (dev dependencies of the package);
- RNTL 14: `render`, `fireEvent`, `userEvent` are **async** (await them);
  matcher types come from `@testing-library/react-native/dist/matchers/types`
  (`test/vitest-rntl.d.ts`).

Test: role query, `fireEvent.press` and `userEvent.press`, disabled ignores
presses, `toHaveTextContent`, `toBeDisabled`. ~2.5 s per file (Babel on RN,
no cache).

Risk: the mocks package is unmaintained since before RN 0.86; the two
workarounds may need updates with each RN minor. Owning the environment file
is accepted.

## Option B: react-native-web + happy-dom (GO, fallback)

`packages/native/vitest.web.config.ts`: alias `react-native` →
`react-native-web`, `.web.*` extensions first, `@testing-library/react` in
happy-dom. No workaround needed, ~0.5 s. It tests the DOM output
(`aria-disabled`, click), not native semantics: use it for fast logic tests
and keep A for native accessibility / press behaviour.

## Decision

GO with A for component tests of `minerva-design/native`, B as a fallback /
fast lane. No Jest, no Playwright.
