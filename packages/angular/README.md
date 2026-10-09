# @minerva/angular (private)

The **native Angular renderer** of Minerva, published inside the single
package as `minerva-design/angular` (and `minerva-design/angular/monaco`):
standalone components with signal inputs / outputs / `model()`, OnPush and
zoneless compatible, SSR / hydration safe (`@angular/ssr`), typed, tree-shaken
per component. Not a wrapper of the Web Components: the components render the
same DOM, classes and styling hooks as the React components, from the shared
headless core (`@minerva/core` machines, contracts, i18n, tokens) and the DOM
primitives of `@minerva/dom`.

| Built by `pnpm --filter @minerva/angular build` into                 | Published as                    |
| -------------------------------------------------------------------- | ------------------------------- |
| `minerva-design/dist/angular/fesm2022/minerva-angular.mjs`, `types/` | `minerva-design/angular`        |
| `.../fesm2022/minerva-angular-monaco.mjs`                            | `minerva-design/angular/monaco` |

The build (`scripts/build.mjs`) runs ng-packagr in **partial Ivy** mode (the
Angular Package Format; the application's Angular linker finishes the
compilation), after the core / dom / React builds: the classes of the
components are the scoped classes of `minerva-design/style.css`
(`scripts/styles.mjs`) and the `@minerva/core` / `@minerva/dom` imports point
at the shared copies in `dist/core` / `dist/dom` (the core ships once).

## Using it

```ts
// app.config.ts
import { provideMinerva } from "minerva-design/angular";
export const appConfig = { providers: [provideMinerva({ theme: "system" })] };
```

```jsonc
// angular.json: the shared stylesheet, once
"styles": ["node_modules/minerva-design/dist/react/style.css", "src/styles.css"]
```

```html
<button mnButton color="primary" (click)="save()">Save</button>
<mn-switch label="Wi-Fi" [(checked)]="wifi" />
<mn-config theme="dark" locale="zh"><mn-pagination [total]="50" /></mn-config>
```

## Conventions (every component)

**Files**: `src/components/<folder>/` with `<name>.ts`, `index.ts` (barrel),
`<name>.test.ts`; a styling hooks fixture per manifest component in
`src/testing/styling-hooks/<manifest-name>.ts` (also server-rendered and
hydrated by `src/ssr.test.ts` / `src/hydration.test.ts`).

**Names**: class `Mn<ContractName>` (the React export name: `MnButton`,
`MnSelectItem`), types `<Name>Size` etc. Selectors are prefixed `mn-`:

- element selectors (`<mn-switch>`, `<mn-select>`, `<mn-modal>`) by default;
- attribute selectors on the native element where it is idiomatic and the
  element matters (native semantics, forms, focus): `button[mnButton]`,
  `a[mnButton]`, `button[mnIconButton]`, `a[mnTextLink]`.

**Host element**: when React's root is a generic container (`div`, `span`,
`section`...), the host IS the root: its classes, styling hooks and ARIA are
host bindings. When React's root element matters (`label` wrapping an input,
`nav`, `table`, `ul`...), the host is `display: contents` and the template
renders React's root element.

**Inputs**: `input()` signals named like the React props, defaults from the
contracts (`@minerva/core/contracts`); booleans `transform: booleanAttribute`
(`<mn-switch disabled>`), numbers `numberAttribute`; ARIA props as aliased
inputs (`input(undefined, { alias: "aria-label" })`) moved to the right inner
element. `ReactNode` props are `MnContent` (a string or an `<ng-template>`);
children are content projection (`<ng-content />`).

**Two-way binding**: the value of a control is a `model()` (`[(checked)]`,
`[(value)]`, `[(open)]`, `[(current)]`), with the `defaultX` input of React
for the initial value when it is not bound. Like native inputs and Angular
Material, a control updates its own model and emits `xChange` (no React
"controlled" mode; see tests/contracts/expected-differences.ts).
**Outputs**: `output()` named after the React callback without `on`
(`onOpenChange` -> the model's `openChange`, `onSearch` -> `search`), never a
native DOM event name (`change`, `input`, `click`, `focus`, `blur`, `select`,
`close`, `toggle`, `submit`, `scroll`).

**Forms**: every form control extends `MnFormValueControl<T>` and provides
`provideValueAccessor(() => MnX)`: `ngModel` and Reactive Forms work, the
form's disabled state applies, `controlInvalid()` (invalid and touched /
submitted) shows the error state. `fieldWiring(injectFormField(), ...)`
merges `<mn-form-control>` (id, aria-describedby, invalid, required,
read-only, disabled).

**Styles**: `ViewEncapsulation.None`, no component styles: the classes of the
React SCSS modules (`import { buttonStyles as s } from "../../internal/styles"`,
`cn()` of `@minerva/core`, `classOf(s, key)` for optional keys), so
`minerva-design/style.css` styles both renderers.

**Styling hooks**: the same `data-minerva` / `data-part` / state attributes as
React's `hooks(...)` calls: host bindings on the root, the `MnHook` directive
(`mnHook="switch" mnPart="track" [mnStates]="..."`) on inner parts.

**Behaviour**: the machines of `@minerva/core` through `connectMachine()`;
overlays through `*mnPortal` (theme-scoped portal, nothing on the server),
`presence()` (exit animations), `overlayLayer()` (dismissable layer, focus
scope, scroll lock, hide-others) and `anchoredPosition()`; ids from
`injectId()`; built-in texts from the configuration scope
(`injectScope().t("modal.close")`, same keys as React); icons `<svg mnIcon="X">`.
No DOM access at module evaluation or while rendering on the server: DOM work
runs in `afterRenderEffect` / `afterNextRender` or behind `injectIsBrowser()`.

**Configuration**: `provideMinerva()` (root) and `<mn-config>` (nested scopes,
React's nested `ConfigProvider`), `injectMinerva()` for the scope's signals and
`setTheme()` / `setPalette()`.

## Tests

`pnpm vitest run --project angular` (Analog's Vite plugin, AOT, zoneless
TestBed under happy-dom; docs/adr/0007-spike-angular.md): unit tests per
component, the styling hooks contract, server rendering and hydration. The shared cross-platform Angular contract driver and full user-flow suite are still pending. Styling contracts currently cover Button and Switch; the remaining entries are explicit TODOs. `pnpm --filter @minerva/angular typecheck` runs `ngc`
(strict templates).
