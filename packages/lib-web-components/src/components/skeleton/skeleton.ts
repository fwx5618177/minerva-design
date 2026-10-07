import { css, html, nothing, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@lib-core-styles/components/Skeleton/skeleton.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

export type SkeletonVariant =
  "text" | "circular" | "rectangular" | "rounded" | "button" | "image" | "card";
/** Loading animation; "false" disables it */
export type SkeletonAnimation = "pulse" | "wave" | "false";

/** Numbers (and numeric strings) are pixels. */
const toCss = (value: number | string | undefined | null) =>
  value === undefined || value === null || value === ""
    ? undefined
    : typeof value === "number" || /^\d+(\.\d+)?$/.test(value)
      ? `${value}px`
      : value;

/** Spacing-scale step ("2" -> var(--space-2)) or any CSS length. */
const resolveSpace = (value: string | number) =>
  typeof value !== "number" && !/^\d+(\.\d+)?$/.test(value)
    ? value
    : `var(--space-${String(value).replace(".", "-")})`;

const skeletonStyles = [
  hostStyles,
  css`
    /* lib-core reverses the wave from a page-level [dir=rtl] ancestor */
    :host(:dir(rtl)) .animation-wave {
      animation-direction: reverse;
    }
  `,
];

/**
 * Placeholder shapes shown while content loads (`<Skeleton>` of lib-core).
 * By default it is an announced busy region (`role="status"`,
 * `aria-busy`, named "Loading"); once `loaded` is set it renders its slotted
 * content instead. `decorative` renders one bare `aria-hidden` block, to
 * compose custom layouts inside a container that already announces the
 * busy state.
 *
 * @summary Loading placeholder (lines, avatar, title, paragraph, card).
 * @tag minerva-skeleton
 * @slot - Real content, rendered once `loaded` is set
 * @csspart base - The root (busy region, or the decorative block)
 */
export class MinervaSkeleton extends MinervaElement {
  static override tagName = "minerva-skeleton";
  static override styles = [
    ...skeletonStyles,
    css`
      :host {
        display: block;
      }
      :host([decorative][variant="circular"]) {
        display: inline-block;
        vertical-align: middle;
      }
    `,
    sharedStyles(styles),
  ];

  /** Shape of the placeholder */
  @property({ reflect: true })
  variant: SkeletonVariant = "text";

  /** Loading animation ("false" disables it) */
  @property({ reflect: true })
  animation: SkeletonAnimation = "pulse";

  /** Shows the slotted content instead of the placeholder (lib-core's `loading={false}`) */
  @property({ type: Boolean, reflect: true })
  loaded = false;

  /** Renders one bare decorative block (`aria-hidden`) instead of the busy region */
  @property({ type: Boolean, reflect: true })
  decorative = false;

  /** Edge length of a decorative circular block (numbers are pixels; default 32) */
  @property()
  size?: string;

  /** Width of each line (numbers are pixels) */
  @property()
  width?: string;

  /** Height of each line (numbers are pixels) */
  @property()
  height?: string;

  /** Corner radius of each line (numbers are pixels) */
  @property({ attribute: "border-radius" })
  borderRadius?: string;

  /** Number of lines */
  @property({ type: Number })
  lines = 1;

  /** Shows an avatar placeholder */
  @property({ type: Boolean })
  avatar = false;

  /** Avatar size (numbers are pixels) */
  @property({ attribute: "avatar-size" })
  avatarSize = "40";

  /** Avatar shape */
  @property({ attribute: "avatar-shape" })
  avatarShape: "circle" | "square" = "circle";

  /** Highlights the card variant as active */
  @property({ type: Boolean })
  active = false;

  /** Shows a paragraph placeholder (replaces the lines) */
  @property({ type: Boolean })
  paragraph = false;

  /** Shows a title placeholder (replaces the lines; lib-core's `title`) */
  @property({ type: Boolean })
  heading = false;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this);

  protected override updated(changed: PropertyValues<this>): void {
    if (
      DEV &&
      changed.has("lines") &&
      !(Number.isInteger(this.lines) && this.lines >= 0)
    ) {
      devWarn(
        MinervaSkeleton.tagName,
        `lines must be a non-negative integer (got ${this.lines}).`,
      );
    }
  }

  private block(classes: Record<string, boolean>, style = {}) {
    return html`<div
      class=${classMap({
        skeleton: true,
        [`animation-${this.animation}`]: true,
        ...classes,
      })}
      style=${styleMap(style)}
    ></div>`;
  }

  private renderAvatar() {
    if (!this.avatar) return nothing;
    const size = toCss(this.avatarSize);
    return this.block(
      { avatar: true, [`avatar-${this.avatarShape}`]: true },
      { width: size, height: size },
    );
  }

  private renderTitle() {
    return this.heading ? this.block({ title: true }) : nothing;
  }

  private renderParagraph() {
    if (!this.paragraph) return nothing;
    const widths = ["100%", "100%", "92%", "60%"];
    return html`<div class="paragraph">
      ${widths.map((width) => this.block({}, { width, height: "16px" }))}
    </div>`;
  }

  private renderLines() {
    if (this.paragraph || this.heading) return nothing;
    const count = Number.isFinite(this.lines)
      ? Math.max(0, Math.floor(this.lines))
      : 0;
    return Array.from({ length: count }, () =>
      this.block(
        { [this.variant]: true },
        {
          width: toCss(this.width),
          height: toCss(this.height),
          borderRadius: toCss(this.borderRadius),
        },
      ),
    );
  }

  protected override render() {
    if (this.loaded) return html`<slot></slot>`;

    if (this.decorative) {
      const dim =
        this.variant === "circular"
          ? toCss(this.size ?? this.width ?? "32")
          : undefined;
      return html`<span
        part="base"
        aria-hidden="true"
        class=${classMap({
          skeleton: true,
          decorative: true,
          [this.variant]: true,
          [`animation-${this.animation}`]: true,
        })}
        style=${styleMap({
          width: dim ?? toCss(this.width),
          height: dim ?? toCss(this.height),
          borderRadius: toCss(this.borderRadius),
        })}
      ></span>`;
    }

    const content =
      this.variant === "card"
        ? html`<div class=${classMap({ card: true, active: this.active })}>
            ${this.renderAvatar()}
            <div class="cardContent">
              ${this.renderTitle()} ${this.renderParagraph()}
            </div>
          </div>`
        : html`${this.renderAvatar()}
            <div class="content">
              ${this.renderTitle()} ${this.renderLines()}
              ${this.renderParagraph()}
            </div>`;

    return html`<div
      part="base"
      role="status"
      aria-busy="true"
      aria-label=${this.aria.label ?? this.locale.t("common.loading")}
      class=${classMap({ skeletonRoot: true, withAvatar: this.avatar })}
    >
      ${content}
    </div>`;
  }
}

