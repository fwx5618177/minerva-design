---
"@minerva/lib-core": major
---

Remove duplicated components and APIs: each job now has a single primary component. No aliases or shims are kept; migrate with the table and notes below.

| Deleted                                            | Primary                                    | Folded into the primary                                                                                                        | Dropped                                                                                                        |
| -------------------------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `TextField`                                        | `Input` (+ `FormField` for label / helper) | `clearable`, `showCharCount`, password visibility toggle (`showPasswordLabel` / `hidePasswordLabel`)                           | `helperText` (use `FormField`), `icon` / `iconPosition` (use `prefix` / `suffix`), `hideBorder`, `minimal`, `borderColor`, `borderRadius`, `fullWidth`, `width`, `onChange(value)` (native `onChange(event)` now) |
| `Chip`                                             | `Tag`                                      | `avatar`, `loading`, `pressed` (toggle tag)                                                                                    | -                                                                                                              |
| `SearchButton`, `InteractiveIconButton`            | `IconButton`                               | toggle state (`pressed` / `defaultPressed` / `onPressedChange`, `aria-pressed`)                                                | `interactiveIconsMap`, `InteractiveIconProps`, `InteractiveIconType`, the search-specific button               |
| `Spinner`                                          | `ProgressIndicator` (`variant="spinner"`)  | `LoadingState` is rebuilt on `ProgressIndicator`                                                                               | `SpinnerProps`, `SpinnerSize`, `SpinnerColor`                                                                  |
| `Space`                                            | `Stack` / `HStack` / `VStack`              | `separator`, `attached`                                                                                                        | `SpaceProps`, `SpaceSize`, `SpaceAlign`, `SpaceDirection`                                                      |
| `message`, `useMessage`                            | `toast` / `useToast` + `ToastProvider`     | `toast.loading`, `toast.promise`, `toast.update`, `max`, `closable`, `icon`, `action`                                          | `placement` per message (use the provider `position`), `showProgress`, `onClick`, `maxWidth`, `zIndex`       |
| `Dropdown`                                         | `Menu`                                     | -                                                                                                                              | `DropdownProps`, `DropdownOption`                                                                              |
| `StatusIndicator`                                  | `Badge` (`dot`, standalone)                | status dot + label pattern documented on the Badge page                                                                        | click sparkle animation, `disabled`, `shape`, presence `type` / `showLabel` and its built-in presence strings |
| `error` tone (Alert, Badge, Button, IconButton...) | `danger`                                   | -                                                                                                                              | `error` as a color / variant value, `--error-color`                                                            |

**Components**

- `TextField` is removed: use `Input` inside `FormField`. `Input` gains `clearable`, `showCharCount` and a password visibility toggle. `AutoComplete` `textFieldProps` is renamed `inputProps`.
- `Chip` is removed: use `Tag`, which gains `avatar`, `loading` and `pressed`.
- `SearchButton` and `InteractiveIconButton` are removed: use `IconButton`, which gains `pressed` / `defaultPressed` / `onPressedChange`. `interactiveIconsMap` is removed.
- `Card`: the layout `type` (`noHeader`, `noFooter`, ...), the `shadow` and `subtle` variants and `bgColor` / `textColor` on `CardHeader` / `CardContent` / `CardFooter` are removed. `htmlType` is renamed `type` (native button type of an interactive card).
- `Spinner` is removed: use `ProgressIndicator` (`variant="spinner"`). `LoadingState` is rebuilt on it.
- `Space` is removed: use `Stack` / `HStack` / `VStack`, which gain `separator` and `attached`.
- `message` / `useMessage` are removed: use `toast` / `useToast` with a `ToastProvider`. Toasts gain `toast.loading`, `toast.promise`, `toast.update`, the provider `max`, and `closable`, `icon` and `action` options.
- `Dropdown` is removed: use `Menu`.
- `StatusIndicator` is removed: use a standalone `Badge dot` (with an `ariaLabel`, or `role="presentation"` next to a visible label). The unused built-in `status.online` / `offline` / `away` / `busy` strings are removed.
- `AutoCompleteInputProps` (an unused exported type) is removed.

