import { css, html, nothing } from "lit";
import { property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import styles from "@lib-core-styles/components/Rating/rating.module.scss?inline";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  logicalArrowKey,
  ratingDisplayStars,
  ratingStarFill,
  roundRating,
  type RatingStarFill,
} from "@minerva/core";
import {
  FormAssociatedElement,
  type ValidityResult,
} from "../../internal/form";
import { IconStar, IconStarHalf } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

export type RatingSize = "small" | "medium" | "large";

/** One dimension of a `<minerva-rating-scale>` */
export interface RatingDimension {
  /** Stable key, passed back in the change event */
  key: string;
  /** Displayed label */
  label: string;
  /** Current score of the dimension */
  value: number;
  /** Optional description, shown as the row's title tooltip */
  hint?: string;
}

const SIZE_PX: Record<RatingSize, number> = {
  small: 12,
  medium: 16,
  large: 20,
};
const STARS = [0, 1, 2, 3, 4];
/** PageUp / PageDown step, in stars (arrows move by half a star). */
const PAGE_STARS = Math.max(1, Math.round(STARS.length / 5));

/** Shared star styles: the icons are 1em outlines, filled through CSS. */
const starStyles = css`
  .star svg {
    display: block;
    width: 100%;
    height: 100%;
    stroke-width: 1.5;
  }
  .full svg,
  .halfFill svg {
    fill: currentColor;
  }
`;

/**
 * A score drawn as 5 stars on any 0..max scale (`<Rating>` of lib-core),
 * optionally followed by the value and the number of ratings.
 *
 * Display-only by default (`role="img"`), like the React component without
 * `onChange`. With `interactive`: hover previews, clicking the left / right
 * half of a star picks a half / full star, and the stars are a slider:
 * arrows step half a star (`max / 10`; in RTL ArrowLeft increases),
 * PageUp / PageDown one whole star (`max / 5`), Home / End jump to 0 /
 * `max`, all clamped to 0..max. `readonly` (or `disabled`) forces the
 * display-only version again.
 *
 * Form-associated: submits `value` under `name`; `required` makes a 0 score
 * invalid (`valueMissing`); supports `form.reset()` (restores the `value`
 * attribute), `<fieldset disabled>` and state restoration.
 *
 * @summary Star rating (display or interactive slider).
 * @tag minerva-rating
 * @csspart root - The root (role="slider", or role="img" when display-only)
 * @csspart stars - The star row
 * @csspart star - Each star
 * @csspart value - The score and the count
 * @csspart count - The number of ratings
 * @fires change - The user changed the score
 * @fires minerva-change - The user changed the score; `detail: { value }`
 */
export class MinervaRating extends FormAssociatedElement {
  static override tagName = "minerva-rating";
  static override shadowRootOptions = {
    ...FormAssociatedElement.shadowRootOptions,
    delegatesFocus: true,
  };
  static override styles = [
    hostStyles,
    css`
      :host {
        display: inline-flex;
        vertical-align: middle;
      }
    `,
    sharedStyles(styles),
    starStyles,
  ];

  /** Current score, from 0 to max (property; the `value` attribute sets `defaultValue`) */
  @property({ attribute: false })
  value = 0;

  /** Initial score, restored by `form.reset()` (the `value` attribute) */
  @property({ type: Number, attribute: "value" })
  defaultValue = 0;

  /** Highest score; the score is always drawn on 5 stars */
  @property({ type: Number })
  max = 10;

  /** Star size: 12px, 16px or 20px */
  @property({ reflect: true })
  size: RatingSize = "medium";

  /** Shows the score (one decimal) after the stars */
  @property({ type: Boolean, attribute: "show-value" })
  showValue = false;

  /** Number of ratings, shown after the score when show-value is set */
  @property({ type: Number, attribute: "rating-count" })
  ratingCount?: number;

  /**
   * Makes the rating an interactive slider (React: passing `onChange`);
   * display-only otherwise
   */
  @property({ type: Boolean, reflect: true })
  interactive = false;

  /** Forces display mode even when `interactive` is set */
  @property({ type: Boolean, reflect: true, attribute: "readonly" })
  readOnly = false;

  @state()
  private hoverIndex: number | null = null;

  @query(".rating")
  private root!: HTMLElement;

  private readonly locale = new LocaleController(this);
  private readonly aria = new AriaController(this, () => this.labels);
  private dirty = false;

