import { css, html, nothing, type PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import styles from "@lib-core-styles/components/MonthCalendar/monthCalendar.module.scss?inline";
import {
  addDays,
  dayKey,
  localDate,
  logicalArrowKey,
  monthStart,
  sameMonth,
} from "@minerva/core";
import { AriaController } from "../../internal/aria";
import { DEV, devWarn } from "../../internal/dev";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
} from "../../internal/icons";
import { LocaleController } from "../../internal/locale";
import { MinervaElement, hostStyles } from "../../internal/minerva-element";
import { sharedStyles } from "../../internal/styles";

/** An event shown in the calendar */
export interface MonthCalendarEvent {
  /** Unique id of the event */
  id: string;
  /** Local day of the event, "YYYY-MM-DD" (no time or timezone) */
  date: string;
  /** Title of the event */
  title: string;
}

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const DAY_KEY = /^\d{4}-\d{2}-\d{2}$/;

/** `month` attribute: "YYYY-MM" or "YYYY-MM-DD" (local) <-> Date. */
const monthConverter = {
  fromAttribute(value: string | null): Date | undefined {
    const match = value?.trim().match(/^(\d{4})-(\d{1,2})(?:-\d{1,2})?$/);
    return match
      ? localDate(Number(match[1]), Number(match[2]) - 1, 1)
      : undefined;
  },
  toAttribute(value: Date | undefined): string | null {
    return value instanceof Date && !Number.isNaN(value.getTime())
      ? dayKey(value).slice(0, 7)
      : null;
  },
};

/**
 * A Monday-first, six-week month grid (`<MonthCalendar>` of lib-core). Each
 * day shows its number of events; selecting a day lists its events below
 * the grid. Fully keyboard operable as an APG date grid: one tab stop
 * (roving `tabindex` on the `gridcell`s themselves, `aria-selected`, no
 * inner buttons), arrows, Home / End (week start / end), PageUp / PageDown
 * (month), Shift+PageUp / PageDown (year), Enter / Space to select. The
 * arrows follow the reading direction (RTL swaps left / right).
 *
 * Events are given through the `events` property. User navigation updates
 * `month` / `value` and fires `minerva-month-change` / `minerva-change`.
 *
 * @summary Month grid with per-day event counts and keyboard navigation.
 * @tag minerva-month-calendar
 * @csspart root - The calendar `<section>`
 * @csspart heading - The month heading
 * @csspart nav-button - The previous / today / next buttons
 * @csspart grid - The `role=grid` element
 * @csspart day - A day cell (`role=gridcell`)
 * @csspart events - The events section of the selected day
 * @csspart event - An event (a button with `clickable-events`)
 * @csspart empty - The text shown when the selected day has no event
 * @fires minerva-change - The user selected a day (`detail: { value }`, "YYYY-MM-DD")
 * @fires minerva-month-change - The user displayed another month (`detail: { month }`, its first day at local midnight)
 * @fires minerva-event-click - An event of the selected day was activated (`detail: { event }`; requires `clickable-events`)
 */
export class MinervaMonthCalendar extends MinervaElement {
  static override tagName = "minerva-month-calendar";
  static override styles = [
    hostStyles,
    css`
      :host {
        display: block;
      }
      .navButton svg {
        flex-shrink: 0;
      }
    `,
    sharedStyles(styles),
  ];

  /** Displayed month (any day of it; attribute "YYYY-MM"); defaults to the current month */
  @property({ converter: monthConverter, reflect: true })
  month?: Date;

  /** Selected day, "YYYY-MM-DD" */
  @property({ reflect: true })
  value?: string;

  /** Events; each day shows how many it has */
  @property({ attribute: false })
  events: readonly MonthCalendarEvent[] = [];

  /** Renders the selected day's events as buttons firing `minerva-event-click` */
  @property({ type: Boolean, attribute: "clickable-events" })
  clickableEvents = false;

