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
| `i18n`              | `messages`, `SUPPORTED_LANGUAGES`, `DEFAULT_LANGUAGE`, `isSupportedLanguage`, `mergeMessages`     |

```ts
import {
  autoPosition,
  applyPosition,
  createDismissableLayer,
  createFocusScope,
} from "@minerva/core";

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

## Translations

The `i18n` module ships the built-in strings of the components as plain data
(no i18n runtime): one message tree per language (`en`, `zh`, `ja`, `fr`),
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

`@minerva/lib-core` loads these bundles into its private i18next instance
(the `index` namespace); other adapters can feed them to any i18n library.

## License

MIT
