import { css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { type ColorScheme } from "@minerva/core";
import {
  createPointerGrace,
  getTabbables,
  parsePlacement,
  type AnchoredPositionResult,
  type VirtualElement,
} from "@minerva/dom";
import styles from "@react-styles/components/Tooltip/tooltip.module.scss?inline";
import {
  FloatingLayerController,
  popoverResetStyles,
} from "../../controllers/floating-layer";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { closestComposed, getDirection } from "../../internal/dom";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

export type TooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

export type TooltipColor = Extract<
  ColorScheme,
  "neutral" | "info" | "success" | "warning" | "danger"
>;

export type TooltipShape = "default" | "rounded" | "thought" | "square";

/**
 * Visual style: `solid` (filled; neutral is the inverted contrasting
 * surface), `subtle` (tinted surface with a border) or `glass` (frosted
 * elevated surface following the theme).
 */
export type TooltipVariant = "solid" | "subtle" | "glass";

export type TooltipAnimation =
  "fade" | "scale" | "shift-away" | "shift-toward" | "perspective";

/** Extra gap so the arrow does not overlap the trigger. */
const ARROW_GAP = 6;
/**
 * How long the pointer may travel from the trigger to the tooltip (through
 * the gap between them) before the tooltip closes (WCAG 1.4.13 hoverable).
 */
const HOVER_GRACE_MS = 300;
const DEFAULT_ENTER_DELAY = 200;
const DEFAULT_LEAVE_DELAY = 0;

/** `"12 20"` / `"12,20"` <-> `[12, 20]` */
const offsetConverter = {
  fromAttribute(value: string | null): [number, number] | undefined {
    if (!value) return undefined;
    const parts = value
      .trim()
      .split(/[\s,]+/)
      .map(Number);
    return parts.length === 2 && parts.every(Number.isFinite)
      ? [parts[0], parts[1]]
      : undefined;
  },
  toAttribute(value: [number, number] | undefined): string | null {
    return value ? value.join(" ") : null;
  },
};

/**
 * Optional provider (`<TooltipProvider>` of React) giving every
 * `<minerva-tooltip>` inside default delays. Moving from one tooltip to the
 * next within `skip-delay` ms opens it immediately. Tooltips work without it.
 *
 * @summary Shared default delays for the tooltips inside.
 * @tag minerva-tooltip-provider
 * @slot - Content containing tooltips
 */
export class MinervaTooltipProvider extends MinervaElement {
  static override tagName = "minerva-tooltip-provider";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: contents;
      }
    `,
  ];

  /** Default delay before showing on hover (ms) for tooltips without `enter-delay` */
  @property({ type: Number, attribute: "enter-delay" })
  enterDelay?: number;

  /** Default delay before hiding on pointer leave (ms) for tooltips without `leave-delay` */
  @property({ type: Number, attribute: "leave-delay" })
  leaveDelay?: number;

  /** A tooltip closed less than this many ms ago makes the next one open without its enter delay */
  @property({ type: Number, attribute: "skip-delay" })
  skipDelay = 300;

  private lastClosedAt = 0;

  /** @internal Records that a tooltip of the provider just closed. */
  markClosed(): void {
    this.lastClosedAt = Date.now();
  }

  /** @internal Whether a tooltip closed recently enough to open the next instantly. */
  shouldSkipDelay(): boolean {
    return Date.now() - this.lastClosedAt < this.skipDelay;
  }

  protected override render() {
    return html`<slot></slot>`;
  }
}

/**
 * Tooltip (`<Tooltip>` of React): shows informative content when the
 * wrapped element (default slot) is hovered (after `enter-delay`) or
 * focused. Flips / shifts to stay inside the viewport.
 *
 * WCAG 1.4.13: dismissable with Escape (a non-modal core dismissable layer:
 * only when it is the topmost one, so inside an open `<minerva-modal>` the
 * first Escape closes the tooltip only), hoverable (the pointer can move
 * from the trigger onto the tooltip through the gap between them — core
 * pointer grace) and persistent. Enter / Space are never intercepted, so the
 * wrapped control still activates.
 *
 * The panel (`role="tooltip"`) lives in the shadow root and is shown in the
 * top layer (Popover API). ID references cannot cross shadow roots, so
 * instead of `aria-describedby` the tooltip sets `aria-description` (its
 * text: `aria-label`, else the `content` attribute, else the text of the
 * `content` slot) on the trigger — the first element of the default slot —
 * while it is shown, appended to any `aria-description` the trigger already
 * had; the previous value is restored when it hides, the trigger changes or
 * the tooltip is removed. Plain-text triggers are described through the
 * internal wrapper instead.
 *
 * Inside a `<minerva-tooltip-provider>`, the provider's delays apply when
 * `enter-delay` / `leave-delay` are not set.
 *
 * @summary Hover / focus tooltip, dismissable with Escape and hoverable.
 * @tag minerva-tooltip
 * @slot - The trigger; prefer a single focusable element (button, link...)
 * @slot content - Rich tooltip content (alternative to the `content` attribute)
 * @csspart trigger - The wrapper around the trigger (the slotted element)
 * @csspart content - The positioned tooltip (`role="tooltip"`, while shown)
 * @csspart arrow - The arrow pointing at the trigger (with `arrow`)
 * @fires minerva-open-change - Hover, focus, blur, pointer leave or Escape asked to open / close (`detail: { open }`); cancelable: `preventDefault()` keeps the current state
 */
export class MinervaTooltip extends MinervaElement {
  static override tagName = "minerva-tooltip";
  static override styles = [
    hostStyles,
    popoverResetStyles,
    css`
      :host {
        display: inline-flex;
      }
    `,
    sharedStyles(styles),
  ];

  /** Text of the tooltip (or use the `content` slot for rich content) */
  @property()
  content = "";

  /** Whether the tooltip is shown */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Placement relative to the trigger (flips when it overflows) */
  @property({ reflect: true })
  placement: TooltipPlacement = "top";

  /** Semantic color */
  @property({ reflect: true })
  color: TooltipColor = "neutral";

  /** Visual style */
  @property({ reflect: true })
  variant: TooltipVariant = "solid";

  /** Shape of the tooltip */
  @property({ reflect: true })
  shape: TooltipShape = "default";

  /** Show / hide animation */
  @property({ reflect: true })
  animation: TooltipAnimation = "fade";

  /** Shows an arrow pointing at the trigger */
  @property({ type: Boolean, reflect: true })
  arrow = false;

  /** Disables the tooltip (never opens) */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Delay before showing on hover, in ms (default: the provider's, else 200) */
  @property({ type: Number, attribute: "enter-delay" })
  enterDelay?: number;

  /** Delay before hiding on pointer leave, in ms (default: the provider's, else 0) */
  @property({ type: Number, attribute: "leave-delay" })
  leaveDelay?: number;

  /**
   * Offset `[x, y]` in px (attribute: `"x y"`). For top / bottom placements
   * `y` is the gap to the trigger and `x` shifts along it; for left / right
   * `x` is the gap and `y` the shift. Without it the tooltip sits 8px away.
   */
  @property({ converter: offsetConverter })
  offset?: [number, number];

  /** Makes the tooltip follow the mouse cursor */
  @property({ type: Boolean, reflect: true, attribute: "follow-cursor" })
  followCursor = false;

  @query(".tooltipTrigger")
  private wrapper?: HTMLElement;

  @query("[part=content]")
  private panel?: HTMLElement;

  @query(".tooltipArrow")
  private arrowEl?: HTMLElement;

  @state()
  private positioned = false;

  private readonly aria = new AriaController(this);
  private readonly grace = createPointerGrace({ timeout: 0 });
  private enterTimer: ReturnType<typeof setTimeout> | undefined;
  private leaveTimer: ReturnType<typeof setTimeout> | undefined;
  private cursor: { x: number; y: number } | null = null;
  /** Trigger currently carrying our aria-description, and its own value */
  private described: Element | null = null;
  private describedPrev: string | null = null;

  private readonly floating = new FloatingLayerController(this, () => {
    const placement = this.placement;
    const isVertical =
      placement.startsWith("top") || placement.startsWith("bottom");
    const gap = this.arrow ? ARROW_GAP : 0;
    const offset = this.offset;
    return {
      placement,
      offset: offset
        ? {
            mainAxis: (isVertical ? offset[1] : offset[0]) + gap,
            crossAxis: isVertical ? offset[0] : offset[1],
          }
        : { mainAxis: 8 + gap },
      arrowElement: this.arrow ? this.arrowEl : null,
      autoUpdate: this.followCursor ? { animationFrame: true } : undefined,
      anchor: () => this.anchor(),
      floating: () => this.panel,
      branches: () => [this.wrapper],
      // Escape only (topmost layer); hover / focus handle the rest
      dismissOnPointerDownOutside: false,
      dismissOnFocusOutside: false,
      focusable: false,
      onDismiss: () => {
        this.clearTimers();
        this.requestOpen(false);
      },
      onPosition: (result) => this.handlePosition(result),
    };
  });

  /** Shows the tooltip (does not fire `minerva-open-change`) */
  show(): void {
    this.open = true;
  }

  /** Hides the tooltip (does not fire `minerva-open-change`) */
  hide(): void {
    this.open = false;
  }

  /** Toggles the tooltip (does not fire `minerva-open-change`) */
  toggle(): void {
    this.open = !this.open;
  }

  /** Final placement once positioned (after flip), else the requested one. */
  private get currentPlacement(): TooltipPlacement {
    return this.positioned
      ? (this.floating.position.placement as TooltipPlacement)
      : this.placement;
  }

  private get visible(): boolean {
    return this.open && !this.disabled;
  }

  private provider(): MinervaTooltipProvider | null {
    const found = closestComposed(this, "minerva-tooltip-provider");
    return found instanceof MinervaTooltipProvider ? found : null;
  }

  private get resolvedEnterDelay(): number {
    return (
      this.enterDelay ?? this.provider()?.enterDelay ?? DEFAULT_ENTER_DELAY
    );
  }

  private get resolvedLeaveDelay(): number {
    return (
      this.leaveDelay ?? this.provider()?.leaveDelay ?? DEFAULT_LEAVE_DELAY
    );
  }

  /** The trigger: first element of the default slot. */
  private triggerElement(): Element | null {
    return (
      Array.from(this.children).find((child) => !child.hasAttribute("slot")) ??
      null
    );
  }

  /** Accessible text of the tooltip (used as the trigger's description). */
  private get text(): string {
    const label = this.aria.label;
    if (label) return label;
    if (this.content.trim()) return this.content.trim();
    return Array.from(this.children)
      .filter((child) => child.getAttribute("slot") === "content")
      .map((child) => child.textContent?.trim() ?? "")
      .filter(Boolean)
      .join(" ");
  }

  private anchor(): Element | VirtualElement | null | undefined {
    if (this.followCursor && this.cursor) {
      return {
        getBoundingClientRect: () => {
          const { x, y } = this.cursor ?? { x: 0, y: 0 };
          return DOMRect.fromRect({ x, y, width: 0, height: 0 });
        },
      };
    }
    return this.wrapper;
  }

  /** Asks to change `open`; listeners can cancel `minerva-open-change`. */
  private requestOpen(open: boolean) {
    if (open === this.open) return;
    if (!open) this.provider()?.markClosed();
    const allowed = this.emit(
      "minerva-open-change",
      { open },
      { cancelable: true },
    );
    if (allowed) this.open = open;
  }

  private clearTimers() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    this.grace.clear();
  }

  private scheduleHide() {
    clearTimeout(this.leaveTimer);
    this.leaveTimer = setTimeout(
      () => this.requestOpen(false),
      this.resolvedLeaveDelay,
    );
  }

  private handlePosition(result: AnchoredPositionResult) {
    const arrow = this.arrowEl;
    if (arrow) {
      arrow.style.left = result.arrow.x != null ? `${result.arrow.x}px` : "";
      arrow.style.top = result.arrow.y != null ? `${result.arrow.y}px` : "";
    }
    if (!this.positioned) this.positioned = true;
  }

  private readonly handleMouseEnter = (event: MouseEvent) => {
    if (this.disabled) return;
    if (this.followCursor) {
      this.cursor = { x: event.clientX, y: event.clientY };
    }
    this.clearTimers();
    const delay = this.resolvedEnterDelay;
    // Within a provider, moving quickly between tooltips skips the delay
    if (delay <= 0 || this.provider()?.shouldSkipDelay()) {
      this.requestOpen(true);
      return;
    }
    this.enterTimer = setTimeout(() => this.requestOpen(true), delay);
  };

  private readonly handleMouseLeave = (event: MouseEvent) => {
    if (this.disabled) return;
    this.clearTimers();
    const rect = this.panel?.getBoundingClientRect();
    if (
      this.open &&
      !this.followCursor &&
      rect &&
      rect.width > 0 &&
      rect.height > 0
    ) {
      // Heading for the tooltip: keep it open while the pointer crosses the
      // gap (pointermove below), at most HOVER_GRACE_MS.
      this.grace.start(
        { x: event.clientX, y: event.clientY },
        rect,
        parsePlacement(this.currentPlacement).side,
      );
      this.leaveTimer = setTimeout(
        () => this.requestOpen(false),
        Math.max(this.resolvedLeaveDelay, HOVER_GRACE_MS),
      );
      return;
    }
    this.scheduleHide();
  };

  /** The pointer reached the tooltip: stay open until it leaves it. */
  private readonly handlePanelMouseEnter = () => {
    if (this.disabled) return;
    this.clearTimers();
  };

  private readonly handlePanelMouseLeave = () => {
    if (this.disabled || this.followCursor) return;
    this.scheduleHide();
  };

  /** Hoverable: the pointer heading through the gap keeps it open. */
  private readonly handleDocumentPointerMove = (event: PointerEvent) => {
    if (!this.grace.getArea()) return;
    const path = event.composedPath();
    if (
      (this.wrapper && path.includes(this.wrapper)) ||
      (this.panel && path.includes(this.panel))
    ) {
      return;
    }
    if (this.grace.isInGraceArea({ x: event.clientX, y: event.clientY })) {
      return;
    }
    this.grace.clear();
    this.scheduleHide();
  };

  private readonly handleDocumentMouseMove = (event: MouseEvent) => {
    this.cursor = { x: event.clientX, y: event.clientY };
  };

  private inPanel(event: Event): boolean {
    return !!this.panel && event.composedPath().includes(this.panel);
  }

  // Keyboard users get the tooltip when the wrapped (interactive) child
  // receives focus. Activation keys are left alone so they still reach it.
  private readonly handleFocusIn = (event: FocusEvent) => {
    if (this.disabled || this.inPanel(event)) return;
    this.clearTimers();
    this.requestOpen(true);
  };

  private readonly handleFocusOut = (event: FocusEvent) => {
    if (this.disabled || this.inPanel(event)) return;
    this.clearTimers();
    this.requestOpen(false);
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("focusin", this.handleFocusIn);
    this.addEventListener("focusout", this.handleFocusOut);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("focusin", this.handleFocusIn);
    this.removeEventListener("focusout", this.handleFocusOut);
    this.listenDocument(false);
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    this.restoreDescription();
  }

  private listening = false;

  private listenDocument(on: boolean) {
    if (on === this.listening) return;
    this.listening = on;
    if (on) {
      document.addEventListener("pointermove", this.handleDocumentPointerMove);
      document.addEventListener("mousemove", this.handleDocumentMouseMove);
    } else {
      document.removeEventListener(
        "pointermove",
        this.handleDocumentPointerMove,
      );
      document.removeEventListener("mousemove", this.handleDocumentMouseMove);
    }
  }

  protected override firstUpdated(): void {
    if (DEV) setTimeout(() => this.checkUsage());
  }

  private checkUsage() {
    if (!this.isConnected) return;
    if (!this.text) {
      devWarn(
        MinervaTooltip.tagName,
        'has no content: set the "content" attribute, aria-label or slot="content".',
      );
    }
    const trigger = this.triggerElement();
    if (
      !this.disabled &&
      trigger &&
      getTabbables(trigger, { includeContainer: true }).length === 0
    ) {
      devWarn(
        MinervaTooltip.tagName,
        'the trigger is not focusable, so keyboard users cannot reach the tooltip; wrap a button / link or add tabindex="0".',
      );
    }
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (
      (changed.has("open") || changed.has("disabled")) &&
      !(this.open && !this.disabled)
    ) {
      this.positioned = false;
      this.grace.clear();
    }
  }

  protected override updated(): void {
    const visible = this.visible;
    this.floating.sync(visible);
    this.listenDocument(visible);
    this.syncDescription(visible);
  }

  /** `aria-description` on the trigger while shown (see the class docs). */
  private syncDescription(visible: boolean) {
    const text = visible ? this.text : "";
    const target = text ? this.triggerElement() : null;
    if (this.described && this.described !== target) {
      this.restoreDescription();
    }
    if (!target) return;
    if (this.described !== target) {
      this.described = target;
      this.describedPrev = target.getAttribute("aria-description");
    }
    const value = this.describedPrev ? `${this.describedPrev} ${text}` : text;
    if (target.getAttribute("aria-description") !== value) {
      target.setAttribute("aria-description", value);
    }
  }

  private restoreDescription() {
    const target = this.described;
    if (!target) return;
    if (this.describedPrev === null) {
      target.removeAttribute("aria-description");
    } else {
      target.setAttribute("aria-description", this.describedPrev);
    }
    this.described = null;
    this.describedPrev = null;
  }

  private readonly handleSlotChange = () => this.requestUpdate();

  protected override hookStates() {
    const placement = this.currentPlacement;
    return {
      state: this.visible ? "open" : "closed",
      disabled: this.disabled,
      color: this.color,
      variant: this.variant,
      shape: this.shape,
      ...parsePlacement(placement),
      placement,
    };
  }

  protected override render() {
    const visible = this.visible;
    const placement = this.currentPlacement;
    // Plain-text trigger: the wrapper (same shadow root) is described.
    const wrapperDescribed = visible && !this.triggerElement();
    return html`<div
        class="tooltipTrigger"
        part="trigger"
        aria-describedby=${wrapperDescribed ? "tooltip" : nothing}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
      ${
        visible
          ? html`<div
              id="tooltip"
              part="content"
              popover="manual"
              role="tooltip"
              dir=${getDirection(this)}
              aria-label=${this.aria.label ?? nothing}
              data-placement=${placement}
              class=${classMap({
                tooltip: true,
                [this.color]: true,
                [this.variant]: true,
                [this.shape]: true,
                [`animation-${this.animation}`]: true,
                followCursor: this.followCursor,
                arrow: this.arrow,
                show: this.positioned,
              })}
              @mouseenter=${this.handlePanelMouseEnter}
              @mouseleave=${this.handlePanelMouseLeave}
            >
              <slot name="content" @slotchange=${this.handleSlotChange}
                >${this.content}</slot
              >${
                this.arrow
                  ? html`<div class="tooltipArrow" part="arrow"></div>`
                  : nothing
              }
            </div>`
          : nothing
      }`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-tooltip": MinervaTooltip;
    "minerva-tooltip-provider": MinervaTooltipProvider;
  }
}
