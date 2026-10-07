/**
 * Development-only diagnostics.
 *
 * `DEV` is `process.env.NODE_ENV !== "production"`, which bundlers (Vite,
 * webpack, Rollup + replace, esbuild `define`...) replace with a constant, so
 * production builds never run the checks. The `try` keeps un-bundled usage
 * (plain `<script type="module">` from a CDN, where `process` does not exist)
 * working: warnings are then off.
 */
// Typed locally: consumers do not need @types/node.
declare const process: { env: { NODE_ENV?: string } };

export const DEV: boolean = /* @__PURE__ */ (() => {
  try {
    return process.env.NODE_ENV !== "production";
  } catch {
    return false;
  }
})();

const warned = new Set<string>();

/**
 * Logs `[minerva] <tag>: <message>` once per distinct message (development
 * only). Call sites should still be guarded by `if (DEV)` so the message
 * strings can be dropped by minifiers.
 */
export function devWarn(tag: string, message: string): void {
  if (!DEV) return;
  const text = `[minerva] <${tag}>: ${message}`;
  if (warned.has(text)) return;
  warned.add(text);
  console.warn(text);
}

/** Forgets the messages already logged (tests). */
export function resetDevWarnings(): void {
  warned.clear();
}
