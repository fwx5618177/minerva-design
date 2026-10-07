import { css, html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@lib-core-styles/components/ResponsiveGrid/responsiveGrid.module.scss?inline";
import { DEV, devWarn } from "../../internal/dev";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { numberOrString, resolveSpace } from "../box/space";

/**
 * Column counts (integers 1-12): one number for every width, or per container
 * breakpoint (base, sm >= 480px, md >= 768px, lg >= 1200px). Missing
 * breakpoints inherit the previous one, starting at 1.
 */
export type ResponsiveGridColumns =
  number | { base?: number; sm?: number; md?: number; lg?: number };

const BREAKPOINTS = ["base", "sm", "md", "lg"] as const;

/**
 * `columns` attribute: `"3"`, `"1 2 3 4"` (base sm md lg) or JSON
 * (`{"base":1,"md":3}`).
 */
export const columnsConverter = {
  fromAttribute(value: string | null): ResponsiveGridColumns | undefined {
    if (value === null) return undefined;
    const text = value.trim();
    if (text.startsWith("{")) {
      try {
        return JSON.parse(text) as ResponsiveGridColumns;
      } catch {
        return Number.NaN;
      }
    }
    const parts = text
      .split(/[\s,]+/)
      .filter(Boolean)
      .map(Number);
    if (parts.length <= 1) return parts[0] ?? Number.NaN;
    const [base, sm, md, lg] = parts;
    return { base, sm, md, lg };
  },
  toAttribute(value: ResponsiveGridColumns | undefined) {
    if (value === undefined) return null;
    return typeof value === "number" ? String(value) : JSON.stringify(value);
  },
};

/**
 * The internal custom properties of lib-core's ResponsiveGrid
 * (`--grid-columns-*`, `--grid-row-gap`, `--grid-column-gap`). Invalid
 * column counts (lib-core throws a RangeError) keep the previous breakpoint's
 * count and are reported in development.
 */
export function gridVariables(
  tag: string,
  columns: ResponsiveGridColumns | undefined,
  rowGap: string | number,
  columnGap: string | number,
): Record<string, string> {
  const counts =
    columns === undefined || columns === null
      ? { base: 1 }
      : typeof columns === "number"
        ? { base: columns }
        : columns;
  const variables: Record<string, string> = {};
  let previous = 1;
  for (const key of BREAKPOINTS) {
    let value = counts[key] ?? previous;
    if (!Number.isInteger(value) || value < 1 || value > 12) {
      if (DEV) {
        devWarn(
          tag,
          `columns must be integers from 1 to 12 (got ${String(value)} for "${key}"); using ${previous}.`,
        );
      }
      value = previous;
    }
    variables[`--grid-columns-${key}`] = String(value);
    previous = value;
  }
  variables["--grid-row-gap"] = resolveSpace(rowGap);
  variables["--grid-column-gap"] = resolveSpace(columnGap);
  return variables;
}

/**
 * An equal-width column grid whose column count follows its own available
 * width (container queries at 480 / 768 / 1200px), not the viewport
 * (`<ResponsiveGrid>` of lib-core).
 *
 * Children are the grid items (wrap them in `<minerva-grid-item>` to span a
 * full row). lib-core's `.layout > *` rule reaches them through
 * `::slotted(*)`.
 *
 * @summary Container-query column grid.
 * @tag minerva-responsive-grid
 * @slot - Grid items
 * @csspart base - The query container
 * @csspart layout - The grid
 */
export class MinervaResponsiveGrid extends MinervaElement {
  static override tagName = "minerva-responsive-grid";
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
    unsafeCSS(styles),
  ];

  /**
   * Column counts (integers 1-12): a number, `"1 2 3 4"` (base sm md lg) or
   * `{ base, sm, md, lg }` (container widths 480 / 768 / 1200px)
   */
  @property({ converter: columnsConverter })
  columns: ResponsiveGridColumns = 1;

  /** Gap between rows and columns (spacing token number or CSS value) */
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
      MinervaResponsiveGrid.tagName,
      this.columns,
      this.rowGap ?? this.gap,
      this.columnGap ?? this.gap,
    );
    return html`<div class="root" part="base" style=${styleMap(variables)}>
      <div class="layout" part="layout"><slot></slot></div>
    </div>`;
  }
}

/**
 * A cell of a `<minerva-responsive-grid>` (or any CSS grid) (`<GridItem>` of
 * lib-core); `full-width` spans the whole row. The element itself is the
 * grid item (lib-core's `asChild` has no equivalent: style the element).
 *
 * @summary Grid cell, optionally spanning the full row.
 * @tag minerva-grid-item
 * @slot - Content
 */
export class MinervaGridItem extends MinervaElement {
  static override tagName = "minerva-grid-item";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
      :host([full-width]) {
        grid-column: 1 / -1;
      }
    `,
  ];

  /** Spans the full row of the surrounding grid */
  @property({ type: Boolean, reflect: true, attribute: "full-width" })
  fullWidth = false;

  protected override render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-responsive-grid": MinervaResponsiveGrid;
    "minerva-grid-item": MinervaGridItem;
  }
}
