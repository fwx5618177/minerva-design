import { css, html, nothing, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import styles from "@lib-core-styles/components/TextLink/textLink.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { IconChevronRight } from "../../internal/icons";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";

/** default: underlined inline link; subtle: quiet with a chevron; action: full-width row */
export type TextLinkVariant = "default" | "subtle" | "action";

/**
 * A styled native link (`<TextLink>` of lib-core). Renders an `<a>` in its
 * shadow root (one tab stop, activated with Enter); the subtle variant
 * appends a decorative chevron as a non-color cue. To style a router link
 * instead, put the router's anchor inside and use the CSS variables, or use
 * the element's `href` with your router's click interception.
 *
 * @summary Styled native link (default, subtle, action row).
 * @tag minerva-text-link
 * @slot - Link text (and icons)
 * @csspart link - The native `<a>`
 */
export class MinervaTextLink extends MinervaElement {
  static override tagName = "minerva-text-link";
  static override shadowRootOptions = {
    ...MinervaElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline;
      }
      :host([variant="action"]) {
        display: block;
      }
      :host([variant="subtle"]) {
        display: inline-flex;
      }
    `,
    unsafeCSS(styles),
  ];

  /** Visual style */
  @property({ reflect: true })
  variant: TextLinkVariant = "default";

  /** URL of the link */
  @property()
  href?: string;

  /** Browsing context (`_blank`...) */
  @property()
  target?: string;

  /** Link relationship (`noopener`...) */
  @property()
  rel?: string;

  /** Downloads the target instead of navigating (optional file name) */
  @property()
  download?: string;

  /** Language of the linked resource */
  @property()
  hreflang?: string;

  @query("a")
  private anchor?: HTMLAnchorElement;

  private readonly aria = new AriaController(this);

  override focus(options?: FocusOptions): void {
    this.anchor?.focus(options);
  }

  override blur(): void {
    this.anchor?.blur();
  }

  override click(): void {
    this.anchor?.click();
  }

  protected override updated(): void {
    if (DEV && !this.href) {
      devWarn(
        MinervaTextLink.tagName,
        "href is missing: without it the link is not focusable nor announced as a link (use a button for actions).",
      );
    }
  }

  protected override render() {
    return html`<a
      part="link"
      class=${classMap({ textLink: true, [this.variant]: true })}
      href=${this.href ?? nothing}
      target=${this.target ?? nothing}
      rel=${this.rel ?? nothing}
      download=${this.download ?? nothing}
      hreflang=${this.hreflang ?? nothing}
      aria-label=${this.aria.label ?? nothing}
      aria-description=${this.aria.description ?? nothing}
      aria-current=${this.aria.attr("aria-current") ?? nothing}
      ><slot></slot>${this.variant === "subtle" ? IconChevronRight : nothing}</a
    >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-text-link": MinervaTextLink;
  }
}
