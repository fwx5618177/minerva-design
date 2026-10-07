// Test setup of @minerva/lib-web-components (happy-dom; the HtmlPreview
// sanitizer tests run under jsdom, see vite.config.ts).
//
// happy-dom workarounds (documented here once, used by every test):
// - happy-dom has no `ElementInternals` (`attachInternals`): the
//   `element-internals-polyfill` package provides it (form value through a
//   hidden input, validity, labels, `formResetCallback`...).
// - happy-dom's `HTMLFormElement.checkValidity()` (used by `requestSubmit()`
//   and implicit submission) only checks native controls: it is patched to
//   also check form-associated custom elements, as browsers do.
// - happy-dom does not retarget `event.target` across shadow boundaries
//   (a listener on a form sees the <input> inside an element's shadow root,
//   not the element): `Event.prototype.target` is patched with the DOM
//   retargeting algorithm, relative to `currentTarget`.
// - happy-dom's event path skips slots (a slotted node's parent is its
//   light DOM parent): `Event.prototype.composedPath` (which happy-dom's
//   dispatch uses) is patched to route slotted nodes through their slot,
//   so listeners inside a shadow root (focus traps, roving focus) see
//   events from slotted content as in browsers.
// - happy-dom has no Popover API: overlays then fall back to fixed
//   positioning (see `showTopLayer`), which is what the tests exercise.
import { afterEach } from "vitest";

if (typeof window !== "undefined") {
  await import("@testing-library/jest-dom/vitest");
  await import("element-internals-polyfill");

  const nativeTarget = Object.getOwnPropertyDescriptor(
    Event.prototype,
    "target",
  )!.get!;
  /** Whether `root` is `node`'s root or a root of one of its hosts. */
  const isRootOf = (root: Node, node: Node) => {
    for (let r: Node | null = node.getRootNode(); r;) {
      if (r === root) return true;
      r = r instanceof ShadowRoot ? r.host.getRootNode() : null;
    }
    return false;
  };
  Object.defineProperty(Event.prototype, "target", {
    configurable: true,
    get(this: Event) {
      let target = nativeTarget.call(this) as EventTarget | null;
      const current = this.currentTarget;
      if (!(target instanceof Node) || !(current instanceof Node))
        return target;
      for (;;) {
        const root: Node = (target as Node).getRootNode();
        if (!(root instanceof ShadowRoot) || isRootOf(root, current)) {
          return target;
        }
        target = root.host;
      }
    },
  });

  /** Slot of `shadow` that `node` (a child of its host) is assigned to. */
  const slotOf = (node: Node, shadow: ShadowRoot): HTMLSlotElement | null => {
    const name =
      node.nodeType === 1 ? ((node as Element).getAttribute("slot") ?? "") : "";
    return (
      Array.from(shadow.querySelectorAll("slot")).find(
        (slot) => (slot.getAttribute("name") ?? "") === name,
      ) ?? null
    );
  };
  Event.prototype.composedPath = function composedPath(this: Event) {
    const target = nativeTarget.call(this) as EventTarget | null;
    if (!target) return [];
    const path: EventTarget[] = [];
    const targetRoot = target instanceof Node ? target.getRootNode() : null;
    let node: EventTarget | null = target;
    while (node) {
      path.push(node);
      if (node instanceof Node) {
        const parent: Node | null = node.parentNode;
        const shadow: ShadowRoot | null | undefined = (parent as Element | null)
          ?.shadowRoot;
        const slot: HTMLSlotElement | null = shadow
          ? slotOf(node, shadow)
          : null;
        if (slot) node = slot;
        else if (parent) node = parent;
        else if (node instanceof ShadowRoot) {
          node = this.composed || node !== targetRoot ? node.host : null;
        } else if (node.nodeType === 9 && this.type !== "load") {
          node = (node as Document).defaultView;
        } else node = null;
      } else node = null;
    }
    return path;
  };

  const proto = HTMLFormElement.prototype;
  const nativeCheckValidity = proto.checkValidity;
  const isFormAssociated = (el: Element) =>
    (el.constructor as { formAssociated?: boolean }).formAssociated === true;
  proto.checkValidity = function checkValidity(this: HTMLFormElement) {
    let valid = nativeCheckValidity.call(this);
    for (const el of Array.from(this.querySelectorAll("*"))) {
      const control = el as HTMLInputElement;
      if (!isFormAssociated(el) || typeof control.checkValidity !== "function")
        continue;
      if (!control.checkValidity()) valid = false;
    }
    return valid;
  };
  proto.reportValidity = function reportValidity(this: HTMLFormElement) {
    return this.checkValidity();
  };

  afterEach(() => {
    document.body.innerHTML = "";
    document.documentElement.removeAttribute("lang");
  });
}
