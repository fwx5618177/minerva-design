# minerva-design

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
