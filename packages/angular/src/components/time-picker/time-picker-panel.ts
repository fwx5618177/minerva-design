import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  afterRenderEffect,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
  output,
  untracked,
} from "@angular/core";
import { cn } from "@minerva/core";
import { logicalArrowKey } from "@minerva/dom";
import { injectScope } from "../../config/scope";
import { MnHook } from "../../internal/hooks";
import { timePickerPanelStyles as ps } from "../../internal/styles";

/** A unit (hour, minute, second or AM / PM) of a panel column */
export interface TimeUnit {
  value: number;
  disabled: boolean;
  label: string;
}

/** The column a unit belongs to */
export type TimeUnitKind = "hour" | "minute" | "second" | "ampm";

/** A unit picked in the panel (`timeChange`): its column and value (24-hour for hours, 0 = AM / 1 = PM) */
export interface TimePickerPanelChange {
  type: TimeUnitKind;
  value: number;
}

interface Column {
  kind: TimeUnitKind;
  label: string;
  items: TimeUnit[];
  selected: number;
  tabStop: number | undefined;
  toValue: (value: number) => number;
}

const units = (
  count: number,
  step: number,
  start = 0,
  isDisabled: (value: number) => boolean = () => false,
): TimeUnit[] => {
  const items: TimeUnit[] = [];
  for (let i = start; i < start + count; i += Math.max(1, step)) {
    items.push({
      value: i,
      disabled: isDisabled(i),
      label: String(i).padStart(2, "0"),
    });
  }
  return items;
};

const PERIODS: TimeUnit[] = [
  { value: 0, label: "AM", disabled: false },
  { value: 1, label: "PM", disabled: false },
];

const EPOCH = new Date(0);

/**
 * The hour / minute / second (/ AM-PM) columns of a TimePicker (rendered by
 * `<mn-time-picker>` in its popup). Each column is a listbox: Up / Down /
 * Home / End move, Enter / Space pick, Left / Right switch column (swapped in
 * RTL). Same DOM, classes and styling hooks as React's TimePickerPanel (the
 * host element is the panel root).
 *
 * @example
 * <mn-time-picker-panel [value]="time" visible (timeChange)="pick($event)" />
 */
@Component({
  selector: "mn-time-picker-panel",
  exportAs: "mnTimePickerPanel",
  imports: [MnHook],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { "[class]": "ps.timePickerPanel" },
  template: `
    <div [class]="ps.timeColumns">
      @for (column of columns(); track column.kind; let columnIndex = $index) {
        <div
          [class]="ps.timeColumn"
          mnHook="time-picker"
          mnPart="column"
          role="listbox"
          [attr.aria-label]="column.label"
          tabindex="-1"
          (keydown)="onColumnKeyDown($event, columnIndex)"
        >
          @for (unit of column.items; track unit.value) {
            <div
              mnHook="time-picker"
              mnPart="item"
              [mnStates]="{
                selected: isSelected(column, unit),
                disabled: unit.disabled,
              }"
              role="option"
              [attr.aria-selected]="isSelected(column, unit)"
              [attr.aria-disabled]="unit.disabled ? 'true' : null"
              [attr.tabindex]="unit.value === column.tabStop ? 0 : -1"
              [class]="unitClass(column, unit)"
              (click)="pick(column, unit)"
              (keydown)="onUnitKeyDown($event, column, unit)"
            >
              {{ unit.label }}
            </div>
          }
        </div>
      }
    </div>
  `,
})
export class MnTimePickerPanel {
  /** Time shown as selected (the panel's reference time when nothing is selected) */
  readonly value = input<Date | undefined>(undefined);
  /** Whether a time is actually selected (otherwise nothing is highlighted) @default true */
  readonly hasValue = input(true, { transform: booleanAttribute });
  /** Uses a 12-hour clock with an AM/PM column @default false */
  readonly use12Hours = input(false, { transform: booleanAttribute });
  /** Shows the seconds column @default false */
  readonly showSecond = input(false, { transform: booleanAttribute });
  /** Interval between hour options @default 1 */
  readonly hourStep = input(1, { transform: numberAttribute });
  /** Interval between minute options @default 1 */
  readonly minuteStep = input(1, { transform: numberAttribute });
  /** Interval between second options @default 1 */
  readonly secondStep = input(1, { transform: numberAttribute });
  /** Earliest selectable time; earlier options are disabled */
  readonly minTime = input<Date | undefined>(undefined);
  /** Latest selectable time; later options are disabled */
  readonly maxTime = input<Date | undefined>(undefined);
  /** Whether the panel is visible (selected units scroll into view when it becomes visible) @default false */
  readonly visible = input(false, { transform: booleanAttribute });
  /**
   * Move focus to the first column's selected (or first enabled) unit when
   * the panel becomes visible (opened from the keyboard) @default false
   */
  readonly focusOnOpen = input(false, { transform: booleanAttribute });

  /** A unit was picked (React's `onTimeChange(type, value)`) */
  readonly timeChange = output<TimePickerPanelChange>();

