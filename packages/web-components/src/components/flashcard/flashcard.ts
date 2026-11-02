import { css, html, nothing } from "lit";
import { property } from "lit/decorators.js";
import styles from "@react-styles/components/Flashcard/flashcard.module.scss?inline";
import { isInteractiveEventTarget } from "@minerva/dom";
import { AriaController } from "../../internal/aria";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { HasSlotController } from "../../internal/slots";
import { sharedStyles } from "../../internal/styles";

/** Rotation axis of the flip: "y" flips horizontally, "x" vertically */
export type FlashcardAxis = "y" | "x";

/** Surface style (matches `<minerva-card>`) */
export type FlashcardVariant = "elevated" | "outline" | "filled";

/** Padding and typography scale */
export type FlashcardSize = "small" | "medium" | "large";

const VARIANTS: readonly string[] = ["elevated", "outline", "filled"];
const SIZES: readonly string[] = ["small", "medium", "large"];

/**
 * A two-sided study card (`<Flashcard>` of React) that flips between a front
 * (the prompt) and a back (the answer) with a 3D rotation (a crossfade under
 * `prefers-reduced-motion`). Both faces share one grid cell, so the card is
 * as tall as the taller face. The card is a toggle button (`aria-pressed`
 * while the back shows): click, Enter or Space flips it, except clicks on
 * interactive slotted content. The hidden face is `inert`; the back is a
 * polite live region, so the revealed answer is announced. The `footer`
 * slot (e.g. rating buttons) sits below the card and does not flip.
 *
 * User flips update `flipped` and fire the cancelable
 * `minerva-flipped-change` (`preventDefault()` keeps the current face).
 *
 * @summary A two-sided study card that flips between a prompt and an answer.
 * @tag minerva-flashcard
 * @slot front - Content of the front face (the prompt; falls back to the `front` attribute)
 * @slot back - Content of the back face (the answer; falls back to the `back` attribute)
 * @slot footer - Content below the card, not flipped (e.g. rating buttons)
 * @csspart root - The outermost element (card and footer)
 * @csspart card - The flipping card (`role=button` while flip-on-click); holds both faces
 * @csspart front - The front face (the prompt)
 * @csspart back - The back face (the answer)
 * @csspart label - The small caption of a face
 * @csspart hint - The flip hint on the front face (with `show-hint`)
 * @csspart footer - The footer below the card (not flipped)
 * @fires minerva-flipped-change - The user flipped the card (`detail: { flipped }`); cancelable
 */
