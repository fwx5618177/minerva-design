import { css, html, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import type { ColorScheme, Placement } from "@minerva/core";
import styles from "@lib-core-styles/components/IconButton/iconButton.module.scss?inline";
import tooltipStyles from "@lib-core-styles/components/Tooltip/tooltip.module.scss?inline";
import {
  FloatingLayerController,
  popoverResetStyles,
} from "../../controllers/floating-layer";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { attachInternals } from "../../internal/form";
import { IconSpinner } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

export type IconButtonVariant = "ghost" | "solid" | "outline";
export type IconButtonSize = "xsmall" | "small" | "medium" | "large";
export type IconButtonShape = "circle" | "square";

/** Delay before the tooltip shows on hover (lib-core's Tooltip default) */
const ENTER_DELAY = 200;
/**
 * How long the pointer may travel from the button onto the tooltip before it
 * closes (WCAG 1.4.13 hoverable; lib-core's HOVER_GRACE_MS)
 */
const HOVER_GRACE_MS = 300;

/**
 * A button that only contains an icon (`<IconButton>` of lib-core).
 *
 * - `label` (or `aria-label`) names the button; `label` is also shown as a
 *   tooltip on hover / focus (Escape closes it) unless `no-tooltip` is set.
 * - `color` picks the semantic color (neutral by default), `variant` the
 *   visual style (ghost by default).
 * - The icon is the default slot content, wrapped in an `aria-hidden` span
 *   (the button's name describes it).
 * - `toggle` makes it a toggle button (`aria-pressed` from `pressed`):
 *   activation flips `pressed` and fires a cancelable `minerva-pressed-change`.
 * - While `loading` it stays focusable (aria-disabled + aria-busy instead of
 *   the native disabled attribute) but ignores activation, including the
 *   form submission of `type="submit"`.
 *
 * Differences from lib-core: the tooltip is built in (lib-core wraps the
 * button in its `<Tooltip>`); it supports `tooltip` (content),
 * `tooltip-placement` and `no-tooltip`, not the tooltip color / variant /
 * shape / arrow options.
 *
 * @summary Icon-only button with a tooltip, toggle and loading states.
 * @tag minerva-icon-button
 * @slot - The icon (hidden from assistive technologies)
 * @csspart button - The native `<button>`
 * @csspart glyph - The icon wrapper
 * @csspart spinner - The loading indicator
 * @csspart tooltip - The tooltip (`role="tooltip"`)
 * @fires minerva-pressed-change - A toggle button was activated (`detail: { pressed }`, the new state); cancelable: `preventDefault()` keeps the current state
 */
export class MinervaIconButton extends MinervaElement {
  static override tagName = "minerva-icon-button";
  static formAssociated = true;
  static override shadowRootOptions: ShadowRootInit = {
    ...MinervaElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    popoverResetStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
      .spinner {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: currentColor;
      }
      .spinner svg {
        animation: minerva-icon-button-spin 1s linear infinite;
      }
      .spinner.xsmall {
        font-size: var(--progress-size, 12px);
      }
      .spinner.small {
        font-size: var(--progress-size, 16px);
      }
      .spinner.medium {
        font-size: var(--progress-size, 24px);
      }
      .spinner.large {
        font-size: var(--progress-size, 32px);
      }
      @keyframes minerva-icon-button-spin {
        to {
          transform: rotate(360deg);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .spinner svg {
          animation: none;
        }
      }
    `,
    sharedStyles(styles),
    sharedStyles(tooltipStyles),
  ];

  /**
   * Accessible name of the button, also shown as its tooltip (unless
   * `no-tooltip`). Takes precedence over aria-label
   */
  @property()
  label?: string;

  /** Semantic color */
  @property({ reflect: true })
  color: ColorScheme = "neutral";

  /** Visual style: ghost (transparent until hovered), solid or outline */
  @property({ reflect: true })
  variant: IconButtonVariant = "ghost";

  /** Button size */
  @property({ reflect: true })
  size: IconButtonSize = "medium";

  /** Button shape */
  @property({ reflect: true })
  shape: IconButtonShape = "circle";

  /** Disables the button and removes it from the tab order */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Replaces the icon with a spinner and ignores activation while staying
   * focusable (aria-busy + aria-disabled)
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Makes the button a toggle button (exposes `aria-pressed`) */
  @property({ type: Boolean, reflect: true })
  toggle = false;

  /** Pressed state of a toggle button */
  @property({ type: Boolean, reflect: true })
  pressed = false;

  /** Tooltip content (defaults to `label`) */
  @property()
  tooltip?: string;

  /** Preferred tooltip placement */
  @property({ attribute: "tooltip-placement" })
  tooltipPlacement: Placement = "top";

  /** Does not show the tooltip (the label still names the button) */
  @property({ type: Boolean, attribute: "no-tooltip" })
  noTooltip = false;

  /** What the button does in its form: nothing, submit it or reset it */
  @property({ reflect: true })
  type: "button" | "submit" | "reset" = "button";

  @state()
  private tooltipOpen = false;

  @state()
  private tooltipPositioned = false;

  @query("button")
  private button!: HTMLButtonElement;

  @query(".tooltip")
  private tooltipElement?: HTMLElement;

  private readonly internals = attachInternals(this);
  private readonly aria = new AriaController(this);
  private readonly locale = new LocaleController(this);
  private readonly floating = new FloatingLayerController(this, () => ({
    anchor: () => this.button,
    floating: () => this.tooltipElement,
    branches: () => [this],
    placement: this.tooltipPlacement,
    offset: { mainAxis: 8 },
    dismissOnPointerDownOutside: false,
    dismissOnFocusOutside: false,
    onDismiss: () => this.hideTooltip(),
    onPosition: () => {
      this.tooltipPositioned = true;
    },
  }));
  private enterTimer?: ReturnType<typeof setTimeout>;
  private leaveTimer?: ReturnType<typeof setTimeout>;

  /** The form owning the button */
  get form(): HTMLFormElement | null {
    return this.internals?.form ?? null;
  }

  override focus(options?: FocusOptions): void {
    this.button?.focus(options);
  }

  override blur(): void {
    this.button?.blur();
  }

  override click(): void {
    this.button?.click();
  }

  private get tooltipContent(): string | undefined {
    return this.tooltip || this.label || undefined;
  }

  private get tooltipEnabled(): boolean {
    return (
      !this.noTooltip &&
      !!this.tooltipContent &&
      !this.disabled &&
      !this.loading
    );
  }

  private clearTimers() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
  }

  private showTooltip() {
    if (!this.tooltipEnabled) return;
    this.clearTimers();
    this.tooltipOpen = true;
  }

  private hideTooltip() {
    this.clearTimers();
    this.tooltipOpen = false;
    this.tooltipPositioned = false;
  }

  private handlePointerEnter = () => {
    if (!this.tooltipEnabled || this.tooltipOpen) {
      this.clearTimers();
      return;
    }
    this.clearTimers();
    this.enterTimer = setTimeout(() => this.showTooltip(), ENTER_DELAY);
  };

  private handlePointerLeave = () => {
    this.clearTimers();
    if (!this.tooltipOpen) return;
    // Hoverable: give the pointer time to reach the tooltip
    this.leaveTimer = setTimeout(() => this.hideTooltip(), HOVER_GRACE_MS);
  };

  private handleClick(event: MouseEvent) {
    if (this.loading || this.disabled) {
      // Busy buttons keep focus but must not activate (nor submit)
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    if (this.toggle) {
      const pressed = !this.pressed;
      if (
        this.emit("minerva-pressed-change", { pressed }, { cancelable: true })
      ) {
        this.pressed = pressed;
      }
    }
    const form = this.form;
    if (!form) return;
    if (this.type === "submit") form.requestSubmit();
    else if (this.type === "reset") form.reset();
  }

  /** Clicks on the host while disabled / loading never reach listeners. */
  private readonly blockInactiveClicks = (event: MouseEvent) => {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.blockInactiveClicks, true);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("click", this.blockInactiveClicks, true);
    this.clearTimers();
    this.tooltipOpen = false;
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (
      (changed.has("disabled") ||
        changed.has("loading") ||
        changed.has("noTooltip")) &&
      !this.tooltipEnabled
    ) {
      this.hideTooltip();
    }
  }

  protected override updated(): void {
    this.floating.sync(this.tooltipOpen && this.tooltipEnabled);
    if (DEV && !this.label && !this.aria.label) {
      devWarn(
        MinervaIconButton.tagName,
        "icon buttons only contain an icon: set label (or aria-label) to give them an accessible name.",
      );
    }
  }

  protected override render() {
    const tooltipVisible = this.tooltipOpen && this.tooltipEnabled;
    return html`<button
        part="button"
        type="button"
        class=${classMap({
          iconButton: true,
          [this.color]: true,
          [`variant-${this.variant}`]: true,
          [this.size]: true,
          [this.shape]: true,
          disabled: this.disabled,
          loading: this.loading,
          pressed: this.toggle && this.pressed,
        })}
        ?disabled=${this.disabled}
        tabindex=${this.disabled ? "-1" : "0"}
        aria-label=${this.label ?? this.aria.label ?? this.locale.t("iconButton.default")}
        aria-description=${this.aria.description ?? nothing}
        aria-describedby=${tooltipVisible ? "tooltip" : nothing}
        aria-pressed=${this.toggle ? String(this.pressed) : nothing}
        aria-expanded=${this.aria.attr("aria-expanded") ?? nothing}
        aria-haspopup=${this.aria.attr("aria-haspopup") ?? nothing}
        aria-busy=${this.loading ? "true" : nothing}
        aria-disabled=${this.loading && !this.disabled ? "true" : nothing}
        @click=${this.handleClick}
        @mouseenter=${this.handlePointerEnter}
        @mouseleave=${this.handlePointerLeave}
        @focus=${() => this.showTooltip()}
        @blur=${() => this.hideTooltip()}
      >
        ${
          this.loading
            ? html`<span
                class=${classMap({ spinner: true, [this.size]: true })}
                part="spinner"
                role="progressbar"
                aria-label=${this.locale.t("common.loading")}
                >${IconSpinner}</span
              >`
            : html`<span class="glyph" part="glyph" aria-hidden="true"
                ><slot></slot
              ></span>`
        }
      </button>
      ${
        tooltipVisible
          ? html`<div
              id="tooltip"
              part="tooltip"
              role="tooltip"
              popover="manual"
              class=${classMap({
                tooltip: true,
                neutral: true,
                solid: true,
                default: true,
                "animation-fade": true,
                show: this.tooltipPositioned,
              })}
              @mouseenter=${() => this.clearTimers()}
              @mouseleave=${this.handlePointerLeave}
            >
              ${this.tooltipContent}
            </div>`
          : nothing
      }`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-icon-button": MinervaIconButton;
  }
}
