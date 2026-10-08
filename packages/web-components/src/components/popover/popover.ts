import { css, html, nothing, type PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import styles from "@react-styles/components/Popover/popover.module.scss?inline";
import {
  contains,
  getActiveElement,
  getLayerStack,
  getTabbables,
  parsePlacement,
  toPlacement,
} from "@minerva/dom";
import { AnchoredPositionController } from "../../controllers/anchored-position";
import { DismissableLayerController } from "../../controllers/dismissable-layer";
import { popoverResetStyles } from "../../controllers/floating-layer";
import { FocusScopeController } from "../../controllers/focus-scope";
import { ModalController } from "../../controllers/modal";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { getDirection, hideTopLayer, showTopLayer } from "../../internal/dom";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { PresenceController } from "../../internal/presence";
import { sharedStyles } from "../../internal/styles";

/** Side of the anchor the popover opens on */
export type PopoverSide = "top" | "right" | "bottom" | "left";

/** Alignment of the popover against the anchor */
export type PopoverAlign = "start" | "center" | "end";

/** Why the popover asked to open / close (`minerva-open-change` detail) */
export type PopoverChangeReason =
  "trigger" | "escape" | "outside" | "focus-outside" | "tab" | "close-slot";

const ARROW_WIDTH = 10;
const ARROW_HEIGHT = 5;

/**
 * The tabbable before / after `anchor` in `container` (flat tree order, so
 * shadow internals and slotted content count), skipping `exclude`.
 */
export function adjacentTabbable(
  anchor: HTMLElement,
  container: Element,
  backwards: boolean,
  exclude?: Element | null,
): HTMLElement | null {
  const all = getTabbables(container).filter(
    (el) => el === anchor || !exclude || !contains(exclude, el),
  );
  const index = all.indexOf(anchor);
  if (index === -1) return null;
  return (backwards ? all[index - 1] : all[index + 1]) ?? null;
}

/**
 * Popover (`<Popover>` of React): a click-triggered, interactive panel
 * (`role="dialog"`) anchored to its trigger (or to the `anchor` element).
 * Unlike a tooltip it holds focusable content and manages focus itself:
 *
 * - focus moves to its first tabbable (or the panel) on open and returns to
 *   the trigger on close;
 * - Escape (topmost layer only), a pointer down outside or focus leaving it
 *   close it; overlays opened inside it are child layers, and a popover
 *   inside a modal is a child layer of the modal;
 * - non-modal (default): Tab past its last tabbable (Shift+Tab before its
 *   first) closes it and moves focus to the tabbable after (before) the
 *   trigger; Tab never loops inside the panel;
 * - `modal`: focus trap (Tab loops), scroll lock, the rest of the page
 *   hidden from assistive technologies, outside pointer events disabled.
 *
 * The panel is shown in the top layer (Popover API) but stays in the DOM
 * where the element is, so it inherits the theme of its scope. The trigger
 * gets `aria-haspopup="dialog"`, `aria-expanded` and `data-state`. Light DOM
 * elements with `data-popover-close` close the popover when clicked
 * (the React library's `PopoverClose`).
 *
 * @summary Anchored interactive panel with focus management and dismissal.
 * @tag minerva-popover
 * @slot - Panel content
 * @slot trigger - Element that toggles the popover when clicked
 * @csspart content - The positioned panel (`role="dialog"`)
 * @csspart arrow - The arrow pointing at the anchor (with `arrow`)
 * @fires minerva-open-change - The user asked to open / close (`detail: { open, reason }`); cancelable: `preventDefault()` keeps the current state
 * @fires minerva-after-open - The popover is open
 * @fires minerva-after-close - The popover finished closing (after its exit animation)
 */
export class MinervaPopover extends MinervaElement {
  static override tagName = "minerva-popover";
  static override styles = [
    hostStyles,
    popoverResetStyles,
    css`
      :host {
        display: contents;
      }
    `,
    sharedStyles(styles),
  ];

  /** Whether the popover is open */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Modal popover: focus trap, scroll lock, page hidden and inert */
  @property({ type: Boolean, reflect: true })
  modal = false;

  /** Preferred side; flips when there is not enough room */
  @property({ reflect: true })
  side: PopoverSide = "bottom";

  /** Alignment against the anchor */
  @property({ reflect: true })
  align: PopoverAlign = "center";

  /** Distance from the anchor (px) */
  @property({ type: Number, attribute: "side-offset" })
  sideOffset = 6;

  /** Shift along the anchor (px) */
  @property({ type: Number, attribute: "align-offset" })
  alignOffset = 0;

  /** Minimum distance kept from the viewport edges (px) */
  @property({ type: Number, attribute: "collision-padding" })
  collisionPadding = 8;

  /** Sizes the panel after the anchor: at least (`min`) or exactly (`exact`) its width */
  @property({ attribute: "match-anchor-width" })
  matchAnchorWidth: false | "min" | "exact" = false;

  /** Renders an arrow pointing at the anchor */
  @property({ type: Boolean, reflect: true })
  arrow = false;

  /** Accessible name of the panel (or set `aria-label` on the element) */
  @property()
  label = "";

  /**
   * Element the panel is positioned against instead of the trigger
   * (the React library's `PopoverAnchor`); the `anchor` attribute takes an id in the
   * element's tree
   */
  @property({ attribute: false })
  anchorElement: Element | null = null;

  /** Id of the element (same tree) to anchor to */
  @property()
  anchor = "";

  @query(".positioner")
  private positioner?: HTMLElement;

  @query(".content")
  private panel?: HTMLElement;

  @query("[part=arrow]")
  private arrowEl?: HTMLElement;

  private readonly aria = new AriaController(this);
  private readonly presence = new PresenceController(this, () => this.panel);
  private readonly modalController = new ModalController(this);
  private readonly position = new AnchoredPositionController(this, () => ({
    placement: toPlacement(this.side, this.align),
    offset: {
      mainAxis: this.sideOffset + (this.arrow ? ARROW_HEIGHT : 0),
      crossAxis: this.alignOffset,
    },
    matchAnchorWidth: this.matchAnchorWidth || false,
    padding: this.collisionPadding,
    arrowElement: this.arrow ? (this.arrowEl ?? null) : null,
    arrowSize: ARROW_WIDTH,
    onPosition: (result) => {
      const arrow = this.arrowEl;
      if (!arrow) return;
      arrow.style.left = result.arrow.x != null ? `${result.arrow.x}px` : "";
      arrow.style.top = result.arrow.y != null ? `${result.arrow.y}px` : "";
    },
  }));
  private readonly layer = new DismissableLayerController(this, () => ({
    disableOutsidePointerEvents: this.modal,
    branches: () => [this.triggerElement()],
    onEscapeKeyDown: () => {
      this.reason = "escape";
    },
    onPointerDownOutside: () => {
      this.reason = "outside";
    },
    onFocusOutside: () => {
      this.reason = "focus-outside";
      // Focus is trapped while modal: never dismiss on focus outside
      // (`focusin` is not cancelable, so return false).
      return !this.modal;
    },
    onDismiss: () => this.requestOpenChange(false, this.reason),
  }));
  private readonly focusScope = new FocusScopeController(this, () => ({
    trapped: this.modal,
    loop: this.modal,
    restoreFocus: this.triggerElement() ?? true,
  }));
  private reason: PopoverChangeReason = "outside";
  private wasPresent = false;

  /** Opens the popover */
  show(): void {
    this.open = true;
  }

  /** Closes the popover */
  hide(): void {
    this.open = false;
  }

  /** Toggles the popover */
  toggle(): void {
    this.open = !this.open;
  }

  private triggerElement(): HTMLElement | null {
    return this.querySelector<HTMLElement>(":scope > [slot='trigger']");
  }

  private anchorTarget(): Element | null {
    if (this.anchorElement) return this.anchorElement;
    if (this.anchor) {
      const root = this.getRootNode() as Document | ShadowRoot;
      const found = root.getElementById?.(this.anchor);
      if (found) return found;
    }
    return this.triggerElement() ?? this;
  }

  private requestOpenChange(open: boolean, reason: PopoverChangeReason) {
    if (open === this.open) return;
    const allowed = this.emit(
      "minerva-open-change",
      { open, reason },
      { cancelable: true },
    );
    if (allowed) this.open = open;
  }

  private readonly handleClick = (event: MouseEvent) => {
    if (event.defaultPrevented) return;
    const path = event.composedPath();
    const trigger = this.triggerElement();
    if (trigger && path.includes(trigger)) {
      this.requestOpenChange(!this.open, "trigger");
      return;
    }
    const closer = path.find(
      (node): node is Element =>
        node instanceof Element && node.hasAttribute("data-popover-close"),
    );
    if (closer && this.contains(closer)) {
      this.requestOpenChange(false, "close-slot");
    }
  };

  /** Non-modal: Tab out of the panel continues from the trigger. */
  private readonly handleKeyDown = (event: KeyboardEvent) => {
    const panel = this.panel;
    const trigger = this.triggerElement();
    if (
      this.modal ||
      !panel ||
      !trigger ||
      event.key !== "Tab" ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.defaultPrevented
    )
      return;
    const backwards = event.shiftKey;
    const focused = getActiveElement(document);
    if (!focused || !contains(panel, focused)) return;
    const tabbables = getTabbables(panel);
    const leaves =
      tabbables.length === 0 ||
      (backwards
        ? focused === panel || focused === tabbables[0]
        : focused === tabbables[tabbables.length - 1]);
    if (!leaves) return;
    event.preventDefault();
    const container = this.tabContainer();
    const next =
      adjacentTabbable(trigger, container, backwards, this.positioner) ??
      trigger;
    this.requestOpenChange(false, "tab");
    if (!this.open) next.focus();
  };

  /** The enclosing layer (e.g. a modal panel), else the body. */
  private tabContainer(): Element {
    const own = getLayerStack().find((l) => l.element === this.positioner);
    return own?.parent ?? document.body;
  }

  private syncTrigger() {
    const trigger = this.triggerElement();
    if (!trigger) return;
    trigger.setAttribute("aria-haspopup", "dialog");
    trigger.setAttribute("aria-expanded", String(this.open));
    trigger.setAttribute("data-state", this.open ? "open" : "closed");
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.handleClick);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("click", this.handleClick);
    this.deactivate();
    hideTopLayer(this.positioner);
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (changed.has("open")) this.presence.sync(this.open);
  }

  protected override firstUpdated(): void {
    if (DEV && !this.triggerElement() && !this.anchor && !this.anchorElement) {
      devWarn(
        MinervaPopover.tagName,
        'no slot="trigger" element nor anchor: the panel is anchored to the element itself and nothing opens it.',
      );
    }
  }

  private deactivate() {
    this.focusScope.deactivate();
    this.layer.deactivate();
    this.modalController.deactivate();
  }

  protected override updated(changed: PropertyValues<this>): void {
    this.syncTrigger();
    const present = this.open || this.presence.present;
    const positioner = this.positioner;
    if (present && positioner && !this.position.running) {
      showTopLayer(positioner);
      const anchor = this.anchorTarget();
      if (anchor) this.position.start(anchor, positioner);
    }
    if (changed.has("open")) {
      if (this.open && positioner) {
        if (this.modal) this.modalController.activate(this);
        this.layer.activate(positioner);
        this.focusScope.activate(positioner);
        this.emit("minerva-after-open");
      } else if (!this.open) {
        this.deactivate();
      }
    }
    if (this.wasPresent && !present) {
      this.position.end();
      hideTopLayer(positioner);
      this.emit("minerva-after-close");
    }
    this.wasPresent = present;
  }

  protected override hookStates() {
    const placement = this.position.placement;
    const { side, align } = parsePlacement(placement);
    return {
      state: this.open ? "open" : "closed",
      side,
      align,
      placement,
    };
  }

  protected override render() {
    const present = this.open || this.presence.present;
    if (!present) return html`<slot name="trigger"></slot>`;
    const { side, align } = parsePlacement(this.position.placement);
    const state = this.open ? "open" : "closed";
    const name = this.label || this.aria.label;
    const dir = this.isConnected ? getDirection(this) : "ltr";
    return html`<slot name="trigger"></slot>
      <div
        class="positioner"
        popover="manual"
        data-side=${side}
        data-align=${align}
      >
        <div
          part="content"
          class="content"
          role="dialog"
          aria-modal=${this.modal ? "true" : nothing}
          aria-label=${name || nothing}
          tabindex="-1"
          dir=${dir}
          data-state=${state}
          data-side=${side}
          data-align=${align}
          @keydown=${this.handleKeyDown}
        >
          <slot></slot>
          ${
            this.arrow
              ? html`<span part="arrow" class="arrowWrapper" aria-hidden="true">
                  <svg
                    class="arrow"
                    width=${ARROW_WIDTH}
                    height=${ARROW_HEIGHT}
                    viewBox="0 0 30 10"
                    preserveAspectRatio="none"
                  >
                    <polygon points="0,0 30,0 15,10"></polygon>
                  </svg>
                </span>`
              : nothing
          }
        </div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-popover": MinervaPopover;
  }
}
