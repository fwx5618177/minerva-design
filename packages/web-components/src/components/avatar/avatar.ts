import { css, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@react-styles/components/Avatar/avatar.module.scss?inline";
import groupStyles from "@react-styles/components/Avatar/avatarGroup.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

/** Preset size of an avatar (24 / 32 / 48 / 64 / 80 / 96 px) */
export type AvatarSizePreset =
  "xsmall" | "small" | "medium" | "large" | "xlarge" | "xxlarge";
/** Preset size of an avatar, or a size in pixels */
export type AvatarSize = AvatarSizePreset | number;
export type AvatarShape = "circle" | "square" | "rounded";

const SIZE_PRESETS: readonly string[] = [
  "xsmall",
  "small",
  "medium",
  "large",
  "xlarge",
  "xxlarge",
];

const CJK = /[㐀-鿿豈-﫿]/;

/**
 * Initials of a name: the first CJK character, otherwise the uppercased
 * first letters of the first two words ("Ada Lovelace" -> "AL").
 */
function getAvatarInitials(name?: string): string {
  const trimmed = name?.trim() ?? "";
  if (!trimmed) return "";
  if (CJK.test(trimmed[0])) return trimmed[0];
  return trimmed
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
}

/** Numeric sizes may come from the attribute as strings ("40"). */
const sizeConverter = {
  fromAttribute: (value: string | null): AvatarSize =>
    value && /^\d+(\.\d+)?$/.test(value)
      ? Number(value)
      : ((value ?? "medium") as AvatarSize),
  toAttribute: (value: AvatarSize) => String(value),
};

/**
 * A picture of a person, falling back to their initials (or custom fallback
 * content) when there is no image or it fails to load (`<Avatar>` of
 * React). The fallback is exposed as a single image (`role="img"`) named
 * after the person, so screen readers announce "Ada Lovelace" rather than
 * the letters "AL".
 *
 * @summary Picture of a person with an initials / icon fallback.
 * @tag minerva-avatar
 * @slot - Fallback content used when there is no name (e.g. an icon)
 * @slot fallback - Custom fallback content shown instead of the initials
 * @csspart root - The avatar box (role=img while the fallback is shown); no size state for a size in pixels
 * @csspart image - The <img>
 * @csspart fallback - The initials / fallback content wrapper (no image)
 */
export class MinervaAvatar extends MinervaElement {
  static override tagName = "minerva-avatar";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-block;
        flex-shrink: 0;
        vertical-align: middle;
        line-height: 0;
      }
      .avatarText {
        line-height: 1;
      }
    `,
    sharedStyles(styles),
  ];

  /** Image URL; the initials of `name` are shown without it or when it fails to load */
  @property()
  src?: string;

  /** Name of the person: initials, alt text and accessible label */
  @property()
  name = "";

  /** Alternative text of the image ("" for a decorative avatar); defaults to the label */
  @property()
  alt?: string;

  /** Avatar shape */
  @property({ reflect: true })
  shape: AvatarShape = "circle";

  /** Size preset, or a number of pixels */
  @property({ reflect: true, converter: sizeConverter })
  size: AvatarSize = "medium";

  /** Uses tighter margins for overlapping avatars */
  @property({ type: Boolean, reflect: true })
  stacked = false;

  /** The src that failed to load (a new src is tried again) */
  @state()
  private failedSrc?: string;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this);
  // re-renders when the fallback slots change
  private readonly slots = new HasSlotController(this);

  protected override hookStates() {
    return {
      size: typeof this.size === "number" ? undefined : this.size,
      shape: this.shape,
    };
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (
      DEV &&
      changed.has("size") &&
      typeof this.size !== "number" &&
      !SIZE_PRESETS.includes(this.size)
    ) {
      devWarn(
        MinervaAvatar.tagName,
        `unknown size "${this.size}": use a preset (${SIZE_PRESETS.join(", ")}) or a number of pixels.`,
      );
    }
  }

  protected override render() {
    const showImage = !!this.src && this.failedSrc !== this.src;
    const label =
      this.aria.label ?? (this.name || this.locale.t("avatar.default"));
    const numericSize = typeof this.size === "number";
    const classes = classMap({
      avatar: true,
      [this.shape]: true,
      [String(this.size)]: !numericSize,
      stacked: this.stacked,
    });
    const style = styleMap(
      numericSize
        ? {
            "--avatar-size": `${this.size}px`,
            width: `${this.size}px`,
            height: `${this.size}px`,
          }
        : {},
    );

    if (showImage) {
      return html`<span part="root" class=${classes} style=${style}
        ><img
          part="image"
          class="avatarImg"
          alt=${this.alt ?? label}
          src=${this.src!}
          draggable="false"
          @error=${() => (this.failedSrc = this.src)}
      /></span>`;
    }

    const initials = getAvatarInitials(this.name);
    const fallback = this.slots.test("fallback")
      ? html`<slot name="fallback"></slot>`
      : initials || html`<slot></slot>`;
    return html`<span
      part="root"
      role="img"
      aria-label=${label}
      class=${classes}
      style=${style}
      ><span part="fallback" class="avatarText" aria-hidden="true"
        >${fallback}</span
      ></span
    >`;
  }
}

/**
 * Overlapping avatars with an optional "+N" indicator (`<AvatarGroup>` of
 * React). `max` limits the visible avatars (the hidden ones are added to
 * the indicator); `count` adds avatars that are not rendered at all.
 *
 * Each child element is wrapped in its own item box inside the shadow root
 * (manual slot assignment), exactly like the React component, so the
 * overlap / hover styles of React apply unchanged.
 *
 * @summary Overlapping group of avatars with a "+N" indicator.
 * @tag minerva-avatar-group
 * @slot - `<minerva-avatar>` elements
 * @csspart root - The group (role=group)
 * @csspart item - The wrapper of each visible avatar
 * @csspart count - The "+N" indicator of the hidden avatars
 */
export class MinervaAvatarGroup extends MinervaElement {
  static override tagName = "minerva-avatar-group";
  static override shadowRootOptions: ShadowRootInit = {
    ...MinervaElement.shadowRootOptions,
    slotAssignment: "manual",
  };
  static override styles = [
    hostStyles,
    css`
      :host {
        display: flex;
      }
      .avatarGroup {
        flex: 1 1 auto;
        min-width: 0;
      }
    `,
    sharedStyles(groupStyles),
  ];

  /** Number of additional avatars, shown in the "+N" indicator */
  @property({ type: Number })
  count?: number;

  /** Maximum number of avatars displayed; the others are counted in "+N" */
  @property({ type: Number })
  max?: number;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this);
  // re-renders when avatars are added / removed
  private readonly slots = new HasSlotController(this);

  private visibleAvatars(): Element[] {
    const avatars = Array.from(this.children);
    return this.max === undefined || this.max === null
      ? avatars
      : avatars.slice(0, Math.max(0, this.max));
  }

  protected override updated(changed: PropertyValues<this>): void {
    const visible = this.visibleAvatars();
    const slots = Array.from(
      this.renderRoot.querySelectorAll<HTMLSlotElement>("slot[data-item]"),
    );
    slots.forEach((slot, index) => {
      const avatar = visible[index];
      if (avatar && typeof slot.assign === "function") slot.assign(avatar);
    });
    if (
      DEV &&
      changed.has("max") &&
      this.max !== undefined &&
      this.max !== null &&
      !(Number.isInteger(this.max) && this.max >= 0)
    ) {
      devWarn(
        MinervaAvatarGroup.tagName,
        `max must be a non-negative integer (got ${this.max}).`,
      );
    }
  }

  protected override render() {
    void this.slots;
    const total = this.children.length;
    const visible = this.visibleAvatars();
    const extra = (Number(this.count) || 0) + total - visible.length;
    const label =
      this.aria.label ??
      (extra > 0
        ? this.locale.t("avatar.groupWithMore", { count: extra })
        : this.locale.t("avatar.group"));
    return html`<div
      part="root"
      role="group"
      class="avatarGroup"
      aria-label=${label}
    >
      ${visible.map(
        () =>
          html`<div part="item" class="avatarGroupItem">
            <slot data-item></slot>
          </div>`,
      )}
      ${
        extra > 0
          ? html`<div part="count" class="count" aria-hidden="true">
              +${extra}
            </div>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-avatar": MinervaAvatar;
    "minerva-avatar-group": MinervaAvatarGroup;
  }
}
