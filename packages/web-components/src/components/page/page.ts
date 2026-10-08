import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@react-styles/components/Page/page.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { numberOrString, resolveSize } from "../box/space";
import { sharedStyles } from "../../internal/styles";

/** Spacing density of a toolbar */
export type ToolbarDensity = "default" | "compact";

/**
 * The padded, vertically spaced column of a screen's content (`<Page>` of
 * React). Children (`<minerva-page-header>`, `<minerva-page-section>`...)
 * are the flex items of the React library's `.page` column.
 *
 * @summary Padded column of a screen's content.
 * @tag minerva-page
 * @slot - Page content
 * @csspart root - The page column
 */
export class MinervaPage extends MinervaElement {
  static override tagName = "minerva-page";
  static override styles = [
    hostStyles,
    sharedStyles(styles),
    css`
      :host {
        display: block;
        min-width: 0;
      }
    `,
  ];

  /** Maximum width: numbers are pixels, strings are CSS lengths */
  @property({ attribute: "max-width", converter: numberOrString })
  maxWidth?: string | number;

  protected override render() {
    const maxWidth =
      this.maxWidth === undefined || this.maxWidth === ""
        ? undefined
        : resolveSize(this.maxWidth);
    return html`<div class="page" part="root" style=${styleMap({ maxWidth })}>
      <slot></slot>
    </div>`;
  }
}

/**
 * The page's `h1` with an optional description and actions (`<PageHeader>`
 * of React). the React library's `title` prop is `heading` here (`title` is a
 * global HTML attribute that shows a native tooltip).
 *
 * @summary Page heading with description and actions.
 * @tag minerva-page-header
 * @slot heading - Heading content (alternative to the `heading` attribute)
 * @slot description - Supporting text (alternative to the `description` attribute)
 * @slot actions - Actions next to the heading (wrap below it on narrow widths)
 * @csspart root - The `<header>`
 * @csspart title - The `<h1>`
 * @csspart description - The description paragraph
 * @csspart actions - The actions wrapper
 */
export class MinervaPageHeader extends MinervaElement {
  static override tagName = "minerva-page-header";
  static override styles = [
    hostStyles,
    sharedStyles(styles),
    css`
      :host {
        display: block;
        min-width: 0;
      }
    `,
  ];

  /** Heading text */
  @property()
  heading = "";

  /** Supporting text under the heading */
  @property()
  description = "";

  protected readonly slots = new HasSlotController(this);

  protected override updated(): void {
    if (DEV && !this.heading && !this.slots.test("heading")) {
      devWarn(
        (this.constructor as typeof MinervaElement).tagName,
        "set the heading attribute (or fill the heading slot): the heading names the region.",
      );
    }
  }

  protected renderHeading() {
    const hasDescription = !!this.description || this.slots.test("description");
    return html`<div class="heading">
      <h1 part="title"><slot name="heading">${this.heading}</slot></h1>
      ${
        hasDescription
          ? html`<p part="description">
              <slot name="description">${this.description}</slot>
            </p>`
          : nothing
      }
    </div>`;
  }

  protected renderActions() {
    return this.slots.test("actions")
      ? html`<div class="actions" part="actions">
          <slot name="actions"></slot>
        </div>`
      : nothing;
  }

  protected override render() {
    return html`<header class="header" part="root">
      ${this.renderHeading()} ${this.renderActions()}
    </header>`;
  }
}

/**
 * A region named by its `h2` heading, with optional description, icon and
 * actions (`<PageSection>` of React). The `<section>` is labelled by its
 * heading. the React library's `title` prop is `heading` here.
 *
 * React keeps Tags at their intrinsic width in a section
 * (`> [data-component="tag"]`); here the same rule targets slotted
 * `minerva-tag` / `[data-component="tag"]` children.
 *
 * @summary Page region with an h2 heading, description and actions.
 * @tag minerva-page-section
 * @slot - Section content
 * @slot heading - Heading content (alternative to the `heading` attribute)
 * @slot description - Supporting text (alternative to the `description` attribute)
 * @slot actions - Actions next to the heading
 * @slot icon - Decorative icon before the heading (hidden from assistive technologies)
 * @csspart root - The `<section>`
 * @csspart header - The title row (title, description and actions)
 * @csspart title - The `<h2>`
 * @csspart icon - The decorative icon wrapper, inside the title
 * @csspart description - The description paragraph
 * @csspart actions - The actions wrapper
 */
export class MinervaPageSection extends MinervaPageHeader {
  static override tagName = "minerva-page-section";
  static override styles = [
    hostStyles,
    sharedStyles(styles),
    css`
      :host {
        display: block;
        min-width: 0;
      }
      .section ::slotted(minerva-tag),
      .section ::slotted([data-component="tag"]) {
        align-self: flex-start;
      }
    `,
  ];

  protected override renderHeading() {
    const hasDescription = !!this.description || this.slots.test("description");
    return html`<div class="heading">
      <h2 id="heading" part="title">
        ${
          this.slots.test("icon")
            ? html`<span class="sectionIcon" part="icon" aria-hidden="true"
                ><slot name="icon"></slot
              ></span>`
            : nothing
        }<slot name="heading">${this.heading}</slot>
      </h2>
      ${
        hasDescription
          ? html`<p part="description">
              <slot name="description">${this.description}</slot>
            </p>`
          : nothing
      }
    </div>`;
  }

