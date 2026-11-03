# Cross-platform contract tests

Behaviour every Minerva renderer must share, written **once** and run by one
driver per platform. The suites read the component contracts of
`@minerva/core/contracts` (props, events and their `detail` fields, platform
support), so they follow the API instead of hard-coding it.

```
pnpm test:contracts            # React / Vue / Web Components / React Native
pnpm --filter @minerva/angular exec vitest run src/nativeAngular.contracts.test.ts
                               # Angular (also part of the angular project)
pnpm test:contracts:mini       # shared suites on Taro / uni-app (incl. AutoComplete on uni-app)
```

| Path                                                   | What                                                                                     |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `harness/types.ts`                                     | `Driver` / `Handle` API (incl. `combobox` reads, `notApplicable`) and `h()` spec builder |
| `harness/dom.ts`                                       | shadow-piercing queries, ARIA roles and names, combobox reads (shared by DOM drivers)    |
| `harness/contracts.ts`                                 | contract helpers (`initialProps`, `eventWith`, `detailOf`, `hasProp`)                    |
| `harness/suite.ts`                                     | `contractTest()`: every assertion must pass; `declaredNotApplicable()`                   |
| `suites/*.ts`                                          | the contract suites (one function per suite, taking a `Driver`)                          |
| `drivers/react.tsx`                                    | React DOM (`@testing-library/react` + user-event)                                        |
| `drivers/vue.ts`                                       | Native Vue SFCs with user-event                                                          |
| `drivers/native.tsx`                                   | React Native components with RNTL                                                        |
| `drivers/taro.tsx`                                     | Taro components with their H5 event adapter (re-exports the Taro package's driver)       |
| `drivers/uni.ts`                                       | Real uni-app SFCs with native built-in event adapters                                    |
| `drivers/wc.ts`                                        | Web Components (Lit in happy-dom, events through `addEventListener`)                     |
| `packages/angular/src/testing/contract-driver.ts`      | Native Angular standalone components (zoneless TestBed, user-event)                      |
| `react.test.tsx`, `vue.test.ts`, `wc.test.ts`          | run every suite with one driver                                                          |
| `packages/angular/src/nativeAngular.contracts.test.ts` | runs every suite with the Angular driver, in the `angular` project                       |

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
| AutoComplete active option                   | see below (10 tests)                                                                     |

**AutoComplete active option** (`suites/autocomplete.ts`). The active option
is the element that the combobox input's `aria-activedescendant` refers to. It
must be one of the rendered options. Picks are read from the select event
(`detail: { value, option }`). The suite checks the active-option rule from
`resolveActiveOptionIndex` in core:

- typing filters the options; ArrowDown / Enter picks the active option, emits
  it and fills its label; Escape closes the dropdown (`aria-expanded="false"`,
  no option rendered);
- while `loading` hides the options, no option is active and ArrowDown +
  Enter picks nothing;
- options shrinking below the highlight (index 2 -> one option) fall back to
  the first option with `autoHighlight`, and Enter picks it;
- reordered options (new objects, same values) keep the highlight on the same
  `value`, with and without `autoHighlight`;
- a highlighted option that becomes disabled falls back to the first enabled
  option with `autoHighlight`, and clears the highlight without it;
- without `autoHighlight`, removing the highlighted option leaves no
  `aria-activedescendant`, and Enter picks nothing.

### Platform matrix

| Platform            | Suites run                                  | AutoComplete active option                            |
| ------------------- | ------------------------------------------- | ----------------------------------------------------- |
| React DOM           | all                                         | runs                                                  |
| Vue                 | all                                         | runs                                                  |
| Web Components      | all                                         | runs (input, listbox and options in the shadow root)  |
| Angular             | all                                         | runs                                                  |
| React Native        | all                                         | declared not applicable, reported as 1 skipped test   |
| Taro (H5 host)      | Button, toggle and selection (11 tests)     | declared not applicable in the driver; not registered |
| uni-app (host)      | Button, toggle, selection and AutoComplete  | runs (21 tests in total)                              |
| WeChat mini program | none (no shared driver; package tests only) | no shared driver                                      |

## Platform differences: `notApplicable`

If a suite depends on host semantics that a platform's driver does not
provide, the driver declares it in `notApplicable` (keyed by
`OptionalSuite`) together with the reason. The suite calls
`declaredNotApplicable(driver, suite)`. That call registers a skipped test,
`not applicable on <platform>: <reason>`, so the gap shows in the report and
is never counted as a pass. If a driver neither implements the capability the
suite needs (for example `combobox`) nor declares the suite, the suite fails.
The current declarations are:

- **React Native**: its AutoComplete has no keyboard-highlighted option (no
  `aria-activedescendant`, no ArrowDown / Enter list navigation).
- **Taro**: its AutoComplete has no keyboard-highlighted option: the H5
  arrow keys move DOM focus between the options (H5 adapter), and the input
  exposes no `aria-activedescendant`. Enter picks the first enabled option
  with `autoHighlight`, never one hidden by `loading` or a closed dropdown
  (package test `input-confirm.test.tsx`).

Taro _does_ ship an AutoComplete. The declaration only records that this
suite does not drive it yet.

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
`{ checked }`). The Angular driver logs the matching outputs (`<field>Change`,
`click`). Callbacks that do not follow that pattern are listed in
`harness/contracts.ts` (`CALLBACK_DETAILS`). One example is AutoComplete's
`onSelect(option)` (Angular: `optionSelect`), which is logged as
`{ value: option.value, option }`, the same as `minerva-select`.

The Taro and uni-app shared suites run within their package projects so each
renderer uses its own React version or SFC compiler. Taro runs the 11
Button, toggle and selection assertions; uni-app also runs the AutoComplete
suite (its test host's `<input>` delivers `detail.value` like uni-h5). The
remaining suites are not claimed as covered there. Native device rendering and device E2E are separate from
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
   - `combobox` (`activeOption(input)`, `inputValue(input)`) for the
     AutoComplete suite: DOM renderers reuse `dom.combobox`. A platform that
     cannot provide it declares the suite in `notApplicable`, with the reason.
2. Add `<platform>.test.ts` calling `runContractSuites(driver)`, with the
   platform's test environment (a separate vitest project when it needs one).
3. Assert documented host semantics directly: custom elements own checked
   state and accept parent updates; React Native checks resolved style objects
   instead of CSS classes. Do not turn failures into expected passes.
4. Set the platform's status to `beta` / `stable` in the contracts (the
   generator, `tools/generate-contracts.mjs`) once its suites pass.
