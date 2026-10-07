import type { LitElement } from "lit";

/**
 * Renders `markup` into the document body and waits until every Lit element
 * in it finished its first update. Returns the first element matching
 * `selector` (default: the first element of the markup).
 */
export async function mount<E extends Element = HTMLElement>(
  markup: string,
  selector?: string,
): Promise<E> {
  document.body.innerHTML = markup;
  await settle();
  const el = selector
    ? document.body.querySelector(selector)
    : document.body.firstElementChild;
  if (!el) throw new Error(`mount: nothing matches ${selector ?? "markup"}`);
  return el as unknown as E;
}

/** Waits for every pending Lit update in the document (and nested shadow roots). */
export async function settle(root: ParentNode = document): Promise<void> {
  // let MutationObservers / microtasks scheduled by the change run first
  await new Promise<void>((resolve) => setTimeout(resolve, 0));
  for (let i = 0; i < 5; i++) {
    const pending = collectLit(root).map((el) => el.updateComplete);
    const results = await Promise.all(pending);
    if (results.every(Boolean)) return;
  }
}

function collectLit(root: ParentNode, out: LitElement[] = []): LitElement[] {
  for (const el of Array.from(root.querySelectorAll("*"))) {
    if ("updateComplete" in el) out.push(el as LitElement);
    if (el.shadowRoot) collectLit(el.shadowRoot, out);
  }
  return out;
}

/** The shadow root of `el` (throws when missing). */
export const shadow = (el: Element): ShadowRoot => {
  if (!el.shadowRoot) throw new Error(`${el.localName} has no shadow root`);
  return el.shadowRoot;
};

/** `querySelector` inside the shadow root of `el` (throws when missing). */
export function $<E extends Element = HTMLElement>(
  el: Element,
  selector: string,
): E {
  const found = shadow(el).querySelector(selector);
  if (!found) throw new Error(`${el.localName}: no ${selector} in shadow root`);
  return found as E;
}

/** Waits `ms` milliseconds (real timers). */
export const wait = (ms = 0) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
