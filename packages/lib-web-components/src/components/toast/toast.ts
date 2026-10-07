import { css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  contains,
  focusElement,
  getActiveElement,
  getFocusables,
  getTabbables,
  isTabbable,
} from "@minerva/core";
import styles from "@lib-core-styles/components/Toast/toast.module.scss?inline";
import { popoverResetStyles } from "../../controllers/floating-layer";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { getDirection, hideTopLayer, showTopLayer } from "../../internal/dom";
import {
  IconCircleCheck,
  IconCircleX,
  IconInfo,
  IconSpinner,
  IconTriangleAlert,
  IconX,
} from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import {
  TOAST_REGION_TAG,
  createToast,
  toastRegions,
  toastStore,
  type ToastApi,
  type ToastCloseReason,
  type ToastColor,
  type ToastItem,
  type ToastLifecycleEvent,
  type ToastPosition,
} from "./toast-store";
import { sharedStyles } from "../../internal/styles";

const ICONS: Record<ToastColor, unknown> = {
  info: IconInfo,
  success: IconCircleCheck,
  warning: IconTriangleAlert,
  danger: IconCircleX,
};

const POSITIONS: readonly ToastPosition[] = [
  "topRight",
  "topLeft",
  "topCenter",
  "bottomRight",
  "bottomLeft",
  "bottomCenter",
];

const DEFAULT_HOTKEY = ["F8"];
const MODIFIER_KEYS = ["altKey", "ctrlKey", "metaKey", "shiftKey"] as const;

/** Whether `event` matches every key of `hotkey` (codes, keys or modifiers). */
const matchesHotkey = (event: KeyboardEvent, hotkey: readonly string[]) =>
  hotkey.length > 0 &&
  hotkey.every((key) =>
    (MODIFIER_KEYS as readonly string[]).includes(key)
      ? event[key as (typeof MODIFIER_KEYS)[number]]
      : event.code === key || event.key === key,
  );

/** Human readable hotkey, e.g. ["altKey", "KeyT"] -> "Alt+T". */
const formatHotkey = (hotkey: readonly string[]) =>
  hotkey
    .map((key) =>
      key
        .replace(/Key$/, "")
        .replace(/^Key(?=.)/, "")
        .replace(/^Digit/, "")
        .replace(/^./, (c) => c.toUpperCase()),
    )
    .join("+");

/** `hotkey` attribute: keys separated by spaces, commas or "+"; "" disables. */
const hotkeyConverter = {
  fromAttribute: (value: string | null): string[] =>
    value === null
      ? DEFAULT_HOTKEY
      : value
          .split(/[\s,+]+/)
          .map((key) => key.trim())
          .filter(Boolean),
};

/** The tabbable element after `el` (outside it), else the one before it. */
function getAdjacentTabbable(el: HTMLElement): HTMLElement | null {
  const candidates = getFocusables(el.ownerDocument.body).filter(
    (candidate) => !contains(el, candidate) && isTabbable(candidate),
  );
  const next = candidates.find(
    (candidate) =>
      el.compareDocumentPosition(candidate) & Node.DOCUMENT_POSITION_FOLLOWING,
  );
  if (next) return next;
  const previous = candidates.filter(
    (candidate) =>
      el.compareDocumentPosition(candidate) & Node.DOCUMENT_POSITION_PRECEDING,
  );
  return previous[previous.length - 1] ?? null;
}

/** One document keydown listener (hotkeys) shared by every region. */
let hotkeyUsers = 0;
const onDocumentKeyDown = (event: KeyboardEvent) => {
  for (const region of toastRegions.ordered()) {
    if (region instanceof MinervaToastRegion && region.handleHotkey(event)) {
      return;
    }
  }
};

