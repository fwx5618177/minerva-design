# Hooks

Low-level hooks behind ConfigProvider: manage the theme, the language and the React library's translations yourself.

Package: minerva-design@1.24.4

Renderer: uni

Locale: en

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.24.4",
  "sourceCommit": "580bc03aa319a78f6f653ee0f9610fe236a93d38",
  "sourceDigest": "sha256:b9a39dcfe8b09a5d0967efee074963c408a37abb72fbe1d4c7a1eda21075df1d",
  "referenceSourceDigest": "sha256:25c00e4ed9c1ea1a2744aa521b6deba862ac402384cb19f4e7d069b72a5172c6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.24.4/types.json) or getType() from minerva-design/contracts.

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
