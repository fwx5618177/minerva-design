import { canUseDOM } from "./dom";
import { sharedState } from "./internal/shared-state";

export interface HideOthersOptions {
  /** Only elements inside `root` are hidden. @default document.body */
  root?: Element;
  /**
   * `"aria-hidden"` hides from assistive tech only; `"inert"` also blocks
   * focus and pointer interaction. @default "aria-hidden"
   */
  attribute?: "aria-hidden" | "inert";
}

/** Elements matching this selector are never hidden. */
export const KEEP_VISIBLE_SELECTOR = "[aria-live], [data-minerva-keep-visible]";

const IGNORED_TAGS = new Set(["SCRIPT", "STYLE", "TEMPLATE", "LINK", "META"]);

/**
 * Shared by every module copy, so overlapping calls from different copies
 * still count each other (and never take a pre-existing attribute for ours).
 */
const { counters, preexisting } = sharedState("hide-others.v1", () => ({
  /** attribute -> element -> number of active hideOthers() calls hiding it */
  counters: {
    "aria-hidden": new WeakMap(),
    inert: new WeakMap(),
  } as Record<string, WeakMap<Element, number>>,
  /** attribute -> elements that already had the attribute before us */
  preexisting: {
    "aria-hidden": new WeakSet(),
    inert: new WeakSet(),
  } as Record<string, WeakSet<Element>>,
}));

function hasAttribute(el: Element, attribute: string): boolean {
  if (attribute === "aria-hidden") {
    const value = el.getAttribute("aria-hidden");
    return value !== null && value !== "false";
  }
  return el.hasAttribute(attribute);
}

function hide(el: Element, attribute: string) {
  const count = counters[attribute].get(el) ?? 0;
  if (count === 0) {
    if (hasAttribute(el, attribute)) {
      preexisting[attribute].add(el);
    } else {
      preexisting[attribute].delete(el);
      el.setAttribute(attribute, attribute === "inert" ? "" : "true");
    }
  }
  counters[attribute].set(el, count + 1);
}

function unhide(el: Element, attribute: string) {
  const count = counters[attribute].get(el) ?? 0;
  if (count <= 0) return;
  if (count === 1) {
    counters[attribute].delete(el);
    if (!preexisting[attribute].has(el)) el.removeAttribute(attribute);
    preexisting[attribute].delete(el);
  } else {
    counters[attribute].set(el, count - 1);
  }
}

/**
 * Hides everything in `root` except `targets` (and their ancestors), for
 * modal dialogs: every sibling along the path from `root` to each target is
 * marked `aria-hidden="true"` (or `inert`). Live regions (`[aria-live]`) and
 * `[data-minerva-keep-visible]` elements are left alone.
 *
 * Nested-safe: overlapping calls are reference counted per element, and an
 * attribute that existed before the first call is preserved on undo.
 *
 * @returns an idempotent undo function.
 */
export function hideOthers(
  targets: Element | Element[],
  options: HideOthersOptions = {},
): () => void {
  if (!canUseDOM()) return () => {};
  const { root = document.body, attribute = "aria-hidden" } = options;
  const list = (Array.isArray(targets) ? targets : [targets]).filter(
    (target) => target && root.contains(target) && target !== root,
  );
  if (list.length === 0) return () => {};

  const targetSet = new Set<Element>(list);
  const keep = new Set<Element>();
  for (const target of list) {
    for (let el: Element | null = target; el && el !== root;) {
      keep.add(el);
      el = el.parentElement;
    }
  }

  const hidden: Element[] = [];
  const walk = (parent: Element) => {
    for (const child of Array.from(parent.children)) {
      if (keep.has(child)) {
        if (!targetSet.has(child)) walk(child);
        continue;
      }
      if (IGNORED_TAGS.has(child.tagName)) continue;
      if (child.matches(KEEP_VISIBLE_SELECTOR)) continue;
      hide(child, attribute);
      hidden.push(child);
    }
  };
  walk(root);

  let undone = false;
  return () => {
    if (undone) return;
    undone = true;
    for (const el of hidden) unhide(el, attribute);
  };
}
