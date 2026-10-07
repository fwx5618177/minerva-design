/**
 * Small DOM helpers shared by every primitive. All of them are safe to import
 * on the server: nothing touches `window` / `document` until called.
 */

/** `true` when running in a browser-like environment (window + document). */
export function canUseDOM(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    typeof document.createElement === "function"
  );
}

/**
 * Returns the document owning `node` (or the node itself when it is a
 * Document). Falls back to the global `document`.
 */
export function getOwnerDocument(node?: Node | null): Document {
  if (node) {
    if (node.nodeType === 9) return node as Document;
    if (node.ownerDocument) return node.ownerDocument;
  }
  return document;
}

/** The window owning `node` (falls back to the global `window`). */
export function getOwnerWindow(node?: Node | null): Window & typeof globalThis {
  return (getOwnerDocument(node).defaultView ?? window) as Window &
    typeof globalThis;
}

/** Whether `value` is an `HTMLElement` (realm-safe: works across iframes). */
export function isHTMLElement(value: unknown): value is HTMLElement {
  if (!value || typeof value !== "object") return false;
  const node = value as Node;
  if (node.nodeType !== 1) return false;
  const win = node.ownerDocument?.defaultView;
  if (win && value instanceof win.HTMLElement) return true;
  return typeof HTMLElement !== "undefined" && value instanceof HTMLElement;
}

/**
 * The deepest focused element, piercing open shadow roots.
 * @param root - Document or shadow root to start from. @default document
 */
export function getActiveElement(
  root: Document | ShadowRoot = document,
): Element | null {
  let active = root.activeElement;
  while (active?.shadowRoot?.activeElement) {
    active = active.shadowRoot.activeElement;
  }
  return active;
}

/**
 * Like `Node.contains`, but also returns `true` when `child` lives inside a
 * shadow tree hosted (at any depth) by `parent`.
 */
export function contains(
  parent: Node | null | undefined,
  child: Node | null | undefined,
): boolean {
  if (!parent || !child) return false;
  let node: Node | null = child;
  while (node) {
    if (parent === node || parent.contains(node)) return true;
    const root = node.getRootNode();
    node = isShadowRoot(root) ? root.host : null;
  }
  return false;
}

function isShadowRoot(node: Node): node is ShadowRoot {
  return node.nodeType === 11 && "host" in node && !!(node as ShadowRoot).host;
}

/** The event's real target, piercing open shadow roots (`composedPath()[0]`). */
export function getEventTarget(event: Event): EventTarget | null {
  const path = event.composedPath?.();
  return (path && path.length > 0 ? path[0] : event.target) ?? null;
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "area[href]",
  "button",
  "input",
  "select",
  "textarea",
  "iframe",
  "object",
  "embed",
  "audio[controls]",
  "video[controls]",
  "summary",
  "[contenteditable]",
  "[tabindex]",
].join(",");

function isDisabled(el: Element): boolean {
  if ((el as HTMLButtonElement).disabled === true) return true;
  if (el.hasAttribute("disabled") && "disabled" in el) return true;
  // A disabled <fieldset> disables its controls, except inside its first legend.
  const fieldset = el.closest("fieldset[disabled]");
  if (fieldset && "disabled" in el) {
    const legend = fieldset.querySelector(":scope > legend");
    if (!legend || !legend.contains(el)) return true;
  }
  return false;
}

function isHiddenByStyle(el: Element): boolean {
  const win = el.ownerDocument.defaultView;
  if (!win) return false;
  // `hidden` / display:none on any ancestor removes the whole subtree.
  for (let node: Element | null = el; node; node = node.parentElement) {
    if ((node as HTMLElement).hidden) return true;
    if (win.getComputedStyle(node).display === "none") return true;
    // closed <details>: only its <summary> is rendered
    if (
      node !== el &&
      node.tagName === "DETAILS" &&
      !(node as HTMLDetailsElement).open
    ) {
      const summary = node.querySelector(":scope > summary");
      if (!summary || !summary.contains(el)) return true;
    }
  }
  const visibility = win.getComputedStyle(el).visibility;
  return visibility === "hidden" || visibility === "collapse";
}

/**
 * Whether `el` can receive focus (programmatically or by pointer): a
 * focusable element that is not disabled, `inert`, hidden
 * (`hidden`, `display: none`, `visibility: hidden`, closed `<details>`)
 * nor an `<input type="hidden">`.
 */
export function isFocusable(el: Element): boolean {
  if (!el.matches(FOCUSABLE_SELECTOR)) return false;
  if (el.matches("[contenteditable='false']") && !el.hasAttribute("tabindex"))
    return false;
  if (el.tagName === "INPUT" && (el as HTMLInputElement).type === "hidden")
    return false;
  if (
    el.tagName === "SUMMARY" &&
    el.parentElement?.tagName === "DETAILS" &&
    el.parentElement.querySelector(":scope > summary") !== el
  )
    return false;
  if (isDisabled(el)) return false;
  if (el.closest("[inert]")) return false;
  return !isHiddenByStyle(el);
}

