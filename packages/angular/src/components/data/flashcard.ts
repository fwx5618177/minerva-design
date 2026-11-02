import {
  ChangeDetectionStrategy,
  Component,
  booleanAttribute,
  computed,
  input,
  model,
} from "@angular/core";
import { isInteractiveEventTarget } from "@minerva/dom";
import { injectScope } from "../../config/scope";
import { MnHook } from "../../internal/hooks";
import { injectId } from "../../internal/ids";
import * as styles from "../../internal/styles";

/** Rotation axis of a Flashcard flip */
export type FlashcardAxis = "y" | "x";

/** Surface style of a Flashcard (matches Card) */
export type FlashcardVariant = "elevated" | "outline" | "filled";

/** Padding and typography scale of a Flashcard */
export type FlashcardSize = "small" | "medium" | "large";

/**
 * A two-sided study card that flips between a front (the prompt) and a back
 * (the answer) with a 3D rotation (a crossfade under
 * `prefers-reduced-motion`). Both faces share one grid cell, so the card is
 * as tall as the taller face. The card is a toggle button (`aria-pressed`
 * while the back shows): click, Enter or Space flips it, except clicks on
 * interactive content inside a face. The hidden face is `inert`; the back is
 * a polite live region. Project rich faces with `[mnFront]` / `[mnBack]`
 * (the `front` / `back` inputs are plain-text fallbacks) and a footer (not
 * flipped, e.g. rating buttons) with `[mnFooter]`. The flipped state is
 * `[(flipped)]`.
 */
