# Visual System and Interactive Documentation Implementation Plan

> **For agentic workers:** Use the executing-plans workflow for each task. The user explicitly requested direct implementation and testing without design questions.

**Goal:** Refine the library's shared visual language and deliver an interactive, polished documentation experience using actual Minerva components.

**Architecture:** Preserve public APIs, theme choices, styling hooks and platform conventions. Fix focus at shared SCSS sources consumed by React, Vue, Web Components and Angular, rather than patching application styles. Keep pointer lighting confined to the docs product showcase; provide real interactions and reduced-motion fallbacks.

**Tech Stack:** Existing React/Vue/Angular/Lit adapters, Sass, platform-neutral theme tokens, Vitest, Node CDP and installed Chrome; pnpm 11 / Node >=22.13. No Playwright or new browser automation dependency.

**Spec:** User screenshots of DatePicker and CommandDialog plus the request for a complete visual refinement and synchronized docs. Direction: restrained control surfaces, one keyboard focus indicator, consistent popup hierarchy, detailed live component examples, interactive product presentation.

## Global Constraints

- Preserve working keyboard navigation, accessible contrast, high-contrast mode, disabled/read-only/invalid states, RTL, theme isolation and existing consumer CSS overrides.
- A pointer-focused text field changes its border without the default heavy outer halo; keyboard focus remains unmistakable through one indicator.
- Do not remove all outlines globally or redesign product controls as decorative effects.
- Docs must use public minerva-design components, retain en/zh/ja/fr content and existing real promo films.
- Use real mouse/keyboard browser checks at 1440/1024/768/390; add coverage for native Vue, Angular and Web Components where styles are shared.
- Public runtime/style changes require an appropriate changeset; this release is minor because the shared DOM lifecycle helper is available to custom controls. Regenerate source-derived outputs.

## Review Focus

1. Keyboard autofocus and mouse text focus must remain discoverable without duplicate rings.
2. Invalid/disabled/unstyled fields must not regain an unintended halo or lose semantic distinction.
3. Nested controls, portals and shadow roots must preserve focus and theme ownership.
4. Pointer lighting must not obscure text or animate under reduced-motion/coarse-pointer settings.
5. Docs controls must perform real actions and all localized copy must remain complete on mobile.

## Task 1: Shared control visual system

**Files:** packages/react/src/styles/_mixins.scss; affected input/select/number/textarea/cascader/command/pagination SCSS; tests/docs/focus-rules.test.ts; affected renderer tests.

- [x] Establish a failing browser regression for excessive/duplicate focus indicators with pointer versus keyboard focus.
- [x] Implement one restrained focus contract at the shared source; preserve public overrides and forced-colors affordances.
- [x] Audit related control/overlay states and verify affected adapters and compiled style contracts.

## Task 2: Interactive documentation presentation

**Files:** apps/docs/src/pages/HomePage.tsx and home.module.scss; apps/docs/src/pages/examples; corresponding home locale keys and tests.

- [x] Preserve existing installation/platform/video content and functioning preview controls.
- [x] Build a cohesive interactive component workbench with real search/date/dialog/data interactions, responsive composition and theme-aware lighting.
- [x] Verify theme, layout and motion choices with unit tests and actual browser screenshots.

## Task 3: Cross-platform visual audit and focused consistency fixes

**Files:** affected native/mini platform styles only when a real inconsistency is found; shared tokens if justified; adapter tests.

- [x] Trace actual focus and elevation implementation across platforms; identify defects with file/line evidence.
- [x] Apply necessary consistency fixes without replacing platform-specific input conventions.
- [x] Verify supported platform behavior and report scope accurately.

## Task 4: Integrate and deliver

**Files:** docs demos/guides/locales; tools/browser UI checks; generated styles/API/contracts/references; minor changeset (the headless modality helper is a new public export).

- [x] Add documented, functional state demonstrations and regression coverage for the new focus contract.
- [x] Run focused tests, build, metadata freshness, full required checks and browser verification; inspect screenshots and fix actual failures.
- [ ] Review the combined changes; commit/push main under existing authorization and confirm CI/deployment/publishing states accurately.