  protected readonly ps = ps;
  private readonly scope = injectScope();
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  protected readonly columns = computed<Column[]>(() => {
    const value = this.value() ?? EPOCH;
    const use12Hours = this.use12Hours();
    const minTime = this.minTime();
    const maxTime = this.maxTime();
    const hour = value.getHours();
    const minute = value.getMinutes();
    const second = value.getSeconds();
    const isPM = hour >= 12;
    const toHour24 = (h: number) =>
      use12Hours ? (h % 12) + (isPM ? 12 : 0) : h;

    const hours = units(
      use12Hours ? 12 : 24,
      this.hourStep(),
      use12Hours ? 1 : 0,
      (h) => {
        const h24 = toHour24(h);
        return Boolean(
          (minTime && h24 < minTime.getHours()) ||
          (maxTime && h24 > maxTime.getHours()),
        );
      },
    );
    const minutes = units(60, this.minuteStep(), 0, (m) =>
      Boolean(
        (minTime && hour === minTime.getHours() && m < minTime.getMinutes()) ||
        (maxTime && hour === maxTime.getHours() && m > maxTime.getMinutes()),
      ),
    );
    const seconds = units(60, this.secondStep(), 0, (s) => {
      const atMin =
        minTime &&
        hour === minTime.getHours() &&
        minute === minTime.getMinutes();
      const atMax =
        maxTime &&
        hour === maxTime.getHours() &&
        minute === maxTime.getMinutes();
      return Boolean(
        (atMin && s < minTime.getSeconds()) ||
        (atMax && s > maxTime.getSeconds()),
      );
    });

    const columns: Array<Omit<Column, "tabStop">> = [
      {
        kind: "hour",
        label: this.scope.t("timePicker.hours"),
        items: hours,
        selected: use12Hours ? hour % 12 || 12 : hour,
        toValue: toHour24,
      },
      {
        kind: "minute",
        label: this.scope.t("timePicker.minutes"),
        items: minutes,
        selected: minute,
        toValue: (v) => v,
      },
    ];
    if (this.showSecond()) {
      columns.push({
        kind: "second",
        label: this.scope.t("timePicker.seconds"),
        items: seconds,
        selected: second,
        toValue: (v) => v,
      });
    }
    if (use12Hours) {
      columns.push({
        kind: "ampm",
        label: this.scope.t("timePicker.period"),
        items: PERIODS,
        selected: isPM ? 1 : 0,
        toValue: (v) => v,
      });
    }
    return columns.map((column) => ({
      ...column,
      tabStop: column.items.some(
        (u) => u.value === column.selected && !u.disabled,
      )
        ? column.selected
        : column.items.find((u) => !u.disabled)?.value,
    }));
  });

  constructor() {
    // Scroll the selected units into view when the panel becomes visible;
    // opened from the keyboard, focus moves to the first column's tab stop.
    let wasVisible = false;
    afterRenderEffect(() => {
      const visible = this.visible();
      const focusOnOpen = this.focusOnOpen();
      untracked(() => {
        const root = this.host.nativeElement;
        if (visible && !wasVisible) {
          root
            .querySelectorAll<HTMLElement>('[aria-selected="true"]')
            .forEach((el) => el.scrollIntoView?.({ block: "nearest" }));
        }
        if (visible && focusOnOpen) {
          root
            .querySelector<HTMLElement>('[role="option"][tabindex="0"]')
            ?.focus();
        }
        wasVisible = visible;
      });
    });
  }

  protected isSelected(column: Column, unit: TimeUnit): boolean {
    return this.hasValue() && unit.value === column.selected;
  }

  protected unitClass(column: Column, unit: TimeUnit): string {
    return cn(ps.timeUnit, {
      [ps.selected]: this.isSelected(column, unit),
      [ps.disabled]: unit.disabled,
    });
  }

  protected pick(column: Column, unit: TimeUnit): void {
    if (!unit.disabled)
      this.timeChange.emit({
        type: column.kind,
        value: column.toValue(unit.value),
      });
  }

  protected onUnitKeyDown(
    event: KeyboardEvent,
    column: Column,
    unit: TimeUnit,
  ): void {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    this.pick(column, unit);
  }

  protected onColumnKeyDown(event: KeyboardEvent, columnIndex: number): void {
    const listbox = event.currentTarget as HTMLElement;
    const target = event.target as HTMLElement;
    const enabled = Array.from(
      listbox.querySelectorAll<HTMLElement>('[role="option"]'),
    ).filter((o) => o.getAttribute("aria-disabled") !== "true");
    const index = enabled.indexOf(target);
    const count = this.columns().length;
    const focusColumn = (i: number) =>
      this.host.nativeElement
        .querySelectorAll<HTMLElement>('[role="listbox"]')
        [i]?.querySelector<HTMLElement>('[tabindex="0"]')
        ?.focus();
    // RTL: columns are laid out right to left, so ArrowLeft is the next one.
    switch (logicalArrowKey(event.key, listbox)) {
      case "ArrowDown":
        event.preventDefault();
        enabled[Math.min(enabled.length - 1, index + 1)]?.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        enabled[Math.max(0, index - 1)]?.focus();
        break;
      case "Home":
        event.preventDefault();
        enabled[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        enabled[enabled.length - 1]?.focus();
        break;
      case "ArrowRight":
        event.preventDefault();
        focusColumn(Math.min(count - 1, columnIndex + 1));
        break;
      case "ArrowLeft":
        event.preventDefault();
        focusColumn(Math.max(0, columnIndex - 1));
        break;
      default:
        break;
    }
  }
}
