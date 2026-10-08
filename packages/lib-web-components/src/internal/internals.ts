/** Internals attached to each element (`attachInternals()` works once) */
const attached = new WeakMap<HTMLElement, ElementInternals | null>();

/**
 * `el.attachInternals()`, or `null` where unsupported (Node / SSR shims
 * without it). Idempotent: every caller (the element, the styling hooks of
 * the base class) gets the same internals. Call it from the constructor (or
 * a field initializer) when the element needs them before its first update.
 */
export function attachInternals(el: HTMLElement): ElementInternals | null {
  if (attached.has(el)) return attached.get(el)!;
  let internals: ElementInternals | null = null;
  if (typeof el.attachInternals === "function") {
    try {
      internals = el.attachInternals() as unknown as ElementInternals;
    } catch {
      internals = null; // `disabledFeatures = ["internals"]`, not custom...
    }
  }
  attached.set(el, internals);
  return internals;
}
