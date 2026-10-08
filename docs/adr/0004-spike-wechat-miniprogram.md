# ADR 0004: Spike, WeChat native custom components under Vitest

- Status: accepted (GO)
- Date: 2026-10-09
- Time box: ~45 min
- Code: `packages/weapp/spike/` (`pnpm vitest run --project weapp`)

## Versions

`miniprogram-simulate` 1.6.2 (depends on `j-component ^1.4.10`,
`miniprogram-compiler: latest`), `j-component` 1.4.10 (`weapp` catalog; the
lockfile pins the `latest` ranges of their dependencies).

## Setup

- No `server.deps.inline`, no setup file: the CJS package works through
  Node's interop; importing it installs the `Component`, `Behavior` and `wx`
  globals and registers the built-in `wx-*` tags.
- A DOM environment is required (`node` fails with `window is not defined`):
  happy-dom (used) and jsdom both work. jsdom 30 needs Node >= 22.22.2.
- **Object form**: `simulate.load({ tagName, template, ...definition })` with
  the definition (`properties`, `data`, `methods`, `behaviors`,
  `usingComponents` mapping tags to ids returned by other `load` calls)
  exported as a plain ES module (`spike/button/definition.ts`). Only the
  `dist/weapp` entry will call `Component(definition)`.
- Always pass `tagName` (otherwise the root tag is random), and `await
simulate.sleep()` after `dispatchEvent("tap")` (events fire on a microtask).
- Path form (`simulate.load(path, tagName, { compiler })`) also works for
  `.js/.wxml/.wxss/.json` folders: the `.js` must be CommonJS (the fixture
  folder has `{ "type": "commonjs" }`); classes are prefixed with the tag name
  and rpx is converted to px. `compiler: "official"` runs a bundled native
  `wcc` binary; prefer `compiler: "simulate"` in CI.
- Typings: `j-component`'s `index.d.ts` lacks `addEventListener`; augmented in
  `spike/j-component.d.ts` (`j-component` is a direct dev dependency).

## Decision

GO: WeChat components will be authored as ES-module definitions + templates
and unit-tested with miniprogram-simulate's object form under Vitest.
