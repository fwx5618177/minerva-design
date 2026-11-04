# Hooks

ConfigProvider 背后的底层 Hooks：自行管理主题、语言和 React 版的翻译。

Package: minerva-design@1.20.4

Renderer: vue

Locale: zh

## Provenance

```json
{
  "schemaVersion": "2.0.0",
  "packageVersion": "1.20.4",
  "sourceCommit": "c389776dc1aa3bf80277d9c47f2c62d8f235e947",
  "sourceDigest": "sha256:350485a7623d02751b73929ca9c28a8b5c5b3a5e7da3d06f2e0538e1cd3c9843",
  "referenceSourceDigest": "sha256:96f9f31e7015b805e8eece3c05731306a461013443150c08b7b7a91a3bfc1bb6"
}
```

Type references resolve through the [type graph](/minerva-design/reference/1.20.4/types.json) or getType() from minerva-design/contracts.

## Documentation

### 参考

所有 Hooks 和工具函数都从 minerva-design 导出。

Hook

签名

在状态中保存当前主题，并在 ConfigProvider 之外将其作为 CSS 变量写入 。使用 "auto" 或 { light, dark } 组合时会订阅 prefers-color-scheme，并在卸载时取消订阅。返回配置的主题、其 setter 以及当前系统配色方案。在 ConfigProvider 内部它只管理状态： 由根 Provider 负责。

在状态中保存 locale，并在 ConfigProvider 之外切换 React 版内置文案的语言（en、zh、ja 或 fr）。返回 locale 及其 setter。在 ConfigProvider 内部它只管理状态：全局语言由根 Provider 负责。

返回 { t, language }：t 使用 React 版内置的轻量翻译器翻译 React 版自带的文案（支持嵌套 key、占位符插值、基于 count 的复数形式和 defaultValue），language 为 t 所使用的语言。t 跟随最近一个设置了 locale 的嵌套 ConfigProvider，否则使用 React 版的全局语言。React 版不依赖任何 i18n 库，因此绝不会影响应用自身的 i18n 配置。

浮层（Modal、Drawer、Popover……）的打开 / 关闭状态，支持受控（isOpen + onChange）和非受控（defaultIsOpen）两种用法。返回 isOpen 以及稳定的 onOpen、onClose 和 onToggle 回调。

拼接类名并跳过假值（false、null、undefined、0、空字符串）。用于条件类名的极简、无依赖替代方案，可代替 classnames。

只有在上方没有 ConfigProvider 时，useAutoTheme 和 useLocale 才会修改全局状态（ 上的 CSS 变量、React 版的语言）。本站在根部有一个 Provider，因此下方示例把 Hook 的状态传给嵌套的 ConfigProvider，只作用于预览区域。

### 不使用 ConfigProvider 时使用 Hooks

如果不需要 useConfig()，可以直接调用 useAutoTheme 和 useLocale 来代替 Provider。在 Provider 内部它们只保存状态：把状态传给嵌套的 ConfigProvider 即可作用于某个子树。

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
