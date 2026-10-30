# minerva-design

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
