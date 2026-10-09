# Platform continuation implementation plan

> Execute in this session with superpowers:executing-plans; preserve the three existing dirty worktrees.

**Goal:** Bring committed Vue, Angular and React Native implementations into the main checkout, start shipping real Taro / WeChat / uni-app components, and document verified progress.

**Architecture:** Continue ADR 0001: platform-neutral core, native renderers, one assembled public package. Web renderers share the DOM layer. Mini-program components use platform primitives and class-based tokens, without importing DOM renderers.

**Tech Stack:** pnpm, TypeScript, Vitest, Vue SFCs, Angular APF, React Native, Taro and WeChat custom components.

**Spec:** ../../adr/0001-platform-foundation.md and the user's six requirements.

## Constraints and decisions

- Keep all uncommitted files in md-vue, md-angular and md-native intact; integrate committed tips only.
- Local and GitHub repository names already match minerva-design. Name the private root minerva-design-workspace to avoid colliding with the public package filter.
- Keep packages/minerva-design: it assembles platform builds and exports; it is not a duplicate implementation.
- Never claim beta means already published. Distinguish implemented, packaged and tested from device validation and npm publication.
- Initial mini-program scope: Button, Input, Switch using native host elements, controlled values and disabled/loading guards. Other components remain planned.

## Review focus

Disabled/loading event suppression; controlled updates; preservation of Vue and Native during merge; unresolved private imports in packed files; inaccurate support/docs claims.

## Tasks

- [x] Integrate committed Vue/Native/Angular tips, resolve shared generator/docs/exports conflicts, regenerate lockfile. Run platform tests.
- [x] Add regression tests for mini-program Button/Input/Switch events, controlled updates and disabled states; confirm missing exports fail.
- [x] Implement Taro JSX, uni-app SFC and WeChat definitions/templates; add build output and package exports. Verify component tests and type checks.
- [x] Wire Angular public entry, APF and optional peers. Verify Angular build and tests.
- [x] Update generated contracts, platform support docs, usage examples and repository comparison. Explain worktrees and package boundaries.
- [x] Run full Vitest suite, typecheck, library/docs builds and package checks. Record actual results and remaining platform validation limits.
