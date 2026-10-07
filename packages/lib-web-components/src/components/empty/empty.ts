import { css, html, nothing, svg } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@lib-core-styles/components/Empty/empty.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

/** Size preset of the unframed layout */
export type EmptySize = "small" | "medium" | "large";

/** Default icon (lib-core's IconInbox at 40px); decorative. */
const DefaultIcon = svg`<svg class="defaultIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" stroke="none" aria-hidden="true" focusable="false"><path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM5 5v9h4a3 3 0 0 0 6 0h4V5ZM5 16v3h14v-3h-2.54a5 5 0 0 1-8.92 0Z" /></svg>`;

/** Built-in illustration (decorative). */
const DefaultSvg = svg`<svg class="defaultIcon" aria-hidden="true" focusable="false" width="64" height="41" viewBox="0 0 64 41" xmlns="http://www.w3.org/2000/svg"><g transform="translate(0 1)" fill="none" fill-rule="evenodd"><ellipse style="fill: var(--surface-muted-color)" cx="32" cy="33" rx="32" ry="7" /><g fill-rule="nonzero" style="stroke: var(--border-strong-color)"><path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z" /><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" style="fill: var(--surface-color)" /></g></g></svg>`;

const toCss = (value: string | undefined) =>
  value && /^\d+(\.\d+)?$/.test(value) ? `${value}px` : value;

/**
 * Empty state (`<Empty>` of lib-core): an icon, an optional heading, a
 * description (localized "No Data" by default), actions and footer
 * content. It is a `role="status"` region named by its heading (or its
 * description) unless `aria-label` is set.
 *
 * @summary Empty state with icon, heading, description and actions.
 * @tag minerva-empty
 * @slot - Footer content
 * @slot icon - Custom icon replacing the default one
 * @slot heading - Heading (alternative to the `heading` attribute)
 * @slot description - Description (alternative to the `description` attribute)
 * @slot action - Primary call to action
 * @slot secondary-action - Secondary action, after `action`
 * @csspart base - The root region
 * @csspart icon - The icon wrapper
 * @csspart heading - The heading
 * @csspart description - The description
 * @csspart actions - The actions row
 * @csspart footer - The footer
 */
export class MinervaEmpty extends MinervaElement {
  static override tagName = "minerva-empty";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** Heading of the empty state; also its accessible name (lib-core's `title`) */
  @property()
  heading = "";

  /** Description text (default: localized "No Data") */
  @property()
  description?: string;

  /** Hides the description (lib-core's `description={null}`) */
  @property({ type: Boolean, attribute: "hide-description" })
  hideDescription = false;

  /** Renders no icon at all (lib-core's `icon={null}`) */
  @property({ type: Boolean, attribute: "hide-icon" })
  hideIcon = false;

  /** Unframed sized layout; omit for the classic surface layout */
  @property({ reflect: true })
  size?: EmptySize;

  /** Uses the built-in SVG illustration instead of the default icon */
  @property({ type: Boolean, attribute: "use-svg" })
  useSvg = false;

  /** Width of the container (CSS value, numbers are pixels) */
  @property()
  width?: string;

  /** Height of the container (CSS value, numbers are pixels) */
  @property()
  height?: string;

  /** Adds a drop shadow */
  @property({ type: Boolean, attribute: "show-shadow" })
  showShadow = false;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this);
  private readonly slots = new HasSlotController(this);

  protected override updated(): void {
    if (DEV && this.hideDescription && this.description) {
      devWarn(
        MinervaEmpty.tagName,
        "description is ignored while hide-description is set.",
      );
    }
  }

  protected override render() {
    const hasTitle = !!this.heading || this.slots.test("heading");
    const hasDescriptionSlot = this.slots.test("description");
    const description = this.description ?? this.locale.t("empty.description");
    const hasDescription =
      !this.hideDescription && (hasDescriptionSlot || description !== "");
    const hasActions =
      this.slots.test("action") || this.slots.test("secondary-action");
    const label = this.aria.label;

    return html`<div
      part="base"
      class=${classMap({
        empty: true,
        showShadow: this.showShadow,
        sized: !!this.size,
        [`size-${this.size}`]: !!this.size,
      })}
      style=${styleMap({
        width: toCss(this.width),
        height: toCss(this.height),
      })}
      role="status"
      aria-label=${label ?? nothing}
      aria-labelledby=${
        label
          ? nothing
          : hasTitle
            ? "title"
            : hasDescription
              ? "description"
              : nothing
      }
      aria-describedby=${hasTitle && hasDescription ? "description" : nothing}
    >
      ${
        this.hideIcon
          ? nothing
          : html`<div part="icon" class="iconWrapper">
              <slot name="icon">${this.useSvg ? DefaultSvg : DefaultIcon}</slot>
            </div>`
      }
      ${
        hasTitle
          ? html`<div id="title" part="heading" class="title">
              <slot name="heading">${this.heading}</slot>
            </div>`
          : nothing
      }
      ${
        hasDescription
          ? html`<div id="description" part="description" class="description">
              <slot name="description">${description}</slot>
            </div>`
          : nothing
      }
      ${
        hasActions
          ? html`<div part="actions" class="actions">
              <slot name="action"></slot><slot name="secondary-action"></slot>
            </div>`
          : nothing
      }
      ${
        this.slots.test("[default]")
          ? html`<div part="footer" class="footer"><slot></slot></div>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-empty": MinervaEmpty;
  }
}
