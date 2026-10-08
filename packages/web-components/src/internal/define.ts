import { DEV, devWarn } from "./dev";

/** A custom element class that knows its tag name and the tags it renders. */
export interface DefinableElement extends CustomElementConstructor {
  /** Tag name the element registers as (e.g. `"minerva-button"`) */
  readonly tagName: string;
  /** Other Minerva elements rendered by this one (registered first) */
  readonly dependencies?: readonly DefinableElement[];
}

/**
 * Registers `element` (and the Minerva elements it depends on) in the global
 * custom element registry.
 *
 * Idempotent: an already registered tag is skipped (a warning is logged in
 * development when another class owns it, e.g. two copies of the package).
 * No-op where `customElements` does not exist (Node / SSR without a DOM
 * shim), so define entries can be imported anywhere.
 */
export function defineElement(element: DefinableElement): void {
  if (typeof customElements === "undefined") return;
  for (const dependency of element.dependencies ?? []) {
    defineElement(dependency);
  }
  const existing = customElements.get(element.tagName);
  if (existing) {
    if (DEV && existing !== element) {
      devWarn(
        element.tagName,
        "already defined by another class (is minerva-design/web-components loaded twice?); keeping the first definition.",
      );
    }
    return;
  }
  customElements.define(element.tagName, element);
}
