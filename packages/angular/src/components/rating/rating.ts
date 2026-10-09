import { NgTemplateOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
  model,
  numberAttribute,
  signal,
} from "@angular/core";
import {
  RATING_STAR_COUNT,
  cn,
  createRatingMachine,
  getRatingKeyValue,
  getRatingStarFills,
  type RatingMachineEvent,
  type RatingStarFill,
} from "@minerva/core";
import { logicalArrowKey } from "@minerva/dom";
import {
  MnFormValueControl,
  fieldWiring,
  injectFormField,
  provideValueAccessor,
} from "../../internal/forms";
import { MnHook } from "../../internal/hooks";
import { ICONS } from "../../internal/icon-data";
import { classOf } from "../../internal/classes";
import { connectMachine } from "../../internal/machine";
import { ratingStyles as s } from "../../internal/styles";

/** Size of the Rating stars */
export type RatingSize = "small" | "medium" | "large";

const SIZE_PX: Record<RatingSize, number> = {
  small: 12,
  medium: 16,
  large: 20,
};
const STARS = Array.from({ length: RATING_STAR_COUNT }, (_, i) => i);
// The library's Star / StarHalf icons, drawn here with React's stroke width
// (1.5) and fill (full stars are filled with `currentColor`).
const STAR_PATH = ICONS.Star.nodes[0][1]["d"];
const STAR_HALF_PATH = ICONS.StarHalf.nodes[0][1]["d"];

const toNumber = (value: unknown): number => numberAttribute(value, 0);

/**
 * Rating: displays a score as 5 stars (any 0..max scale), optionally with
 * the value and the number of ratings. Same DOM, classes and styling hooks
 * as React's Rating: the host is the root `<span>` (`role="img"`, or
 * `role="slider"` when interactive).
 *
 * Interactive (hover preview, half-star clicks, keyboard) with `interactive`
 * (React: passing `onChange`) or when bound to a form control (`ngModel`,
 * `formControl`, `formControlName`), unless read-only or disabled: arrows
 * step half a star (`max / 10`; in RTL ArrowLeft increases), PageUp /
 * PageDown one whole star (`max / 5`), Home / End jump to 0 / `max`; all
 * clamped to 0..max. The native `keydown` event bubbles to the host first:
 * call `preventDefault()` in a `(keydown)` listener to take over a key.
 *
 * Two-way binding: `[(value)]` (`valueChange` reports user changes, React's
 * `onChange`), `ngModel` or a Reactive Forms control. Inside
 * `<mn-form-control>` it takes the field's id, description, invalid /
 * required / read-only / disabled states.
 *
 * @example
 * <mn-rating [value]="8.6" showValue [ratingCount]="3214" />
 * <mn-rating interactive aria-label="Your rating" [(value)]="score" />
 * <mn-rating formControlName="score" [max]="5" />
 */