  private get isInteractive(): boolean {
    return this.interactive && !this.readOnly && !this.isDisabled;
  }

  override focus(options?: FocusOptions): void {
    this.root?.focus(options);
  }

  override blur(): void {
    this.root?.blur();
  }

  protected getFormValue(): string {
    return String(this.value);
  }

  protected override getValidity(): ValidityResult {
    if (this.required && !(this.value > 0)) {
      return {
        flags: { valueMissing: true },
        message: this.locale.t("validation.valueMissing"),
        anchor: this.root,
      };
    }
    return { flags: {}, message: "" };
  }

  protected resetFormValue(): void {
    this.dirty = false;
    this.value = this.defaultValue;
  }

  protected override restoreFormState(state: unknown): void {
    if (typeof state === "string" && state.trim() !== "") {
      const n = Number(state);
      if (Number.isFinite(n)) this.value = n;
    }
  }

  protected override willUpdate(changed: Map<PropertyKey, unknown>): void {
    // first update: a value set before connecting wins over the default
    // unless the value attribute is present
    if (
      changed.has("defaultValue") &&
      !this.dirty &&
      (this.hasUpdated || this.hasAttribute("value"))
    ) {
      this.value = this.defaultValue;
    }
    if (
      DEV &&
      (changed.has("value") || changed.has("max")) &&
      (this.value < 0 || this.value > this.max)
    ) {
      devWarn(
        MinervaRating.tagName,
        `value (${this.value}) is outside 0..max (${this.max}).`,
      );
    }
  }

  private commit(next: number) {
    if (next === this.value) return;
    this.dirty = true;
    this.value = next;
    this.dispatchEvent(new Event("change", { bubbles: true }));
    this.emit("minerva-change", { value: next });
  }

  private handleStarClick(event: MouseEvent, index: number) {
    if (!this.isInteractive) return;
    // Left half of a star -> half star, right half -> full star.
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const leftHalf = event.clientX - rect.left < rect.width / 2;
    const stars = index + (leftHalf ? 0.5 : 1);
    this.commit(roundRating((stars / 5) * this.max));
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.defaultPrevented || !this.isInteractive) return;
    const { max, value } = this;
    const step = max / (STARS.length * 2);
    const pageStep = (max / STARS.length) * PAGE_STARS;
    // Stars follow the reading direction: in RTL ArrowLeft increases.
    const key = logicalArrowKey(event.key, this);
    let next: number;
    switch (key) {
      case "ArrowRight":
      case "ArrowUp":
        next = Math.min(max, roundRating(value + step));
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = Math.max(0, roundRating(value - step));
        break;
      case "PageUp":
        next = Math.min(max, roundRating(value + pageStep));
        break;
      case "PageDown":
        next = Math.max(0, roundRating(value - pageStep));
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }
    event.preventDefault();
    this.commit(next);
  }

  protected override hookStates() {
    return { readonly: !this.isInteractive, size: this.size };
  }

  private renderStar(fill: RatingStarFill, px: number) {
    const size = styleMap({
      width: `${px}px`,
      height: `${px}px`,
      fontSize: `${px}px`,
    });
    if (fill === "half") {
      return html`<span part="star" class="star half" style=${size}
        ><span class="halfBase">${IconStar}</span
        ><span class="halfFill">${IconStarHalf}</span></span
      >`;
    }
    return html`<span
      part="star"
      class=${classMap({ star: true, [fill]: true })}
      style=${size}
      >${IconStar}</span
    >`;
  }

  protected override render() {
    const interactive = this.isInteractive;
    const { value, max } = this;
    // Normalize the score to 5 stars; fractions in 0.25..0.75 render a half star.
    const displayed =
      interactive && this.hoverIndex !== null
        ? this.hoverIndex
        : ratingDisplayStars(value, max);
    const fillOf = (i: number) => ratingStarFill(i, displayed);
    const px = SIZE_PX[this.size] ?? SIZE_PX.medium;
    const label = this.aria.label ?? `${value.toFixed(1)} / ${max}`;

    const stars = html`<span class="stars" part="stars" aria-hidden="true">
      ${STARS.map((i) =>
        interactive
          ? html`<button
              type="button"
              tabindex="-1"
              class="starButton"
              @click=${(event: MouseEvent) => this.handleStarClick(event, i)}
              @mouseenter=${() => (this.hoverIndex = i + 1)}
            >
              ${this.renderStar(fillOf(i), px)}
            </button>`
          : this.renderStar(fillOf(i), px),
      )}
    </span>`;

    const valueNode = this.showValue
      ? html`<span class="value" part="value"
          ><strong>${value.toFixed(1)}</strong>${
            this.ratingCount !== undefined
              ? html`<span class="count" part="count"
                  >(${this.ratingCount.toLocaleString("en-US")})</span
                >`
              : nothing
          }</span
        >`
      : nothing;

    const classes = classMap({
      rating: true,
      [this.size]: true,
      interactive,
    });

    if (!interactive) {
      return html`<span
        part="root"
        class=${classes}
        role="img"
        aria-label=${label}
        aria-description=${this.aria.description ?? nothing}
        aria-disabled=${this.isDisabled ? "true" : nothing}
        >${stars}${valueNode}</span
      >`;
    }

    return html`<span
      part="root"
      class=${classes}
      role="slider"
      tabindex="0"
      aria-label=${label}
      aria-description=${this.aria.description ?? nothing}
      aria-valuenow=${value}
      aria-valuemin="0"
      aria-valuemax=${max}
      aria-required=${this.required ? "true" : nothing}
      @keydown=${this.handleKeyDown}
      @mouseleave=${() => (this.hoverIndex = null)}
      >${stars}${valueNode}</span
    >`;
  }
}

