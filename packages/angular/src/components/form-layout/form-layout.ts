import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from "@angular/core";
import { resolveSpace } from "@minerva/core";
import { MnHook } from "../../internal/hooks";
import {
  formLayoutStyles as s,
  responsiveGridStyles as grid,
} from "../../internal/styles";

/**
 * Column counts (integers 1-12): one number for every width, or per container
 * breakpoint (base, sm >= 480px, md >= 768px, lg >= 1200px). Missing
 * breakpoints inherit the previous one, starting at 1.
 */
export type FormLayoutColumns =
  number | { base?: number; sm?: number; md?: number; lg?: number };

const BREAKPOINTS = ["base", "sm", "md", "lg"] as const;

/**
 * FormLayout: a native `<form>` laying its fields out on a responsive column
 * grid (the DOM of React's FormLayout with its inner ResponsiveGrid; the
 * column count follows the form's own width, container queries at 480 / 768
 * / 1200px). An attribute component: the host IS the `<form>`, so native
 * attributes, `(submit)` / `(ngSubmit)`, `[formGroup]` / `ngForm`, reset and
 * native validation work as usual.
 *
 * @example
 * <form mnFormLayout [columns]="{ base: 1, md: 2 }" [formGroup]="form">
 *   <mn-form-field label="Name"><mn-input formControlName="name" /></mn-form-field>
 * </form>
 */
@Component({
  selector: "form[mnFormLayout]",
  exportAs: "mnFormLayout",
  imports: [MnHook],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "[class]": "s.root",
    "data-minerva": "form-layout",
    "data-part": "root",
    "[attr.columns]": "null",
    "[attr.gap]": "null",
  },
  template: `
    <div [class]="grid.root" [style]="gridStyle()" mnHook="responsive-grid">
      <div [class]="grid.layout" mnHook="responsive-grid" mnPart="layout">
        <ng-content />
      </div>
    </div>
  `,
})
export class MnFormLayout {
  /**
   * Column counts of the inner grid: a number, or `{ base, sm, md, lg }`
   * (container widths 480 / 768 / 1200px). Integers 1-12
   * @default 1
   */
  readonly columns = input<FormLayoutColumns>(1);
  /**
   * Gap between fields: numbers and numeric strings select spacing tokens,
   * other strings are CSS values
   * @default 4
   */
  readonly gap = input<string | number>(4);
  /** Gap between rows; defaults to `gap` */
  readonly rowGap = input<string | number | undefined>(undefined);
  /** Gap between columns; defaults to `gap` */
  readonly columnGap = input<string | number | undefined>(undefined);

  protected readonly s = s;
  protected readonly grid = grid;
  protected readonly gridStyle = computed(() => {
    const columns = this.columns();
    const counts = typeof columns === "number" ? { base: columns } : columns;
    const style: Record<string, string> = {};
    let previous = 1;
    for (const key of BREAKPOINTS) {
      const value = counts[key] ?? previous;
      if (!Number.isInteger(value) || value < 1 || value > 12)
        throw new RangeError(
          "FormLayout columns must be integers from 1 to 12",
        );
      style[`--grid-columns-${key}`] = String(value);
      previous = value;
    }
    style["--grid-row-gap"] = resolveSpace(this.rowGap() ?? this.gap());
    style["--grid-column-gap"] = resolveSpace(this.columnGap() ?? this.gap());
    return style;
  });
}
