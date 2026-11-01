import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  afterEveryRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  numberAttribute,
  signal,
  untracked,
} from "@angular/core";
import { addDays, dayKey, parseDayKey, weekStart } from "@minerva/core";
import { logicalArrowKey } from "@minerva/dom";
import { injectScope } from "../../config/scope";
import { MnHook } from "../../internal/hooks";
import { MnIcon } from "../../internal/icon";
import * as styles from "../../internal/styles";

/**
 * Marker of a WeekStrip day: a number shows a count badge (0 shows
 * nothing), true shows a dot
 */
export type WeekStripMarker = number | boolean;

/** Density of a WeekStrip */
export type WeekStripSize = "small" | "medium" | "large";

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

const markerCount = (marker: WeekStripMarker | undefined) =>
  typeof marker === "number" && Number.isFinite(marker) && marker > 0
    ? Math.floor(marker)
    : 0;

interface WeekStripDay {
  date: Date;
  key: string;
  count: number;
  dot: boolean;
  selected: boolean;
  today: boolean;
  weekday: string;
  label: string;
  tabindex: number;
}

/**
 * The seven days of a week in a row (a horizontal `listbox` of day
 * `option`s). Select a day by click, Enter or Space; today carries
 * `aria-current="date"`; days can show a count badge or a dot (`markers`).
 * Keyboard: a roving tab stop, ArrowLeft / ArrowRight move by a day (into
 * the previous / next week), Home / End jump to the ends of the week and
 * PageUp / PageDown move by a week. `showNavigation` adds previous / next
 * week buttons and the month of the week. The selected day is
 * `[(value)]`, the displayed week `[(week)]`; while `week` is not set the
 * strip shows the week of the selected day, else of today.
 */