/**
 * Toast region (lib-core's `ToastProvider` viewport): renders the toasts
 * shown with the `toast()` API, stacked at `position`, with the same DOM,
 * classes, roles and keyboard behaviour as lib-core.
 *
 * - Each toast is a live region: `role="status"`, or `role="alert"` for
 *   danger toasts (loading toasts stay a polite status). The stack is a
 *   `role="region"` labelled "Notifications (F8)" (localized).
 * - Toasts close after `duration` (default 4000 ms; loading toasts stay
 *   open); the countdown pauses while a toast is hovered or holds focus.
 * - The hotkey (F8 by default) moves focus to the region; Escape closes the
 *   focused toast; closing a focused toast moves focus to the next toast,
 *   else back where it came from (never to `<body>`).
 * - Toasts without an explicit region render in the first connected region
 *   (document order); `toast.region(el)` / `{ region }` target another one,
 *   e.g. inside a `<minerva-config>` scope (its theme and language apply).
 *   When `toast()` runs with no region on the page, one is appended to
 *   `<body>` (and removed again when a page region connects).
 * - The stack is shown in the top layer (Popover API, `popover="manual"`)
 *   and raised again when a toast appears or a Minerva overlay opens, so
 *   toasts stay above modals and stay clickable. Like lib-core's
 *   `ToastProvider` viewport, the region is treated like any other page
 *   content by a modal's hide-others: while a modal dialog (modal, drawer,
 *   confirm, command, modal popover / menu) is open, the region (or its
 *   ancestor next to the dialog) gets `aria-hidden="true"` and assistive
 *   technologies only see the dialog; it is exposed again when the dialog
 *   closes. Opt out on a given region with the `data-minerva-keep-visible`
 *   attribute (core's hide-others never hides such elements).
 *
 * @summary Toast stack (viewport) rendering the toasts of the `toast()` API.
 * @tag minerva-toast-region
 * @csspart viewport - The fixed stack (`role="region"`)
 * @csspart toast - A toast
 * @csspart icon - The icon wrapper of a toast
 * @csspart content - The title / description wrapper
 * @csspart title - The title
 * @csspart description - The description
 * @csspart action - The action button
 * @csspart close-button - The close (×) button
 * @csspart progress - The countdown bar
 * @fires minerva-close - A toast of this region started closing (`detail: { id, reason }`; reason: "timeout" | "close-button" | "action" | "escape" | "dismiss" | "overflow")
 * @fires minerva-after-close - A toast of this region was removed after its exit animation (`detail: { id }`)
 */
export class MinervaToastRegion extends MinervaElement {
  static override tagName = TOAST_REGION_TAG;
  static override styles = [
    hostStyles,
    popoverResetStyles,
    css`
      :host {
        display: contents;
      }
      /* lib-core renders a decorative <ProgressIndicator variant="spinner"
         size="small" color="current"> in loading toasts */
      .progressIndicator {
        display: inline-flex;
        width: 100%;
        height: 100%;
        color: currentColor;
      }
      .spinner {
        display: inline-flex;
        width: 100%;
        height: 100%;
        animation: spin 1s linear infinite;
      }
      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .spinner {
          animation-duration: 2s;
        }
      }
    `,
    sharedStyles(styles),
  ];

  /** Where the toasts are stacked */
  @property({ reflect: true })
  position: ToastPosition = "topRight";

  /** Maximum number of toasts shown at once; the oldest close first */
  @property({ type: Number })
  max = Infinity;

  /** Keeps the countdown running while a toast is hovered or focused */
  @property({ type: Boolean, attribute: "no-pause-on-hover" })
  noPauseOnHover = false;

  /** Accessible label of the close buttons (default: localized "Close") */
  @property({ attribute: "close-label" })
  closeLabel?: string;

  /**
   * Keys pressed together to focus the region: key codes (`F8`, `KeyT`),
   * keys or modifiers (`altKey`, `ctrlKey`, `metaKey`, `shiftKey`). The
   * attribute separates them with spaces / commas / "+" (`hotkey="altKey KeyT"`);
   * an empty value disables it. Shown in the default region label
   */
  @property({ attribute: "hotkey", converter: hotkeyConverter })
  hotkey: string[] = DEFAULT_HOTKEY;

  @state()
  private items: ToastItem[] = [];

