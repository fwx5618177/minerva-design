import { css, html, nothing, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  contains,
  focusElement,
  getActiveElement,
  getFocusables,
  isTabbable,
  type ColorScheme,
} from "@minerva/core";
import styles from "@lib-core-styles/components/Alert/alert.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  IconChevronDown,
  IconChevronUp,
  IconCircleCheckFilled,
  IconCircleInfoFilled,
  IconCircleXFilled,
  IconTriangleAlertFilled,
  IconX,
} from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";

export type AlertColor = Extract<
  ColorScheme,
  "info" | "success" | "warning" | "danger"
>;
export type AlertVariant = "subtle" | "outline" | "solid";
export type AlertSize = "small" | "medium" | "large";
export type AlertAnimationName = "slideIn" | "fadeIn" | "bounce" | "zoom";
/** Element receiving focus after the alert is closed: an element or a getter */
export type AlertFocusTarget =
  HTMLElement | null | (() => HTMLElement | null | undefined);

const ICONS = {
  info: IconCircleInfoFilled,
  success: IconCircleCheckFilled,
  warning: IconTriangleAlertFilled,
  danger: IconCircleXFilled,
};

const ANIMATION_NAMES: readonly string[] = [
  "slideIn",
  "fadeIn",
  "bounce",
  "zoom",
];

/**
 * Important messages: system notices, operation feedback (`<Alert>` of
 * lib-core). Danger / warning alerts interrupt (`role="alert"`), info /
 * success ones are polite (`role="status"`).
 *
 * With `closable`, the close button fires a cancelable `minerva-close`;
 * unless prevented, focus first moves out of the alert (to `returnFocus`,
 * else the next focusable element after it, else the previous one, else its
 * container — never `<body>`) and the element then hides itself (`hidden`
 * attribute; remove it from the DOM in the listener or set `hidden = false`
 * to show it again). With `collapsible` (and a heading) a toggle in the
 * heading expands / collapses the message.
 *
 * @summary Inline status message with icon, actions, dismissal and collapse.
 * @tag minerva-alert
 * @slot - Message
 * @slot heading - Title (alternative to the `heading` attribute)
 * @slot icon - Custom icon replacing the status icon
 * @slot action - Action area (e.g. buttons) at the end
 * @slot close-icon - Custom close icon
 * @csspart base - The alert root
 * @csspart icon - The icon wrapper
 * @csspart heading - The title
 * @csspart message - The message wrapper
 * @csspart action - The action wrapper
 * @csspart close-button - The close button
 * @csspart toggle - The expand / collapse button
 * @fires minerva-close - The close button was activated; cancelable: `preventDefault()` keeps the alert visible
 * @fires minerva-expanded-change - The user expanded / collapsed the message (`detail: { expanded }`); cancelable
 */
