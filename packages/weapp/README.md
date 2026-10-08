# @minerva/weapp (private, planned)

**Status: planned.** The WeChat mini-program renderer of Minerva: native custom components (WXML / WXSS / JS), built on the
shared headless core (`@minerva/core`: state machines, component contracts,
tokens, i18n).

It will ship inside the single published package as `package.json "miniprogram" field -> dist/weapp`. Until it is
implemented the package has no build output (`build` is a no-op), and the
entry is **not** in the `exports` map of `minerva-design` (see
`PLANNED_RENDERERS` in `packages/minerva-design/scripts/sync-package.mjs`).

- `src/index.ts`: placeholder entry (exports nothing yet).
- `spike/`: the testing spike of this platform, kept as a passing Vitest
  project (`pnpm vitest run --project weapp`); see
  [`docs/adr/0004-spike-wechat-miniprogram.md`](../../docs/adr/0004-spike-wechat-miniprogram.md) for the setup and the
  go / no-go decision.
- Dependencies come from the `weapp` pnpm catalog (`pnpm-workspace.yaml`).

When implementing it: add the components on top of the core machines, a
driver for the shared contract suites (`tests/contracts/`), move the
contract statuses of this platform from `planned` to `beta`, and add the
entry to the `exports` map.
