import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import gridStyles from "@lib-core-styles/components/ResponsiveGrid/responsiveGrid.module.scss?inline";
import styles from "@lib-core-styles/components/FormLayout/formLayout.module.scss?inline";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { numberOrString } from "../box/space";
import {
  columnsConverter,
  gridVariables,
  type ResponsiveGridColumns,
} from "../responsive-grid/responsive-grid";
import { sharedStyles } from "../../internal/styles";

/**
 * Lays the fields of a form out on a responsive column grid
 * (`<FormLayout>` of lib-core): the same container-query grid as
 * `<minerva-responsive-grid>`, with the form's width / margin / padding
 * variables.
 *
 * Difference from lib-core: lib-core's FormLayout renders the `<form>`
 * itself. A `<form>` inside a shadow root cannot own the light DOM fields, so
 * this element is the layout only: place it inside a native `<form>`
 * (`<form><minerva-form-layout columns="1 2">...</minerva-form-layout></form>`),
 * which keeps submit, reset and validation native. Wrap a field in
 * `<minerva-grid-item full-width>` to span a row.
 *
 * @summary Responsive column grid for form fields.
 * @tag minerva-form-layout
 * @slot - Fields
 * @csspart root - The form layout box (React: the native <form>; web components: the grid's query container, inside your own <form>)
 * @csspart layout - The grid. Web components only: React renders a nested ResponsiveGrid (style its `responsive-grid` hooks)
 */
export class MinervaFormLayout extends MinervaElement {
  static override tagName = "minerva-form-layout";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
      .layout ::slotted(*) {
        min-width: 0;
      }
    `,
    // Both modules name their root `.root`: the single root element below
    // gets the grid container rules and the form box rules, as lib-core's
    // nested <form class="root"><div class="root"> pair (same content box).
    sharedStyles(gridStyles),
    sharedStyles(styles),
  ];

  /**
   * Column counts (integers 1-12): a number, `"1 2 3 4"` (base sm md lg) or
   * `{ base, sm, md, lg }` (container widths 480 / 768 / 1200px)
   */
  @property({ converter: columnsConverter })
  columns: ResponsiveGridColumns = 1;

  /** Gap between fields (spacing token number or CSS value) */
  @property({ converter: numberOrString })
  gap: string | number = 4;

  /** Gap between rows; defaults to `gap` */
  @property({ attribute: "row-gap", converter: numberOrString })
  rowGap?: string | number;

  /** Gap between columns; defaults to `gap` */
  @property({ attribute: "column-gap", converter: numberOrString })
  columnGap?: string | number;

  protected override render() {
    const variables = gridVariables(
      MinervaFormLayout.tagName,
      this.columns,
      this.rowGap ?? this.gap,
      this.columnGap ?? this.gap,
    );
    return html`<div class="root" part="root" style=${styleMap(variables)}>
      <div class="layout" part="layout"><slot></slot></div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-form-layout": MinervaFormLayout;
  }
}
