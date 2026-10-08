import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@lib-core-styles/components/Divider/divider.module.scss?inline";
import { DEV, devWarn } from "../../internal/dev";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

export type DividerVariant = "solid" | "dashed" | "dotted";
export type DividerOrientation = "horizontal" | "vertical";
export type DividerTextAlign = "left" | "center" | "right";

const cssLength = (value: string | number) =>
  typeof value === "number" || /^\d+(\.\d+)?$/.test(value)
    ? `${value}px`
    : value;

/**
 * A horizontal or vertical separator line (`<Divider>` of lib-core). Without
 * content it renders a native `<hr>` (implicit `separator` role); text in the
 * default slot is rendered between the two halves of a horizontal divider
 * (`role="separator"`). The line color comes from `--divider-color`.
 *
 * Vertical dividers are inline (1em high); `flex-item` stretches one to the
 * height of its flex container.
 *
 * @summary Separator line, optionally with text.
 * @tag minerva-divider
 * @slot - Optional text of a horizontal divider (ignored when vertical)
 * @csspart root - The <hr>, or the role=separator element of a divider with text (align: position of the text)
 * @csspart label - The text between the two halves of the line
 */
export class MinervaDivider extends MinervaElement {
  static override tagName = "minerva-divider";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      :host([orientation="vertical"]) {
        display: inline-flex;
        vertical-align: middle;
      }
      :host([orientation="vertical"][flex-item]) {
        align-self: stretch;
      }
    `,
    sharedStyles(styles),
  ];

  /** Line style */
  @property({ reflect: true })
  variant: DividerVariant = "solid";

  /** Divider direction */
  @property({ reflect: true })
  orientation: DividerOrientation = "horizontal";

  /** Line thickness in pixels */
  @property({ type: Number })
  thickness = 1;

  /** Length of the line (width when horizontal, height when vertical): px number or CSS length */
  @property()
  length?: string | number;

  /** Margin around the divider in pixels (block axis when horizontal, inline axis when vertical) */
  @property({ type: Number })
  spacing = 16;

  /** Position of the text */
  @property({ attribute: "text-align" })
  textAlign: DividerTextAlign = "center";

  /** Adds a subtle shadow */
  @property({ type: Boolean, reflect: true })
  elevation = false;

  /** Vertical divider stretching to the height of its flex container */
  @property({ type: Boolean, reflect: true, attribute: "flex-item" })
  flexItem = false;

  private readonly slots = new HasSlotController(this);

  protected override hookStates() {
    const hasText =
      this.orientation === "horizontal" && this.slots.test("[default]");
    return {
      orientation: this.orientation,
      variant: this.variant,
      align: hasText ? this.textAlign : undefined,
    };
  }

  protected override updated(): void {
    if (
      DEV &&
      this.orientation === "vertical" &&
      this.slots.test("[default]")
    ) {
      devWarn(
        MinervaDivider.tagName,
        "text is only rendered by horizontal dividers; it is ignored when orientation is vertical.",
      );
    }
  }

  protected override render() {
    const horizontal = this.orientation === "horizontal";
    const hasText = horizontal && this.slots.test("[default]");
    const align = this.textAlign;
    const style: Record<string, string> = {};
    if (this.thickness != null && !Number.isNaN(this.thickness)) {
      style.borderWidth = `${this.thickness}px`;
    }
    if (this.length != null && this.length !== "") {
      style[horizontal ? "width" : "height"] = cssLength(this.length);
    }
    if (this.spacing != null && !Number.isNaN(this.spacing)) {
      const spacing = `${this.spacing}px`;
      style.marginTop = horizontal ? spacing : "0";
      style.marginBottom = horizontal ? spacing : "0";
      style.marginLeft = horizontal ? "0" : spacing;
      style.marginRight = horizontal ? "0" : spacing;
    }
    const classes = classMap({
      divider: true,
      [this.variant]: true,
      [this.orientation]: true,
      withText: hasText,
      [`text${align.charAt(0).toUpperCase()}${align.slice(1)}`]: hasText,
      elevation: this.elevation,
      flexItem: this.flexItem,
    });
    if (hasText) {
      return html`<div
        part="root"
        role="separator"
        aria-orientation=${this.orientation}
        class=${classes}
        style=${styleMap(style)}
      >
        <span class="text" part="label"><slot></slot></span>
      </div>`;
    }
    return html`<hr
      part="root"
      aria-orientation=${this.orientation}
      class=${classes}
      style=${styleMap(style)}
    />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-divider": MinervaDivider;
  }
}
