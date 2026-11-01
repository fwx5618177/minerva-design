---
"minerva-design": minor
---

Brand color: the theme providers get a `primaryColor` option (React `ConfigProvider` / `ThemeProvider`, Vue, Angular, React Native `MinervaProvider`, Taro, uni-app, WeChat, and `<minerva-config primary-color>`). Give one CSS color, whose dark-mode value is derived for contrast on dark surfaces (`#4f46e5` → `#7b85f2`), or a `{ light, dark }` pair. Every token derived from the primary color (hover, active, subtle, border, text, focus ring, selection) follows it; it wins over the palette's primary, nested providers can set their own and `null` restores the theme's. The core adds `resolvePrimaryColor`, `derivePrimaryDark`, `primaryColorTokens` and `paletteAccents`.
