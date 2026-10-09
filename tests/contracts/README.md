# Cross-platform contract tests

Behaviour every Minerva renderer must share, written **once** and run by one
driver per platform. The suites read the component contracts of
`@minerva/core/contracts` (props, events and their `detail` fields, platform
support), so they follow the API instead of hard-coding it.

```
pnpm test:contracts            # React / Vue / Web Components / React Native
pnpm test:contracts:mini       # shared Button / toggle / selection suites on Taro / uni-app
pnpm test:browser              # production docs in Chromium (build docs first)
```

| Path                           | What                                                                  |
| ------------------------------ | --------------------------------------------------------------------- |
| `harness/types.ts`             | `Driver` / `Handle` API and `h()` spec builder                        |
| `harness/dom.ts`               | shadow-piercing queries, ARIA roles and names (shared by DOM drivers) |
| `harness/contracts.ts`         | contract helpers (`initialProps`, `eventWith`, `detailOf`, `hasProp`) |
| `harness/suite.ts`             | `contractTest()`: every assertion must pass                           |
| `suites/*.ts`                  | the contract suites (one function per suite, taking a `Driver`)       |
| `drivers/react.tsx`            | React DOM (`@testing-library/react` + user-event)                     |
| `drivers/vue.ts`               | Native Vue SFCs with user-event                                       |
| `drivers/native.tsx`           | React Native components with RNTL                                     |
| `drivers/taro.tsx`             | Taro components with their H5 event adapter                           |
| `drivers/uni.ts`               | Real uni-app SFCs with native built-in event adapters                 |
| `drivers/wc.ts`                | Web Components (Lit in happy-dom, events through `addEventListener`)  |
| `react.test.tsx`, `wc.test.ts` | run every suite with one driver                                       |

## Suites

| Suite                                        | Contract                                                                                 |
| -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Button press                                 | a press emits `click`; `disabled` / `loading` ignore it                                  |
| Switch / Checkbox controlled vs uncontrolled | uncontrolled toggles and emits; controlled only requests; the prop drives the state      |
| RadioGroup single selection                  | one radio checked at a time, the group emits the value                                   |
| Tabs value change                            | a tab press emits its value and shows its panel                                          |
| Modal dismissal                              | Escape and a mask click close it (`open: false`), a click inside does not                |
| Toast queue                                  | `max` caps the visible toasts, the oldest closes first                                   |
| i18n labels                                  | Modal close / Pagination labels in en, zh, ja, fr through the platform's locale provider |
| Button color / variant tokens                | each `color` / `variant` value renders its class, whose rules resolve to design tokens   |

## Describing trees

Specs use **contract names**, never platform components:

```ts
h(
  "Tabs",
  initialProps(tabs, driver.platform, "value", "a"),
  h("TabList", {}, h("Tab", { value: "a" }, "Alpha")),
  h("TabPanel", { value: "a" }, "Panel A"),
);
```

A component whose support is `n/a` on the driver's platform (`TabList` has no
custom element) renders its children in place. Lowercase names are native
elements (`h("p", { "data-testid": "body" }, "text")`).

Events are logged under their **contract event name** with a `detail` object:
custom elements log `event.detail`; React maps the callback arguments onto the
contract's detail fields by position (`onChange(checked, event)` ->
`{ checked }`).

The Taro and uni-app shared suites run within their package projects so each
renderer uses its own React version or SFC compiler. They currently run the 11
Button, toggle and selection assertions; the remaining suites are not claimed
as covered there. Native device rendering and device E2E are separate from
these host tests. WeChat templates, events and compound flows have package
tests, without a shared driver yet.

## Adding or extending a renderer

1. Implement `Driver` in `drivers/<platform>.ts(x)`:
   - `render(spec, { locale })`: map contract names to the platform's
     components, set props, wrap with the platform's config / locale provider,
     and log every contract event of the platform (`EventContract` gives the
     names); return a `Handle` (`setProps` for controlled updates, `unmount`).
   - queries (`queryAllByRole`, `queryByText`, `queryByTestId`, `queryPart`):
     DOM renderers reuse `harness/dom.ts`; React Native uses its testing
     library's role / text queries; mini-program renderers query their
     simulator's node tree.
   - interactions (`press`, `type`, `keyboard`), state (`isChecked`,
     `classes`, `tokenVar`), `stylesheet(component)` (the CSS or style objects
     the platform applies) and `services.toast`.
2. Add `<platform>.test.ts` calling `runContractSuites(driver)`, with the
   platform's test environment (a separate vitest project when it needs one).
3. Assert documented host semantics directly: custom elements own checked
   state and accept parent updates; React Native checks resolved style objects
   instead of CSS classes. Do not turn failures into expected passes.
4. Set the platform's status to `beta` / `stable` in the contracts (the
   generator, `tools/generate-contracts.mjs`) once its suites pass.
