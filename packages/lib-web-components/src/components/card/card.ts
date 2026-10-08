import { linkRel } from "@minerva/core";
import { css, nothing, type PropertyValues } from "lit";
import { property, query } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { html, unsafeStatic } from "lit/static-html.js";
import styles from "@lib-core-styles/components/Card/card.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { closestComposed } from "../../internal/dom";
import { attachInternals } from "../../internal/form";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";
import { safeHref } from "../../internal/url";

/** Visual style of a card */
export type CardVariant =
  "default" | "outline" | "elevated" | "filled" | "ghost";
/** Inner spacing preset of a card or of one of its sections */
export type CardPadding = "none" | "small" | "medium" | "large";
/** Element rendered as the card root */
export type CardAs = "div" | "article" | "section" | "a" | "button";
/** Heading level of a card title */
export type CardTitleAs = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
/** Entrance animation of a card content */
export type CardContentAnimation = "fadeIn" | "slideIn" | "zoomIn";

const ROOT_TAGS: readonly CardAs[] = [
  "div",
  "article",
  "section",
  "a",
  "button",
];
const HEADINGS: readonly CardTitleAs[] = ["h1", "h2", "h3", "h4", "h5", "h6"];
const PADDINGS: readonly CardPadding[] = ["none", "small", "medium", "large"];
const PART_SELECTOR =
  "minerva-card-header, minerva-card-content, minerva-card-footer, minerva-card-title, minerva-card-description";

const paddingClass = (padding: CardPadding | undefined) =>
  padding && PADDINGS.includes(padding) ? `pad-${padding}` : "";

/** Whether the closest enclosing `<minerva-card>` uses the padded layout. */
const inPaddedCard = (el: Element): boolean => {
  const parent =
    el.parentElement ??
    ((el.getRootNode() as ShadowRoot).host as Element | undefined);
  const card = parent ? closestComposed(parent, "minerva-card") : null;
  return !!card?.hasAttribute("padding");
};

/**
 * A content container composed of `<minerva-card-header>`,
 * `<minerva-card-content>` and `<minerva-card-footer>` (`<Card>` of
 * lib-core; omit a section to leave it out). `padding` switches to the padded
 * layout (the card pads itself, sections sit flush), `interactive` adds
 * hover / focus feedback, and `as="a"` (with `href`) / `as="button"` make the
 * whole card a link / button.
 *
 * Shadow DOM notes: lib-core styles the sections with descendant / sibling
 * selectors (`.card.padded > .cardHeader + .cardContent`). Each section is its
 * own element here, so the card tells its sections (and titles /
 * descriptions) whether it is padded and which section precedes them, and
 * they render lib-core's rules in their own shadow roots — same visuals and
 * `--card-*` variables.
 *
 * @summary Content container with header, content and footer sections.
 * @tag minerva-card
 * @slot - Sections (`<minerva-card-header>`, `<minerva-card-content>`, `<minerva-card-footer>`) or any content
 * @csspart root - The card root (div, article, section, a or button)
 */
