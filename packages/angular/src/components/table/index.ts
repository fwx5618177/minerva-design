import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  afterRenderEffect,
  booleanAttribute,
  computed,
  input,
  signal,
  viewChild,
} from "@angular/core";
import { tableStyles as s } from "../../internal/styles";

/** A semantic table with projected native caption/thead/tbody/tfoot children.
 * Use native table elements with the mnTable* directives for merged cells,
 * interactive headers, custom cell content and native table accessibility. */
@Component({
  selector: "mn-table-root",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { style: "display: contents" },
  template: `<div
    #viewport
    data-minerva="data-table"
    data-part="viewport"
    [class]="wrapperClass()"
    [style.max-height]="length(scroll()?.y)"
    [style.overflow-y]="scroll()?.y ? 'auto' : null"
    [attr.role]="scrollable() ? 'region' : null"
    [attr.tabindex]="scrollable() ? 0 : null"
    [attr.aria-label]="scrollable() ? label() : null"
  >
    <table
      data-minerva="data-table"
      data-part="table"
      [class]="tableClass()"
      [attr.data-size]="size()"
      [attr.data-variant]="variant()"
      [attr.aria-label]="label()"
      [style.min-width]="length(scroll()?.x)"
    >
      <ng-content />
    </table>
  </div>`,
})
export class MnTableRoot {
  /** Accessible name of the table and scroll region. */
  readonly label = input("Table");
  readonly size = input<"small" | "medium" | "large">("medium");
  readonly variant = input<"simple" | "striped" | "bordered">("simple");
  readonly hoverable = input(false, { transform: booleanAttribute });
  /** Explicit scroll width/height; numbers are pixels. */
  readonly scroll = input<{ x?: number | string; y?: number | string }>();
  private readonly viewport = viewChild<ElementRef<HTMLElement>>("viewport");
  private readonly overflowing = signal(false);
  protected readonly scrollable = computed(() =>
    Boolean(this.scroll()?.x || this.scroll()?.y || this.overflowing()),
  );
  protected readonly wrapperClass = computed(() =>
    [
      s.wrapper,
      this.variant() === "bordered" ? s.wrapperBordered : "",
      this.scroll()?.y ? s.wrapperScrollY : "",
    ].join(" "),
  );
  protected readonly tableClass = computed(() =>
    [
      s.table,
      s[this.size()],
      this.variant() === "striped" ? s.striped : "",
      this.hoverable() ? s.hoverable : "",
      this.scroll()?.x ? s.scrollX : "",
    ].join(" "),
  );
  protected length(value: number | string | undefined) {
    return typeof value === "number" ? `${value}px` : value;
  }
  constructor() {
    afterRenderEffect((cleanup) => {
      const viewport = this.viewport()?.nativeElement;
      if (!viewport) return;
      const update = () =>
        this.overflowing.set(
          viewport.scrollWidth > viewport.clientWidth ||
            viewport.scrollHeight > viewport.clientHeight,
        );
      update();
      if (typeof ResizeObserver !== "undefined") {
        const observer = new ResizeObserver(update);
        observer.observe(viewport);
        if (viewport.firstElementChild)
          observer.observe(viewport.firstElementChild);
        cleanup(() => observer.disconnect());
      }
    });
  }
}
/** Native table header section; preserves browser column semantics. */
@Directive({
  selector: "thead[mnTableHead]",
  host: { "data-minerva": "data-table", "data-part": "head" },
})
export class MnTableHead {}
/** Native table body section. */
@Directive({
  selector: "tbody[mnTableBody]",
  host: { "data-minerva": "data-table", "data-part": "body" },
})
export class MnTableBody {}
/** Native table row with accessible selection state and styling hooks. */
@Directive({
  selector: "tr[mnTableRow]",
  host: {
    "data-minerva": "data-table",
    "data-part": "row",
    "[attr.data-selected]": "selected() ? '' : null",
    "[attr.aria-selected]": "selected()",
  },
})
export class MnTableRow {
  readonly selected = input<boolean | undefined, unknown>(undefined, {
    transform: (value) => (value == null ? undefined : booleanAttribute(value)),
  });
}
/** Native header cell. Place a real button inside when sorting is interactive. */
@Directive({
  selector: "th[mnTableHeader]",
  host: {
    "data-minerva": "data-table",
    "data-part": "header-cell",
    "[attr.data-sort]": "sort()",
    "[attr.aria-sort]": "sort()",
  },
})
export class MnTableHeader {
  readonly sort = input<"ascending" | "descending" | "none" | undefined>();
}
/** Native data cell; native colspan/rowspan and arbitrary content remain available. */
@Directive({
  selector: "td[mnTableCell]",
  host: { "data-minerva": "data-table", "data-part": "cell" },
})
export class MnTableCell {}