**`danger` is the only destructive / error tone**

- `"error"` is removed as a color value: use `"danger"` (the `color` prop of every component, see "Color & variant API" below). The CSS module classes follow (`.error` -> `.danger`), and the `--tag-error-bg` / `--tag-error-text` overrides are renamed `--tag-danger-bg` / `--tag-danger-text`.
- `toast.error(...)` is renamed `toast.danger(...)`. `toast.promise(promise, { loading, success, error })` keeps `error` (it names the rejection, not a tone).
- The `--error-color` token (an alias) and its `error-color` theme key are removed: use `--danger-color`.
- The Alert icon label key `alert.icon.error` is renamed `alert.icon.danger` ("danger icon" in English).
- `error` stays where it is a state, not a tone: form `error` / `invalid` props, `Upload` item `status: "error"`, `DataTable` `error`.

**Color & variant API**

One prop selects the semantic color everywhere: `color`, typed from the shared `ColorScheme = "primary" | "neutral" | "success" | "warning" | "danger" | "info"` (defined in `@minerva/core`, re-exported as a type by `@minerva/lib-core`). Components that only support some colors type it `Extract<ColorScheme, ...>`. `color` is always a theme role, never a raw CSS color. `variant` only selects the visual style, with one meaning everywhere: `solid` (filled with the color, inverse text), `subtle` (tinted background), `outline` (transparent background, colored border and text), `ghost` (transparent, no border). Raw color override props are removed: use `className` / `style` and the documented CSS custom properties.

