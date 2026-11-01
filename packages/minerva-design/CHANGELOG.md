# minerva-design

## 1.12.1

### Patch Changes

- 7884716: Taro: `Page` re-applies the theme of the closest `ConfigProvider` / `ThemeProvider` (mode, palette and design classes, `primaryColor` and custom theme variables). In mini-programs every page renders under its own root, outside the provider's element, so pages used to get only the default light tokens: the brand color, dark mode and palettes now reach page content. Outside the default light theme, `Page` also paints the page background and text color. React Native icons accept any `ColorValue` for `color` (e.g. the color a navigation `tabBarIcon` receives).

## 1.12.0

### Minor Changes

- eec52cc: Icons: 16 new icons, 515 in all: `calendar-check`, `calendar-plus`, `calendar-days`, `bookmark-plus`, `book-plus`, `book-a`, `clipboard-check`, `check-check`, `history`, `bell-ring`, `party-popper`, `notebook-pen`, `list-todo`, `folder-kanban`, `file-json` and `palette`. They are available on every icon entry (React, Vue, Angular, Web Components, React Native, Taro) and in `toSvg`.
- eec52cc: React Native and Taro icons: the new entries `minerva-design/native/icons` and `minerva-design/taro/icons` export `Icon`, `DynamicIcon`, `createIcon` and one component per icon (`SearchIcon`…), colored by the theme text color by default. React Native draws with `react-native-svg` (an optional peer dependency, only needed by this entry; `minerva-design/native` does not import it); on the web (react-native-web, Expo web) the icons get ARIA attributes instead of the React Native accessibility props. Taro renders an `Image` with an SVG data URI and works in mini-programs and H5. The icon core adds `toSvgBase64DataUri`.
- eec52cc: Brand color: the theme providers get a `primaryColor` option (React `ConfigProvider` / `ThemeProvider`, Vue, Angular, React Native `MinervaProvider`, Taro, uni-app, WeChat, and `<minerva-config primary-color>`). Give one CSS color, whose dark-mode value is derived for contrast on dark surfaces (`#4f46e5` → `#7b85f2`), or a `{ light, dark }` pair. Every token derived from the primary color (hover, active, subtle, border, text, focus ring, selection) follows it; it wins over the palette's primary, nested providers can set their own and `null` restores the theme's. The core adds `resolvePrimaryColor`, `derivePrimaryDark`, `primaryColorTokens` and `paletteAccents`.
- eec52cc: ProgressIndicator: a determinate mode. `value` (with `max`, default 100) fills the bar or ring to that amount instead of spinning, `showValue` prints the percentage and `format` customizes it. `color` adds `success`, `warning`, `danger` and `info`. Available in React, Vue, Angular, Web Components (`<minerva-progress value max show-value>`) and Taro; the uni-app and WeChat components already had a value mode. A label next to a bar now stays on one line when there is room (the track takes the remaining width) and wraps between words.
- eec52cc: New `WeekStrip` component: a one-week row of days to pick a date, with previous / next week buttons, today highlighted and per-day markers (a dot, or a count). Props: `value` / `onChange`, `week` / `onWeekChange`, `firstDayOfWeek` (Monday by default), `today`, `markers`, `showNavigation` and `size`. On every renderer: React, React Native, Taro, Vue, Angular (`MnWeekStrip`), Web Components (`<minerva-week-strip>`), uni-app and WeChat. The core adds `weekStart()`.

### Patch Changes

- eec52cc: Angular: `mn-progress` / `mn-progress-indicator` now draws its indicator. The spinner, circle, wave, bar and dotted-bar variants rendered an empty element before, so `mn-loading-state` had no spinner either. Bars get the 200px default width of the other renderers.
- eec52cc: Docs: a Changelog page lists every release and the upcoming one, the home page shows the current version, and there are new pages and demos for WeekStrip, the determinate ProgressIndicator and the brand color. The Icon page gets a React Native tab with a live demo and API tables for `minerva-design/native/icons`, and the arrow of the home page's "Get started" button is white again.

