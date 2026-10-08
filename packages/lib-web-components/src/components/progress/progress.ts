import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@lib-core-styles/components/ProgressIndicator/progressIndicator.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  IconCircleNotch,
  IconSpinner,
  IconWaveSquare,
} from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

/** Indicator style */
export type ProgressVariant =
  "spinner" | "bar" | "wave" | "circle" | "dottedBar";
/** Diameter of round indicators (12 / 16 / 24 / 32 / 48 px) or bar thickness */
export type ProgressSize = "xsmall" | "small" | "medium" | "large" | "xlarge";
/** Theme primary, neutral gray, or the surrounding text color */
export type ProgressColor = "primary" | "neutral" | "current";

/**
 * Indeterminate loading indicator: spinner, circle, wave, bar or dotted bar
 * (`<ProgressIndicator>` of lib-core). It is a `progressbar` without a
 * value, named by `aria-label`, its visible `label`, or the localized
 * "Loading". Never focusable, so it can sit inside buttons. Set
 * `decorative` when a surrounding element already announces the loading
 * state.
 *
 * @summary Indeterminate loading indicator (spinner, circle, wave, bars).
 * @tag minerva-progress
 * @slot icon - Icon displayed before the indicator
 * @slot label - Visible label (alternative to the `label` attribute)
 * @csspart root - The indicator (role=progressbar unless decorative); color current follows the text color
 * @csspart icon - The icon before the indicator
 * @csspart indicator - The animated indicator (ring, wave or bar)
 * @csspart label - The visible label
 */
export class MinervaProgress extends MinervaElement {
  static override tagName = "minerva-progress";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
        max-width: 100%;
      }
      :host([full]) {
        display: flex;
        width: 100%;
      }
      /* the icons are wrapped (lib-core puts these classes on the svg) */
      .spinner,
      .circle,
      .wave {
        display: inline-flex;
      }
      .spinner svg,
      .circle svg,
      .wave svg {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** Indicator style */
  @property({ reflect: true })
  variant: ProgressVariant = "spinner";

  /** Indicator size */
  @property({ reflect: true })
  size: ProgressSize = "medium";

  /** Indicator color ("current" follows the text color) */
  @property({ reflect: true })
  color: ProgressColor = "primary";

  /** Visible text next to the indicator; also names the progressbar */
  @property()
  label = "";

  /** Purely visual: no progressbar role, hidden from assistive technologies */
  @property({ type: Boolean, reflect: true })
  decorative = false;

  /** Custom width (CSS value; ignored with `full`). Bars default to 200px */
  @property()
  width?: string;

  /** Stretches the indicator to the full width of its container */
  @property({ type: Boolean, reflect: true })
  full = false;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this);
  private readonly slots = new HasSlotController(this);

  protected override hookStates() {
    return {
      // kebab-case state value
      variant: this.variant === "dottedBar" ? "dotted-bar" : this.variant,
      size: this.size,
      color: this.color,
    };
  }

  protected override updated(): void {
    if (DEV && this.full && this.width) {
      devWarn(MinervaProgress.tagName, "width is ignored when full is set.");
    }
  }

  private renderIndicator() {
    const size = this.size;
    switch (this.variant) {
      case "bar":
        return html`<div part="indicator" class="barContainer ${size}">
          <div class="bar"></div>
        </div>`;
      case "dottedBar":
        return html`<div part="indicator" class="dottedBarContainer ${size}">
          <div class="dottedBar"></div>
        </div>`;
      case "wave":
        return html`<div part="indicator" class="waveContainer ${size}">
          <span class="wave" aria-hidden="true">${IconWaveSquare}</span>
        </div>`;
      case "circle":
        return html`<span
          part="indicator"
          class="circle ${size}"
          aria-hidden="true"
          >${IconCircleNotch}</span
        >`;
      case "spinner":
        return html`<span
          part="indicator"
          class="spinner ${size}"
          aria-hidden="true"
          >${IconSpinner}</span
        >`;
      default:
        return nothing;
    }
  }

  protected override render() {
    const isBar = this.variant === "bar" || this.variant === "dottedBar";
    const hasLabel = !!this.label || this.slots.test("label");
    const ariaLabel = this.aria.label;
    return html`<div
      part="root"
      class=${classMap({
        progressIndicator: true,
        [this.color]: true,
        fullWidth: this.full,
        defaultWidth: !this.full && !this.width && isBar,
      })}
      style=${styleMap({
        width: this.width && !this.full ? this.width : undefined,
      })}
      role=${this.decorative ? nothing : "progressbar"}
      aria-hidden=${this.decorative ? "true" : nothing}
      aria-label=${
        this.decorative
          ? nothing
          : (ariaLabel ??
            (hasLabel ? nothing : this.locale.t("common.loading")))
      }
      aria-labelledby=${
        !this.decorative && !ariaLabel && hasLabel ? "label" : nothing
      }
    >
      ${
        this.slots.test("icon")
          ? html`<span class="icon" part="icon"
              ><slot name="icon"></slot
            ></span>`
          : nothing
      }
      ${this.renderIndicator()}
      ${
        hasLabel
          ? html`<span id="label" part="label" class="label"
              ><slot name="label">${this.label}</slot></span
            >`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-progress": MinervaProgress;
  }
}
