/**
 * Development-only diagnostics.
 *
 * `DEV` is `process.env.NODE_ENV !== "production"`, which bundlers (Vite,
 * webpack, Rollup + replace, esbuild `define`...) replace with a constant, so
 * production builds never run the checks. The `typeof process` guard keeps
 * un-bundled usage (plain `<script type="module">` / import maps, where
 * `process` does not exist) working: warnings are then off. Written as a
 * plain expression (no `try`) so that, once the bundler replaced
 * `process.env.NODE_ENV`, minifiers fold `DEV` to `false` and drop every
 * `if (DEV)` block with its message strings (the ternary form folds;
 * `typeof process !== "undefined" && ...` does not).
 */
import { formatDevMessage } from "@minerva/core";

// Typed locally: consumers do not need @types/node.
declare const process: { env: { NODE_ENV?: string } };

export const DEV: boolean =
  typeof process === "undefined"
    ? false
    : process.env.NODE_ENV !== "production";

const warned = new Set<string>();

/**
 * Logs `[minerva] <tag>: <message>` once per distinct message (development
 * only), with `console.error`: the channel and format of lib-core's warnings
 * (React's convention for prop warnings; core's `formatDevMessage`). Call
 * sites should still be guarded by `if (DEV)` so the message strings can be
 * dropped by minifiers.
 */
export function devWarn(tag: string, message: string): void {
  if (!DEV) return;
  const text = formatDevMessage(`<${tag}>`, message);
  if (warned.has(text)) return;
  warned.add(text);
  console.error(text);
}

/** Forgets the messages already logged (tests). */
export function resetDevWarnings(): void {
  warned.clear();
}
