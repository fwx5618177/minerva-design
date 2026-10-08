# ADR 0007: Spike, Angular standalone components under Vitest

- Status: accepted (GO with Analog's Vite plugin, AOT)
- Date: 2026-10-09
- Time box: ~50 min
- Code: `packages/angular/spike/` (`pnpm vitest run --project angular`)

## Versions (verified on npm, 2026-10-09)

- Angular 22.2.2 (`latest`); `@angular/compiler-cli` peers
  `typescript >=6.0 <6.1`, so the repo's TypeScript 6.0 works (no separate
  TypeScript catalog needed).
- Angular 22 engines: Node `^22.22.3 || ^24.15.0 || >=26` (no Node 20).
- `@analogjs/vite-plugin-angular` / `@analogjs/vitest-angular` 2.8.0 (peers
  `vite ^6 || ^7 || ^8`, `vitest ^1 ... ^5`); `@angular/build` 22.2.2 is
  required in practice (Analog imports `@angular/build/private`).

## Options

| Option                                                        | Result                                                                                                                     |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Analog plugin, AOT (default)                                  | **GO** (works without `@angular/compiler` in the setup, i.e. really AOT)                                                   |
| Analog plugin, `jit: true`                                    | GO                                                                                                                         |
| `@angular/build:unit-test` (Angular CLI's Vitest builder)     | not usable: needs `ng test` + `angular.json`, not a plain Vitest project                                                   |
| Plain JIT (`import "@angular/compiler"` + TestBed, no plugin) | NO-GO for signal APIs: `input()` / `output()` are invisible to raw JIT (`NG0303: Can't set value of the 'disabled' input`) |

## Setup

- `packages/angular/vitest.config.ts`: `angular({ tsconfig: tsconfig.spec.json,
workspaceRoot })`, happy-dom, setup file `spike/test-setup.ts`:
  `import "@angular/compiler"` + `setupTestBed({ zoneless: true })` from
  `@analogjs/vitest-angular/setup-testbed` (zoneless TestBed with
  `BrowserTestingModule` / `platformBrowserTesting`).
- `tsconfig.json`: `experimentalDecorators: true`,
  `useDefineForClassFields: false`, and **every** source / test / setup file
  in `include` (a file outside any tsconfig gets no decorator transform:
  `SyntaxError: Invalid or unexpected token` on `@`).
- Zoneless: `await fixture.whenStable()` after `setInput` / signal changes.
- pnpm: allow the `esbuild` build script; deny `lmdb`, `msgpackr-extract`.

## Decision

GO: the native Angular renderer is tested with Analog's Vite plugin (AOT) and
a zoneless TestBed under Vitest. The renderer package declares Angular 22's
Node floor.