  /** Blocks navigation, selection and event clicks */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Hides the list of the selected day's events (lib-core's `showSelectedDayEvents={false}`) */
  @property({ type: Boolean, attribute: "hide-events" })
  hideEvents = false;

  /** Label of the previous-month button (default: localized) */
  @property({ attribute: "previous-month-label" })
  previousMonthLabel?: string;

  /** Label of the next-month button (default: localized) */
  @property({ attribute: "next-month-label" })
  nextMonthLabel?: string;

  /** Label of the button returning to the current month (default: localized "Today") */
  @property({ attribute: "today-label" })
  todayLabel?: string;

  /** Text shown when the selected day has no events (default: localized) */
  @property({ attribute: "empty-events-text" })
  emptyEventsText?: string;

  /** Locale of the month heading (Intl.DateTimeFormat); default: the library language */
  @property()
  locale?: string;

  /** Column headers, Monday first (7 labels) */
  @property({ attribute: false })
  weekdayLabels?: readonly string[];

  /** Accessible label of a day cell, from the day ("YYYY-MM-DD") and its event count */
  @property({ attribute: false })
  getDayLabel?: (day: string, eventCount: number) => string;

  /** Accessible label of the selected day's event list */
  @property({ attribute: false })
  getEventsLabel?: (day: string) => string;

  /** Day holding the roving tab stop after focus / keyboard moves */
  @state()
  private focusedKey = "";

  /** Day to focus once its cell is rendered (keyboard navigation) */
  private pendingFocus: string | null = null;

  private readonly i18n = new LocaleController(this);
  private readonly aria = new AriaController(this);

  /** First day of the displayed month */
  private get displayed(): Date {
    const month = this.month;
    return month instanceof Date && !Number.isNaN(month.getTime())
      ? monthStart(month)
      : monthStart(new Date());
  }

  override focus(options?: FocusOptions): void {
    this.renderRoot
      .querySelector<HTMLElement>('[role="gridcell"][tabindex="0"]')
      ?.focus(options);
  }

  private goToMonth(date: Date) {
    const next = monthStart(date);
    if (dayKey(next) === dayKey(this.displayed)) return;
    this.month = next;
    this.emit("minerva-month-change", { month: next });
  }

  private select(date: Date) {
    if (this.disabled) return;
    const key = dayKey(date);
    if (key !== this.value) {
      this.value = key;
      this.emit("minerva-change", { value: key });
    }
    if (!sameMonth(date, this.displayed)) this.goToMonth(date);
  }

  private handleKeyDown(event: KeyboardEvent, date: Date) {
    if (this.disabled) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (!event.repeat) this.select(date);
      return;
    }
    // RTL: the week runs right to left, so ArrowLeft is the next day.
    const key = logicalArrowKey(event.key, this);
    const weekday = (date.getDay() + 6) % 7;
    let target: Date;
    switch (key) {
      case "ArrowLeft":
        target = addDays(date, -1);
        break;
      case "ArrowRight":
        target = addDays(date, 1);
        break;
      case "ArrowUp":
        target = addDays(date, -7);
        break;
      case "ArrowDown":
        target = addDays(date, 7);
        break;
      case "Home":
        target = addDays(date, -weekday);
        break;
      case "End":
        target = addDays(date, 6 - weekday);
        break;
      case "PageUp":
      case "PageDown": {
        const offset =
          (event.key === "PageUp" ? -1 : 1) * (event.shiftKey ? 12 : 1);
        const next = monthStart(date, offset);
        const lastDay = addDays(monthStart(next, 1), -1).getDate();
        target = localDate(
          next.getFullYear(),
          next.getMonth(),
          Math.min(date.getDate(), lastDay),
        );
        break;
      }
      default:
        return;
    }
    event.preventDefault();
    this.pendingFocus = dayKey(target);
    this.focusedKey = dayKey(target);
    if (!sameMonth(target, this.displayed)) this.goToMonth(target);
  }

  protected override willUpdate(changed: PropertyValues<this>): void {
    if (
      DEV &&
      changed.has("value") &&
      this.value &&
      !DAY_KEY.test(this.value)
    ) {
      devWarn(
        MinervaMonthCalendar.tagName,
        `value "${this.value}" is not a "YYYY-MM-DD" day: nothing is selected.`,
      );
    }
  }

  protected override updated(): void {
    // After keyboard navigation (possibly into another month), focus the
    // day once its cell exists.
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
    return { disabled: this.disabled };
  }

  protected override render() {
    const t = this.i18n.t;
    const first = this.displayed;
    const start = addDays(first, -((first.getDay() + 6) % 7));
    const days = Array.from({ length: 42 }, (_, index) =>
      addDays(start, index),
    );
    const visibleKeys = days.map(dayKey);
    const today = new Date();
    const todayKey = dayKey(today);
    const value = this.value || undefined;
    // Roving tab stop: the focused day, else the selection, today, the 1st.
    const activeKey = [
      this.focusedKey,
      value,
      sameMonth(today, first) ? todayKey : "",
      dayKey(first),
    ].find((key) => key && visibleKeys.includes(key));
    const events = this.events ?? [];
    const counts = new Map<string, number>();
    for (const event of events) {
      counts.set(event.date, (counts.get(event.date) ?? 0) + 1);
    }
    const selectedEvents = events.filter((event) => event.date === value);
    let heading: string;
    try {
      heading = new Intl.DateTimeFormat(this.locale ?? this.i18n.language, {
        year: "numeric",
        month: "long",
      }).format(first);
    } catch {
      heading = dayKey(first).slice(0, 7);
    }
    const disabled = this.disabled;

    return html`<section
      part="root"
      class="monthCalendar"
      aria-label=${this.aria.label ?? t("monthCalendar.label")}
    >
      <div class="toolbar">
        <h2 id="heading" part="heading" class="heading" aria-live="polite">
          ${heading}
        </h2>
        <div class="navigation">
          <button
            type="button"
            part="nav-button"
            class="navButton iconButton"
            aria-label=${this.previousMonthLabel ?? t("monthCalendar.previousMonth")}
            ?disabled=${disabled}
            @click=${() => this.goToMonth(monthStart(first, -1))}
          >
            ${IconChevronLeft}
          </button>
          <button
            type="button"
            part="nav-button"
            class="navButton"
            ?disabled=${disabled}
            @click=${() => this.goToMonth(new Date())}
          >
            ${IconCalendar} ${this.todayLabel ?? t("monthCalendar.today")}
          </button>
          <button
            type="button"
            part="nav-button"
            class="navButton iconButton"
            aria-label=${this.nextMonthLabel ?? t("monthCalendar.nextMonth")}
            ?disabled=${disabled}
            @click=${() => this.goToMonth(monthStart(first, 1))}
          >
            ${IconChevronRight}
          </button>
        </div>
      </div>
      <div
        part="grid"
        role="grid"
        aria-labelledby="heading"
        aria-disabled=${disabled ? "true" : nothing}
        class="grid"
      >
        <div role="row" class="week">
          ${WEEKDAYS.map(
            (day, index) =>
              html`<div role="columnheader" class="weekday">
                ${
                  this.weekdayLabels?.[index] ??
                  t(`monthCalendar.weekdays.${day}`)
                }
              </div>`,
          )}
        </div>
        ${Array.from(
          { length: 6 },
          (_, week) =>
            html`<div role="row" class="week">
              ${days.slice(week * 7, week * 7 + 7).map((date) => {
                const key = dayKey(date);
                const count = counts.get(key) ?? 0;
                const label = this.getDayLabel
                  ? this.getDayLabel(key, count)
                  : count
                    ? t("monthCalendar.dayWithEvents", { date: key, count })
                    : key;
                return html`<div
                  role="gridcell"
                  part="day"
                  class="day"
                  data-date=${key}
                  data-outside=${sameMonth(date, first) ? nothing : "true"}
                  aria-label=${label}
                  aria-selected=${String(value === key)}
                  aria-current=${key === todayKey ? "date" : nothing}
                  aria-disabled=${disabled ? "true" : nothing}
                  tabindex=${!disabled && key === activeKey ? "0" : "-1"}
                  @focus=${() => (this.focusedKey = key)}
                  @click=${() => this.select(date)}
                  @keydown=${(event: KeyboardEvent) =>
                    this.handleKeyDown(event, date)}
                >
                  <span>${date.getDate()}</span>
                  <span class="count" aria-hidden="true"
                    >${count ? (count > 99 ? "99+" : count) : " "}</span
                  >
                </div>`;
              })}
            </div>`,
        )}
      </div>
      ${
        !this.hideEvents && value
          ? html`<section
              part="events"
              class="events"
              aria-label=${
                this.getEventsLabel
                  ? this.getEventsLabel(value)
                  : t("monthCalendar.eventsLabel", { date: value })
              }
            >
              <h3 class="eventsHeading">${value}</h3>
              ${
                selectedEvents.length
                  ? html`<ul class="eventList">
                      ${selectedEvents.map(
                        (event) =>
                          html`<li class="eventItem">
                            ${
                              this.clickableEvents
                                ? html`<button
                                    type="button"
                                    part="event"
                                    class="eventButton"
                                    ?disabled=${disabled}
                                    @click=${() =>
                                      this.emit("minerva-event-click", {
                                        event,
                                      })}
                                  >
                                    ${event.title}
                                  </button>`
                                : html`<span part="event">${event.title}</span>`
                            }
                          </li>`,
                      )}
                    </ul>`
                  : html`<p class="empty" part="empty">
                      ${this.emptyEventsText ?? t("monthCalendar.noEvents")}
                    </p>`
              }
            </section>`
          : nothing
      }
    </section>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "minerva-month-calendar": MinervaMonthCalendar;
  }
}