/**
 * Several labelled ratings sharing one scale, e.g. plot / characters /
 * writing (`<RatingScale>` of lib-core). Each row is a `<minerva-rating>`;
 * rows are display-only unless `interactive` (React: passing `onChange`). Not form-associated: submit the
 * dimensions yourself, or use one named `<minerva-rating>` per dimension.
 *
 * @summary Several labelled ratings on one scale.
 * @tag minerva-rating-scale
 * @csspart root - The list of rows
 * @csspart row - Each row (a label and a rating)
 * @csspart label - The label of a row
 * @fires minerva-change - The user rated a dimension; `detail: { key, value, dimensions }` (`dimensions` is already updated)
 */
export class MinervaRatingScale extends MinervaElement {
  static override tagName = "minerva-rating-scale";
  static override dependencies = [MinervaRating];
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** Dimensions to rate, one row each */
  @property({ attribute: false })
  dimensions: readonly RatingDimension[] = [];

  /** Highest score shared by every dimension */
  @property({ type: Number })
  max = 10;

  /** Star size */
  @property({ reflect: true })
  size: RatingSize = "medium";

  /** Makes the rows interactive (React: passing `onChange`) */
  @property({ type: Boolean, reflect: true })
  interactive = false;

  /** Forces display mode even when `interactive` is set */
  @property({ type: Boolean, reflect: true, attribute: "readonly" })
  readOnly = false;

  /** Hides the score at the end of each row */
  @property({ type: Boolean, attribute: "hide-value" })
  hideValue = false;

  private handleChange(event: CustomEvent<{ value: number }>, key: string) {
    // the row's own event stops here: the scale re-emits it with the key
    event.stopPropagation();
    const { value } = event.detail;
    this.dimensions = this.dimensions.map((dim) =>
      dim.key === key ? { ...dim, value } : dim,
    );
    this.emit("minerva-change", { key, value, dimensions: this.dimensions });
  }

  protected override hookStates() {
    return { readonly: !this.interactive || this.readOnly, size: this.size };
  }

  protected override render() {
    return html`<div class="scale" part="root">
      ${this.dimensions.map(
        (dim) =>
          html`<div class="scaleRow" part="row" title=${dim.hint ?? nothing}>
            <span class="scaleLabel" part="label">${dim.label}</span>
            <minerva-rating
              .value=${dim.value}
              .max=${this.max}
              .size=${this.size}
              ?show-value=${!this.hideValue}
              ?interactive=${this.interactive}
              ?readonly=${this.readOnly}
              aria-label=${`${dim.label} ${dim.value.toFixed(1)} / ${this.max}`}
              @minerva-change=${(event: CustomEvent<{ value: number }>) =>
                this.handleChange(event, dim.key)}
            ></minerva-rating>
          </div>`,
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-rating": MinervaRating;
    "minerva-rating-scale": MinervaRatingScale;
  }
}
