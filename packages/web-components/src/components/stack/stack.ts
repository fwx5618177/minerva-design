import { css, html, nothing, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@react-styles/components/Stack/stack.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import type { HookStates } from "../../internal/styling-hooks";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { numberOrString, resolveSpace } from "../box/space";
import { sharedStyles } from "../../internal/styles";

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

/** Name of the fallback slot of the `index`-th element item. */
const ITEM_SLOT = "minerva-stack-item-";

/** Children that count as items: elements and non-blank text. */
const itemNodes = (host: HTMLElement): Array<Element | Text> =>
  Array.from(host.childNodes).filter(
    (node): node is Element | Text =>
      node.nodeType === 1 ||
      (node.nodeType === 3 && !!node.textContent?.trim()),
  );

/**
 * A flex container laying out its children in a row or column with a
 * token-based gap (`<Stack>` of React). Children are not wrapped; a
 * `separator` is inserted between them, and `attached` joins them into one
 * group (shared borders, outer corners only, `role="group"`).
 *
 * Shadow DOM notes: the children stay in the light DOM and are slotted into
 * the React library's `.stack` flex container. Separators are interleaved with manual
 * slot assignment (one slot per child). Where `HTMLSlotElement.assign()` is
 * missing (Safari < 16.4 and other older engines) the stack falls back to
 * named slots: each element child gets a `slot="minerva-stack-item-<n>"`
 * attribute (only while a separator is set; removed again afterwards), so
 * separators render between element children in both modes. Bare text
 * children cannot carry a `slot` attribute: in the fallback they render
 * after the element children without separators (wrap them in an element,
 * e.g. a `<span>`). The `attached` rules style the children through
 * `::slotted()` (top-level children only); their radius rules reach
 * elements whose own box has the radius (native buttons / inputs), not the
 * inner control of a custom element.
 *
 * @summary Flex row / column layout with gap, alignment, separators and attached groups.
 * @tag minerva-stack
 * @slot - Items
 * @csspart root - The flex container
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
      /* the React library's direct-child rules of attached groups, via ::slotted */
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
    sharedStyles(styles),
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
  /** Element children given a fallback `slot` attribute by this stack. */
  private readonly fallbackSlotted = new Set<Element>();

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

  /** Whether separators are rendered (a non-empty `separator`). */
  private get hasSeparator(): boolean {
    const separator = this.separator;
    return separator !== undefined && separator !== null && separator !== "";
  }

  /**
   * Fallback items (no `slot.assign()`): element children without a slot
   * of their own (or with the fallback slot this stack gave them).
   */
  private fallbackItems(): Element[] {
    return Array.from(this.children).filter((child) => {
      const slot = child.getAttribute("slot");
      return slot === null || (this.fallbackSlotted.has(child) && slot !== "");
    });
  }

  /** Removes the fallback `slot` attributes this stack set. */
  private releaseFallbackSlots(keep: readonly Element[] = []): void {
    for (const child of this.fallbackSlotted) {
      if (keep.includes(child)) continue;
      if (child.getAttribute("slot")?.startsWith(ITEM_SLOT)) {
        child.removeAttribute("slot");
      }
      this.fallbackSlotted.delete(child);
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    // fallback slot attributes are released on disconnect: set them again
    if (this.hasUpdated) this.requestUpdate();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.releaseFallbackSlots();
  }

  protected override updated(): void {
    if (this.manualSlots) {
      const items = itemNodes(this);
      const slots = Array.from(
        this.renderRoot.querySelectorAll<HTMLSlotElement>("slot"),
      );
      if (slots.length === 1) slots[0].assign(...items);
      else slots.forEach((slot, i) => slot.assign(items[i]));
    } else if (this.hasSeparator) {
      const items = this.fallbackItems();
      items.forEach((child, i) => {
        const name = `${ITEM_SLOT}${i}`;
        this.fallbackSlotted.add(child);
        if (child.getAttribute("slot") !== name)
          child.setAttribute("slot", name);
      });
      this.releaseFallbackSlots(items);
    } else {
      this.releaseFallbackSlots();
    }
    if (DEV && this.attached && !this.aria.label) {
      devWarn(
        (this.constructor as typeof MinervaStack).tagName,
        'attached stacks are exposed as role="group": set aria-label (or aria-labelledby) to name the group.',
      );
    }
  }

  /** One slot per item with the separators between them. */
  private renderItems(): unknown {
    if (!this.hasSeparator) return html`<slot></slot>`;
    if (this.manualSlots) {
      return Array.from(
        { length: itemNodes(this).length },
        (_, i) =>
          html`${i > 0 ? this.renderSeparator() : nothing}<slot></slot>`,
      );
    }
    // Named-slot fallback; bare text children land in the trailing default slot
    return html`${Array.from(
        { length: this.fallbackItems().length },
        (_, i) =>
          html`${i > 0 ? this.renderSeparator() : nothing}<slot
              name=${`${ITEM_SLOT}${i}`}
            ></slot>`,
      )}<slot></slot>`;
  }

  protected override hookStates(): HookStates {
    return {
      orientation: this.resolvedDirection.startsWith("row")
        ? "horizontal"
        : "vertical",
    };
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
    return html`<div
      part="root"
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
      ${this.renderItems()}
    </div>`;
  }
}

/**
 * A horizontal stack (`<HStack>` of React): `direction` is always `row`
 * and items are centered on the cross axis unless `align` is set.
 *
 * @summary Horizontal stack.
 * @tag minerva-hstack
 * @slot - Items
 * @csspart root - The flex container
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

  /** The direction is fixed: no orientation state */
  protected override hookStates(): HookStates {
    return {};
  }

  protected override get resolvedAlign(): StackAlign | undefined {
    return this.align ?? "center";
  }
}

/**
 * A vertical stack (`<VStack>` of React): `direction` is always `column`
 * and items stretch on the cross axis unless `align` is set.
 *
 * @summary Vertical stack.
 * @tag minerva-vstack
 * @slot - Items
 * @csspart root - The flex container
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

  /** The direction is fixed: no orientation state */
  protected override hookStates(): HookStates {
    return {};
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
