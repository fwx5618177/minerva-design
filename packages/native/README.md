# @minerva/native (private)

Sources of **`minerva-design/native`**: the React Native + Expo components of
Minerva (Expo SDK 57: react 19.2.3, react-native 0.86), mobile-first (the
`toC` track first), built on the platform-neutral core (`@minerva/core`):

- **tokens**: `resolveTokens({ mode, palette, design, overrides })` gives
  concrete colors, lengths, radii, shadows and durations; `MinervaProvider`
  resolves them for the color mode (light / dark / system via
  `useColorScheme`), the palette and the design preset (`touch` by default:
  comfortable density, 44pt touch targets, large radius);
- **behaviour**: the headless machines of `@minerva/core/machines`
  (disclosure, toast queue, selection, tabs, picker columns, field
  validation, pagination, rating, number stepper, toggles) through
  `src/internal/useMachine.ts`;
- **texts**: the core message bundles (en / zh / ja / fr, `useI18n().t`),
  mobile strings in `packages/core/src/i18n/locales/*/groups/mobile.json`;
- **API vocabulary**: the component contracts (`@minerva/core/contracts`):
  same prop names and defaults as the web renderers (`color`, `variant`,
  `size`, `disabled`, `value` / `defaultValue`, `onChange`...), with React
  Native idioms (`onPress`, `testID`, `style`).

The build (`vite build`, `vite.config.ts`) writes ESM + CJS modules and
declarations to `packages/minerva-design/dist/native/` (one file per source
module, `@minerva/core` imports rewritten to the shared `dist/core/`), plus
the TypeScript sources for the `source` condition. The `./native` entry of
`minerva-design` has `react-native` / `source` / `import` / `require`
conditions, so Metro (Expo SDK 57, package exports on) resolves it.

## Layout

| Path                                    | What                                                       |
| --------------------------------------- | ---------------------------------------------------------- |
| `src/theme/`                            | `MinervaProvider`, `useTheme`, `useTokens`, `useI18n`      |
| `src/internal/`                         | token style helpers, `useMachine`, `Overlay`, glyph `Icon` |
| `src/components/<Name>/<Name>.tsx`      | a component and its exported `<Name>Props`                 |
| `src/components/<Name>/<Name>.test.tsx` | RNTL tests (React Native renderer)                         |
| `src/components/<Name>/*.web.test.tsx`  | react-native-web + happy-dom tests                         |
| `src/manifest.ts`                       | native components and their contract (platform support)    |
| `test/`                                 | Vitest environment (ADR 0002), role helpers                |

## Conventions

- **Tokens only**: colors from `tokens.colors[...]` (`colorRole()` for the
  semantic families), sizes from `tokens.sizes` / `space` / `radius` /
  `fontSize`; no literal colors besides `"transparent"`.
- **Accessibility**: `accessibilityRole` (or `role` for roles RN's
  `accessibilityRole` lacks: `dialog`, `tablist`, `radiogroup`,
  `navigation`...), `accessibilityState` (`checked`, `selected`,
  `disabled`, `busy`, `expanded`), `accessibilityValue`,
  `accessibilityLabel`; pressable targets reach 44pt with `hitSlopFor()`.
  Containers (dialog panels, tab lists, groups) are never `accessible`
  (VoiceOver would merge their children): tests find them with
  `test/queries.ts` (`getByRoleDeep`).
- **Styling hooks**: `part(component, name, states)` sets `dataSet`
  (`data-minerva` / `data-part` / state attributes on react-native-web).
- **Props docs**: every prop has a JSDoc description and `@default` matching
  the code (the docs API tables and the contract parity test read them).
- **Tests**: RNTL 14 is async (`await render`, `await fireEvent.press`,
  `userEvent.setup()`); no snapshots.

```sh
pnpm vitest run --project native        # RNTL (React Native renderer)
pnpm vitest run --project native-web    # react-native-web + happy-dom
pnpm vitest run --project contracts-native  # shared contract suites
```

See [`docs/adr/0002-spike-react-native.md`](../../docs/adr/0002-spike-react-native.md)
for the test setup.
