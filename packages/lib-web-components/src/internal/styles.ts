import { unsafeCSS, type CSSResult } from "lit";

const shared = new Map<string, CSSResult>();

/**
 * One `CSSResult` per stylesheet text, shared by every element that renders
 * it: Lit then builds a single constructable `CSSStyleSheet` for it and
 * adopts that same sheet in every shadow root (`adoptedStyleSheets`).
 *
 * lib-core's component stylesheets are reused by several elements (e.g. the
 * IconButton sheet by 9 elements, the Tabs sheet by tabs / tab / tab
 * panel): wrapping them with `unsafeCSS()` at each call site created one
 * sheet per element class, parsing the same CSS again for each.
 */
export function sharedStyles(cssText: string): CSSResult {
  let result = shared.get(cssText);
  if (!result) {
    result = unsafeCSS(cssText);
    shared.set(cssText, result);
  }
  return result;
}