@Component({
  selector: "mn-week-strip",
  imports: [MnHook, MnIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    "data-minerva": "week-strip",
    "data-part": "root",
    "[attr.data-disabled]": "disabled() ? '' : null",
    "[attr.data-size]": "size()",
    "[class]": "rootClass()",
  },
  template: `@if (showNavigation()) {
      <div [class]="s.toolbar">
        <button
          type="button"
          mnHook="week-strip"
          mnPart="nav-button"
          [class]="s.navButton"
          [attr.aria-label]="
            previousWeekLabel() ?? scope.t('weekStrip.previousWeek')
          "
          [disabled]="disabled()"
          (click)="moveWeek(-7)"
        >
          <svg mnIcon="ChevronLeft"></svg>
        </button>
        <span
          mnHook="week-strip"
          mnPart="heading"
          [class]="s.heading"
          aria-live="polite"
          >{{ heading() }}</span
        >
        <button
          type="button"
          mnHook="week-strip"
          mnPart="nav-button"
          [class]="s.navButton"
          [attr.aria-label]="nextWeekLabel() ?? scope.t('weekStrip.nextWeek')"
          [disabled]="disabled()"
          (click)="moveWeek(7)"
        >
          <svg mnIcon="ChevronRight"></svg>
        </button>
      </div>
    }
    <div
      mnHook="week-strip"
      mnPart="list"
      role="listbox"
      aria-orientation="horizontal"
      [attr.aria-label]="ariaLabel() ?? scope.t('weekStrip.label')"
      [attr.aria-disabled]="disabled() ? 'true' : null"
      [class]="s.days"
    >
      @for (day of days(); track day.key) {
        <div
          role="option"
          mnHook="week-strip"
          mnPart="day"
          [mnStates]="{
            selected: day.selected,
            today: day.today,
            disabled: disabled(),
          }"
          [class]="s.day"
          [attr.data-date]="day.key"
          [attr.aria-label]="day.label"
          [attr.aria-selected]="day.selected"
          [attr.aria-current]="day.today ? 'date' : null"
          [attr.aria-disabled]="disabled() ? 'true' : null"
          [attr.tabindex]="day.tabindex"
          (focus)="focused.set(day.key)"
          (click)="select(day.date)"
          (keydown)="navigate($event, day.date)"
        >
          <span [class]="s.weekday" aria-hidden="true">{{ day.weekday }}</span>
          <span [class]="s.dayNumber" aria-hidden="true">{{
            day.date.getDate()
          }}</span>
          <span
            mnHook="week-strip"
            mnPart="indicator"
            [class]="markerClass(day)"
            aria-hidden="true"
            >{{ day.count ? (day.count > 99 ? "99+" : day.count) : "" }}</span
          >
        </div>
      }
    </div>`,
})
export class MnWeekStrip {
  /** Selected day, "YYYY-MM-DD" (`[(value)]`) */
  readonly value = model<string | null>(null);
  /** Displayed week, any day of it (`[(week)]`); defaults to the week of the selected day, else of today */
  readonly week = model<Date | null>(null);
  /** First day of the week: 0 = Sunday, 1 = Monday ... 6 = Saturday */
  readonly firstDayOfWeek = input(1, {
    transform: (value: unknown) => numberAttribute(value, 1),
  });
  /** The day marked as today, "YYYY-MM-DD"; defaults to the current local day */
  readonly today = input<string | undefined>(undefined);
  /** Per-day markers keyed by "YYYY-MM-DD": a number shows a count badge (99+ above 99), true shows a dot */
  readonly markers = input<
    Readonly<Record<string, WeekStripMarker>> | undefined
  >(undefined);
  /** Accessible label of a day, from the day ("YYYY-MM-DD") and its marker */
  readonly getDayLabel = input<
    ((day: string, marker: WeekStripMarker | undefined) => string) | undefined
  >(undefined);
  /** Shows previous / next week buttons around the month of the week */
  readonly showNavigation = input(false, { transform: booleanAttribute });
  /** Label of the previous-week button (default: translated "Previous week") */
  readonly previousWeekLabel = input<string | undefined>(undefined);
  /** Label of the next-week button (default: translated "Next week") */
  readonly nextWeekLabel = input<string | undefined>(undefined);
  /** Weekday names, Monday first (7 labels), whatever firstDayOfWeek is */
  readonly weekdayLabels = input<readonly string[] | undefined>(undefined);
  /** Locale of the dates (Intl.DateTimeFormat); default: the library language */
  readonly locale = input<string | undefined>(undefined);
  /** Blocks selection and navigation */
  readonly disabled = input(false, { transform: booleanAttribute });
  /** Cell density */
  readonly size = input<WeekStripSize>("medium");
  /** Accessible label of the day list (default: translated "Week") */
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: "aria-label",
  });

  protected readonly s = styles.weekStripStyles;
  protected readonly scope = injectScope();
  protected readonly focused = signal("");
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private lastValue: string | null | undefined = undefined;
  /** Day to focus once its cell is rendered (keyboard navigation) */
  private pendingFocus: string | null = null;

  constructor() {
    // After keyboard navigation (possibly into another week), focus the day
    // once its cell exists.
    afterEveryRender(() => {
      if (!this.pendingFocus || this.disabled()) return;
      const cell = this.host.nativeElement.querySelector<HTMLElement>(
        `[data-date="${this.pendingFocus}"]`,
      );
      if (cell) {
        this.pendingFocus = null;
        cell.focus();
      }
    });
    // The week follows a selected day set from outside.
    effect(() => {
      const value = this.value();
      untracked(() => {
        const first = this.lastValue === undefined;
        if (value === this.lastValue) return;
        this.lastValue = value;
        const date = value ? parseDayKey(value) : null;
        if (!first && date) this.goToWeek(date);
      });
    });
  }

  protected readonly rootClass = computed(() => {
    const size = this.size();
    return size === "small" || size === "large"
      ? `${this.s.weekStrip} ${this.s[size]}`
      : this.s.weekStrip;
  });
  private readonly todayKey = computed(() => {
    const today = this.today();
    return today && parseDayKey(today) ? today : dayKey(new Date());
  });
  private readonly language = computed(
    () => this.locale() ?? this.scope.language(),
  );
  /** First day of the displayed week */
  protected readonly start = computed(() => {
    const week = this.week();
    const date =
      week instanceof Date && !Number.isNaN(week.getTime())
        ? week
        : (parseDayKey(this.value() ?? "") ??
          parseDayKey(this.todayKey()) ??
          new Date());
    return weekStart(date, this.firstDayOfWeek());
  });
  protected readonly heading = computed(() => {
    const start = this.start();
    const end = addDays(start, 6);
    const lang = this.language();
    const monthFormat = new Intl.DateTimeFormat(lang, {
      year: "numeric",
      month: "long",
    });
    if (start.getMonth() === end.getMonth()) return monthFormat.format(start);
    const from = new Intl.DateTimeFormat(lang, {
      month: "long",
      ...(start.getFullYear() !== end.getFullYear() && { year: "numeric" }),
    }).format(start);
    return `${from} – ${monthFormat.format(end)}`;
  });
  protected readonly days = computed<WeekStripDay[]>(() => {
    const start = this.start();
    const dates = Array.from({ length: 7 }, (_, index) =>
      addDays(start, index),
    );
    const keys = dates.map(dayKey);
    const value = this.value();
    const todayKey = this.todayKey();
    // Roving tab stop: the focused day, else the selection, today, the 1st.
    const activeKey =
      [this.focused(), value, todayKey].find(
        (key): key is string => !!key && keys.includes(key),
      ) ?? keys[0];
    const longDate = new Intl.DateTimeFormat(this.language(), {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const markers = this.markers();
    const getDayLabel = this.getDayLabel();
    const weekdayLabels = this.weekdayLabels();
    const disabled = this.disabled();
    return dates.map((date) => {
      const key = dayKey(date);
      const marker = markers?.[key];
      const count = markerCount(marker);
      const index = (date.getDay() + 6) % 7;
      const text = longDate.format(date);
      const label = getDayLabel
        ? getDayLabel(key, marker)
        : count
          ? this.scope.t("weekStrip.dayWithMarkers", { date: text, count })
          : marker === true
            ? this.scope.t("weekStrip.dayMarked", { date: text })
            : text;
      return {
        date,
        key,
        count,
        dot: !count && marker === true,
        selected: value === key,
        today: key === todayKey,
        weekday:
          weekdayLabels?.[index] ??
          this.scope.t(`monthCalendar.weekdays.${WEEKDAYS[index]}`),
        label,
        tabindex: !disabled && key === activeKey ? 0 : -1,
      };
    });
  });

  protected markerClass(day: WeekStripDay): string {
    return [
      this.s.marker,
      day.count ? this.s.count : "",
      day.dot ? this.s.dot : "",
    ]
      .filter(Boolean)
      .join(" ");
  }

  private goToWeek(date: Date) {
    const next = weekStart(date, this.firstDayOfWeek());
    if (dayKey(next) !== dayKey(this.start())) this.week.set(next);
  }

  protected moveWeek(offset: number) {
    if (!this.disabled()) this.goToWeek(addDays(this.start(), offset));
  }

  protected select(date: Date) {
    if (this.disabled()) return;
    const key = dayKey(date);
    this.goToWeek(date);
    if (key !== this.value()) {
      this.lastValue = key;
      this.value.set(key);
    }
  }

  protected navigate(event: KeyboardEvent, date: Date) {
    if (this.disabled()) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) this.select(date);
      return;
    }
    const start = this.start();
    let target: Date;
    // RTL: the week runs right to left, so ArrowLeft is the next day.
    switch (logicalArrowKey(event.key, event.currentTarget as HTMLElement)) {
      case "ArrowLeft":
        target = addDays(date, -1);
        break;
      case "ArrowRight":
        target = addDays(date, 1);
        break;
      case "Home":
        target = start;
        break;
      case "End":
        target = addDays(start, 6);
        break;
      case "PageUp":
        target = addDays(date, -7);
        break;
      case "PageDown":
        target = addDays(date, 7);
        break;
      default:
        return;
    }
    event.preventDefault();
    const key = dayKey(target);
    this.pendingFocus = key;
    this.focused.set(key);
    this.goToWeek(target);
  }

  /** Focuses the active day */
  focus(options?: FocusOptions): void {
    this.host.nativeElement
      .querySelector<HTMLElement>('[role="option"][tabindex="0"]')
      ?.focus(options);
  }
}