  protected override render() {
    return html`<section class="section" part="root" aria-labelledby="heading">
      <div class="sectionHeader" part="header">
        ${this.renderHeading()} ${this.renderActions()}
      </div>
      <slot></slot>
    </section>`;
  }
}

/**
 * Groups related controls in a wrapping flex row with `role="group"`
 * (`<Toolbar>` of React). It adds no arrow-key navigation. Name it with
 * `aria-label`.
 *
 * the React library's direct-child rules are applied with `::slotted()` (top-level
 * children only): inputs (`minerva-input`, `[data-component="input"]`) grow
 * from 16rem, selects (`minerva-select`, `[data-component="select"]`) take
 * 12rem, and in `compact` density vertical dividers
 * (`minerva-divider[orientation="vertical"]`, `hr` / `[role="separator"]`
 * with `aria-orientation="vertical"`) are centered at a fixed height. the React library's
 * `asChild` has no equivalent.
 *
 * @summary Wrapping row of related controls (role="group").
 * @tag minerva-toolbar
 * @slot - Controls
 * @csspart root - The group
 */
export class MinervaToolbar extends MinervaElement {
  static override tagName = "minerva-toolbar";
  static override styles = [
    hostStyles,
    sharedStyles(styles),
    css`
      :host {
        display: block;
        min-width: 0;
        max-width: 100%;
      }
      .toolbar ::slotted(*) {
        max-width: 100%;
        min-width: 0;
      }
      .toolbar ::slotted(minerva-input),
      .toolbar ::slotted([data-component="input"]) {
        flex: 1 1 16rem;
      }
      .toolbar ::slotted(minerva-select),
      .toolbar ::slotted([data-component="select"]) {
        width: auto;
        flex: 0 1 12rem;
      }
      .nowrap ::slotted(minerva-select),
      .nowrap ::slotted([data-component="select"]) {
        width: 12rem;
      }
      .compact ::slotted(minerva-divider[orientation="vertical"]),
      .compact ::slotted(hr[aria-orientation="vertical"]),
      .compact ::slotted([role="separator"][aria-orientation="vertical"]) {
        height: var(--space-5);
        align-self: center;
        flex: 0 0 auto;
      }
    `,
  ];

  /** Keeps the controls on one bounded row instead of wrapping */
  @property({ type: Boolean, reflect: true })
  nowrap = false;

  /** Gap between controls: default (space-3) or compact (space-1) */
  @property({ reflect: true })
  density: ToolbarDensity = "default";

  private readonly aria = new AriaController(this);

  protected override render() {
    return html`<div
      part="root"
      role="group"
      aria-label=${this.aria.label ?? nothing}
      aria-description=${this.aria.description ?? nothing}
      class=${classMap({
        toolbar: true,
        compact: this.density === "compact",
        nowrap: this.nowrap,
      })}
    >
      <slot></slot>
    </div>`;
  }
}

/**
 * A labelled metric (`<dl>`) with optional icon and description
 * (`<StatCard>` of React).
 *
 * @summary Labelled metric card.
 * @tag minerva-stat-card
 * @slot label - Metric name (alternative to the `label` attribute)
 * @slot value - Metric value (alternative to the `value` attribute)
 * @slot description - Explanatory text under the value
 * @slot icon - Decorative icon (hidden from assistive technologies)
 * @csspart root - The card
 * @csspart icon - The decorative icon wrapper
 * @csspart label - The metric name (`<dt>`)
 * @csspart value - The metric value (`<dd>`)
 * @csspart description - The description paragraph
 */
export class MinervaStatCard extends MinervaElement {
  static override tagName = "minerva-stat-card";
  static override styles = [
    hostStyles,
    sharedStyles(styles),
    css`
      :host {
        display: block;
        min-width: 0;
      }
    `,
  ];

  /** Metric name */
  @property()
  label = "";

  /** Metric value (0 is rendered) */
  @property()
  value = "";

  /** Explanatory text under the value */
  @property()
  description?: string;

  private readonly slots = new HasSlotController(this);

  protected override render() {
    const hasDescription =
      (this.description !== undefined && this.description !== null) ||
      this.slots.test("description");
    return html`<div class="statCard" part="root">
      ${
        this.slots.test("icon")
          ? html`<span class="statIcon" part="icon" aria-hidden="true"
              ><slot name="icon"></slot
            ></span>`
          : nothing
      }
      <div class="statContent">
        <dl>
          <dt part="label"><slot name="label">${this.label}</slot></dt>
          <dd part="value"><slot name="value">${this.value}</slot></dd>
        </dl>
        ${
          hasDescription
            ? html`<p class="statDescription" part="description">
                <slot name="description">${this.description}</slot>
              </p>`
            : nothing
        }
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-page": MinervaPage;
    "minerva-page-header": MinervaPageHeader;
    "minerva-page-section": MinervaPageSection;
    "minerva-toolbar": MinervaToolbar;
    "minerva-stat-card": MinervaStatCard;
  }
}
