import { css, html, nothing, unsafeCSS, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@lib-core-styles/components/Stack/stack.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { numberOrString, resolveSpace } from "../box/space";

/** Flex direction of a stack */
export type StackDirection =
  "row" | "column" | "row-reverse" | "column-reverse";
/** Cross-axis alignment of a stack (`align-items`) */
export type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
/** Main-axis distribution of a stack (`justify-content`) */
export type StackJustify =
  "start" | "center" | "end" | "between" | "around" | "evenly";
/** Separator content: text, or a function returning fresh content for every gap */
export type StackSeparator = string | (() => string | Node | TemplateResult);

const alignMap: Record<StackAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

const justifyMap: Record<StackJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

/** Whether `slot.assign()` (manual slot assignment) is available. */
const supportsManualSlots = () =>
  typeof HTMLSlotElement !== "undefined" &&
  typeof HTMLSlotElement.prototype.assign === "function";

/** Children that count as items: elements and non-blank text. */
const itemNodes = (host: HTMLElement): Array<Element | Text> =>
  Array.from(host.childNodes).filter(
    (node): node is Element | Text =>
      node.nodeType === 1 ||
      (node.nodeType === 3 && !!node.textContent?.trim()),
  );

/**
 * A flex container laying out its children in a row or column with a
 * token-based gap (`<Stack>` of lib-core). Children are not wrapped; a
 * `separator` is inserted between them, and `attached` joins them into one
 * group (shared borders, outer corners only, `role="group"`).
 *
 * Shadow DOM notes: the children stay in the light DOM and are slotted into
 * lib-core's `.stack` flex container. Separators are interleaved with manual
 * slot assignment (one slot per child); where `HTMLSlotElement.assign()` is
 * missing (older browsers) the children are slotted together and separators
 * are not shown. The `attached` rules style the children through
 * `::slotted()` (top-level children only); their radius rules reach
 * elements whose own box has the radius (native buttons / inputs), not the
 * inner control of a custom element.
 *
 * @summary Flex row / column layout with gap, alignment, separators and attached groups.
 * @tag minerva-stack
 * @slot - Items
 * @csspart base - The flex container
 */
export class MinervaStack extends MinervaElement {
  static override tagName = "minerva-stack";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
      /* lib-core's direct-child rules of attached groups, via ::slotted */
      .attached ::slotted(*) {
        position: relative;
        margin: 0;
      }
      .attached ::slotted(:hover),
      .attached ::slotted(:focus-visible),
      .attached ::slotted(:focus-within) {
        z-index: 1;
      }
      .attached.row ::slotted(:not(:first-child)) {
        margin-inline-start: -1px;
      }
      .attached.row-reverse ::slotted(:not(:first-child)) {
        margin-inline-end: -1px;
      }
      .attached.row ::slotted(:not(:first-child)),
      .attached.row-reverse ::slotted(:not(:last-child)) {
        border-start-start-radius: 0;
        border-end-start-radius: 0;
      }
      .attached.row ::slotted(:not(:last-child)),
      .attached.row-reverse ::slotted(:not(:first-child)) {
        border-start-end-radius: 0;
        border-end-end-radius: 0;
      }
      .attached.column ::slotted(:not(:first-child)) {
        margin-block-start: -1px;
      }
      .attached.column-reverse ::slotted(:not(:first-child)) {
        margin-block-end: -1px;
      }
      .attached.column ::slotted(:not(:first-child)),
      .attached.column-reverse ::slotted(:not(:last-child)) {
        border-start-start-radius: 0;
        border-start-end-radius: 0;
      }
      .attached.column ::slotted(:not(:last-child)),
      .attached.column-reverse ::slotted(:not(:first-child)) {
        border-end-start-radius: 0;
        border-end-end-radius: 0;
      }
    `,
    unsafeCSS(styles),
  ];

  /** Flex direction */
  @property({ reflect: true })
  direction: StackDirection = "column";

  /**
   * Gap between items: numbers select spacing tokens (`2` -> `var(--space-2)`),
   * other strings are CSS values. No gap when omitted
   */
  @property({ converter: numberOrString })
  gap?: string | number;

  /** Cross-axis alignment (`align-items`); unset when omitted */
  @property({ reflect: true })
  align?: StackAlign;

  /** Main-axis distribution (`justify-content`); unset when omitted */
  @property({ reflect: true })
  justify?: StackJustify;

  /** Wraps items onto multiple lines */
  @property({ type: Boolean, reflect: true })
  wrap = false;

  /**
   * Rendered between every two items: a text (attribute) or a function
   * returning fresh content (e.g. a new `<minerva-divider orientation="vertical">`) per gap
   */
  @property({ attribute: "separator" })
  separator?: StackSeparator;

  /**
   * Joins the items into one attached group: no gap, shared borders and
   * outer-only corner radii, `role="group"` (name it with `aria-label`)
   */
  @property({ type: Boolean, reflect: true })
  attached = false;

  private readonly aria = new AriaController(this);
  // Re-renders when children are added / removed (slot assignment)
  private readonly slots = new HasSlotController(this);
  private manualSlots = false;

  /** Direction actually used (fixed by HStack / VStack). */
  protected get resolvedDirection(): StackDirection {
    return this.direction;
  }

  /** Alignment actually used (HStack / VStack have a default). */
  protected get resolvedAlign(): StackAlign | undefined {
    return this.align;
  }

  protected override createRenderRoot() {
    if (!this.shadowRoot) {
      this.manualSlots = supportsManualSlots();
      const ctor = this.constructor as typeof MinervaStack;
      this.attachShadow({
        ...ctor.shadowRootOptions,
        slotAssignment: this.manualSlots ? "manual" : "named",
      });
    }
    return super.createRenderRoot();
  }

  private renderSeparator(): unknown {
    const separator = this.separator;
    return typeof separator === "function" ? separator() : separator;
  }

  protected override updated(): void {
    if (this.manualSlots) {
      const items = itemNodes(this);
      const slots = Array.from(
        this.renderRoot.querySelectorAll<HTMLSlotElement>("slot"),
      );
      if (slots.length === 1) slots[0].assign(...items);
      else slots.forEach((slot, i) => slot.assign(items[i]));
    }
    if (DEV && this.attached && !this.aria.label) {
      devWarn(
        (this.constructor as typeof MinervaStack).tagName,
        'attached stacks are exposed as role="group": set aria-label (or aria-labelledby) to name the group.',
      );
    }
  }

  protected override render() {
    void this.slots;
    const direction = this.resolvedDirection;
    const align = this.resolvedAlign;
    const style: Record<string, string> = {};
    if (this.gap !== undefined && this.gap !== "" && !this.attached) {
      style.gap = resolveSpace(this.gap);
    }
    if (align && alignMap[align]) style.alignItems = alignMap[align];
    if (this.justify && justifyMap[this.justify]) {
      style.justifyContent = justifyMap[this.justify];
    }
    const hasSeparator =
      this.manualSlots &&
      this.separator !== undefined &&
      this.separator !== null &&
      this.separator !== "";
    const count = hasSeparator ? itemNodes(this).length : 0;
    const content = hasSeparator
      ? Array.from(
          { length: count },
          (_, i) =>
            html`${i > 0 ? this.renderSeparator() : nothing}<slot></slot>`,
        )
      : html`<slot></slot>`;
    return html`<div
      part="base"
      class=${classMap({
        stack: true,
        [direction]: true,
        wrap: this.wrap,
        attached: this.attached,
      })}
      style=${styleMap(style)}
      role=${this.attached ? "group" : nothing}
      aria-label=${this.attached ? (this.aria.label ?? nothing) : nothing}
    >
      ${content}
    </div>`;
  }
}

/**
 * A horizontal stack (`<HStack>` of lib-core): `direction` is always `row`
 * and items are centered on the cross axis unless `align` is set.
 *
 * @summary Horizontal stack.
 * @tag minerva-hstack
 * @slot - Items
 * @csspart base - The flex container
 */
export class MinervaHStack extends MinervaStack {
  static override tagName = "minerva-hstack";

  constructor() {
    super();
    this.direction = "row";
  }

  protected override get resolvedDirection(): StackDirection {
    return "row";
  }

  protected override get resolvedAlign(): StackAlign | undefined {
    return this.align ?? "center";
  }
}

/**
 * A vertical stack (`<VStack>` of lib-core): `direction` is always `column`
 * and items stretch on the cross axis unless `align` is set.
 *
 * @summary Vertical stack.
 * @tag minerva-vstack
 * @slot - Items
 * @csspart base - The flex container
 */
export class MinervaVStack extends MinervaStack {
  static override tagName = "minerva-vstack";

  constructor() {
    super();
    this.direction = "column";
  }

  protected override get resolvedDirection(): StackDirection {
    return "column";
  }

  protected override get resolvedAlign(): StackAlign | undefined {
    return this.align ?? "stretch";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-stack": MinervaStack;
    "minerva-hstack": MinervaHStack;
    "minerva-vstack": MinervaVStack;
  }
}
