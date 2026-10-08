import { css, html } from "lit";
import { property } from "lit/decorators.js";
import { DEV, devWarn } from "../../internal/dev";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import {
  numberOrString,
  resolveSize,
  resolveSpace,
  safeCssValue,
} from "./space";

/** A spacing value: numbers / numeric strings select spacing tokens, other strings are CSS values */
export type BoxSpace = string | number;
/** A size value: numbers are pixels, strings are CSS lengths */
export type BoxSize = string | number;

/** Surface aliases accepted by `bg` (`bg.*` shorthands -> surface tokens) */
const backgrounds: Record<string, string> = {
  bg: "var(--surface-color)",
  "bg.subtle": "var(--surface-subtle-color)",
  "bg.muted": "var(--surface-muted-color)",
  "bg.emphasis": "var(--surface-muted-color)",
  "bg.canvas": "var(--canvas-color)",
  "bg.elevated": "var(--surface-elevated-color)",
};
const radii = ["none", "sm", "md", "lg", "xl", "2xl", "full"];
const shadows = ["sm", "md", "lg", "xl"];

const spaceProp = { converter: numberOrString };

/**
 * A container with a small set of style shorthands: padding, margin, size,
 * background, radius, shadow, border (`<Box>` of React).
 *
 * The element itself is the box: the shorthands are applied to the host
 * (through `:host` rules of a per-instance stylesheet), so an inline `style`
 * on the element wins over them, as in React. Side attributes win over
 * axis attributes, which win over the all-sides shorthand.
 *
 * Differences from React: no `as` (use the element directly, or give it a
 * `role`); it is `display: block` by default (override with `style`).
 *
 * @summary Container with spacing, size, background, radius and shadow shorthands.
 * @tag minerva-box
 * @slot - Content
 */
export class MinervaBox extends MinervaElement {
  static override tagName = "minerva-box";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
  ];

  /** Padding on all sides (spacing token or CSS value) */
  @property(spaceProp) p?: BoxSpace;
  /** Horizontal padding (left and right) */
  @property(spaceProp) px?: BoxSpace;
  /** Vertical padding (top and bottom) */
  @property(spaceProp) py?: BoxSpace;
  /** Top padding */
  @property(spaceProp) pt?: BoxSpace;
  /** Right padding */
  @property(spaceProp) pr?: BoxSpace;
  /** Bottom padding */
  @property(spaceProp) pb?: BoxSpace;
  /** Left padding */
  @property(spaceProp) pl?: BoxSpace;
  /** Margin on all sides (spacing token or CSS value such as "auto") */
  @property(spaceProp) m?: BoxSpace;
  /** Horizontal margin (left and right) */
  @property(spaceProp) mx?: BoxSpace;
  /** Vertical margin (top and bottom) */
  @property(spaceProp) my?: BoxSpace;
  /** Top margin */
  @property(spaceProp) mt?: BoxSpace;
  /** Right margin */
  @property(spaceProp) mr?: BoxSpace;
  /** Bottom margin */
  @property(spaceProp) mb?: BoxSpace;
  /** Left margin */
  @property(spaceProp) ml?: BoxSpace;
  /** Width: numbers are pixels, strings are CSS lengths */
  @property(spaceProp) w?: BoxSize;
  /** Height: numbers are pixels, strings are CSS lengths */
  @property(spaceProp) h?: BoxSize;
  /** Minimum width */
  @property({ converter: numberOrString, attribute: "min-w" }) minW?: BoxSize;
  /** Minimum height */
  @property({ converter: numberOrString, attribute: "min-h" }) minH?: BoxSize;
  /** Maximum width */
  @property({ converter: numberOrString, attribute: "max-w" }) maxW?: BoxSize;
  /** Maximum height */
  @property({ converter: numberOrString, attribute: "max-h" }) maxH?: BoxSize;

  /**
   * Background: a surface alias (`bg`, `bg.subtle`, `bg.muted`, `bg.canvas`,
   * `bg.elevated`, `bg.emphasis`) or any CSS background value
   */
  @property() bg?: string;

  /** Border radius: a radius token (none, sm, md, lg, xl, 2xl, full) or any CSS value */
  @property() rounded?: string;

  /** Box shadow: a shadow token (sm, md, lg, xl) or any CSS value */
  @property({ attribute: "box-shadow" }) boxShadow?: string;

  /** CSS border shorthand, used as-is */
  @property() border?: string;

  /** The generated declarations, in precedence order (later wins). */
  private declarations(): Array<[string, string]> {
    const out: Array<[string, string]> = [];
    const space = (value: BoxSpace | undefined, ...props: string[]) => {
      if (value === undefined || value === "") return;
      for (const prop of props) out.push([prop, resolveSpace(value)]);
    };
    const size = (value: BoxSize | undefined, prop: string) => {
      if (value === undefined || value === "") return;
      out.push([prop, resolveSize(value)]);
    };
    space(this.p, "padding");
    space(this.px, "padding-left", "padding-right");
    space(this.py, "padding-top", "padding-bottom");
    space(this.pt, "padding-top");
    space(this.pr, "padding-right");
    space(this.pb, "padding-bottom");
    space(this.pl, "padding-left");
    space(this.m, "margin");
    space(this.mx, "margin-left", "margin-right");
    space(this.my, "margin-top", "margin-bottom");
    space(this.mt, "margin-top");
    space(this.mr, "margin-right");
    space(this.mb, "margin-bottom");
    space(this.ml, "margin-left");
    size(this.w, "width");
    size(this.h, "height");
    size(this.minW, "min-width");
    size(this.minH, "min-height");
    size(this.maxW, "max-width");
    size(this.maxH, "max-height");
    if (this.bg) out.push(["background", backgrounds[this.bg] ?? this.bg]);
    if (this.rounded) {
      out.push([
        "border-radius",
        radii.includes(this.rounded)
          ? `var(--radius-${this.rounded})`
          : this.rounded,
      ]);
    }
    if (this.boxShadow) {
      out.push([
        "box-shadow",
        shadows.includes(this.boxShadow)
          ? `var(--shadow-${this.boxShadow})`
          : this.boxShadow,
      ]);
    }
    if (this.border) out.push(["border", this.border]);
    return out;
  }

  protected override updated(): void {
    if (DEV && this.bg?.startsWith("bg.") && !(this.bg in backgrounds)) {
      devWarn(
        MinervaBox.tagName,
        `unknown surface alias bg="${this.bg}" (expected one of ${Object.keys(backgrounds).join(", ")}).`,
      );
    }
  }

  protected override render() {
    const rules = this.declarations()
      .map(([prop, value]) => `${prop}:${safeCssValue(value)};`)
      .join("");
    return html`<style>
        :host{${rules}}
      </style>
      <slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-box": MinervaBox;
  }
}
