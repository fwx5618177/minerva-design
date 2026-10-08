# ADR 0006: Spike, Vue 3 SFC + Vue Test Utils under happy-dom

- Status: accepted (GO)
- Date: 2026-10-09
- Time box: ~25 min
- Code: `packages/vue/spike/` (`pnpm vitest run --project vue`)

## Setup

- `vue` 3.5.43, `@vitejs/plugin-vue` 6.0.9 (peer `vite ^5 || ^6 || ^7 || ^8`),
  `@vue/test-utils` 2.5.1, `@testing-library/vue` 8.1.0, `vue-tsc` 3.3.12
  (type-checks `.vue` with TypeScript 6), all in the `vue` catalog.
- Vitest config: `plugins: [vue()]`, `environment: "happy-dom"`. Nothing else.
- `<script setup lang="ts">` with `withDefaults(defineProps<...>())` and typed
  `defineEmits`; tests cover classes per variant, `emitted("press")`,
  disabled / loading ignoring clicks, `setProps`, slots, and role queries via
  Testing Library.

## Decision

GO: the native Vue renderer is tested with Vue Test Utils (and Testing Library
where role queries read better) under happy-dom.