| Component | `color` (default) | `variant` (default) | Renamed / removed |
| --- | --- | --- | --- |
| `Button` | `ColorScheme` (`primary`) | `solid` \| `outline` \| `ghost` \| `link` (`solid`) | color-valued `variant` -> `color`; `appearance` -> `variant`; values `secondary` (use `neutral`), `accent`, `retry`, `back` removed (use an icon, e.g. `startIcon`); the classic (non-token) look and its legacy markup are removed; `ButtonColor`, `ButtonAppearance` types removed |
| `IconButton` | `ColorScheme` (`neutral`) | `ghost` \| `solid` \| `outline` (`ghost`) | color-valued `variant` -> `color` (`secondary` removed); `appearance` -> `variant`; raw `color`, `pressedColor`, `bgColor`, `hoverColor`, `fillColor` removed (use `--icon-button-color`, `--icon-button-hover-bg`, `--icon-button-pressed-color`, `--icon-button-pressed-bg`); `tooltip` picks `content` / `color` / `variant` / `shape` / `arrow` |
| `Badge` | `ColorScheme` (`primary`) | `solid` \| `subtle` \| `outline` (`solid`) | color-valued `variant` -> `color` (`secondary`, `light`, `dark` removed); `appearance` -> `variant`; `bgColor`, `textColor`, `borderColor` removed (use `--badge-bg`, `--badge-fg`, `--badge-border`); `BadgeAppearance` type removed |
| `Tag` | `ColorScheme` (`neutral`) | `subtle` \| `outline` \| `solid` (`subtle`) | `variant` (colors) -> `color` (`default` -> `neutral`); `bordered` -> `variant="outline"`; `solid` added; `bgColor`, `textColor`, `borderColor` removed (use `--tag-<color>-bg` / `--tag-<color>-text`); `TagVariant` type removed |
| `Alert` | `info` \| `success` \| `warning` \| `danger` (`info`) | `subtle` \| `outline` \| `solid` (`subtle`) | `variant` (colors) -> `color`; `type` (`default` / `outlined` / `filled`) and the `outlined` / `filled` booleans -> `variant` (`subtle` / `outline` / `solid`); `AlertVariant`, `AlertType` types removed |
| `Tooltip` | `neutral` \| `info` \| `success` \| `warning` \| `danger` (`neutral`) | `solid` \| `subtle` \| `glass` (`solid`) | `variant` is split: `dark` -> default, `light` -> `variant="subtle"`, `info` / `success` / `warning` / `danger` -> `color`, `auto` -> `variant="glass"`; `fixedDark`, `fixedLight`, `bgColor`, `textColor` removed (use `--tooltip-bg` / `--tooltip-color` through `contentClassName`); `TooltipVariant` now holds the style values |
| `Toast` (`toast()` options) | `info` \| `success` \| `warning` \| `danger` (`info`) | - | `status` -> `color`; `status: "loading"` -> `loading: true` (a boolean option; `toast.loading` / `toast.promise` set it, `toast.update(id, { loading: false })` clears it); `ToastStatus` type removed. `toast.info` / `success` / `warning` / `danger` / `loading` are kept |
| `ConfirmDialog` / `confirm()` | `primary` \| `danger` \| `warning` (`primary`) | - | `intent` -> `color`; `ConfirmIntent` type removed; the cancel button is `color="neutral" variant="outline"` |
| `ProgressIndicator` | `primary` \| `neutral` \| `"current"` (`primary`) | `spinner` \| `bar` \| `wave` \| `circle` \| `dottedBar` (`spinner`) | `type` -> `variant`; `ProgressIndicatorType` -> `ProgressIndicatorVariant`; `ProgressIndicatorColor` type removed |
| `Switch` | `primary` \| `success` \| `info` \| `warning` \| `danger` (`primary`) | `slider` \| `segmented` (unchanged) | `secondary` and arbitrary CSS colors removed |
| `Checkbox` | `primary` \| `success` \| `info` \| `warning` \| `danger` (`primary`) | - | `checkmarkColor`, `boxColor`, `boxBorderColor` removed (use `--checkbox-checkmark-color`, `--checkbox-box-color`, `--checkbox-border-color`); `CheckboxColor` type removed |
| `Radio` / `RadioGroup` | `primary` \| `success` \| `warning` \| `danger` (`primary`) | - | `Radio` `type` -> `color` (`default` -> `primary`); raw `Radio` `color` / `bgColor` removed; `RadioGroup` `color` is now semantic (was a CSS color) |
| `Tabs` / `Tab` | `ColorScheme` (`primary`) | `line` \| `enclosed` \| `soft` \| `pills` (unchanged) | `TabsColor` type removed (use `ColorScheme`) |
| `Card` | - | `default` \| `outline` \| `elevated` \| `filled` \| `ghost` | `outlined` -> `outline` |
| `Pagination` | - | `solid` \| `outline` \| `ghost` (`solid`) | `filled` -> `solid`, `outlined` -> `outline`, `text` -> `ghost` |
| `Divider` | - | `solid` \| `dashed` \| `dotted` (unchanged) | raw `color` removed (use `--divider-color`) |
| `Empty` | - | - | raw `color` and `backgroundColor` removed (use `style` / `className`) |
| `AutoComplete` | - | - | `dropdownBgColor`, `highlightBgColor`, `hoverBgColor` removed (use `--autocomplete-dropdown-bg`, `--autocomplete-option-highlight-bg`, `--autocomplete-option-hover-bg` through `dropdownClassName`) |

**Behaviour**

- Several `ToastProvider`s no longer render every toast twice: only the outermost (or first mounted) provider renders the toasts, with its own `position`, `max`, labels and portal container; the next provider takes over when it unmounts.
- `ConfirmDialog` / `confirm()` render `role="alertdialog"` (labelled by the title, described by the description). `Modal` gains `role` (`"dialog"` | `"alertdialog"`).

**Dependencies**

- `classnames` is removed: `cn` now accepts the same object / array syntax.
- Unused Radix packages are removed: `@radix-ui/react-checkbox`, `@radix-ui/react-radio-group`, `@radix-ui/react-slot`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-tooltip`.
