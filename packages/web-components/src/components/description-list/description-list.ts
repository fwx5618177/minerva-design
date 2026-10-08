import { css, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "@react-styles/components/DescriptionList/descriptionList.module.scss?inline";
import { DEV, devWarn } from "../../internal/dev";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

/** Renderable content of a term / description */
export type DescriptionListContent = string | number | Node | TemplateResult;

/** One term / description pair */
export interface DescriptionListItem {
  /** Stable key of the row (optional) */
  key?: string;
  /** Term, rendered in a `<dt>` */
  label: DescriptionListContent;
  /** Description, rendered in a `<dd>` (0 is rendered) */
  value: DescriptionListContent;
}

/**
 * One declarative row of a `<minerva-description-list>`: the `label`
 * attribute is the term, the content of the element the description. It
 * renders its content as-is; the list places it in the `<dd>` of its row.
 *
 * @summary Declarative term / description row of a description list.
 * @tag minerva-description-item
 * @slot - The description
 */
export class MinervaDescriptionItem extends MinervaElement {
  static override tagName = "minerva-description-item";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: contents;
      }
    `,
  ];

  /** Term of the row (reflected: the list re-renders when it changes) */
  @property({ reflect: true })
  label = "";

  protected override render() {
    return html`<slot></slot>`;
  }
}

/**
 * Labeled metadata fields as a native `<dl>` (`<DescriptionList>` of
 * React). Each item is a row (`<div>`) holding one `<dt>` / `<dd>`
 * pair; rows stack on narrow screens.
 *
 * Rows come from the `items` property and / or from
 * `<minerva-description-item label="...">` children (rendered after the
 * `items`). Each child is assigned into the `<dd>` of its row (manual slot
 * assignment), so the native `<dl>` structure is kept.
 *
 * @summary Native description list of labeled fields.
 * @tag minerva-description-list
 * @slot - `<minerva-description-item>` rows
 * @csspart root - The `<dl>`
 * @csspart row - Each row (one term / description pair)
 * @csspart term - Each `<dt>`
 * @csspart description - Each `<dd>`
 */
export class MinervaDescriptionList extends MinervaElement {
  static override tagName = "minerva-description-list";
  static override dependencies = [MinervaDescriptionItem];
  static override shadowRootOptions: ShadowRootInit = {
    ...MinervaElement.shadowRootOptions,
    slotAssignment: "manual",
  };
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** Rows rendered before the declarative `<minerva-description-item>` children */
  @property({ attribute: false })
  items: DescriptionListItem[] = [];

  /** Frames the list as a card (full border, rounded corners, surface background, padded rows) */
  @property({ type: Boolean, reflect: true })
  bordered = false;

  /** Tints every other row (replaces the row separators) */
  @property({ type: Boolean, reflect: true })
  striped = false;

  private observer: MutationObserver | null = null;

  private declarativeItems(): MinervaDescriptionItem[] {
    return Array.from(this.children).filter(
      (child): child is MinervaDescriptionItem =>
        child.localName === MinervaDescriptionItem.tagName,
    );
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof MutationObserver === "undefined") return;
    this.observer = new MutationObserver(() => this.requestUpdate());
    this.observer.observe(this, {
      childList: true,
      attributes: true,
      subtree: true,
      attributeFilter: ["label"],
    });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.observer?.disconnect();
    this.observer = null;
  }

  protected override updated(): void {
    const children = this.declarativeItems();
    const slots = Array.from(
      this.renderRoot.querySelectorAll<HTMLSlotElement>("slot[data-item]"),
    );
    slots.forEach((slot, index) => {
      const child = children[index];
      if (child && typeof slot.assign === "function") slot.assign(child);
    });
    if (DEV) {
      const stray = Array.from(this.children).filter(
        (child) => child.localName !== MinervaDescriptionItem.tagName,
      );
      if (stray.length) {
        devWarn(
          MinervaDescriptionList.tagName,
          `only <minerva-description-item> children are rendered (ignored: <${stray[0].localName}>).`,
        );
      }
    }
  }

  protected override render() {
    const declarative = this.declarativeItems();
    return html`<dl
      part="root"
      class=${classMap({
        descriptionList: true,
        bordered: this.bordered,
        striped: this.striped,
      })}
    >
      ${(this.items ?? []).map(
        (item) =>
          html`<div part="row" class="row">
            <dt part="term">${item.label}</dt>
            <dd part="description">${item.value}</dd>
          </div>`,
      )}
      ${declarative.map(
        (child) =>
          html`<div part="row" class="row">
            <dt part="term">${child.label}</dt>
            <dd part="description"><slot data-item></slot></dd>
          </div>`,
      )}
    </dl>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-description-list": MinervaDescriptionList;
    "minerva-description-item": MinervaDescriptionItem;
  }
}
