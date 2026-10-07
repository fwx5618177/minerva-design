let counter = 0;

/**
 * Returns a new id that is unique for the lifetime of the page:
 * `"<prefix>-<n>"` with a monotonically increasing `n`.
 *
 * Intended for non-React consumers (vanilla JS, Web Components). React
 * adapters should prefer `React.useId()`, which is stable across server and
 * client renders; a module counter like this one is not SSR-hydration safe.
 *
 * @param prefix - Id prefix. @default "minerva"
 * @example
 * createId();        // "minerva-1"
 * createId("menu");  // "menu-2"
 */
export function createId(prefix = "minerva"): string {
  counter += 1;
  return `${prefix}-${counter}`;
}