export class MinervaCard extends MinervaElement {
  static override tagName = "minerva-card";
  static formAssociated = true;
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
      .card ::slotted(minerva-card-content) {
        flex: 1;
      }
      a.card,
      button.card {
        width: 100%;
        box-sizing: border-box;
      }
      button.card {
        margin: 0;
        padding: 0;
      }
    `,
    sharedStyles(styles),
  ];

  /** Visual style: bordered, shadowed, a muted block or transparent */
  @property({ reflect: true })
  variant: CardVariant = "default";

  /**
   * Pads the card itself (sections then sit flush, separated by spacing and a
   * footer rule). When omitted each section pads itself
   */
  @property({ reflect: true })
  padding?: CardPadding;

  /** Adds hover and focus-visible feedback (combine with `as="a"` / `as="button"`) */
  @property({ type: Boolean, reflect: true })
  interactive = false;

  /** Element rendered as the root: div, article, section, a (link) or button */
  @property({ reflect: true })
  as: CardAs = "div";

  /** URL of a link card (`as="a"`) */
  @property()
  href?: string;

  /** Link target (`as="a"`) */
  @property()
  target?: string;

  /** Link relationship (`as="a"`) */
  @property()
  rel?: string;

  /** Downloads the link target (`as="a"`) */
  @property()
  download?: string;

  /** Disables a button card (`as="button"`) */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Native type of a button card: plain button, submit or reset its form */
  @property()
  type: "button" | "submit" | "reset" = "button";

  @query("[part=root]")
  private root?: HTMLElement;

  private readonly internals = attachInternals(this);
  private readonly aria = new AriaController(this);

  private get tag(): CardAs {
    return ROOT_TAGS.includes(this.as) ? this.as : "div";
  }

  override focus(options?: FocusOptions): void {
    if (this.tag === "a" || this.tag === "button") this.root?.focus(options);
    else super.focus(options);
  }

  /** Re-renders the parts so they pick up the layout (padded, previous section). */
  private syncParts = () => {
    for (const part of Array.from(
      this.querySelectorAll<MinervaElement>(PART_SELECTOR),
    )) {
      part.requestUpdate();
    }
  };

  private handleClick(event: MouseEvent) {
    if (this.tag !== "button") return;
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }
    const form = this.internals?.form;
    if (!form) return;
    if (this.type === "submit") form.requestSubmit();
    else if (this.type === "reset") form.reset();
  }

  private readonly blockDisabledClicks = (event: MouseEvent) => {
    if (this.tag === "button" && this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener("click", this.blockDisabledClicks, true);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener("click", this.blockDisabledClicks, true);
  }

  protected override hookStates() {
    return {
      variant: this.variant,
      disabled: this.tag === "button" && this.disabled,
    };
  }

  protected override updated(changed: PropertyValues<this>): void {
    if (changed.has("padding")) this.syncParts();
    if (DEV) {
      if (this.as && !ROOT_TAGS.includes(this.as)) {
        devWarn(
          MinervaCard.tagName,
          `unsupported as="${this.as}" (expected ${ROOT_TAGS.join(", ")}); rendering a div.`,
        );
      }
      if (this.tag === "a" && !this.href) {
        devWarn(
          MinervaCard.tagName,
          'as="a" needs an href to be a link (focusable, activatable with Enter).',
        );
      }
      if (this.interactive && this.tag !== "a" && this.tag !== "button") {
        devWarn(
          MinervaCard.tagName,
          'interactive cards should be links or buttons (as="a" with href, or as="button") so keyboard users can activate them.',
        );
      }
    }
  }

  protected override render() {
    const tag = this.tag;
    const classes = classMap({
      card: true,
      [this.variant]: true,
      padded: !!this.padding,
      [paddingClass(this.padding)]: !!paddingClass(this.padding),
      interactive: this.interactive,
    });
    const label = this.aria.label ?? nothing;
    const slot = html`<slot @slotchange=${this.syncParts}></slot>`;
    if (tag === "a") {
      return html`<a
        part="root"
        class=${classes}
        href=${safeHref(MinervaCard.tagName, this.href) ?? nothing}
        target=${this.target ?? nothing}
        rel=${linkRel(this.target, this.rel) ?? nothing}
        download=${this.download ?? nothing}
        aria-label=${label}
        >${slot}</a
      >`;
    }
    if (tag === "button") {
      return html`<button
        part="root"
        class=${classes}
        type="button"
        ?disabled=${this.disabled}
        aria-label=${label}
        aria-pressed=${this.aria.attr("aria-pressed") ?? nothing}
        aria-expanded=${this.aria.attr("aria-expanded") ?? nothing}
        @click=${this.handleClick}
      >
        ${slot}
      </button>`;
    }
    const element = unsafeStatic(tag);
    return html`<${element} part="root" class=${classes}>${slot}</${element}>`;
  }
}

/** lib-core's section rules (`.card .cardHeader`, `.card.padded > ...`), per section. */
const sectionStyles = css`
  :host {
    display: block;
    min-width: 0;
  }
  .cardHeader {
    padding: var(--card-padding, var(--space-4));
    position: relative;
    background-color: var(--card-header-bg-color, var(--surface-muted-color));
  }
  /* section separators: 1px separator shapes, not one-sided borders */
  .cardHeader::after {
    content: "";
    position: absolute;
    inset-inline: 0;
    bottom: 0;
    height: 1px;
    background-color: var(--card-border-color, var(--border-color));
    pointer-events: none;
  }
  .cardContent {
    padding: var(--card-padding, var(--space-4));
    flex: 1;
    background-color: var(--card-bg-color-content, var(--surface-color));
    min-width: 0;
    overflow-wrap: anywhere;
  }
  .cardFooter {
    padding: var(--card-padding, var(--space-4));
    background-color: color-mix(
      in srgb,
      var(--surface-muted-color) 60%,
      transparent
    );
    position: relative;
    text-align: end;
  }
  .cardFooter::before {
    content: "";
    position: absolute;
    inset-inline: 0;
    top: 0;
    height: 1px;
    background-color: var(--card-border-color, var(--border-color));
    pointer-events: none;
  }
  @media (forced-colors: active) {
    .cardHeader::after,
    .cardFooter::before {
      forced-color-adjust: none;
      background-color: CanvasText;
    }
  }
  .padded {
    padding: 0;
    border: 0;
    background-color: transparent;
    text-align: start;
    white-space: normal;
    overflow: visible;
  }
  .padded.cardHeader::after,
  .padded.cardFooter::before {
    content: none;
  }
  .padded.cardContent.afterHeader {
    margin-top: var(--space-3);
  }
  .padded.cardFooter.afterContent,
  .padded.cardFooter.afterHeader {
    margin-top: var(--space-4);
    padding-top: var(--space-4);
  }
  .padded.cardFooter.afterContent::before,
  .padded.cardFooter.afterHeader::before {
    content: "";
  }
  .pad-none {
    padding: 0;
  }
  .pad-small {
    padding: var(--space-3);
  }
  .pad-medium {
    padding: var(--space-5);
  }
  .pad-large {
    padding: var(--space-8);
  }
`;

/**
 * Shared behaviour of the header / content / footer sections (not
 * registered itself).
 */
export class MinervaCardSection extends MinervaElement {
  static override styles = [hostStyles, sectionStyles];

  /** Overrides the inner spacing of this section */
  @property({ reflect: true })
  padding?: CardPadding;

  protected readonly sectionClass: string = "";

  protected layoutClasses(): Record<string, boolean> {
    const previous = this.previousElementSibling?.localName;
    const pad = paddingClass(this.padding);
    return {
      [this.sectionClass]: true,
      padded: inPaddedCard(this),
      afterHeader: previous === "minerva-card-header",
      afterContent: previous === "minerva-card-content",
      [pad]: !!pad,
    };
  }

  protected override render() {
    return html`<div part="root" class=${classMap(this.layoutClasses())}>
      <slot></slot>
    </div>`;
  }
}

/**
 * Top section of a `<minerva-card>`, usually holding
 * `<minerva-card-title>` and `<minerva-card-description>`
 * (`<CardHeader>` of lib-core).
 *
 * @summary Card header section.
 * @tag minerva-card-header
 * @slot - Header content
 * @csspart root - The section box
 */
export class MinervaCardHeader extends MinervaCardSection {
  static override tagName = "minerva-card-header";
  protected override readonly sectionClass = "cardHeader";
}

/**
 * Main body of a `<minerva-card>` (`<CardContent>` of lib-core), with an
 * optional entrance animation.
 *
 * @summary Card body section.
 * @tag minerva-card-content
 * @slot - Body content
 * @csspart root - The section box
 */
export class MinervaCardContent extends MinervaCardSection {
  static override tagName = "minerva-card-content";
  static override styles = [
    hostStyles,
    sectionStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
      }
      .fadeIn {
        animation: fadeIn 1s ease-in-out;
      }
      .slideIn {
        animation: slideIn 1s ease-in-out;
      }
      .zoomIn {
        animation: zoomIn 1s ease-in-out;
      }
      @keyframes fadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      @keyframes slideIn {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(0);
        }
      }
      @keyframes zoomIn {
        0% {
          transform: scale(0);
        }
        100% {
          transform: scale(1);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .fadeIn,
        .slideIn,
        .zoomIn {
          animation: none;
        }
      }
    `,
  ];
  protected override readonly sectionClass = "cardContent";

  /** Entrance animation of the content */
  @property({ reflect: true })
  animation?: CardContentAnimation;

  protected override layoutClasses(): Record<string, boolean> {
    const classes = super.layoutClasses();
    if (this.animation) classes[this.animation] = true;
    return classes;
  }
}