export class MinervaFlashcard extends MinervaElement {
  static override tagName = "minerva-flashcard";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
    `,
    sharedStyles(styles),
  ];

  /** Text of the front face (the prompt); the `front` slot wins */
  @property()
  front?: string;

  /** Text of the back face (the answer); the `back` slot wins */
  @property()
  back?: string;

  /** Caption of the front face (default: localized "Question"; "" hides it) */
  @property({ attribute: "front-label" })
  frontLabel?: string;

  /** Caption of the back face (default: localized "Answer"; "" hides it) */
  @property({ attribute: "back-label" })
  backLabel?: string;

  /** Hint on the front face (default: localized "Click or press Space to flip") */
  @property()
  hint?: string;

  /** Shows the hint on the front face (while the card flips on click) */
  @property({ type: Boolean, attribute: "show-hint", reflect: true })
  showHint = false;

  /** Whether the back is shown */
  @property({ type: Boolean, reflect: true })
  flipped = false;

  /** Clicking the card (or Enter / Space on it) flips it; when false only `flipped` flips it */
  @property({
    attribute: "flip-on-click",
    converter: { fromAttribute: (value: string | null) => value !== "false" },
  })
  flipOnClick = true;

  /** Blocks flipping and dims the card */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Rotation axis: "y" flips horizontally, "x" vertically */
  @property({ reflect: true })
  axis: FlashcardAxis = "y";

  /** Surface style */
  @property({ reflect: true })
  variant: FlashcardVariant = "elevated";

  /** Padding and typography scale */
  @property({ reflect: true })
  size: FlashcardSize = "medium";

  /** Minimum height of the card (CSS length; a number is in px); the card grows to fit the taller face */
  @property({ attribute: "min-height" })
  minHeight: string | number = "12rem";

  private readonly i18n = new LocaleController(this);
  private readonly aria = new AriaController(this);
  private readonly slots = new HasSlotController(this);

  override focus(options?: FocusOptions): void {
    this.renderRoot.querySelector<HTMLElement>('[part="card"]')?.focus(options);
  }

  /** Flips the card (as a user flip: fires `minerva-flipped-change`) */
  toggle(): void {
    if (!this.flipOnClick || this.disabled) return;
    const next = !this.flipped;
    if (
      this.emit(
        "minerva-flipped-change",
        { flipped: next },
        { cancelable: true },
      )
    ) {
      this.flipped = next;
    }
  }

  private handleClick(event: MouseEvent) {
    if (isInteractiveEventTarget(event, event.currentTarget as Element)) return;
    this.toggle();
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.target !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (!event.repeat) this.toggle();
  }

  private get safeVariant(): string {
    return VARIANTS.includes(this.variant) ? this.variant : "elevated";
  }

  private get safeSize(): string {
    return SIZES.includes(this.size) ? this.size : "medium";
  }

  protected override hookStates() {
    return {
      state: this.flipped ? "active" : "inactive",
      disabled: this.disabled,
      variant: this.safeVariant,
      size: this.safeSize,
    };
  }

  protected override render() {
    const t = this.i18n.t;
    const flipped = this.flipped;
    const disabled = this.disabled;
    const frontLabel = this.frontLabel ?? t("flashcard.frontLabel");
    const backLabel = this.backLabel ?? t("flashcard.backLabel");
    const face =
      (flipped ? backLabel : frontLabel) ||
      t(flipped ? "flashcard.backLabel" : "flashcard.frontLabel");
    const label = this.aria.label ?? t("flashcard.label", { face });
    const hint = this.hint ?? t("flashcard.hint");
    const minHeight =
      typeof this.minHeight === "number" ||
      /^\d+(\.\d+)?$/.test(String(this.minHeight))
        ? `${this.minHeight}px`
        : this.minHeight;
    const classes = [
      "flashcard",
      this.safeVariant,
      this.safeSize,
      this.axis === "x" ? "axisX" : "",
      flipped ? "flipped" : "",
      disabled ? "disabled" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const button = this.flipOnClick;
    return html`<div
      part="root"
      class=${classes}
      style=${`--flashcard-min-height: ${minHeight}`}
    >
      <div
        part="card"
        class="card ${button ? "interactive" : ""}"
        role=${button ? "button" : "group"}
        tabindex=${button ? (disabled ? -1 : 0) : nothing}
        aria-pressed=${button ? String(flipped) : nothing}
        aria-disabled=${button && disabled ? "true" : nothing}
        aria-label=${label}
        aria-describedby=${flipped ? "back-content" : "front-content"}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
      >
        <div class="inner">
          <div
            part="front"
            class="face front"
            aria-hidden=${flipped ? "true" : nothing}
            ?inert=${flipped}
          >
            ${
              frontLabel
                ? html`<span part="label" class="label">${frontLabel}</span>`
                : nothing
            }
            <div id="front-content" class="content">
              <slot name="front">${this.front ?? nothing}</slot>
            </div>
            ${
              this.showHint && button && hint
                ? html`<span part="hint" class="hint">${hint}</span>`
                : nothing
            }
          </div>
          <div
            part="back"
            class="face back"
            aria-hidden=${flipped ? nothing : "true"}
            ?inert=${!flipped}
            aria-live="polite"
            aria-atomic="true"
          >
            ${
              backLabel
                ? html`<span part="label" class="label">${backLabel}</span>`
                : nothing
            }
            <div id="back-content" class="content">
              <slot name="back">${this.back ?? nothing}</slot>
            </div>
          </div>
        </div>
      </div>
      ${
        this.slots.test("footer")
          ? html`<div part="footer" class="footer">
              <slot name="footer"></slot>
            </div>`
          : nothing
      }
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-flashcard": MinervaFlashcard;
  }
}