@Component({
  selector: "mn-flashcard",
  imports: [MnHook],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "flashcard",
    "data-part": "root",
    "[attr.data-state]": "flipped() ? 'active' : 'inactive'",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-variant]": "variant()",
    "[attr.data-size]": "size()",
    "[class]": "rootClass()",
    "[style.--flashcard-min-height]": "minHeightValue()",
  },
  template: `<div
      mnHook="flashcard"
      mnPart="card"
      [mnStates]="{
        state: flipped() ? 'active' : 'inactive',
        disabled: disabled(),
      }"
      [class]="cardClass()"
      [attr.role]="flipOnClick() ? 'button' : 'group'"
      [attr.tabindex]="flipOnClick() ? (disabled() ? -1 : 0) : null"
      [attr.aria-pressed]="flipOnClick() ? flipped() : null"
      [attr.aria-disabled]="flipOnClick() && disabled() ? 'true' : null"
      [attr.aria-label]="cardLabel()"
      [attr.aria-describedby]="id + (flipped() ? '-back' : '-front')"
      (click)="onClick($event)"
      (keydown)="onKeydown($event)"
    >
      <div [class]="s.inner">
        <div
          mnHook="flashcard"
          mnPart="front"
          [class]="s.face"
          [attr.aria-hidden]="flipped() ? 'true' : null"
          [attr.inert]="flipped() ? '' : null"
        >
          @if (frontCaption()) {
            <span mnHook="flashcard" mnPart="label" [class]="s.label">{{
              frontCaption()
            }}</span>
          }
          <div [id]="id + '-front'" [class]="s.content">
            <ng-content select="[mnFront]">{{ front() }}</ng-content>
          </div>
          @if (showHint() && flipOnClick() && hintText()) {
            <span mnHook="flashcard" mnPart="hint" [class]="s.hint">{{
              hintText()
            }}</span>
          }
        </div>
        <div
          mnHook="flashcard"
          mnPart="back"
          [class]="backClass"
          [attr.aria-hidden]="flipped() ? null : 'true'"
          [attr.inert]="flipped() ? null : ''"
          aria-live="polite"
          aria-atomic="true"
        >
          @if (backCaption()) {
            <span mnHook="flashcard" mnPart="label" [class]="s.label">{{
              backCaption()
            }}</span>
          }
          <div [id]="id + '-back'" [class]="s.content">
            <ng-content select="[mnBack]">{{ back() }}</ng-content>
          </div>
        </div>
      </div>
    </div>
    <div mnHook="flashcard" mnPart="footer" [class]="s.footer">
      <ng-content select="[mnFooter]" />
    </div>`,
})
export class MnFlashcard {
  /** Text of the front face (the prompt); projected `[mnFront]` content wins */
  readonly front = input<string | undefined>(undefined);
  /** Text of the back face (the answer); projected `[mnBack]` content wins */
  readonly back = input<string | undefined>(undefined);
  /** Caption of the front face (default: translated "Question"; "" or null hides it) */
  readonly frontLabel = input<string | null | undefined>(undefined);
  /** Caption of the back face (default: translated "Answer"; "" or null hides it) */
  readonly backLabel = input<string | null | undefined>(undefined);
  /** Hint on the front face (default: translated "Click or press Space to flip") */
  readonly hint = input<string | undefined>(undefined);
  /** Shows the hint on the front face (while the card flips on click) */
  readonly showHint = input(false, { transform: booleanAttribute });
  /** Whether the back is shown (`[(flipped)]`) */
  readonly flipped = model(false);
  /** Clicking the card (or Enter / Space on it) flips it; when false only `flipped` flips it */
  readonly flipOnClick = input(true, { transform: booleanAttribute });
  /** Blocks flipping and dims the card */
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Rotation axis: "y" flips horizontally, "x" vertically */
  readonly axis = input<FlashcardAxis>("y");
  /** Surface style */
  readonly variant = input<FlashcardVariant>("elevated");
  /** Padding and typography scale */
  readonly size = input<FlashcardSize>("medium");
  /** Minimum height of the card (a number is in px); the card grows to fit the taller face */
  readonly minHeight = input<number | string>("12rem");
  /** Accessible label of the card (default: translated "Flashcard, showing <face>") */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });

  protected readonly s = styles.flashcardStyles;
  protected readonly scope = injectScope();
  protected readonly id = injectId("flashcard");
  protected readonly backClass = `${this.s.face} ${this.s.back}`;

  protected readonly rootClass = computed(() =>
    [
      this.s.flashcard,
      this.s[this.variant()] ?? this.s.elevated,
      this.size() === "small" || this.size() === "large"
        ? this.s[this.size() as "small" | "large"]
        : "",
      this.axis() === "x" ? this.s.axisX : "",
      this.flipped() ? this.s.flipped : "",
      this.disabled() ? this.s.disabled : "",
    ]
      .filter(Boolean)
      .join(" "),
  );
  protected readonly cardClass = computed(() =>
    this.flipOnClick() ? `${this.s.card} ${this.s.interactive}` : this.s.card,
  );
  protected readonly minHeightValue = computed(() => {
    const value = this.minHeight();
    return typeof value === "number" ? `${value}px` : value;
  });
  protected readonly frontCaption = computed(() => {
    const label = this.frontLabel();
    return label === undefined ? this.scope.t("flashcard.frontLabel") : label;
  });
  protected readonly backCaption = computed(() => {
    const label = this.backLabel();
    return label === undefined ? this.scope.t("flashcard.backLabel") : label;
  });
  protected readonly hintText = computed(
    () => this.hint() ?? this.scope.t("flashcard.hint"),
  );
  protected readonly cardLabel = computed(() => {
    const label = this.ariaLabel();
    if (label) return label;
    const flipped = this.flipped();
    const face =
      (flipped ? this.backCaption() : this.frontCaption()) ||
      this.scope.t(flipped ? "flashcard.backLabel" : "flashcard.frontLabel");
    return this.scope.t("flashcard.label", { face });
  });

  /** Flips the card (as a user flip: updates `flipped`) */
  toggle(): void {
    if (this.flipOnClick() && !this.disabled()) this.flipped.update((v) => !v);
  }

  protected onClick(event: MouseEvent) {
    if (isInteractiveEventTarget(event, event.currentTarget as Element)) return;
    this.toggle();
  }

  protected onKeydown(event: KeyboardEvent) {
    if (event.target !== event.currentTarget) return;
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    if (!event.repeat) this.toggle();
  }
}