function getTabIndex(el: Element): number {
  const attr = el.getAttribute("tabindex");
  if (attr !== null && attr.trim() !== "") {
    const value = Number.parseInt(attr, 10);
    if (!Number.isNaN(value)) return value;
  }
  return 0;
}

/** Whether `el` is reachable with the Tab key (focusable, tabindex >= 0). */
export function isTabbable(el: Element): boolean {
  return isFocusable(el) && getTabIndex(el) >= 0;
}

/** Collects candidates in DOM order, descending into open shadow roots. */
function collect(root: ParentNode, out: Element[]): void {
  for (const el of Array.from(root.querySelectorAll("*"))) {
    out.push(el);
    if (el.shadowRoot) collect(el.shadowRoot, out);
  }
}

export interface TabbableOptions {
  /**
   * Keep only one radio per group (checked one, or the first when none is
   * checked), like the browser's Tab order. @default true
   */
  radioGroups?: boolean;
  /** Also consider the container itself. @default false */
  includeContainer?: boolean;
}

/**
 * Focusable elements inside `container` (DOM order, open shadow roots
 * included), including `tabindex="-1"` ones.
 */
export function getFocusables(
  container: Element | ShadowRoot,
  options: Pick<TabbableOptions, "includeContainer"> = {},
): HTMLElement[] {
  const all: Element[] = [];
  if (options.includeContainer && container.nodeType === 1) {
    all.push(container as Element);
  }
  collect(container, all);
  return all.filter(
    (el): el is HTMLElement => isHTMLElement(el) && isFocusable(el),
  );
}

function asRadio(el: Element): HTMLInputElement | null {
  const input = el as HTMLInputElement;
  return input.tagName === "INPUT" && input.type === "radio" && input.name
    ? input
    : null;
}

/** Radios of one group: same name within the same form (or root node). */
function radioGroupOf(radio: HTMLInputElement): [object, string] {
  return [radio.form ?? radio.getRootNode(), radio.name];
}

/**
 * Elements reachable with Tab inside `container`, in Tab order: positive
 * `tabindex` first (ascending), then `tabindex=0` / natural order.
 * Excludes disabled, hidden, inert and `tabindex="-1"` elements, and
 * collapses radio groups to their checked (or first) radio.
 */
export function getTabbables(
  container: Element | ShadowRoot,
  options: TabbableOptions = {},
): HTMLElement[] {
  const { radioGroups = true } = options;
  let tabbables = getFocusables(container, options).filter(
    (el) => getTabIndex(el) >= 0,
  );

  if (radioGroups) {
    // scope (form / root) -> group name -> chosen radio
    const chosen = new Map<object, Map<string, HTMLInputElement>>();
    for (const el of tabbables) {
      const radio = asRadio(el);
      if (!radio) continue;
      const [scope, name] = radioGroupOf(radio);
      let groups = chosen.get(scope);
      if (!groups) chosen.set(scope, (groups = new Map()));
      const current = groups.get(name);
      if (!current || (!current.checked && radio.checked)) {
        groups.set(name, radio);
      }
    }
    tabbables = tabbables.filter((el) => {
      const radio = asRadio(el);
      if (!radio) return true;
      const [scope, name] = radioGroupOf(radio);
      return chosen.get(scope)?.get(name) === radio;
    });
  }

  const positive = tabbables
    .map((el, index) => ({ el, index, tabIndex: getTabIndex(el) }))
    .filter((item) => item.tabIndex > 0)
    .sort((a, b) => a.tabIndex - b.tabIndex || a.index - b.index)
    .map((item) => item.el);
  const natural = tabbables.filter((el) => getTabIndex(el) === 0);
  return [...positive, ...natural];
}

export interface FocusElementOptions {
  /** Do not scroll the element into view. @default false */
  preventScroll?: boolean;
  /** Select the text of inputs / textareas after focusing. @default false */
  select?: boolean;
}

/**
 * Focuses `el` (no-op for `null`). Returns `true` when `el` is focused
 * afterwards.
 */
export function focusElement(
  el: HTMLElement | SVGElement | null | undefined,
  options: FocusElementOptions = {},
): boolean {
  if (!el || typeof el.focus !== "function") return false;
  const doc = getOwnerDocument(el);
  const previous = getActiveElement(doc);
  el.focus({ preventScroll: options.preventScroll ?? false });
  const focused = getActiveElement(doc) === el;
  if (
    focused &&
    options.select &&
    el !== previous &&
    (el.tagName === "INPUT" || el.tagName === "TEXTAREA") &&
    typeof (el as HTMLInputElement).select === "function"
  ) {
    (el as HTMLInputElement).select();
  }
  return focused;
}

/**
 * Focuses the first candidate that actually accepts focus.
 * @returns the focused element, or `null` when none did.
 */
export function focusFirst(
  candidates: Iterable<HTMLElement | null | undefined>,
  options: FocusElementOptions = {},
): HTMLElement | null {
  for (const candidate of candidates) {
    if (focusElement(candidate, options)) return candidate as HTMLElement;
  }
  return null;
}