  @query(".viewport")
  private viewport?: HTMLElement;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this);
  private cleanups: Array<() => void> = [];
  /** Element focused before focus entered the region */
  private returnFocus: HTMLElement | null = null;
  private boundApi?: ToastApi;

  /**
   * The toast API bound to this region:
   * `region.toast.success("Saved")` renders in this element.
   */
  get toast(): ToastApi {
    this.boundApi ??= createToast(toastStore, this);
    return this.boundApi;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.cleanups = [
      toastStore.subscribe(() => this.refresh()),
      toastRegions.subscribe(() => this.refresh()),
      toastStore.subscribeLifecycle(this.onLifecycle),
    ];
    const doc = this.ownerDocument;
    doc.addEventListener("minerva-after-open", this.raise);
    this.cleanups.push(() =>
      doc.removeEventListener("minerva-after-open", this.raise),
    );
    if (hotkeyUsers++ === 0) {
      doc.addEventListener("keydown", onDocumentKeyDown);
    }
    this.cleanups.push(() => {
      if (--hotkeyUsers === 0) {
        doc.removeEventListener("keydown", onDocumentKeyDown);
      }
    });
    toastRegions.register(this);
    this.refresh();
    if (this.hasUpdated) showTopLayer(this.viewport);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const cleanup of this.cleanups) cleanup();
    this.cleanups = [];
    toastRegions.unregister(this);
    hideTopLayer(this.viewport);
  }

  /** Toasts rendered here: explicit ones, plus the default ones when owner. */
  private refresh = () => {
    if (!this.isConnected) return;
    const seen = new Set<ToastItem["id"]>();
    const mine: ToastItem[] = [];
    const all = toastStore.getSnapshot();
    for (let i = all.length - 1; i >= 0; i -= 1) {
      const item = all[i];
      if (seen.has(item.id) || toastRegions.regionOf(item) !== this) continue;
      seen.add(item.id);
      mine.unshift(item);
    }
    // Over `max`: the oldest open toasts close (onClose runs as usual)
    const open = mine.filter((item) => item.state === "open");
    const overflow = open.slice(0, Math.max(0, open.length - this.max));
    if (overflow.length > 0) {
      for (const item of overflow) toastStore.dismiss(item.id, "overflow");
      return;
    }
    const known = new Set(this.items.map((item) => item.id));
    const added = mine.some((item) => !known.has(item.id));
    this.items = mine;
    if (added) this.raise();
  };

  /** Puts the stack back on top of the top layer (unless focus is inside). */
  private raise = () => {
    const viewport = this.viewport;
    if (!viewport || contains(viewport, getActiveElement())) return;
    hideTopLayer(viewport);
    showTopLayer(viewport);
  };

  private onLifecycle = (event: ToastLifecycleEvent) => {
    if (toastRegions.regionOf(event.item) !== this) return;
    if (event.type === "close") {
      this.emit("minerva-close", { id: event.item.id, reason: event.reason });
    } else {
      this.emit("minerva-after-close", { id: event.item.id });
    }
  };

  /**
   * Hotkey handling (called by the shared document listener): focuses the
   * region when `event` matches its hotkey and it holds open toasts.
   * @internal
   */
  handleHotkey(event: KeyboardEvent): boolean {
    const viewport = this.viewport;
    if (!viewport || !matchesHotkey(event, this.hotkey)) return false;
    if (!viewport.querySelector('[data-state="open"]')) return false;
    event.preventDefault();
    const active = getActiveElement() as HTMLElement | null;
    if (
      active &&
      active !== this.ownerDocument.body &&
      !contains(viewport, active)
    ) {
      this.returnFocus = active;
    }
    viewport.setAttribute("tabindex", "-1");
    focusElement(viewport);
    return true;
  }

  /** Moves focus to the region (as the hotkey does). */
  override focus(options?: FocusOptions): void {
    const viewport = this.viewport;
    if (!viewport) return;
    viewport.setAttribute("tabindex", "-1");
    viewport.focus(options);
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (DEV && changed.has("position") && !POSITIONS.includes(this.position)) {
      devWarn(
        TOAST_REGION_TAG,
        `invalid position "${this.position}" (expected ${POSITIONS.join(" | ")}).`,
      );
    }
  }

  protected override firstUpdated(): void {
    showTopLayer(this.viewport);
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("max") && changed.get("max") !== undefined) {
      queueMicrotask(() => this.refresh());
    }
  }

  /**
   * Moves focus out of the toast `el` before it closes: the close button
   * (else first tabbable) of the next open toast, else the element focused
   * before focus entered the region, else the nearest tabbable outside the
   * region, else the region itself. Never <body>.
   */
  private moveFocusFrom(el: HTMLElement) {
    const viewport = this.viewport;
    if (!viewport) return;
    const others = Array.from(
      viewport.querySelectorAll<HTMLElement>(':scope > [data-state="open"]'),
    ).filter((other) => other !== el);
    const next =
      others.find(
        (other) =>
          el.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_FOLLOWING,
      ) ?? others[others.length - 1];
    if (next) {
      const target =
        next.querySelector<HTMLElement>("[data-toast-close]") ??
        getTabbables(next)[0];
      if (focusElement(target)) return;
    }
    const previous = this.returnFocus;
    if (
      previous?.isConnected &&
      !contains(viewport, previous) &&
      focusElement(previous)
    ) {
      return;
    }
    if (focusElement(getAdjacentTabbable(this))) return;
    viewport.setAttribute("tabindex", "-1");
    focusElement(viewport, { preventScroll: true });
  }

  /** Dismisses a toast, first moving focus out of it when it is inside. */
  private close(item: ToastItem, el: HTMLElement, reason: ToastCloseReason) {
    if (contains(el, getActiveElement())) this.moveFocusFrom(el);
    toastStore.dismiss(item.id, reason);
  }

  private pause(item: ToastItem) {
    if (!this.noPauseOnHover) toastStore.pause(item.id);
  }

  private resume(item: ToastItem) {
    if (!this.noPauseOnHover) toastStore.resume(item.id);
  }

  private onViewportFocusIn = (event: FocusEvent) => {
    // Remember where focus came from to give it back once the toasts close
    const from = event.relatedTarget as HTMLElement | null;
    const viewport = event.currentTarget as HTMLElement;
    if (from && !contains(viewport, from)) this.returnFocus = from;
  };

  private onViewportFocusOut = (event: FocusEvent) => {
    // The region is only programmatically focusable while focus is in it
    const viewport = event.currentTarget as HTMLElement;
    if (!contains(viewport, event.relatedTarget as Node | null)) {
      viewport.removeAttribute("tabindex");
    }
  };

  private renderIcon(item: ToastItem) {
    if (item.icon === null) return nothing;
    const icon =
      item.icon !== undefined
        ? item.icon
        : item.loading
          ? html`<div class="progressIndicator current" aria-hidden="true">
              <span class="spinner small">${IconSpinner}</span>
            </div>`
          : ICONS[item.color];
    return html`<span class="icon" part="icon" aria-hidden="true"
      >${icon}</span
    >`;
  }

  private renderItem(item: ToastItem) {
    const closing = item.state === "closing";
    const toastEl = (event: Event) =>
      (event.currentTarget as HTMLElement).closest<HTMLElement>(".toast")!;
    return html`<div
      part="toast"
      class=${classMap({ toast: true, [item.color]: true })}
      data-state=${closing ? "closing" : "open"}
      data-loading=${item.loading ? "true" : nothing}
      role=${item.color === "danger" && !item.loading ? "alert" : "status"}
      style=${styleMap(
        item.duration > 0 ? { "--toast-duration": `${item.duration}ms` } : {},
      )}
      @mouseenter=${() => this.pause(item)}
      @mouseleave=${() => this.resume(item)}
      @focusin=${() => this.pause(item)}
      @focusout=${(event: FocusEvent) => {
        if (!contains(toastEl(event), event.relatedTarget as Node | null)) {
          this.resume(item);
        }
      }}
      @keydown=${(event: KeyboardEvent) => {
        // Escape dismisses the toast holding focus (and only that one)
        if (event.key !== "Escape" || closing || event.isComposing) return;
        event.preventDefault();
        event.stopPropagation();
        this.close(item, toastEl(event), "escape");
      }}
    >
      ${this.renderIcon(item)}
      <div class="content" part="content">
        ${
          item.title
            ? html`<div class="title" part="title">${item.title}</div>`
            : nothing
        }
        ${
          item.description
            ? html`<div class="description" part="description">
                ${item.description}
              </div>`
            : nothing
        }
      </div>
      ${
        item.action
          ? html`<button
              type="button"
              class="action"
              part="action"
              @click=${(event: MouseEvent) => {
                item.action?.onClick();
                this.close(item, toastEl(event), "action");
              }}
            >
              ${item.action.label}
            </button>`
          : nothing
      }
      ${
        item.closable
          ? html`<button
              type="button"
              class="close"
              part="close-button"
              aria-label=${this.closeLabel ?? this.locale.t("toast.close")}
              data-toast-close=""
              @click=${(event: MouseEvent) =>
                this.close(item, toastEl(event), "close-button")}
            >
              ${IconX}
            </button>`
          : nothing
      }
      ${
        item.duration > 0 && !closing
          ? html`<span
              class="progress"
              part="progress"
              aria-hidden="true"
            ></span>`
          : nothing
      }
    </div>`;
  }

  protected override render() {
    const hotkeyLabel = formatHotkey(this.hotkey);
    const label =
      this.aria.label ??
      (hotkeyLabel
        ? this.locale.t("toast.regionWithHotkey", { hotkey: hotkeyLabel })
        : this.locale.t("toast.region"));
    const position = POSITIONS.includes(this.position)
      ? this.position
      : "topRight";
    return html`<div
      part="viewport"
      class=${classMap({ viewport: true, [position]: true })}
      popover="manual"
      role="region"
      aria-label=${label}
      dir=${getDirection(this)}
      @focusin=${this.onViewportFocusIn}
      @focusout=${this.onViewportFocusOut}
    >
      ${repeat(
        this.items,
        (item) => item.id,
        (item) => this.renderItem(item),
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-toast-region": MinervaToastRegion;
  }
}
