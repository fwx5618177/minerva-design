# @minerva/core

Framework-agnostic DOM primitives and theming behind the Minerva components.
Plain TypeScript and DOM APIs, no framework dependencies, and safe to import
during SSR (nothing touches `window` or `document` until you call it). The only
runtime dependency is `@floating-ui/dom`, used by the positioning module.

```sh
pnpm add @minerva/core
```

| Module              | API                                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `id`                | `createId(prefix?)`                                                                               |
| `controllable`      | `createControllableState({ value, defaultValue, onChange })`                                      |
| `dom`               | `canUseDOM`, `getActiveElement`, `contains`, `getTabbables`, `getFocusables`, `focusElement`, ... |
| `focus-scope`       | `createFocusScope(container, { trapped, loop, autoFocus, restoreFocus })`                         |
| `dismissable-layer` | `createDismissableLayer(element, { onDismiss, branches, disableOutsidePointerEvents, ... })`      |
| `scroll-lock`       | `lockScroll(target?)` returns `unlock()`                                                          |
| `hide-others`       | `hideOthers(targets, { root, attribute })` returns `undo()`                                       |
| `roving-focus`      | `getNextIndex(...)`, `createTypeahead()`, `createRovingFocus(container, options)`                 |
| `portal`            | `getPortalContainer(explicit?)`, `createPortalHost({ id, attributes, parent })`                   |
| `positioning`       | `computeAnchoredPosition`, `autoPosition`, `applyPosition`, placement helpers                     |
| `pointer-grace`     | `createPointerGrace()`, `getGraceArea`, `isPointInPolygon`                                        |
| `presence`          | `waitForExitAnimation(el)`                                                                        |
| `theme`             | theme types, `light` / `dark` / `githubDark` / `themes`, `palettes`, `applyThemeStyles`, ...      |
| `theme/theme-utils` | `THEME_INIT_SCRIPT`, `parseThemeCookies`, `serializeThemeCookie`, `PALETTES`, ... (server-safe)   |
| `i18n`              | `messages`, `SUPPORTED_LANGUAGES`, `mergeMessages`, `createTranslator`, `translate`, ...          |

```ts
import {
  autoPosition,
  applyPosition,
  createDismissableLayer,
  createFocusScope,
} from "@minerva/core";

const trigger = document.querySelector<HTMLElement>("#trigger")!;
const popover = document.querySelector<HTMLElement>("#popover")!;

const stop = autoPosition(
  trigger,
  popover,
  { placement: "bottom-start" },
  (r) => applyPosition(popover, r),
);
const scope = createFocusScope(popover, { trapped: true, loop: true });
scope.activate();
const layer = createDismissableLayer(popover, {
  branches: () => [trigger],
  onDismiss: () => {
    stop();
    scope.deactivate();
    layer.destroy();
    popover.remove();
  },
});
```

React adapters should use `React.useId()` rather than `createId()`, because
`useId` keeps ids stable between the server and client render.

## Theming and design tokens

The `theme` module holds Minerva's theme model: the token types
(`ThemeProps`, `ComponentTheme`, ...), the built-in themes and palettes,
`applyThemeStyles` / `generateCSSVariables` (write a theme as `--<token>` CSS
variables) and the cookie / no-flash init-script helpers used for SSR.
`@minerva/lib-core` re-exports all of it (`@minerva/lib-core/theme-utils` is
the server-safe subset).

The matching CSS variables (default light tokens, spacing / radius / type
scales, and the `[data-palette]` x `[data-theme]` palette blocks) are
published as a stylesheet, compiled from `src/theme/tokens/*.scss`:

```ts
import "@minerva/core/tokens.css";
```

`@minerva/lib-core/style.css` already bundles these tokens; import
`tokens.css` directly only when you use `@minerva/core` without lib-core.

The stylesheet is wrapped in `@layer minerva`: unlayered application CSS
overrides the tokens without `!important`.

## Styling hooks manifest

`@minerva/core/styling-hooks` describes the public styling hooks of every
Minerva component (the same names in React and in the web components):
component → parts → states, with their values, plus selector helpers.

```ts
import {
  reactSelector,
  stylingHooks,
  wcSelector,
} from "@minerva/core/styling-hooks";

stylingHooks.button.parts; // { root, label, "start-icon", "end-icon", spinner }
reactSelector("modal", "content", { state: "open" });
// '[data-minerva="modal"][data-part="content"][data-state="open"]'
wcSelector("modal", "content", { state: "open" });
// "minerva-modal:state(open)::part(content)"
```

The surface is locked (`styling-hooks.lock.json` in the repository): adding a
component, part, state or value is a minor change, removing or renaming one is
a major change.

## Translations

The `i18n` module ships the built-in strings of the components as plain data
plus a tiny translator: one message tree per language (`en`, `zh`, `ja`, `fr`),
assembled from `src/i18n/locales/<lng>/index.json` plus the per-group
`groups/*.json` files. Keys are identical across languages; interpolations use
`{{name}}`.

```ts
import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  mergeMessages,
  messages,
  type Messages,
  type SupportedLanguage,
} from "@minerva/core";

const zh: Messages = messages.zh; // { common: { loading: "加载中" }, ... }
const custom: Messages = mergeMessages(messages.en, {
  common: { loading: "Please wait" },
});
```

`createTranslator` (or the one-shot `translate(config, key, options)`) turns
the bundles into a `t` function. It supports nested keys (`"a.b.c"`),
`{{name}}` interpolation (no HTML escaping — renderers escape), plurals picked
by `count` through `Intl.PluralRules` (`key_zero`, `key_one`, `key_two`,
`key_few`, `key_many`, `key_other`), and falls back to the base language
(`fr-CA` → `fr`), then `fallbackLanguage` (default `"en"`), then
`defaultValue`, then the key itself. It is pure and server-safe (no DOM, no
globals; plural rules are cached per language).

```ts
import { createTranslator, messages } from "@minerva/core";

const t = createTranslator({ messages, language: "fr" });
t("pagination.page", { page: 2 }); // "Page 2"
t("monthCalendar.dayWithEvents", { date: "1 mai", count: 3 }); // "1 mai, 3 événements"
t("missing.key", { defaultValue: "Fallback" }); // "Fallback"
```

`@minerva/lib-core` uses this translator (no i18n library dependency) together with
its own global language store; other adapters can use it too or feed the
bundles to any i18n library.

## Browser support

ES2020, evergreen browsers (fully supported: Chrome / Edge 120+, Firefox 125+, Safari 17+). The modules are SSR-safe: nothing touches `window` / `document` until called. The feature matrix and fallbacks are in the [repository README](https://github.com/fwx5618177/minerva#-browser-support).

## License

MIT
