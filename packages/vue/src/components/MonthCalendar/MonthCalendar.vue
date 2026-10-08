<script lang="ts">
import type { MonthCalendarEvent } from "./types";

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const NO_EVENTS: readonly MonthCalendarEvent[] = [];
const DAY_KEY = /^\d{4}-\d{2}-\d{2}$/;
</script>

<script setup lang="ts">
/**
 * MonthCalendar: a Monday-first, six-week month grid. Each day shows its
 * number of events; selecting a day lists its events below the grid. Fully
 * keyboard operable (arrows, Home / End, PageUp / PageDown, Shift+Page for
 * years, Enter / Space to select) with a roving tab stop. APG date grid:
 * each day is a focusable `gridcell` carrying `aria-selected` (no inner
 * button), so the selection is announced once. The selected day is
 * `v-model`, the displayed month `v-model:month`; listening to
 * `@event-click` makes the selected day's events buttons.
 */
import {
  computed,
  getCurrentInstance,
  ref,
  shallowRef,
  useAttrs,
  useId,
  watch,
} from "vue";
import {
  addDays,
  dayKey,
  localDate,
  monthStart,
  sameMonth,
} from "@minerva/core";
import styles from "@react-styles/components/MonthCalendar/monthCalendar.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { logicalArrowKey } from "../../internal/direction";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
} from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import type { MonthCalendarProps } from "./types";

defineOptions({ name: "MonthCalendar", inheritAttrs: false });

const props = withDefaults(defineProps<MonthCalendarProps>(), {
  month: undefined,
  defaultMonth: undefined,
  modelValue: undefined,
  defaultValue: undefined,
  events: () => NO_EVENTS,
  rangeStart: undefined,
  rangeEnd: undefined,
  size: "medium",
  disabled: false,
  showSelectedDayEvents: true,
  "aria-label": undefined,
  previousMonthLabel: undefined,
  nextMonthLabel: undefined,
  todayLabel: undefined,
  locale: undefined,
  weekdayLabels: undefined,
  getDayLabel: undefined,
  getEventsLabel: undefined,
  emptyEventsText: undefined,
});

const emit = defineEmits<{
  /** `v-model`: the selected day ("YYYY-MM-DD") */
  "update:modelValue": [day: string];
  /** The selected day ("YYYY-MM-DD") */
  change: [day: string];
  /** `v-model:month`: the first day of the requested month */
  "update:month": [month: Date];
  /** The first day of the requested month, at local midnight */
  monthChange: [month: Date];
  /** An event of the selected day was clicked (listening makes them buttons) */
  eventClick: [event: MonthCalendarEvent];
}>();

const attrs = useAttrs();
const instance = getCurrentInstance();
const { t, language } = useI18n();
const headingId = useId();
const root = shallowRef<HTMLElement | null>(null);

const month = useControllable<Date>(props, "month", {
  fallback: monthStart(props.defaultMonth ?? new Date()),
  onChange: (next) => emit("monthChange", next),
  name: "MonthCalendar",
});
const value = useControllable<string | undefined>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: undefined,
  onChange: (next) => {
    if (next !== undefined) emit("change", next);
  },
  name: "MonthCalendar",
});

const focusedKey = ref("");
let pendingFocus: string | null = null;

// `aria-label` is a declared prop: Vue stores it camelized
const ariaLabel = computed(
  () => (props as unknown as { ariaLabel?: string }).ariaLabel,
);
// (read while rendering: listeners are not reactive)
const eventsClickable = () => {
  const vnodeProps = instance?.vnode.props ?? {};
  return !!(vnodeProps.onEventClick || vnodeProps.onEventClickOnce);
};

