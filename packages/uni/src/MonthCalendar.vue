<script setup lang="ts">
import { computed, ref } from "vue";
import {
  localDate,
  monthStart,
  dayKey,
  addDays,
  sameMonth,
} from "@minerva/core";
import { useI18n } from "./i18n";
interface CalendarEvent {
  id: string;
  date: string;
  title: string;
}
const props = withDefaults(
  defineProps<{
    month?: Date | string;
    defaultMonth?: Date | string;
    value?: string;
    modelValue?: string;
    defaultValue?: string;
    events?: readonly CalendarEvent[];
    rangeStart?: string;
    rangeEnd?: string;
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    showSelectedDayEvents?: boolean;
    locale?: string;
    weekdayLabels?: readonly string[];
    previousMonthLabel?: string;
    nextMonthLabel?: string;
    todayLabel?: string;
    getDayLabel?: (day: string, count: number) => string;
    getEventsLabel?: (day: string) => string;
    emptyEventsText?: string;
    min?: string;
    max?: string;
    weekStartsOn?: number;
    disabledDates?: readonly string[] | ((day: string) => boolean);
    ariaLabel?: string;
  }>(),
  {
    events: () => [],
    size: "medium",
    showSelectedDayEvents: true,
    weekStartsOn: 1,
  },
);
const emit = defineEmits<{
  change: [day: string];
  "update:modelValue": [day: string];
  monthChange: [date: Date];
  "update:month": [date: Date];
  eventClick: [event: CalendarEvent];
}>();
const { t, language, dir } = useI18n();
function dateOf(value: Date | string | undefined) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "string") {
    const [y, m, d = 1] = value.split("-").map(Number);
    if (y && m) return localDate(y, m - 1, d);
  }
  return new Date();
}
const localMonth = ref(monthStart(dateOf(props.defaultMonth ?? props.value)));
const month = computed(() =>
  monthStart(
    props.month === undefined ? localMonth.value : dateOf(props.month),
  ),
);
const localValue = ref(props.defaultValue ?? "");
const selected = computed(
  () => props.modelValue ?? props.value ?? localValue.value,
);
const focused = ref("");
const firstWeekday = computed(() => ((props.weekStartsOn % 7) + 7) % 7);
const days = computed(() => {
  const first = month.value;
  const start = addDays(
    first,
    -((first.getDay() - firstWeekday.value + 7) % 7),
  );
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
});
const visible = computed(() => days.value.map(dayKey));
const active = computed(() =>
  [
    focused.value,
    selected.value,
    sameMonth(new Date(), month.value) ? dayKey(new Date()) : "",
    dayKey(month.value),
  ].find((key) => key && visible.value.includes(key)),
);
const locale = computed(() => props.locale ?? language.value);
const heading = computed(() => {
  try {
    return new Intl.DateTimeFormat(locale.value, {
      month: "long",
      year: "numeric",
    }).format(month.value);
  } catch {
    return dayKey(month.value).slice(0, 7);
  }
});
const weekdays = computed(
  () =>
    props.weekdayLabels ??
    Array.from({ length: 7 }, (_, i) => {
      const date = localDate(2023, 0, 1 + ((firstWeekday.value + i) % 7));
      try {
        return new Intl.DateTimeFormat(locale.value, {
          weekday: "short",
        }).format(date);
      } catch {
        return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
          (firstWeekday.value + i) % 7
        ];
      }
    }),
);
const counts = computed(() => {
  const result = new Map<string, number>();
  for (const e of props.events)
    result.set(e.date, (result.get(e.date) ?? 0) + 1);
  return result;
});
const selectedEvents = computed(() =>
  props.events.filter((e) => e.date === selected.value),
);
const range = computed(() =>
  props.rangeStart && props.rangeEnd
    ? [props.rangeStart, props.rangeEnd].sort()
    : undefined,
);
function inRange(day: string) {
  return !!range.value && day >= range.value[0] && day <= range.value[1];
}
function blocked(day: string) {
  return (
    props.disabled ||
    (!!props.min && day < props.min) ||
    (!!props.max && day > props.max) ||
    (typeof props.disabledDates === "function"
      ? props.disabledDates(day)
      : props.disabledDates?.includes(day)) ||
    false
  );
}
function goTo(date: Date) {
  if (props.disabled) return;
  const next = monthStart(date);
  if (props.month === undefined) localMonth.value = next;
  emit("monthChange", next);
  emit("update:month", next);
}
function choose(date: Date) {
  const day = dayKey(date);
  if (blocked(day)) return;
  const changed = day !== selected.value;
  if (props.value === undefined && props.modelValue === undefined)
    localValue.value = day;
  if (changed) {
    emit("change", day);
    emit("update:modelValue", day);
  }
  if (!sameMonth(date, month.value)) goTo(date);
}
function keydown(event: KeyboardEvent, date: Date) {
  if (props.disabled || event.isComposing) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!event.repeat) choose(date);
    return;
  }
  const delta = dir.value === "rtl" ? -1 : 1;
  let target: Date;
  const weekday = (date.getDay() - firstWeekday.value + 7) % 7;
  switch (event.key) {
    case "ArrowLeft":
      target = addDays(date, -delta);
      break;
    case "ArrowRight":
      target = addDays(date, delta);
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
      const next = monthStart(
        date,
        (event.key === "PageUp" ? -1 : 1) * (event.shiftKey ? 12 : 1),
      );
      target = localDate(
        next.getFullYear(),
        next.getMonth(),
        Math.min(date.getDate(), addDays(monthStart(next, 1), -1).getDate()),
      );
      break;
    }
    default:
      return;
  }
  event.preventDefault();
  focused.value = dayKey(target);
  if (!sameMonth(target, month.value)) goTo(target);
}
function eventClick(event: CalendarEvent) {
  if (!props.disabled) emit("eventClick", event);
}
</script>
<template>
  <view
    class="mn-calendar mn-uni-calendar"
    :class="`mn-calendar-${size}`"
    :aria-label="props.ariaLabel ?? t('monthCalendar.label')"
  >
    <view class="mn-row"
      ><button
        class="mn-close"
        :disabled="disabled"
        :aria-label="previousMonthLabel ?? t('monthCalendar.previousMonth')"
        @tap="goTo(monthStart(month, -1))"
      >
        ‹</button
      ><text :data-month="dayKey(month).slice(0, 7)">{{ heading }}</text
      ><button
        class="mn-close"
        :disabled="disabled"
        :aria-label="nextMonthLabel ?? t('monthCalendar.nextMonth')"
        @tap="goTo(monthStart(month, 1))"
      >
        ›</button
      ><button
        class="mn-button mn-variant-ghost"
        :disabled="disabled"
        @tap="goTo(new Date())"
      >
        {{ todayLabel ?? t("monthCalendar.today") }}
      </button></view
    >
    <view class="mn-calendar-grid" role="grid">
      <text
        v-for="(weekday, index) in weekdays"
        :key="index"
        role="columnheader"
        >{{ weekday }}</text
      >
      <button
        v-for="day in days"
        :key="dayKey(day)"
        class="mn-calendar-day"
        role="gridcell"
        :data-day="dayKey(day)"
        :data-in-range="inRange(dayKey(day)) || undefined"
        :class="{
          'mn-calendar-in-range': inRange(dayKey(day)),
          'mn-active': selected === dayKey(day),
          'mn-calendar-outside': !sameMonth(day, month),
        }"
        :disabled="blocked(dayKey(day))"
        :aria-selected="selected === dayKey(day)"
        :aria-label="
          getDayLabel?.(dayKey(day), counts.get(dayKey(day)) ?? 0) ??
          t('monthCalendar.dayWithEvents', {
            date: dayKey(day),
            count: counts.get(dayKey(day)) ?? 0,
          })
        "
        :tabindex="dayKey(day) === active ? 0 : -1"
        @tap="choose(day)"
        @keydown="keydown($event, day)"
      >
        <slot
          name="day"
          :date="day"
          :day="dayKey(day)"
          :selected="selected === dayKey(day)"
          :count="counts.get(dayKey(day)) ?? 0"
          ><text>{{ day.getDate() }}</text
          ><text v-if="counts.get(dayKey(day))" class="mn-calendar-count">{{
            size === "small" ? "•" : counts.get(dayKey(day))
          }}</text></slot
        >
      </button>
    </view>
    <view
      v-if="showSelectedDayEvents && selected"
      :aria-label="
        getEventsLabel?.(selected) ??
        t('monthCalendar.eventsLabel', { date: selected })
      "
      ><text v-if="!selectedEvents.length">{{
        emptyEventsText ?? t("monthCalendar.noEvents")
      }}</text
      ><button
        v-for="event in selectedEvents"
        :key="event.id"
        :data-event-id="event.id"
        class="mn-option"
        :disabled="disabled"
        @tap="eventClick(event)"
      >
        <slot name="event" :event="event">{{ event.title }}</slot>
      </button></view
    >
  </view>
</template>