@Component({
  selector: "mn-rating",
  exportAs: "mnRating",
  imports: [MnHook, NgTemplateOutlet],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideValueAccessor(() => MnRating)],
  host: {
    "[class]": "rootClasses()",
    "data-minerva": "rating",
    "data-part": "root",
    "[attr.data-readonly]": "isInteractive() ? null : ''",
    "[attr.data-size]": "size()",
    "[attr.role]": "isInteractive() ? 'slider' : 'img'",
    "[attr.aria-label]": "label()",
    "[attr.aria-valuenow]": "isInteractive() ? current() : null",
    "[attr.aria-valuemin]": "isInteractive() ? 0 : null",
    "[attr.aria-valuemax]": "isInteractive() ? max() : null",
    "[attr.aria-required]":
      "isInteractive() && field.required() ? 'true' : null",
    "[attr.aria-invalid]": "isInteractive() && field.invalid() ? 'true' : null",
    "[attr.aria-disabled]": "isDisabled() ? 'true' : null",
    "[attr.aria-describedby]": "field.describedBy()",
    "[attr.tabindex]": "isInteractive() ? 0 : null",
    "[attr.id]": "field.id()",
    "[attr.name]": "null",
    "[attr.disabled]": "null",
    "[attr.required]": "null",
    "[attr.readonly]": "null",
    "[attr.interactive]": "null",
    "(keydown)": "onKeyDown($event)",
    "(mouseleave)": "onMouseLeave()",
    "(focusout)": "onFocusOut($event)",
  },
  template: `
    <ng-template #star let-fill>
      @if (fill === "half") {
        <span
          [class]="starClass(fill)"
          [style.width.px]="px()"
          [style.height.px]="px()"
          mnHook="rating"
          mnPart="star"
          [mnStates]="{ fill }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            [attr.width]="px()"
            [attr.height]="px()"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
            [class]="s.halfBase"
          >
            <path [attr.d]="starPath" />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            [attr.width]="px()"
            [attr.height]="px()"
            fill="currentColor"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            focusable="false"
            [class]="s.halfFill"
          >
            <path [attr.d]="starHalfPath" />
          </svg>
        </span>
      } @else {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          [attr.width]="px()"
          [attr.height]="px()"
          [attr.fill]="fill === 'full' ? 'currentColor' : 'none'"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          focusable="false"
          [class]="starClass(fill)"
          mnHook="rating"
          mnPart="star"
          [mnStates]="{ fill }"
        >
          <path [attr.d]="starPath" />
        </svg>
      }
    </ng-template>

    <span [class]="s.stars" aria-hidden="true" mnHook="rating" mnPart="stars">
      @for (i of stars; track i) {
        @if (isInteractive()) {
          <button
            type="button"
            tabindex="-1"
            [class]="s.starButton"
            (click)="onStarClick($event, i)"
            (mouseenter)="send({ type: 'HOVER', index: i })"
          >
            <ng-container
              [ngTemplateOutlet]="star"
              [ngTemplateOutletContext]="{ $implicit: fills()[i] }"
            />
          </button>
        } @else {
          <ng-container
            [ngTemplateOutlet]="star"
            [ngTemplateOutletContext]="{ $implicit: fills()[i] }"
          />
        }
      }
    </span>
    @if (showValue()) {
      <span [class]="s.value" mnHook="rating" mnPart="value">
        <strong>{{ valueText() }}</strong>
        @if (ratingCount() !== undefined) {
          <span [class]="s.count" mnHook="rating" mnPart="count">{{
            countText()
          }}</span>
        }
      </span>
    }
    @if (name() && !isDisabled()) {
      <input type="hidden" [attr.name]="name()" [value]="current()" />
    }
  `,
})
export class MnRating extends MnFormValueControl<number> {
  /**
   * Current score, from 0 to max (two-way: `[(value)]`; `valueChange`
   * reports user changes, React's `onChange`)
   */
  readonly value = model<number | undefined>(undefined);
  /**
   * Initial score when `value` is not bound
   * @default 0
   */
  readonly defaultValue = input(0, { transform: toNumber });
  /**
   * Highest score; the score is always drawn on 5 stars (half stars for
   * fractions between 0.25 and 0.75 of a star)
   * @default 10
   */
  readonly max = input(10, {
    transform: (value: unknown) => numberAttribute(value, 10),
  });
  /**
   * Star size: 12px, 16px or 20px
   * @default "medium"
   */
  readonly size = input<RatingSize>("medium");
  /**
   * Shows the score (one decimal) after the stars
   * @default false
   */
  readonly showValue = input(false, { transform: booleanAttribute });
  /** Number of ratings, shown after the score when showValue is set */
  readonly ratingCount = input<number | undefined, unknown>(undefined, {
    transform: (value: unknown) =>
      value === undefined || value === null || value === ""
        ? undefined
        : numberAttribute(value),
  });
  /**
   * Makes the rating an interactive slider: hover previews, clicking the
   * left / right half of a star picks a half / full star, arrow keys step by
   * max / 10, Home / End jump to 0 / max (React: passing `onChange`). Also
   * interactive when bound to a form control (`ngModel`, `formControl`)
   * @default false
   */
  readonly interactive = input(false, { transform: booleanAttribute });
  /**
   * Forces display mode even when interactive
   * @default false
   */
  readonly readOnly = input(false, { transform: booleanAttribute });
  /**
   * Disables the control (display mode, not submitted)
   * @default false
   */
  readonly disabled = input(false, { transform: booleanAttribute });
  /**
   * The control must have a value (`aria-required`; use Angular's
   * validators for validation)
   * @default false
   */
  readonly required = input(false, { transform: booleanAttribute });
  /** Name submitted with native form data (a hidden input) */
  readonly name = input<string | undefined>(undefined);
  /**
   * Accessible label of the rating
   * @default "<value> / <max>"
   */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });
  /** Extra ids of elements describing the rating */
  readonly ariaDescribedby = input<string | undefined>(undefined, {
    alias: "aria-describedby",
  });

  protected readonly s = s;
  protected readonly stars = STARS;
  protected readonly starPath = STAR_PATH;
  protected readonly starHalfPath = STAR_HALF_PATH;
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  /** Bound to a form control (ngModel / Reactive Forms): interactive */
  private readonly formBound = signal(false);
  protected readonly field = fieldWiring(injectFormField(), {
    describedBy: () => this.ariaDescribedby(),
    invalid: () => this.controlInvalid(),
    required: () => this.required(),
    readOnly: () => this.readOnly(),
    disabled: () => this.disabled() || this.formDisabled(),
  });
  protected readonly isDisabled = this.field.disabled;

  /** The score shown (the bound value, else the default) */
  protected readonly current = computed(
    () => this.value() ?? this.defaultValue(),
  );
  protected readonly isInteractive = computed(
    () =>
      (this.interactive() || this.formBound()) &&
      !this.field.readOnly() &&
      !this.isDisabled(),
  );

  // Hover preview, picks and keys: core's rating machine (the score stays
  // controlled by `value`).
  private readonly machine = connectMachine(
    () =>
      createRatingMachine({
        value: this.current(),
        max: this.max(),
        readOnly: !this.isInteractive(),
        onValueChange: (next) => this.commit(next),
      }),
    () => ({
      value: this.current(),
      max: this.max(),
      readOnly: !this.isInteractive(),
    }),
  );

  /** Fill of each star: fractions in 0.25..0.75 render a half star */
  protected readonly fills = computed(() =>
    getRatingStarFills(this.machine.state(), this.max()),
  );
  protected readonly px = computed(
    () => SIZE_PX[this.size()] ?? SIZE_PX.medium,
  );
  protected readonly valueText = computed(() => this.current().toFixed(1));
  protected readonly countText = computed(
    () => `(${(this.ratingCount() ?? 0).toLocaleString("en-US")})`,
  );
  protected readonly label = computed(
    () => this.ariaLabel() ?? `${this.valueText()} / ${this.max()}`,
  );
  protected readonly rootClasses = computed(() =>
    cn(
      s.rating,
      classOf(s, this.size()),
      this.isInteractive() && s.interactive,
    ),
  );

  override registerOnChange(fn: (value: number) => void): void {
    super.registerOnChange(fn);
    this.formBound.set(true);
  }

  override writeValue(value: number | null | undefined): void {
    this.value.set(value == null ? 0 : Number(value));
  }

  protected starClass(fill: RatingStarFill): string {
    return cn(s.star, s[fill as "half" | "empty"]);
  }

  protected send(event: RatingMachineEvent): void {
    this.machine.send(event);
  }

  protected onStarClick(event: MouseEvent, index: number): void {
    // Left half of a star -> half star, right half -> full star.
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const leftHalf = event.clientX - rect.left < rect.width / 2;
    this.send({ type: "PICK", index, half: leftHalf });
  }

  protected onKeyDown(event: KeyboardEvent): void {
    // Listeners of the consumer go first; preventDefault() takes over the key.
    if (event.defaultPrevented || !this.isInteractive()) return;
    // Stars follow the reading direction: in RTL ArrowLeft increases.
    const key = logicalArrowKey(event.key, this.host.nativeElement);
    if (getRatingKeyValue(key, this.current(), this.max()) === null) return;
    event.preventDefault();
    this.send({ type: "KEY", key });
  }

  protected onMouseLeave(): void {
    if (this.isInteractive()) this.send({ type: "HOVER_END" });
  }

  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.host.nativeElement.contains(next)) this.notifyTouched();
  }

  private commit(next: number): void {
    this.value.set(next);
    this.notifyChange(next);
  }

  /** Focuses the rating (interactive mode) */
  focus(options?: FocusOptions): void {
    this.host.nativeElement.focus(options);
  }
}