const first = computed(() => monthStart(month.value));
const monthKey = computed(() => dayKey(first.value));
const days = computed(() => {
  const start = addDays(first.value, -((first.value.getDay() + 6) % 7));
  return Array.from({ length: 42 }, (_, index) => addDays(start, index));
});
const weeks = computed(() =>
  Array.from({ length: 6 }, (_, week) =>
    days.value.slice(week * 7, week * 7 + 7),
  ),
);
const counts = computed(() => {
  const result = new Map<string, number>();
  for (const event of props.events)
    result.set(event.date, (result.get(event.date) ?? 0) + 1);
  return result;
});
const selectedEvents = computed(() =>
  props.events.filter((event) => event.date === value.value),
);
// Highlighted range (display only): both ends, in either order.
const range = computed(() =>
  props.rangeStart &&
  props.rangeEnd &&
  DAY_KEY.test(props.rangeStart) &&
  DAY_KEY.test(props.rangeEnd)
    ? [props.rangeStart, props.rangeEnd].sort()
    : undefined,
);
const heading = computed(() =>
  new Intl.DateTimeFormat(props.locale ?? language.value, {
    year: "numeric",
    month: "long",
  }).format(first.value),
);

interface DayCell {
  date: Date;
  key: string;
  count: number;
  selected: boolean;
  outside: boolean;
  today: boolean;
  inRange: boolean;
  label: string;
  tabindex: number;
}

const cells = computed<DayCell[][]>(() => {
  const today = new Date();
  const todayKey = dayKey(today);
  const visibleKeys = days.value.map(dayKey);
  // Roving tab stop: the focused day, else the selection, today, the 1st.
  const activeKey = [
    focusedKey.value,
    value.value,
    sameMonth(today, month.value) ? todayKey : "",
    monthKey.value,
  ].find((key) => key && visibleKeys.includes(key));
  const r = range.value;
  return weeks.value.map((week) =>
    week.map((date) => {
      const key = dayKey(date);
      const count = counts.value.get(key) ?? 0;
      return {
        date,
        key,
        count,
        selected: value.value === key,
        outside: !sameMonth(date, month.value),
        today: key === todayKey,
        inRange: !!r && key >= r[0] && key <= r[1],
        label: props.getDayLabel
          ? props.getDayLabel(key, count)
          : count
            ? t("monthCalendar.dayWithEvents", { date: key, count })
            : key,
        tabindex: !props.disabled && key === activeKey ? 0 : -1,
      };
    }),
  );
});

// After keyboard navigation (possibly into another month), focus the day
// once its cell exists.
watch(
  [monthKey, focusedKey, () => props.disabled],
  () => {
    if (props.disabled || !pendingFocus) return;
    const cell = root.value?.querySelector<HTMLElement>(
      `[data-date="${pendingFocus}"]`,
    );
    if (cell) {
      pendingFocus = null;
      cell.focus();
    }
  },
  { flush: "post" },
);

const goToMonth = (date: Date) => {
  month.value = monthStart(date);
};

function select(date: Date) {
  if (props.disabled) return;
  value.value = dayKey(date);
  if (!sameMonth(date, month.value)) goToMonth(date);
}

function onKeydown(event: KeyboardEvent, date: Date) {
  if (props.disabled) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!event.repeat) select(date);
    return;
  }
  let target: Date;
  const weekday = (date.getDay() + 6) % 7;
  // RTL: the week runs right to left, so ArrowLeft is the next day.
  switch (logicalArrowKey(event.key, event.currentTarget as HTMLElement)) {
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
  pendingFocus = dayKey(target);
  focusedKey.value = dayKey(target);
  if (!sameMonth(target, month.value)) goToMonth(target);
}

const rootAttrs = computed(() => ({
  ...attrs,
  class: [styles.monthCalendar, styles[props.size], attrs.class],
  "aria-label": ariaLabel.value ?? t("monthCalendar.label"),
  ...hooks("month-calendar", "root", {
    disabled: props.disabled,
    size: props.size,
  }),
}));
</script>

