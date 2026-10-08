import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import type { ColorScheme } from "@minerva/core";
import styles from "@react-styles/components/Badge/badge.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

export type BadgeVariant = "solid" | "subtle" | "outline";
export type BadgeSize = "small" | "medium" | "large";
export type BadgePosition =
  "top-right" | "top-left" | "bottom-right" | "bottom-left";

/**
 * A small count or status indicator (`<Badge>` of React).
 *
 * - With element children (default slot) the badge is attached to a corner
 *   of them (`position`), inside a relatively positioned wrapper; its text
 *   comes from `content` / the `content` slot (localized "Badge" otherwise).
 * - Without children, or with plain text children, it is a standalone badge
 *   rendered inline (the text is the badge's content).
 *
 * The badge is a polite `role="status"` region by default; set
 * `badge-role="presentation"` when it must not be announced.
 *
 * @summary Count / status indicator, standalone or attached to an element.
 * @tag minerva-badge
 * @slot - Element the badge is attached to, or the text of a standalone badge
 * @slot content - Rich content of the badge (instead of `content`)
 * @slot icon - Icon displayed before the content
 * @csspart root - The outermost element: the badge itself when standalone, the wrapper of the children when attached
 * @csspart badge - The badge attached to a corner of the children (a standalone badge is the root)
 * @csspart icon - The icon before the content
 */
export class MinervaBadge extends MinervaElement {
  static override tagName = "minerva-badge";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
    `,
    sharedStyles(styles),
  ];

  /** Semantic color */
  @property({ reflect: true })
  color: ColorScheme = "primary";

  /** Visual style: solid (filled), subtle (tinted) or outline (bordered) */
  @property({ reflect: true })
  variant: BadgeVariant = "solid";

  /** Badge size */
  @property({ reflect: true })
  size: BadgeSize = "medium";

  /** Text of the badge (count, short text); use the `content` slot for rich content */
  @property()
  content?: string;

  /** Corner of the children the badge is placed on (ignored by standalone badges) */
  @property({ reflect: true })
  position: BadgePosition = "top-right";

  /** Renders a small dot instead of content */
  @property({ type: Boolean, reflect: true })
  dot = false;

  /** Custom border radius (CSS value) */
  @property({ attribute: "border-radius" })
  borderRadius?: string;

  /** Custom border width (CSS value) */
  @property({ attribute: "border-width" })
  borderWidth?: string;

  /** ARIA role of the badge ("presentation" / "none" to stop announcing it) */
  @property({ attribute: "badge-role" })
  badgeRole = "status";

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this);
  private readonly slots = new HasSlotController(this);

  /** Whether the default slot holds elements (not only text) */
  private hasElementChildren(): boolean {
    return Array.from(this.children).some(
      (child) =>
        !child.hasAttribute("slot") || child.getAttribute("slot") === "",
    );
  }

  protected override hookStates() {
    return { size: this.size, variant: this.variant, color: this.color };
  }

  protected override updated(): void {
    if (
      DEV &&
      this.dot &&
      !this.aria.label &&
      !["presentation", "none"].includes(this.badgeRole)
    ) {
      devWarn(
        MinervaBadge.tagName,
        'a dot badge has no text: set aria-label (e.g. "New messages") or badge-role="presentation".',
      );
    }
  }

  protected override render() {
    const hasChildren = this.slots.test("[default]");
    const textChildren = hasChildren && !this.hasElementChildren();
    const hasContent =
      (this.content !== undefined && this.content !== null) ||
      this.slots.test("content");
    const standalone = !hasChildren || (textChildren && !hasContent);

    let badgeContent: unknown = nothing;
    if (!this.dot) {
      if (hasContent) {
        badgeContent = html`<slot name="content">${this.content}</slot>`;
      } else if (textChildren) {
        badgeContent = html`<slot></slot>`;
      } else if (hasChildren) {
        badgeContent = this.locale.t("badge.default");
      }
    }

    const badge = html`<span
      part=${standalone ? "root" : "badge"}
      class=${classMap({
        badge: true,
        [this.color]: true,
        [this.variant]: true,
        [this.size]: true,
        standalone,
        [this.position]: !standalone,
        dot: this.dot,
      })}
      role=${this.badgeRole || nothing}
      aria-label=${this.aria.label ?? nothing}
      style=${styleMap({
        borderRadius: this.borderRadius,
        borderWidth: this.borderWidth,
      })}
      >${
        this.slots.test("icon")
          ? html`<span class="icon" part="icon"
              ><slot name="icon"></slot
            ></span>`
          : nothing
      }${badgeContent}</span
    >`;

    if (standalone) return badge;
    return html`<div part="root" class="badgeWrapper">
      <div class="content"><slot></slot></div>
      ${badge}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-badge": MinervaBadge;
  }
}
