import { css, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import styles from "@react-styles/components/WeekStrip/weekStrip.module.scss?inline";
import { addDays, dayKey, parseDayKey, weekStart } from "@minerva/core";
import { logicalArrowKey } from "@minerva/dom";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import { IconChevronLeft, IconChevronRight } from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { itemParts } from "../../internal/styling-hooks";
import { sharedStyles } from "../../internal/styles";

/**
 * Marker of a day: a number shows a count badge (0 shows nothing), true
 * shows a dot
 */
export type WeekStripMarker = number | boolean;

/** Cell density: compact ("small"), default ("medium") or comfortable ("large") */
export type WeekStripSize = "small" | "medium" | "large";

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const DAY_KEY = /^\d{4}-\d{2}-\d{2}$/;

/** `week` attribute: any day of the week, "YYYY-MM-DD" (local) <-> Date. */
const weekConverter = {
  fromAttribute(value: string | null): Date | undefined {
    return parseDayKey(value?.trim() ?? "") ?? undefined;
  },
  toAttribute(value: Date | undefined): string | null {
    return value instanceof Date && !Number.isNaN(value.getTime())
      ? dayKey(value)
      : null;
  },
};

const markerCount = (marker: WeekStripMarker | undefined) =>
  typeof marker === "number" && Number.isFinite(marker) && marker > 0
    ? Math.floor(marker)
    : 0;

/**
 * The seven days of a week in a row (`<WeekStrip>` of React): a horizontal
 * `listbox` of day `option`s. Select a day by click, Enter or Space; today
 * carries `aria-current="date"`; days can show a count badge or a dot
 * (`markers`). Keyboard: one tab stop (roving `tabindex`), ArrowLeft /
 * ArrowRight move by a day (into the previous / next week; RTL swaps them),
 * Home / End jump to the ends of the week, PageUp / PageDown move by a week.
 * `show-navigation` adds previous / next week buttons around the month of
 * the week.
 *
 * User navigation updates `week` / `value` and fires `minerva-week-change`
 * / `minerva-change`. Setting `value` also displays its week.
 *
 * @summary A week of selectable days with today, markers and week navigation.
 * @tag minerva-week-strip
 * @csspart root - The outermost element
 * @csspart heading - The month of the week (with `show-navigation`)
 * @csspart nav-button - The previous / next week buttons (with `show-navigation`)
 * @csspart list - The `role=listbox` element holding the days
 * @csspart day - A day (`role=option`)
 * @csspart day--selected - Item state of `day`: selected
 * @csspart day--today - Item state of `day`: today
 * @csspart day--disabled - Item state of `day`: disabled
 * @csspart indicator - The marker of a day: empty, a count badge or a dot
 * @fires minerva-change - The user selected a day (`detail: { value }`, "YYYY-MM-DD")
 * @fires minerva-week-change - The user displayed another week (`detail: { week }`, its first day at local midnight)
 */
export class MinervaWeekStrip extends MinervaElement {
  static override tagName = "minerva-week-strip";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
        inline-size: 100%;
      }
      .navButton svg {
        flex-shrink: 0;
      }
    `,
    sharedStyles(styles),
  ];

  /** Selected day, "YYYY-MM-DD" */
  @property({ reflect: true })
  value?: string;

  /** Displayed week (any day of it; attribute "YYYY-MM-DD"); defaults to the week of the selected day, else of today */
  @property({ converter: weekConverter, reflect: true })
  week?: Date;

  /** First day of the week: 0 = Sunday, 1 = Monday ... 6 = Saturday */
  @property({ type: Number, attribute: "first-day-of-week" })
  firstDayOfWeek = 1;

  /** The day marked as today, "YYYY-MM-DD"; defaults to the current local day */
  @property()
  today?: string;

  /** Per-day markers keyed by "YYYY-MM-DD": a number shows a count badge (99+ above 99), true shows a dot */
  @property({ attribute: false })
  markers?: Readonly<Record<string, WeekStripMarker>>;

  /** Shows previous / next week buttons around the month of the week */
  @property({ type: Boolean, attribute: "show-navigation", reflect: true })
  showNavigation = false;

  /** Label of the previous-week button (default: localized) */
  @property({ attribute: "previous-week-label" })
  previousWeekLabel?: string;

  /** Label of the next-week button (default: localized) */
  @property({ attribute: "next-week-label" })
  nextWeekLabel?: string;

  /** Locale of the dates (Intl.DateTimeFormat); default: the library language */
  @property()
  locale?: string;

  /** Blocks selection and navigation */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Cell density: compact ("small"), default ("medium") or comfortable ("large") */
  @property({ reflect: true })
  size: WeekStripSize = "medium";

  /** Weekday names, Monday first (7 labels), whatever `first-day-of-week` is */
  @property({ attribute: false })
  weekdayLabels?: readonly string[];

  /** Accessible label of a day, from the day ("YYYY-MM-DD") and its marker */
  @property({ attribute: false })
  getDayLabel?: (day: string, marker: WeekStripMarker | undefined) => string;

  /** Day holding the roving tab stop after focus / keyboard moves */
  @state()
  private focusedKey = "";

  /** Day to focus once its cell is rendered (keyboard navigation) */
  private pendingFocus: string | null = null;

  private readonly i18n = new LocaleController(this);
  private readonly aria = new AriaController(this);

  private get todayKey(): string {
    return this.today && parseDayKey(this.today)
      ? this.today
      : dayKey(new Date());
  }

  /** First day of the displayed week */
  private get start(): Date {
    const week = this.week;
    const date =
      week instanceof Date && !Number.isNaN(week.getTime())
        ? week
        : (parseDayKey(this.value ?? "") ??
          parseDayKey(this.todayKey) ??
          new Date());
    return weekStart(date, this.firstDayOfWeek);
  }

  override focus(options?: FocusOptions): void {
    this.renderRoot
      .querySelector<HTMLElement>('[role="option"][tabindex="0"]')
      ?.focus(options);
  }

  private goToWeek(date: Date) {
    const next = weekStart(date, this.firstDayOfWeek);
    if (dayKey(next) === dayKey(this.start)) return;
    this.week = next;
    this.emit("minerva-week-change", { week: next });
  }

  private select(date: Date) {
    if (this.disabled) return;
    const key = dayKey(date);
    this.goToWeek(date);
    if (key !== this.value) {
      this.value = key;
      this.emit("minerva-change", { value: key });
    }
  }

  private handleKeyDown(event: KeyboardEvent, date: Date) {
    if (this.disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) this.select(date);
      return;
    }
    const start = this.start;
    let target: Date;
    // RTL: the week runs right to left, so ArrowLeft is the next day.
    switch (logicalArrowKey(event.key, this)) {
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
    this.pendingFocus = dayKey(target);
    this.focusedKey = dayKey(target);
    this.goToWeek(target);
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (!changed.has("value")) return;
    if (DEV && this.value && !DAY_KEY.test(this.value)) {
      devWarn(
        MinervaWeekStrip.tagName,
        `value "${this.value}" is not a "YYYY-MM-DD" day: nothing is selected.`,
      );
    }
    // A selection set from outside displays its week (unless `week` is set
    // in the same update).
    const date = parseDayKey(this.value ?? "");
    if (date && !changed.has("week")) {
      const next = weekStart(date, this.firstDayOfWeek);
      if (dayKey(next) !== dayKey(this.start)) this.week = next;
    }
  }

  protected override updated(): void {
    // After keyboard navigation (possibly into another week), focus the day
    // once its cell exists.
    if (this.disabled || !this.pendingFocus) return;
    const cell = this.renderRoot.querySelector<HTMLElement>(
      `[data-date="${this.pendingFocus}"]`,
    );
    if (cell) {
      this.pendingFocus = null;
      cell.focus();
    }
  }

  protected override hookStates() {
    return { disabled: this.disabled, size: this.size };
  }

  private heading(start: Date, end: Date, lang: string): string {
    try {
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
    } catch {
      return dayKey(start).slice(0, 7);
    }
  }

  protected override render() {
    const t = this.i18n.t;
    const start = this.start;
    const days = Array.from({ length: 7 }, (_, index) => addDays(start, index));
    const keys = days.map(dayKey);
    const todayKey = this.todayKey;
    const value = this.value || undefined;
    // Roving tab stop: the focused day, else the selection, today, the 1st.
    const activeKey =
      [this.focusedKey, value, todayKey].find(
        (key) => key && keys.includes(key),
      ) ?? keys[0];
    const disabled = this.disabled;
    const size = ["small", "medium", "large"].includes(this.size)
      ? this.size
      : "medium";
    const lang = this.locale ?? this.i18n.language;
    let longDate: (date: Date) => string;
    try {
      const format = new Intl.DateTimeFormat(lang, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      longDate = (date) => format.format(date);
    } catch {
      longDate = dayKey;
    }
    const dayLabel = (key: string, date: Date) => {
      const marker = this.markers?.[key];
      if (this.getDayLabel) return this.getDayLabel(key, marker);
      const text = longDate(date);
      const count = markerCount(marker);
      if (count) return t("weekStrip.dayWithMarkers", { date: text, count });
      if (marker === true) return t("weekStrip.dayMarked", { date: text });
      return text;
    };

    return html`<div part="root" class="weekStrip ${size}">
      ${
        this.showNavigation
          ? html`<div class="toolbar">
              <button
                type="button"
                part="nav-button"
                class="navButton"
                aria-label=${this.previousWeekLabel ?? t("weekStrip.previousWeek")}
                ?disabled=${disabled}
                @click=${() => this.goToWeek(addDays(start, -7))}
              >
                ${IconChevronLeft}
              </button>
              <span part="heading" class="heading" aria-live="polite"
                >${this.heading(start, days[6], lang)}</span
              >
              <button
                type="button"
                part="nav-button"
                class="navButton"
                aria-label=${this.nextWeekLabel ?? t("weekStrip.nextWeek")}
                ?disabled=${disabled}
                @click=${() => this.goToWeek(addDays(start, 7))}
              >
                ${IconChevronRight}
              </button>
            </div>`
          : nothing
      }
      <div
        part="list"
        role="listbox"
        aria-label=${this.aria.label ?? t("weekStrip.label")}
        aria-orientation="horizontal"
        aria-disabled=${disabled ? "true" : nothing}
        class="days"
      >
        ${days.map((date) => {
          const key = dayKey(date);
          const marker = this.markers?.[key];
          const count = markerCount(marker);
          const weekday = (date.getDay() + 6) % 7;
          const states = {
            selected: value === key,
            today: key === todayKey,
            disabled,
          };
          const markerClass = count
            ? "marker count"
            : marker === true
              ? "marker dot"
              : "marker";
          return html`<div
            role="option"
            part=${itemParts("day", states)}
            class="day"
            data-date=${key}
            aria-label=${dayLabel(key, date)}
            aria-selected=${String(states.selected)}
            aria-current=${states.today ? "date" : nothing}
            aria-disabled=${disabled ? "true" : nothing}
            tabindex=${!disabled && key === activeKey ? "0" : "-1"}
            @focus=${() => (this.focusedKey = key)}
            @click=${() => this.select(date)}
            @keydown=${(event: KeyboardEvent) => this.handleKeyDown(event, date)}
          >
            <span class="weekday" aria-hidden="true"
              >${
                this.weekdayLabels?.[weekday] ??
                t(`monthCalendar.weekdays.${WEEKDAYS[weekday]}`)
              }</span
            >
            <span class="dayNumber" aria-hidden="true">${date.getDate()}</span>
            <span part="indicator" class=${markerClass} aria-hidden="true"
              >${count ? (count > 99 ? "99+" : count) : ""}</span
            >
          </div>`;
        })}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-week-strip": MinervaWeekStrip;
  }
}