/**
 * Bottom section of a `<minerva-card>`, e.g. for actions
 * (`<CardFooter>` of lib-core).
 *
 * @summary Card footer section.
 * @tag minerva-card-footer
 * @slot - Footer content
 * @csspart root - The section box
 */
export class MinervaCardFooter extends MinervaCardSection {
  static override tagName = "minerva-card-footer";
  protected override readonly sectionClass = "cardFooter";
}

/**
 * Heading of a card (`<CardTitle>` of lib-core), `h3` by default. Truncates
 * with an ellipsis (wraps in a padded card).
 *
 * @summary Card heading.
 * @tag minerva-card-title
 * @slot - Title text
 * @csspart root - The heading element
 */
export class MinervaCardTitle extends MinervaElement {
  static override tagName = "minerva-card-title";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
      .cardTitle {
        font-size: var(--card-title-font-size, 1.25rem);
        font-weight: var(--font-weight-bold);
        color: var(--text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cardTitle.padded {
        margin: 0;
        font-family: var(--font-family-sans);
        font-size: var(--card-title-font-size, var(--font-size-lg));
        font-weight: var(--font-weight-semibold);
        line-height: var(--line-height-tight);
        white-space: normal;
      }
    `,
  ];

  /** Heading level rendered */
  @property({ reflect: true })
  as: CardTitleAs = "h3";

  protected override render() {
    const tag = unsafeStatic(HEADINGS.includes(this.as) ? this.as : "h3");
    return html`<${tag}
      part="root"
      class=${classMap({ cardTitle: true, padded: inPaddedCard(this) })}
    ><slot></slot></${tag}>`;
  }
}

/**
 * Secondary text shown below a card title (`<CardDescription>` of lib-core).
 *
 * @summary Card description text.
 * @tag minerva-card-description
 * @slot - Description text
 * @csspart root - The paragraph
 */
export class MinervaCardDescription extends MinervaElement {
  static override tagName = "minerva-card-description";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        min-width: 0;
      }
      .cardDescription {
        font-size: var(--font-size-md);
        color: var(--text-secondary-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .cardDescription.padded {
        margin: var(--space-1) 0 0;
        font-family: var(--font-family-sans);
        line-height: var(--line-height-base);
        white-space: normal;
      }
    `,
  ];

  protected override render() {
    return html`<p
      part="root"
      class=${classMap({ cardDescription: true, padded: inPaddedCard(this) })}
    >
      <slot></slot>
    </p>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-card": MinervaCard;
    "minerva-card-header": MinervaCardHeader;
    "minerva-card-content": MinervaCardContent;
    "minerva-card-footer": MinervaCardFooter;
    "minerva-card-title": MinervaCardTitle;
    "minerva-card-description": MinervaCardDescription;
  }
}
