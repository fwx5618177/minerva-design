import { css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { repeat } from "lit/directives/repeat.js";
import { styleMap } from "lit/directives/style-map.js";
import type { ColorScheme } from "@minerva/core";
import styles from "@react-styles/components/Tag/tag.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { IconX } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

export type TagVariant = "subtle" | "outline" | "solid";
export type TagSize = "small" | "medium" | "large";
export type TagShape = "square" | "rounded" | "circle";

const RIPPLE_DURATION = 600;

interface Ripple {
  id: number;
  style: Record<string, string>;
}

/**
 * A small label for marking and categorizing (`<Tag>` of React).
 *
 * The root is a plain (non-interactive) element. With `clickable` the
 * content is a native `<button>` (focusable, Enter / Space, ripple) whose
 * clicks reach the host as regular `click` events; with `closable` the
 * close control is a sibling `<button>` (never nested) that fires
 * `minerva-close` (its clicks do not bubble as `click`, so they never
 * trigger the tag's own action). A clickable tag with `pressed` (or
 * `toggle`) is a toggle button (`aria-pressed`), e.g. a selectable filter;
 * with `toggle` a click flips `pressed` itself and fires `minerva-change`.
 *
 * @summary Small label / chip, optionally clickable, toggleable or closable.
 * @tag minerva-tag
 * @slot - Label of the tag
 * @slot icon - Icon displayed before the label
 * @slot avatar - Avatar (small `<minerva-avatar>` or image) before the label
 * @slot close-icon - Custom close icon
 * @csspart root - The tag (a plain, non-interactive element); state active while a clickable tag is pressed, inactive otherwise
 * @csspart action - The native <button> of a clickable tag
 * @csspart label - The label wrapper
 * @csspart icon - The icon before the label
 * @csspart avatar - The avatar before the label
 * @csspart spinner - The loading spinner (while loading)
 * @csspart close-button - The close button
 * @fires minerva-close - The close button was activated (`detail: {}`)
 * @fires minerva-change - A `toggle` tag was toggled (`detail: { pressed }`)
 */
export class MinervaTag extends MinervaElement {
  static override tagName = "minerva-tag";
  static override shadowRootOptions = {
    ...MinervaElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        max-width: 100%;
        vertical-align: middle;
      }
      .closeIcon svg {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** Semantic color */
  @property({ reflect: true })
  color: ColorScheme = "neutral";

  /** Visual style: subtle (tinted), outline (tinted + border) or solid */
  @property({ reflect: true })
  variant: TagVariant = "subtle";

  /** Tag size */
  @property({ reflect: true })
  size: TagSize = "medium";

  /** Tag shape */
  @property({ reflect: true })
  shape: TagShape = "rounded";

  /** Shows a close button (fires `minerva-close`) */
  @property({ type: Boolean, reflect: true })
  closable = false;

  /** Renders the content as a native button (focusable, Enter / Space) */
  @property({ type: Boolean, reflect: true })
  clickable = false;

  /**
   * Pressed (selected) state of a toggle tag (requires `clickable`); sets
   * aria-pressed and the selected style
   */
  @property({ type: Boolean, reflect: true })
  pressed?: boolean;

  /** Makes a clickable tag a toggle: clicks flip `pressed` and fire `minerva-change` */
  @property({ type: Boolean, reflect: true })
  toggle = false;

  /** Shows a spinner, marks the tag busy, blocks its action and hides the close button */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Shows a shadow */
  @property({ type: Boolean, reflect: true })
  elevation = false;

  /** Disables the tag and its close button */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Accessible label of the close button (default: localized "Remove {label}" / "Close") */
  @property({ attribute: "close-label" })
  closeLabel?: string;

  /** Disables the ripple effect of clickable tags */
  @property({ type: Boolean, attribute: "no-ripple" })
  noRipple = false;

  @state()
  private ripples: Ripple[] = [];

  @query(".action")
  private actionButton?: HTMLButtonElement;

  @query(".closeIcon")
  private closeButton?: HTMLButtonElement;

  private nextRippleId = 0;
  private readonly rippleTimers = new Set<ReturnType<typeof setTimeout>>();
  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this);
  private readonly slots = new HasSlotController(this);

  override focus(options?: FocusOptions): void {
    (this.actionButton ?? this.closeButton)?.focus(options);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.rippleTimers.forEach(clearTimeout);
    this.rippleTimers.clear();
    this.ripples = [];
  }

  /** Text of the label (default slot), used to name the close button. */
  private labelText(): string {
    return Array.from(this.childNodes)
      .filter(
        (node) =>
          node.nodeType === 3 ||
          (node.nodeType === 1 && !(node as Element).hasAttribute("slot")),
      )
      .map((node) => node.textContent ?? "")
      .join("")
      .replace(/\s+/g, " ")
      .trim();
  }

  private get inactive() {
    return this.disabled || this.loading;
  }

  private handleClick(event: MouseEvent) {
    if (this.inactive) return;
    this.addRipple(event);
    if (this.toggle) {
      this.pressed = !this.pressed;
      this.emit("minerva-change", { pressed: this.pressed });
    }
  }

  private handleClose(event: MouseEvent) {
    // The close button is not part of the tag's main action.
    event.stopPropagation();
    if (this.disabled) return;
    this.emit("minerva-close", {});
  }

  /** The ripple is drawn over the whole tag, from where it was pressed. */
  private addRipple(event: MouseEvent) {
    if (this.noRipple) return;
    const tag = (event.currentTarget as HTMLElement).parentElement;
    if (!tag) return;
    const rect = tag.getBoundingClientRect();
    // keyboard-activated clicks (detail === 0) ripple from the center
    const fromKeyboard = event.detail === 0;
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    const id = this.nextRippleId++;
    const left = fromKeyboard
      ? rect.width / 2 - radius
      : event.clientX - rect.left - radius;
    const top = fromKeyboard
      ? rect.height / 2 - radius
      : event.clientY - rect.top - radius;
    this.ripples = [
      ...this.ripples,
      {
        id,
        style: {
          width: `${diameter}px`,
          height: `${diameter}px`,
          left: `${left}px`,
          top: `${top}px`,
        },
      },
    ];
    const timer = setTimeout(() => {
      this.rippleTimers.delete(timer);
      this.ripples = this.ripples.filter((r) => r.id !== id);
    }, RIPPLE_DURATION);
    this.rippleTimers.add(timer);
  }

  protected override hookStates() {
    return {
      state: this.clickable && this.pressed ? "active" : "inactive",
      disabled: this.disabled,
      loading: this.loading,
      size: this.size,
      variant: this.variant,
      color: this.color,
      shape: this.shape,
    };
  }

  protected override updated(): void {
    if (DEV && (this.toggle || this.pressed !== undefined) && !this.clickable) {
      devWarn(
        MinervaTag.tagName,
        "pressed / toggle require clickable: the tag is not a button otherwise.",
      );
    }
  }

  protected override render() {
    const isToggle = this.toggle || this.pressed !== undefined;
    const label = this.closable ? this.labelText() : "";
    const closeLabel =
      this.closeLabel ??
      (label
        ? this.locale.t("tag.closeWithLabel", { label })
        : this.locale.t("tag.close"));

    const content = html`${
        this.loading
          ? html`<span
              class="spinner"
              part="spinner"
              aria-hidden="true"
            ></span>`
          : html`${
              this.slots.test("icon")
                ? html`<span class="icon" part="icon"
                    ><slot name="icon"></slot
                  ></span>`
                : nothing
            }${
              this.slots.test("avatar")
                ? html`<span class="avatar" part="avatar"
                    ><slot name="avatar"></slot
                  ></span>`
                : nothing
            }`
      }<span class="content" part="label"><slot></slot></span>`;

    return html`<div
      part="root"
      class=${classMap({
        tag: true,
        [this.color]: true,
        [this.variant]: true,
        [this.size]: true,
        [this.shape]: true,
        clickable: this.clickable && !this.inactive,
        pressed: this.clickable && !!this.pressed,
        elevation: this.elevation,
        disabled: this.disabled,
        loading: this.loading,
      })}
      aria-busy=${this.loading ? "true" : nothing}
      data-component="tag"
    >
      ${
        this.clickable
          ? html`<button
              type="button"
              part="action"
              class="action"
              ?disabled=${this.inactive}
              aria-pressed=${isToggle ? String(!!this.pressed) : nothing}
              aria-label=${this.aria.label ?? nothing}
              aria-description=${this.aria.description ?? nothing}
              @click=${this.handleClick}
            >
              ${content}
            </button>`
          : content
      }
      ${
        this.closable && !this.loading
          ? html`<button
              type="button"
              part="close-button"
              class="closeIcon"
              ?disabled=${this.disabled}
              aria-label=${closeLabel}
              title=${closeLabel}
              @click=${this.handleClose}
            >
              <slot name="close-icon">${IconX}</slot>
            </button>`
          : nothing
      }
      ${repeat(
        this.ripples,
        (r) => r.id,
        (r) => html`<span class="ripple" style=${styleMap(r.style)}></span>`,
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-tag": MinervaTag;
  }
}
