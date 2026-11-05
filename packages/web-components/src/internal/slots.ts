import type { ReactiveController, ReactiveControllerHost } from "lit";

/**
 * Whether `host` has content for its default slot: an element without a
 * `slot` attribute or non-blank text. Whitespace between tags is assigned to
 * the default slot too, so a `<slot>` fallback would never show when the
 * markup is indented; render the fallback beside the slot when this is false.
 */
export function hasDefaultSlotContent(host: Element): boolean {
  return Array.from(host.childNodes).some(
    (node) =>
      (node.nodeType === 3 && !!node.textContent?.trim()) ||
      (node.nodeType === 1 && !(node as Element).hasAttribute("slot")),
  );
}

/**
 * Tracks whether named slots (or the default slot, `"[default]"`) have
 * content, re-rendering the host when the light DOM children change. Used
 * to drop the wrappers / gaps of empty slots (icons, headers, footers).
 */
export class HasSlotController implements ReactiveController {
  private observer: MutationObserver | null = null;

  constructor(private readonly host: ReactiveControllerHost & HTMLElement) {
    host.addController(this);
  }

  /** Whether the slot `name` (`"[default]"` for the default slot) has content. */
  test(name: string): boolean {
    if (name === "[default]") return hasDefaultSlotContent(this.host);
    return Array.from(this.host.children).some(
      (child) => child.getAttribute("slot") === name,
    );
  }

  hostConnected(): void {
    if (typeof MutationObserver === "undefined") return;
    this.observer = new MutationObserver(() => this.host.requestUpdate());
    this.observer.observe(this.host, {
      childList: true,
      characterData: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["slot"],
    });
  }

  hostDisconnected(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}
