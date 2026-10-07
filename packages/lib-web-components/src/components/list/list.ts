import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "@lib-core-styles/components/List/list.module.scss?inline";
import { DEV, devWarn } from "../../internal/dev";
import { attachInternals } from "../../internal/form";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

/** Row density: 56px or 40px minimum row height */
export type ListDensity = "default" | "compact";

/**
 * Sets the ARIA role of `host` through ElementInternals, falling back to the
 * `role` attribute (unless the author set one).
 */
function setHostRole(
  host: HTMLElement,
  internals: ElementInternals | null,
  role: string,
) {
  if (internals && "role" in internals) {
    internals.role = role;
  } else if (!host.hasAttribute("role")) {
    host.setAttribute("role", role);
  }
}

/**
 * A quiet operational list (`<List>` of lib-core): `role="list"` on the
 * host, rows are `<minerva-list-item>` elements (`role="listitem"`).
 * Density and dividers are applied to the items from the list (dividers
 * between adjacent items, a shorter row in `compact` density).
 *
 * @summary Operational list of rows with optional dividers.
 * @tag minerva-list
 * @slot - `<minerva-list-item>` rows
 * @csspart base - The list wrapper
 */
export class MinervaList extends MinervaElement {
  static override tagName = "minerva-list";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        /* density of the items (consumed by minerva-list-item) */
        --_minerva-list-item-min-height: initial;
        --_minerva-list-item-padding-y: initial;
      }
      :host([density="compact"]) {
        --_minerva-list-item-min-height: calc(
          2 * var(--row-padding-y) + 1.5rem
        );
        --_minerva-list-item-padding-y: var(--row-padding-y);
      }
      :host(:not([no-dividers]))
        ::slotted(minerva-list-item:not(:first-child)) {
        border-top: 1px solid var(--list-divider-color, var(--border-color));
      }
    `,
    sharedStyles(styles),
  ];

  /** Minimum row height and vertical padding of the items */
  @property({ reflect: true })
  density: ListDensity = "default";

  /** Removes the separators between items (lib-core's `dividers={false}`) */
  @property({ type: Boolean, reflect: true, attribute: "no-dividers" })
  noDividers = false;

  private readonly internals = attachInternals(this);

  override connectedCallback(): void {
    super.connectedCallback();
    setHostRole(this, this.internals, "list");
  }

  protected override updated(): void {
    if (DEV) {
      const stray = Array.from(this.children).find(
        (child) => child.localName !== MinervaListItem.tagName,
      );
      if (stray) {
        devWarn(
          MinervaList.tagName,
          `children should be <minerva-list-item> elements (found <${stray.localName}>): other elements break the list semantics.`,
        );
      }
    }
  }

  protected override render() {
    return html`<div
      part="base"
      class=${classMap({
        list: true,
        compact: this.density === "compact",
        dividers: !this.noDividers,
      })}
    >
      <slot @slotchange=${() => this.requestUpdate()}></slot>
    </div>`;
  }
}

/**
 * One row of a `<minerva-list>` (`<ListItem>` of lib-core): primary /
 * secondary text, a decorative leading icon and trailing actions. It adds
 * no selection state, tab stop or row command (`role="listitem"` on the
 * host).
 *
 * @summary Row of a list with text, icon and actions.
 * @tag minerva-list-item
 * @slot - Primary content (alternative to the `primary` attribute)
 * @slot secondary - Supporting content (alternative to the `secondary` attribute)
 * @slot icon - Decorative leading icon (hidden from assistive technologies)
 * @slot actions - Trailing controls
 * @csspart base - The row
 * @csspart icon - The icon wrapper
 * @csspart primary - The primary text
 * @csspart secondary - The secondary text
 * @csspart actions - The actions wrapper
 */
export class MinervaListItem extends MinervaElement {
  static override tagName = "minerva-list-item";
  static override styles = [
    hostStyles,
    sharedStyles(styles),
    css`
      :host {
        display: block;
      }
      /* density inherited from the parent minerva-list */
      .item {
        min-height: var(
          --list-item-min-height,
          var(
            --_minerva-list-item-min-height,
            calc(2 * var(--row-padding-y) + 2.5rem)
          )
        );
        padding-block: var(
          --list-item-padding-y,
          var(
            --_minerva-list-item-padding-y,
            calc(var(--row-padding-y) + var(--space-1))
          )
        );
      }
    `,
  ];

  /** Main content (medium weight); or use the default slot */
  @property()
  primary = "";

  /** Supporting content (muted, smaller); or use the `secondary` slot */
  @property()
  secondary = "";

  private readonly internals = attachInternals(this);
  private readonly slots = new HasSlotController(this);

  override connectedCallback(): void {
    super.connectedCallback();
    setHostRole(this, this.internals, "listitem");
  }

  protected override render() {
    const hasSecondary = this.secondary !== "" || this.slots.test("secondary");
    return html`<div part="base" class="item">
      ${
        this.slots.test("icon")
          ? html`<div part="icon" class="icon" aria-hidden="true">
              <slot name="icon"></slot>
            </div>`
          : nothing
      }
      <div class="content">
        <div part="primary" class="primary"><slot>${this.primary}</slot></div>
        ${
          hasSecondary
            ? html`<div part="secondary" class="secondary">
                <slot name="secondary">${this.secondary}</slot>
              </div>`
            : nothing
        }
      </div>
      ${
        this.slots.test("actions")
          ? html`<div part="actions" class="actions">
              <slot name="actions"></slot>
            </div>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-list": MinervaList;
    "minerva-list-item": MinervaListItem;
  }
}
