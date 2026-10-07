import { css, html, nothing, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import type { ColorScheme } from "@minerva/core";
import styles from "@lib-core-styles/components/Button/button.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { attachInternals } from "../../internal/form";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";

export type ButtonVariant = "solid" | "outline" | "ghost" | "link";
export type ButtonSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
export type ButtonShape = "square" | "rounded" | "circle";
export type ButtonBorderRadius =
  "none" | "small" | "medium" | "large" | "circle" | "square";

const radiusClass = (value: string) =>
  `borderRadius${value.charAt(0).toUpperCase()}${value.slice(1)}`;

/**
 * A button with a semantic `color`, a visual `variant`, sizes, shapes, icons
 * and a loading state (`<Button>` of lib-core). Renders a native `<button>`
 * in its shadow root; `type="submit"` / `"reset"` act on the owning form
 * (the element is form-associated).
 *
 * @summary Button with colors, variants, sizes, icons and a loading state.
 * @tag minerva-button
 * @slot - Label
 * @slot start - Icon before the label
 * @slot end - Icon after the label
 * @slot loading - Text shown instead of the label while `loading`
 * @csspart button - The native `<button>`
 * @csspart label - The label wrapper
 * @csspart spinner - The loading spinner
 */
export class MinervaButton extends MinervaElement {
  static override tagName = "minerva-button";
  static formAssociated = true;
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        max-width: 100%;
        vertical-align: middle;
      }
      :host([full-width]) {
        display: flex;
        width: 100%;
      }
    `,
    unsafeCSS(styles),
  ];

  /** Semantic color */
  @property({ reflect: true })
  color: ColorScheme = "primary";

  /** Visual style: solid (filled), outline, ghost or link */
  @property({ reflect: true })
  variant: ButtonVariant = "solid";

  /** Button size */
  @property({ reflect: true })
  size: ButtonSize = "medium";

  /** Preset shape */
  @property({ reflect: true })
  shape?: ButtonShape;

  /** Corner radius preset, or a number of pixels */
  @property({ attribute: "border-radius" })
  borderRadius?: ButtonBorderRadius | number;

  /** Disables the button */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Shows a spinner and blocks activation (aria-busy / aria-disabled); the
   * button stays focusable
   */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Stretches the button to the full width of its container */
  @property({ type: Boolean, reflect: true, attribute: "full-width" })
  fullWidth = false;

  /** Renders the button in its pressed / active state */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * What the button does in its form: nothing ("button"), submit it
   * (through `requestSubmit()`, so validation runs) or reset it
   */
  @property({ reflect: true })
  type: "button" | "submit" | "reset" = "button";

  @query("button")
  private button!: HTMLButtonElement;

  private readonly internals = attachInternals(this);

  private readonly aria = new AriaController(this);
  private readonly slots = new HasSlotController(this);

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

  private handleClick(event: MouseEvent) {
    if (this.loading || this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
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
  }

  protected override updated(): void {
    if (DEV && this.shape === "circle" && !this.aria.label) {
      const text = this.textContent?.trim();
      if (!text) {
        devWarn(
          MinervaButton.tagName,
          'shape="circle" buttons usually only contain an icon: set aria-label to give them an accessible name.',
        );
      }
    }
  }

  protected override render() {
    const radius = this.borderRadius;
    const numericRadius =
      typeof radius === "number" ||
      (typeof radius === "string" && /^\d+(\.\d+)?$/.test(radius));
    const hasLoadingText = this.loading && this.slots.test("loading");
    const hidden = this.loading && !hasLoadingText;
    const spinner = html`<span
      class="loadingSpinner"
      part="spinner"
      aria-hidden="true"
    ></span>`;

    return html`<button
      part="button"
      type="button"
      class=${classMap({
        customButton: true,
        [this.color]: true,
        [`variant-${this.variant}`]: true,
        [this.size]: true,
        [this.shape ?? ""]: !!this.shape,
        [radiusClass(String(radius ?? ""))]: !!radius && !numericRadius,
        fullWidth: this.fullWidth,
        active: this.active,
        loading: this.loading,
      })}
      style=${styleMap(
        numericRadius ? { borderRadius: `${Number(radius)}px` } : {},
      )}
      ?disabled=${this.disabled}
      aria-label=${this.aria.label ?? nothing}
      aria-description=${this.aria.description ?? nothing}
      aria-pressed=${this.aria.attr("aria-pressed") ?? nothing}
      aria-expanded=${this.aria.attr("aria-expanded") ?? nothing}
      aria-haspopup=${this.aria.attr("aria-haspopup") ?? nothing}
      aria-busy=${this.loading ? "true" : nothing}
      aria-disabled=${this.loading ? "true" : nothing}
      @click=${this.handleClick}
    >
      ${
        hasLoadingText
          ? html`${spinner}<span class="label" part="label"
                ><slot name="loading"></slot
              ></span>`
          : html`${this.loading ? spinner : nothing}
              ${
                this.slots.test("start")
                  ? html`<span class=${classMap({ icon: true, hidden })}
                      ><slot name="start"></slot
                    ></span>`
                  : nothing
              }
              <span class=${classMap({ label: true, hidden })} part="label"
                ><slot></slot
              ></span>
              ${
                this.slots.test("end")
                  ? html`<span class=${classMap({ icon: true, hidden })}
                      ><slot name="end"></slot
                    ></span>`
                  : nothing
              }`
      }
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-button": MinervaButton;
  }
}