<template>
  <section ref="root" v-bind="rootAttrs">
    <div :class="styles.toolbar">
      <h2
        :id="headingId"
        :class="styles.heading"
        aria-live="polite"
        v-bind="hooks('month-calendar', 'heading')"
      >
        {{ heading }}
      </h2>
      <div :class="styles.navigation">
        <button
          type="button"
          :class="[styles.navButton, styles.iconButton]"
          :aria-label="previousMonthLabel ?? t('monthCalendar.previousMonth')"
          :disabled="disabled"
          v-bind="hooks('month-calendar', 'nav-button')"
          @click="goToMonth(monthStart(month, -1))"
        >
          <IconChevronLeft aria-hidden="true" focusable="false" />
        </button>
        <button
          type="button"
          :class="styles.navButton"
          :disabled="disabled"
          v-bind="hooks('month-calendar', 'nav-button')"
          @click="goToMonth(new Date())"
        >
          <IconCalendar aria-hidden="true" focusable="false" />
          {{ todayLabel ?? t("monthCalendar.today") }}
        </button>
        <button
          type="button"
          :class="[styles.navButton, styles.iconButton]"
          :aria-label="nextMonthLabel ?? t('monthCalendar.nextMonth')"
          :disabled="disabled"
          v-bind="hooks('month-calendar', 'nav-button')"
          @click="goToMonth(monthStart(month, 1))"
        >
          <IconChevronRight aria-hidden="true" focusable="false" />
        </button>
      </div>
    </div>
    <div
      role="grid"
      :aria-labelledby="headingId"
      :aria-disabled="disabled || undefined"
      :class="styles.grid"
      v-bind="hooks('month-calendar', 'grid')"
    >
      <div role="row" :class="styles.week">
        <div
          v-for="(day, index) in WEEKDAYS"
          :key="day"
          role="columnheader"
          :class="styles.weekday"
        >
          {{ weekdayLabels?.[index] ?? t(`monthCalendar.weekdays.${day}`) }}
        </div>
      </div>
      <div
        v-for="(week, weekIndex) in cells"
        :key="weekIndex"
        role="row"
        :class="styles.week"
      >
        <div
          v-for="cell in week"
          :key="cell.key"
          role="gridcell"
          :class="[
            styles.day,
            cell.inRange && styles.inRange,
            cell.inRange && cell.key === range?.[0] && styles.rangeStart,
            cell.inRange && cell.key === range?.[1] && styles.rangeEnd,
          ]"
          v-bind="
            hooks('month-calendar', 'day', {
              selected: cell.selected,
              today: cell.today,
              outside: cell.outside,
              disabled,
            })
          "
          :data-date="cell.key"
          :aria-label="cell.label"
          :aria-selected="cell.selected"
          :aria-current="cell.today ? 'date' : undefined"
          :aria-disabled="disabled || undefined"
          :tabindex="cell.tabindex"
          @focus="focusedKey = cell.key"
          @click="select(cell.date)"
          @keydown="onKeydown($event, cell.date)"
        >
          <span :class="styles.dayNumber">{{ cell.date.getDate() }}</span>
          <span
            :class="[styles.count, cell.count > 0 && styles.hasEvents]"
            aria-hidden="true"
            >{{
              cell.count ? (cell.count > 99 ? "99+" : cell.count) : " "
            }}</span
          >
        </div>
      </div>
    </div>
    <section
      v-if="showSelectedDayEvents && value"
      :class="styles.events"
      v-bind="hooks('month-calendar', 'events')"
      :aria-label="
        getEventsLabel
          ? getEventsLabel(value)
          : t('monthCalendar.eventsLabel', { date: value })
      "
    >
      <h3 :class="styles.eventsHeading">{{ value }}</h3>
      <ul v-if="selectedEvents.length" :class="styles.eventList">
        <li
          v-for="event in selectedEvents"
          :key="event.id"
          :class="styles.eventItem"
        >
          <button
            v-if="eventsClickable()"
            type="button"
            :class="styles.eventButton"
            v-bind="hooks('month-calendar', 'event')"
            :disabled="disabled"
            @click="emit('eventClick', event)"
          >
            {{ event.title }}
          </button>
          <span v-else v-bind="hooks('month-calendar', 'event')">{{
            event.title
          }}</span>
        </li>
      </ul>
      <p v-else :class="styles.empty" v-bind="hooks('month-calendar', 'empty')">
        {{ emptyEventsText ?? t("monthCalendar.noEvents") }}
      </p>
    </section>
  </section>
</template>
