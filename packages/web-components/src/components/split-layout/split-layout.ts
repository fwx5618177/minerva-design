import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@react-styles/components/SplitLayout/splitLayout.module.scss?inline";
import { DEV, devWarn } from "../../internal/dev";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { numberOrString, resolveSpace } from "../box/space";
import { sharedStyles } from "../../internal/styles";

/** Container breakpoint below which the layout stacks its slots */
export type SplitLayoutCollapseBelow = "md" | "lg";

const DEFAULT_ASIDE_WIDTH = 320;

/**
 * Main content with an optional aside column that splits beside it once the
 * layout's own width (container query) reaches a breakpoint
 * (`<SplitLayout>` of React). Main always precedes the aside in reading
 * order; without `aside` slot content the main column is full width.
 *
 * @summary Main + aside layout splitting at a container breakpoint.
 * @tag minerva-split-layout
 * @slot - Main content
 * @slot aside - Secondary content, after main
 * @csspart root - The query container
 * @csspart main - The main column
 * @csspart aside - The aside column (when there is aside content)
 */
export class MinervaSplitLayout extends MinervaElement {
  static override tagName = "minerva-split-layout";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
    `,
    sharedStyles(styles),
  ];

  /**
   * Requested aside width in pixels in split mode (the track is
   * `min(asideWidth, 50%)`); must be finite and positive
   */
  @property({ type: Number, attribute: "aside-width" })
  asideWidth = DEFAULT_ASIDE_WIDTH;

  /** Splits at container widths of at least 768px (`md`) or 1200px (`lg`) and stacks below */
  @property({ attribute: "collapse-below", reflect: true })
  collapseBelow: SplitLayoutCollapseBelow = "md";

  /** Gap between the slots (spacing token number or CSS value) */
  @property({ converter: numberOrString })
  gap: string | number = 6;

  private readonly slots = new HasSlotController(this);

  private get validAsideWidth(): boolean {
    return Number.isFinite(this.asideWidth) && this.asideWidth > 0;
  }

  protected override updated(): void {
    if (DEV && !this.validAsideWidth) {
      devWarn(
        MinervaSplitLayout.tagName,
        `aside-width must be a finite positive number (got ${String(this.asideWidth)}); using ${DEFAULT_ASIDE_WIDTH}.`,
      );
    }
  }

  protected override render() {
    const hasAside = this.slots.test("aside");
    const width = this.validAsideWidth ? this.asideWidth : DEFAULT_ASIDE_WIDTH;
    return html`<div
      class="root"
      part="root"
      style=${styleMap({
        "--split-layout-aside-width": `${width}px`,
        "--split-layout-gap": resolveSpace(this.gap),
      })}
    >
      <div
        class=${classMap({
          grid: true,
          [this.collapseBelow]: true,
          hasAside,
        })}
      >
        <div class="main" part="main"><slot></slot></div>
        ${
          hasAside
            ? html`<div class="aside" part="aside">
                <slot name="aside"></slot>
              </div>`
            : nothing
        }
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-split-layout": MinervaSplitLayout;
  }
}