export class MinervaAlert extends MinervaElement {
  static override tagName = "minerva-alert";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      .icon svg,
      .expandButton svg,
      .closeButton svg {
        display: block;
      }
    `,
    unsafeCSS(styles),
  ];

  /** Semantic (status) color; also sets the default icon and role */
  @property({ reflect: true })
  color: AlertColor = "info";

  /** Visual style: subtle (tinted), outline (bordered) or solid (filled) */
  @property({ reflect: true })
  variant: AlertVariant = "subtle";

  /** Alert size */
  @property({ reflect: true })
  size: AlertSize = "medium";

  /** Title text (or use the `heading` slot) */
  @property()
  heading = "";

  /** Hides the status icon */
  @property({ type: Boolean, attribute: "hide-icon" })
  hideIcon = false;

  /** Shows a close button */
  @property({ type: Boolean, reflect: true })
  closable = false;

  /** Disables the entrance animation */
  @property({ type: Boolean, attribute: "no-animation" })
  noAnimation = false;

  /** Entrance animation */
  @property({ attribute: "animation-name" })
  animationName: AlertAnimationName = "slideIn";

  /** Banner mode (page-level notices at the top of a page) */
  @property({ type: Boolean, reflect: true })
  banner = false;

  /** Adds a drop shadow */
  @property({ type: Boolean, reflect: true })
  elevation = false;

  /** Square corners (lib-core's `rounded={false}`) */
  @property({ type: Boolean, reflect: true })
  square = false;

  /** Custom corner radius (CSS value, numbers are pixels) */
  @property({ attribute: "border-radius" })
  borderRadius?: string | number;

  /** Lets the message be expanded / collapsed (requires a heading) */
  @property({ type: Boolean, reflect: true })
  collapsible = false;

  /** Whether the message is collapsed (lib-core's `expanded={false}`) */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  /** Accessible label of the close button (default: localized "Close") */
  @property({ attribute: "close-label" })
  closeLabel?: string;

  /** Accessible label of the toggle while collapsed (default: localized "Expand") */
  @property({ attribute: "expand-label" })
  expandLabel?: string;

  /** Accessible label of the toggle while expanded (default: localized "Collapse") */
  @property({ attribute: "collapse-label" })
  collapseLabel?: string;

  /** Accessible label of the status icon (default: localized "{color} icon") */
  @property({ attribute: "icon-label" })
  iconLabel?: string;

  /** ARIA role (default: "alert" for danger / warning, "status" otherwise) */
  @property({ attribute: "alert-role" })
  alertRole?: string;

  /** Element (or getter) focused after the alert is closed with its close button */
  @property({ attribute: false })
  returnFocus?: AlertFocusTarget;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this);
  private readonly slots = new HasSlotController(this);

  private get hasHeading() {
    return !!this.heading || this.slots.test("heading");
  }

  private handleExpand() {
    const expanded = this.collapsed;
    const allowed = this.emit(
      "minerva-expanded-change",
      { expanded },
      { cancelable: true },
    );
    if (allowed) this.collapsed = !expanded;
  }

  private handleClose() {
    // Resolved before the event: a listener may remove the alert.
    const adjacent = this.adjacentTabbable();
    const parent = this.parentElement;
    const allowed = this.emit("minerva-close", {}, { cancelable: true });
    if (!allowed) return;
    // Move focus out before the alert disappears so it never falls to <body>
    // (unless a listener already moved it elsewhere on purpose).
    if (this.isFocusInsideOrLost()) this.moveFocusOut(adjacent, parent);
    this.hidden = true;
  }

  private isFocusInsideOrLost(): boolean {
    const doc = this.ownerDocument;
    const active = getActiveElement(doc);
    return (
      !active ||
      active === doc.body ||
      !active.isConnected ||
      contains(this, active)
    );
  }

  /**
   * The tabbable element following the alert (flat tree order: shadow roots
   * and slots included), else the one preceding it.
   */
  private adjacentTabbable(): HTMLElement | null {
    const all = getFocusables(this.ownerDocument.body);
    const inside = all
      .map((el, index) => (contains(this, el) ? index : -1))
      .filter((index) => index >= 0);
    if (!inside.length) return null;
    const outside = (el: HTMLElement) => !contains(this, el) && isTabbable(el);
    return (
      all.slice(inside[inside.length - 1] + 1).find(outside) ??
      all.slice(0, inside[0]).filter(outside).pop() ??
      null
    );
  }

  private moveFocusOut(
    adjacent: HTMLElement | null,
    parent: HTMLElement | null,
  ) {
    const target =
      typeof this.returnFocus === "function"
        ? this.returnFocus()
        : this.returnFocus;
    if (target?.isConnected && focusElement(target)) return;
    if (adjacent?.isConnected && focusElement(adjacent)) return;
    this.focusContainer(parent);
  }

  /** Focuses the nearest focusable ancestor (or makes the parent focusable). */
  private focusContainer(parent: HTMLElement | null) {
    const doc = this.ownerDocument;
    if (!parent?.isConnected) return;
    for (
      let ancestor: HTMLElement | null = parent;
      ancestor && ancestor !== doc.body;
      ancestor = ancestor.parentElement
    ) {
      if (ancestor.hasAttribute("tabindex") && focusElement(ancestor)) return;
    }
    if (parent === doc.body || parent === doc.documentElement) return;
    parent.setAttribute("tabindex", "-1");
    parent.addEventListener(
      "blur",
      () => {
        if (parent.getAttribute("tabindex") === "-1") {
          parent.removeAttribute("tabindex");
        }
      },
      { once: true },
    );
    focusElement(parent, { preventScroll: true });
  }

  protected override updated(): void {
    if (DEV && this.collapsible && !this.hasHeading) {
      devWarn(
        MinervaAlert.tagName,
        "collapsible needs a heading (the toggle lives in the title): set heading or fill the heading slot.",
      );
    }
  }

  protected override render() {
    const t = this.locale.t;
    const hasHeading = this.hasHeading;
    const isCollapsible = this.collapsible && hasHeading;
    const expanded = !this.collapsed;
    const hasContent = this.slots.test("[default]");
    const animation = !this.noAnimation;
    const radius = this.borderRadius;
    const role =
      this.alertRole ??
      (this.color === "danger" || this.color === "warning"
        ? "alert"
        : "status");

    return html`<div
      part="base"
      class=${classMap({
        alert: true,
        [this.color]: true,
        [this.variant]: true,
        [this.size]: true,
        withIcon: !this.hideIcon,
        withTitle: hasHeading,
        banner: this.banner,
        withAnimation: animation,
        [`animation-${this.animationName}`]:
          animation && ANIMATION_NAMES.includes(this.animationName),
        withElevation: this.elevation,
        rounded: !this.square,
        expanded,
        collapsible: isCollapsible,
      })}
      style=${styleMap({
        borderRadius:
          radius === undefined || radius === null || radius === ""
            ? undefined
            : /^\d+(\.\d+)?$/.test(String(radius))
              ? `${radius}px`
              : String(radius),
      })}
      role=${role}
      aria-label=${this.aria.label ?? nothing}
    >
      ${
        this.hideIcon
          ? nothing
          : html`<span
              part="icon"
              class="icon"
              role="img"
              aria-label=${this.iconLabel ?? t(`alert.icon.${this.color}`)}
              ><slot name="icon">${ICONS[this.color] ?? ICONS.info}</slot></span
            >`
      }
      <div class="content">
        ${
          hasHeading
            ? html`<div class="title" part="heading">
                <slot name="heading">${this.heading}</slot>
                ${
                  isCollapsible
                    ? html`<button
                        type="button"
                        part="toggle"
                        class="expandButton"
                        aria-label=${
                          expanded
                            ? (this.collapseLabel ?? t("alert.collapse"))
                            : (this.expandLabel ?? t("alert.expand"))
                        }
                        aria-expanded=${String(expanded)}
                        aria-controls=${expanded && hasContent ? "message" : nothing}
                        @click=${this.handleExpand}
                      >
                        ${expanded ? IconChevronUp : IconChevronDown}
                      </button>`
                    : nothing
                }
              </div>`
            : nothing
        }
        ${
          hasContent && (!isCollapsible || expanded)
            ? html`<div id="message" class="message" part="message">
                <slot></slot>
              </div>`
            : nothing
        }
      </div>
      ${
        this.slots.test("action")
          ? html`<div class="action" part="action">
              <slot name="action"></slot>
            </div>`
          : nothing
      }
      ${
        this.closable
          ? html`<button
              type="button"
              part="close-button"
              class="closeButton"
              aria-label=${this.closeLabel ?? t("alert.close")}
              @click=${this.handleClose}
            >
              <slot name="close-icon">${IconX}</slot>
            </button>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-alert": MinervaAlert;
  }
}
