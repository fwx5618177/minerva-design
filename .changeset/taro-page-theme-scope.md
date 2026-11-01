---
"minerva-design": patch
---

Taro: `Page` re-applies the theme of the closest `ConfigProvider` / `ThemeProvider` (mode, palette and design classes, `primaryColor` and custom theme variables). In mini-programs every page renders under its own root, outside the provider's element, so pages used to get only the default light tokens: the brand color, dark mode and palettes now reach page content. Outside the default light theme, `Page` also paints the page background and text color. React Native icons accept any `ColorValue` for `color` (e.g. the color a navigation `tabBarIcon` receives).
