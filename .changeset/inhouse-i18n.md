---
"@minerva/core": minor
"@minerva/lib-core": major
---

Replace `i18next` / `react-i18next` with a tiny in-house translator.

- `@minerva/core`: new framework-agnostic, server-safe `createTranslator({ messages, language, fallbackLanguage })` and `translate(config, key, options)` (plus `interpolate` and `getPluralCategory`): nested keys, `{{name}}` interpolation, plurals by `count` via `Intl.PluralRules` (`key_one`, `key_other`, ...), fallback to the base language, the fallback language (default `"en"`), `defaultValue`, then the key.
- `@minerva/lib-core`: built-in texts are translated with that translator and a module-level global language store (root `ConfigProvider` / `useLocale` set it, nested `ConfigProvider` `locale` still scopes its subtree). `i18next` and `react-i18next` are no longer dependencies.

**Breaking:** `useI18n()` now returns `{ t, language }` only — the `i18n` (i18next) instance is no longer returned, and `t` is a plain `(key, options?) => string` function (exported type `TranslateFn`).