## 1.11.0

### Minor Changes

- b50696a: Icons: the set grows from 202 to 499 original icons in 23 categories (weather, nature, food, people, places, shapes, text, education, health, shopping, music, tools and sports are new), and some icons are drawn in colour. `IconDefinition` gets an optional `colors` array (one color per path, `undefined` keeps the drawing color), honored by the React, Vue, Angular and Web Components icons, `toSvg`, `drawIcon`, `IconCanvas` and the canvas icons. Colors apply to strokes only. The icons gallery shows the whole set on the page, with no nested scroll box. The home page hero buttons get a background.

## 1.10.0

### Minor Changes

- b7dd085: The icon set for Vue, Angular and Web Components. `minerva-design/vue/icons` has `Icon`, `IconCanvas`, `DynamicIcon`, `createIcon`, one component per icon (`SearchIcon`…) and the opt-in `MinervaVueIcons` plugin (`<MnIcon>`, `<MnIconCanvas>`, `<MnDynamicIcon>`, typed by `minerva-design/vue/icons-global`). `minerva-design/angular` adds `MnIcon`, `MnIconCanvas` and `MnDynamicIcon`. The optional entry `minerva-design/web-components/icon` registers `<minerva-icon name="search">` and `<minerva-icon-canvas>` (not in the all-in-one entry or the CDN bundle). Each binding renders inline SVG by default and accepts the same `renderer` values as React; in Vue and Angular, as in React, the canvas renderers load with the first canvas icon. All of them share the single copy of `minerva-design/icons/core`.

## 1.9.0

### Minor Changes

- b1e8e8f: New icon set: `minerva-design/icons` and `minerva-design/icons/core`. 202 original icons drawn for Minerva on a 24×24 grid (2px strokes, round caps and joins) in 10 categories. Each icon is a tree-shakeable constant (`searchIcon`) and a React component (`SearchIcon`). `Icon` renders inline SVG by default, server-rendered and colored by `currentColor`; with `renderer="auto" | "webgpu" | "webgl2" | "webgl" | "canvas2d"` it draws on a canvas through a backend shared by the page. `IconCanvas` draws thousands of icons in a few instanced GPU draws (4× MSAA, one blend per icon), falling back WebGPU -> WebGL2 -> WebGL -> Canvas2D like the charts. `createIcon`, `defineIcon` and `DynamicIcon` cover custom icons and icons chosen by name. The framework-free core adds `toSvg`, `toSvgDataUri`, `drawIcon`, `createIconCanvas`, `createIconSurface`, `setDefaultIconRenderer` and the geometry helpers (`parseIconPath`, `flattenIconPath`, `tessellateIcon`).

## 1.8.0

### Minor Changes

- b8036ec: QuadrantChart: drag and double-click feedback. React gets `onPointDrag`, which reports every move of a dragged dot with the quadrant under the pointer, and `onPointDoubleClick`, which fires when the same dot is clicked twice quickly (`onPointClick` still fires for each click). While a dot is dragged, React also highlights the quadrant it would drop into. The same events are on Vue (`pointDrag`, `pointDoubleClick`), Angular (`pointDrag`, `pointDoubleClick`), and `<minerva-quadrant-chart>` (`minerva-point-drag`, `minerva-point-double-click`). Setting `onPointDrag` alone now makes the dots draggable, the same as `onPointDrop`.

## 1.7.1

### Patch Changes

- docs(site): split the docs into docs, components and charts sections

## 1.7.0

### Minor Changes

- test(docs): give the feed crossing test room under ci coverage
  feat(charts): order book heatmap legend, size unit, rank-blended heat and fast smoke check

## 1.6.1

### Patch Changes

- fix(charts): readable bookmap heat field, exact front transparency layer and gantt routing

