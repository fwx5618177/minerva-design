import type { ReactiveController, ReactiveControllerHost } from "lit";

const textOfIds = (host: Element, ids: string | null): string | undefined => {
  if (!ids) return undefined;
  const root = host.getRootNode() as Document | ShadowRoot;
  const text = ids
    .split(/\s+/)
    .map((id) => root.getElementById?.(id)?.textContent?.trim() ?? "")
    .filter(Boolean)
    .join(" ");
  return text || undefined;
};

/**
 * Forwards the ARIA attributes set on the host to the element's internal
 * control (the real `<button>`, `<input>`, listbox...).
 *
 * ID references cannot cross shadow boundaries, so `aria-labelledby` /
 * `aria-describedby` on the host are resolved to text (in the host's tree),
 * and `<label for>` / wrapping labels of form-associated elements
 * (`ElementInternals.labels`) name the control too. The host re-renders
 * when any `aria-*` attribute changes.
 */
export class AriaController implements ReactiveController {
  private observer: MutationObserver | null = null;

  constructor(
    private readonly host: ReactiveControllerHost & HTMLElement,
    private readonly getLabels?: () => NodeList | null | undefined,
  ) {
    host.addController(this);
  }

  /** Raw value of an `aria-*` attribute of the host (undefined when absent). */
  attr(name: `aria-${string}`): string | undefined {
    return this.host.getAttribute(name) ?? undefined;
  }

  /** Accessible name: aria-label, aria-labelledby text, then <label> text. */
  get label(): string | undefined {
    const host = this.host;
    const direct = host.getAttribute("aria-label")?.trim();
    if (direct) return direct;
    const labelled = textOfIds(host, host.getAttribute("aria-labelledby"));
    if (labelled) return labelled;
    const labels = Array.from(this.getLabels?.() ?? [])
      .map((label) => label.textContent?.trim() ?? "")
      .filter(Boolean)
      .join(" ");
    return labels || undefined;
  }

  /** Accessible description from aria-describedby (resolved to text). */
  get description(): string | undefined {
    return (
      textOfIds(this.host, this.host.getAttribute("aria-describedby")) ??
      this.host.getAttribute("aria-description") ??
      undefined
    );
  }

  hostConnected(): void {
    if (typeof MutationObserver === "undefined") return;
    this.observer = new MutationObserver((records) => {
      if (records.some((r) => r.attributeName?.startsWith("aria-"))) {
        this.host.requestUpdate();
      }
    });
    this.observer.observe(this.host, { attributes: true });
  }

  hostDisconnected(): void {
    this.observer?.disconnect();
    this.observer = null;
  }
}

/** ARIA of a host element that ElementInternals can carry */
export type HostAria = Partial<
  Record<
    "role" | "ariaSelected" | "ariaChecked" | "ariaDisabled" | "ariaHidden",
    string | null
  >
>;

const ARIA_ATTRIBUTE: Record<keyof HostAria, string> = {
  role: "role",
  ariaSelected: "aria-selected",
  ariaChecked: "aria-checked",
  ariaDisabled: "aria-disabled",
  ariaHidden: "aria-hidden",
};

/**
 * Sets the implicit ARIA of `host` through ElementInternals (default
 * semantics: no attribute is added to the host, so server-rendered markup
 * hydrates without attribute mismatches, and author attributes still win).
 * Without ARIA reflection on ElementInternals (older engines), falls back
 * to attributes, never overwriting one the author set.
 */
export function setHostAria(
  host: HTMLElement,
  internals: ElementInternals | null,
  aria: HostAria,
  owned: Set<string> = new Set(),
): void {
  for (const [key, value] of Object.entries(aria) as Array<
    [keyof HostAria, string | null]
  >) {
    if (internals && key in internals) {
      (internals as unknown as Record<string, string | null>)[key] = value;
      continue;
    }
    const attribute = ARIA_ATTRIBUTE[key];
    if (host.hasAttribute(attribute) && !owned.has(attribute)) continue;
    if (value === null) {
      host.removeAttribute(attribute);
      owned.delete(attribute);
    } else {
      host.setAttribute(attribute, value);
      owned.add(attribute);
    }
  }
}
