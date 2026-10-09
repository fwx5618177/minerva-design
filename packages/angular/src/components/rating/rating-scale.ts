import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  input,
  model,
  numberAttribute,
  output,
} from "@angular/core";
import { cn } from "@minerva/core";
import { MnHook } from "../../internal/hooks";
import { ratingStyles as s } from "../../internal/styles";
import { MnRating, type RatingSize } from "./rating";

/** One dimension of a RatingScale */
export interface RatingDimension {
  /** Stable key, passed back with `ratingChange` */
  key: string;
  /** Displayed label */
  label: string;
  /** Current score of the dimension */
  value: number;
  /** Optional description, shown as the row's title tooltip */
  hint?: string;
}

/** Emitted by `ratingChange` of MnRatingScale (React's `onChange(key, value)`) */
export interface RatingScaleChange {
  /** Key of the rated dimension */
  key: string;
  /** Its new score */
  value: number;
  /** Every dimension, already updated */
  dimensions: readonly RatingDimension[];
}

/**
 * RatingScale: several labelled ratings sharing one scale (e.g. plot /
 * characters / writing), one `<mn-rating>` per row. Same DOM, classes and
 * styling hooks as React's RatingScale: the host is the root `<div>`.
 *
 * Interactive with `interactive` (React: passing `onChange`), unless
 * `readOnly`: rating a row updates `dimensions` (two-way:
 * `[(dimensions)]`) and emits `ratingChange` with
 * `{ key, value, dimensions }`.
 *
 * @example
 * <mn-rating-scale [dimensions]="dims" />
 * <mn-rating-scale interactive [(dimensions)]="dims" (ratingChange)="save($event)" />
 */
@Component({
  selector: "mn-rating-scale",
  exportAs: "mnRatingScale",
  imports: [MnHook, MnRating],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "rootClass",
    "data-minerva": "rating-scale",
    "data-part": "root",
    "[attr.data-readonly]": "!interactive() || readOnly() ? '' : null",
    "[attr.data-size]": "size()",
    "[attr.interactive]": "null",
    "[attr.readonly]": "null",
  },
  template: `
    @for (dim of dimensions(); track dim.key) {
      <div
        [class]="s.scaleRow"
        [attr.title]="dim.hint ?? null"
        mnHook="rating-scale"
        mnPart="row"
      >
        <span [class]="s.scaleLabel" mnHook="rating-scale" mnPart="label">{{
          dim.label
        }}</span>
        <mn-rating
          [value]="dim.value"
          [max]="max()"
          [size]="size()"
          [showValue]="showValue()"
          [readOnly]="readOnly()"
          [interactive]="interactive()"
          [aria-label]="dim.label + ' ' + dim.value.toFixed(1) + ' / ' + max()"
          (valueChange)="onRowChange(dim.key, $event)"
        />
      </div>
    }
  `,
})
export class MnRatingScale {
  /**
   * Dimensions to rate, one row each (two-way: `[(dimensions)]`; updated
   * when the user rates a row)
   * @default []
   */
  readonly dimensions = model<readonly RatingDimension[]>([]);
  /**
   * Highest score shared by every dimension
   * @default 10
   */
  readonly max = input(10, {
    transform: (value: unknown) => numberAttribute(value, 10),
  });
  /**
   * Star size
   * @default "medium"
   */
  readonly size = input<RatingSize>("medium");
  /**
   * Makes the rows interactive (React: passing `onChange`)
   * @default false
   */
  readonly interactive = input(false, { transform: booleanAttribute });
  /**
   * Forces display mode even when interactive
   * @default false
   */
  readonly readOnly = input(false, { transform: booleanAttribute });
  /**
   * Shows the score at the end of each row
   * @default true
   */
  readonly showValue = input(true, { transform: booleanAttribute });
  /**
   * The user rated a dimension (React's `onChange(key, value)`):
   * `{ key, value, dimensions }`, `dimensions` already updated
   */
  readonly ratingChange = output<RatingScaleChange>();

  protected readonly s = s;
  protected readonly rootClass = cn(s.scale);

  protected onRowChange(key: string, value: number | undefined): void {
    if (value === undefined) return;
    const dimensions = this.dimensions().map((dim) =>
      dim.key === key ? { ...dim, value } : dim,
    );
    this.dimensions.set(dimensions);
    this.ratingChange.emit({ key, value, dimensions });
  }
}