## 1.6.0

### Minor Changes

- feat(charts): gantt dependency arrows, x log axes, live renderer switching and 3d oit

## 1.5.0

### Minor Changes

- test: give the heavy demo-source and rn corner geometry checks a ci timeout
  chore(docs): keep the generated chart api file out of prettier
  docs(charts): document relationship charts, renderer switch and new trading demos - new graphCharts category: graph-chart, dependency-graph, tree-chart and chord-chart - sticky renderer selector with per-demo backend badges on every chart page - new candlestick, trading-chart and technical-indicators demos, galaxy and heatmap polish - chart api tables load on demand from api.charts.generated.json
  feat(charts): add graph, dag, tree and chord charts, pro trading tools and a global renderer - graph module: createGraphChart with force (barnes-hut, worker), dag (sugiyama), tree, radial, mind map, org, circular and arc layouts; GraphChart, DependencyGraph, TreeChart - shape engine: chord diagram (ChordChart), bullet names wrap instead of truncating - setDefaultChartRenderer / getDefaultChartRenderer / subscribeDefaultChartRenderer - gantt item tooltip, aligned tooltip columns, oklab heatmap ramps with legend and new hover, hollow box plot outliers, waterfall connectors, log axes on both y axes - trading: sar, ichimoku, supertrend, keltner, donchian, obv, cci, stoch rsi, dmi, williams r, mfi, volume profile, channel/pitchfork/arrow/text/position drawings, undo/redo, style toolbar, syncCharts, replay, sessions, time zones, export, order entry - order book heatmap: fixed spread fill, profile panel, axis label collisions and fit - 3d: glow and additive point styles, dpr-correct sizes, cross-mesh transparency sorting - vue: charts register through the opt-in MinervaVueCharts plugin (minerva-design/vue/charts) - wrappers for the new charts in vue, angular, web components, rn, taro, uni and weapp

## 1.4.0

### Minor Changes

- test(docs): give the first vue tab load more time under ci coverage
  test(charts): cover the framework chart wrappers and steady ci timing budgets
  docs(charts): localize chart docs, add new chart pages, showcases and framework demos
  feat(charts): add trading, order book, 3d charts, 13 chart types, webgl backend and wrappers

## 1.3.0

### Minor Changes

- docs(charts): document the new chart types, the gallery and a performance guide
  feat(charts): add area, candlestick, heatmap, sparkline, pie, radar, gauge, funnel and treemap

## 1.2.0

### Minor Changes

- docs(charts): document canvas charts, mini-program and React Native charts
  feat(charts): add charts for Taro, uni-app, WeChat and React Native
  feat(charts): add headless controller, canvas renderer and draggable points

## 1.1.0

### Minor Changes

- feat(charts): add zero-dependency GPU charts (WebGPU, WebGL2, Canvas2D)

## 1.0.2

### Patch Changes

- fix(react): keep Tooltip asChild trigger mounted when disabled toggles

## 1.0.1

### Patch Changes

- 16a19a3: Complete DatePicker platform exports, bounded date selection, controlled values and accessible interactions; synchronize component contracts, framework examples and package metadata. Fix the delivery checks blocking the 1.0.1 release.

## 1.0.0

### Major Changes

- First stable release of Minerva Design, distributed as one package with React, Vue, Angular, Web Components, React Native, Taro, WeChat and uni-app entrypoints.

  - Shared design tokens, configurable themes, localization and framework-specific component renderers.
  - Typed public entrypoints, optional framework peer dependencies, stylesheets and native/mini-program assets.
  - Documentation with interactive examples, API references, platform support details and localized promotional films.
  - Unit, cross-renderer contract, distribution, browser and official mini-program SDK checks.

  Supported APIs and platform-specific limitations are documented in the support matrix. Migrating existing novel-ui applications requires adapting imports and component contracts; this release does not promise a package-name-only replacement.