/**
 * A decorative block of text-line placeholders (`<SkeletonText>` of
 * lib-core); the last line is shortened to 70% unless `no-shrink-last` is
 * set. Hidden from assistive technologies: expose the busy state on the
 * surrounding container.
 *
 * @summary Decorative block of text-line placeholders.
 * @tag minerva-skeleton-text
 * @csspart base - The block of lines
 * @csspart line - Each line
 */
export class MinervaSkeletonText extends MinervaElement {
  static override tagName = "minerva-skeleton-text";
  static override styles = [
    ...skeletonStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** Number of text lines */
  @property({ type: Number })
  lines = 3;

  /** Height of each line (numbers are pixels) */
  @property({ attribute: "line-height" })
  lineHeight = "1em";

  /** Space between lines: a spacing-scale step ("2" -> var(--space-2)) or a CSS length */
  @property()
  gap = "2";

  /** Keeps the last line at full width (lib-core's `shrinkLast={false}`) */
  @property({ type: Boolean, attribute: "no-shrink-last" })
  noShrinkLast = false;

  /** Loading animation ("false" disables it) */
  @property({ reflect: true })
  animation: SkeletonAnimation = "pulse";

  protected override updated(changed: PropertyValues<this>): void {
    if (
      DEV &&
      changed.has("lines") &&
      !(Number.isInteger(this.lines) && this.lines >= 0)
    ) {
      devWarn(
        MinervaSkeletonText.tagName,
        `lines must be a non-negative integer (got ${this.lines}).`,
      );
    }
  }

  protected override render() {
    const count = Number.isFinite(this.lines)
      ? Math.max(0, Math.floor(this.lines))
      : 0;
    return html`<div
      part="base"
      aria-hidden="true"
      class="skeletonText"
      style=${styleMap({ gap: resolveSpace(this.gap) })}
    >
      ${Array.from(
        { length: count },
        (_, index) =>
          html`<span
            part="line"
            class="skeleton decorative text animation-${this.animation}"
            style=${styleMap({
              height: toCss(this.lineHeight),
              width: !this.noShrinkLast && index === count - 1 ? "70%" : "100%",
            })}
          ></span>`,
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-skeleton": MinervaSkeleton;
    "minerva-skeleton-text": MinervaSkeletonText;
  }
}
