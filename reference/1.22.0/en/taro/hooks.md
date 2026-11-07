# Hooks

Low-level hooks behind ConfigProvider: manage the theme, the language and the React library's translations yourself.

Package: minerva-design@1.22.0

Renderer: taro

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.22.0",
  "sourceCommit": "330c90a7382a7141543dcdad732a4da31d58a37e",
  "sourceDigest": "sha256:cbdfa6292d29dec33adda7a3e9cf0e027da50858956b8d08e3f7f3ed59c8d78a",
  "referenceSourceDigest": "sha256:e3be8c06635194769da4944bbccaf8bcffec3fe4bddbd369b74caf5e4553345b"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.22.0/types.json) or getType() from minerva-design/contracts.

## Documentation

### Reference

All hooks and utilities are exported from minerva-design.

Hook

Signature

Keeps the active theme in state and, outside of a ConfigProvider, writes it as CSS variables on . With "auto" or a { light, dark } pair it subscribes to prefers-color-scheme and unsubscribes on unmount. Returns the configured theme, its setter and the current system scheme. Inside a ConfigProvider it only manages the state: the root provider owns .

Keeps the locale in state and, outside of a ConfigProvider, switches the language of the React library's built-in texts (en, zh, ja or fr). Returns the locale and its setter. Inside a ConfigProvider it only manages the state: the root provider owns the global language.

Returns { t, language }: t translates the React library's built-in texts with its tiny in-house translator (nested keys, placeholder interpolation, plurals via count, defaultValue), language is the language it translates to. t follows the locale of the closest nested ConfigProvider that sets one, otherwise the React library's global language. The React library does not depend on any i18n library, so your application's own i18n setup is never affected.

Open / closed state for overlays (Modal, Drawer, Popover...), controlled (isOpen + onChange) or uncontrolled (defaultIsOpen). Returns isOpen and stable onOpen, onClose and onToggle callbacks.

Joins class names and skips falsy values (false, null, undefined, 0, empty strings). A tiny, dependency-free alternative to classnames for conditional classes.

useAutoTheme and useLocale only change global state (CSS variables on , the React library's language) when no ConfigProvider is above them. This site has one at the root, so the demos below pass the hook state to a nested ConfigProvider, which applies it to the preview only.

### Using the hooks without ConfigProvider

If you don't need useConfig(), you can call useAutoTheme and useLocale directly, instead of a provider. Inside a provider they only hold state: pass it to a nested ConfigProvider to apply it to a subtree.

```tsx
import { Button, useAutoTheme, useLocale } from "minerva-design";

// This is what ConfigProvider does internally. Use the hooks instead of
// (not inside) a ConfigProvider: both write the same global state.
export function ThemeAndLanguage() {
  const [theme, setTheme] = useAutoTheme("auto");
  const [locale, setLocale] = useLocale({ language: "fr" });

  return (
    <>
      <Button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle theme
      </Button>
      <Button onClick={() => setLocale({ language: "en" })}>
        {locale.language}
      </Button>
    </>
  );
}
```

## Installation and initialization

See [installation](./setup.md). Styles and root providers belong in the application entry. Renderer support and host testing do not imply native-device certification.
