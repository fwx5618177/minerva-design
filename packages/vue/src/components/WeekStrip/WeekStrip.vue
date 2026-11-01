<script lang="ts">
import type { WeekStripMarker } from "./types";

const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;

const markerCount = (marker: WeekStripMarker | undefined) =>
  typeof marker === "number" && Number.isFinite(marker) && marker > 0
    ? Math.floor(marker)
    : 0;
</script>

<script setup lang="ts">
/**
 * WeekStrip: the seven days of a week in a row (a horizontal `listbox` of
 * day `option`s). Select a day by click, Enter or Space; today carries
 * `aria-current="date"`; days can show a count badge or a dot (`markers`).
 * Keyboard: a roving tab stop, ArrowLeft / ArrowRight move by a day (into
 * the previous / next week), Home / End jump to the ends of the week and
 * PageUp / PageDown move by a week. `showNavigation` adds previous / next
 * week buttons and the month of the week. The selected day is `v-model`,
 * the displayed week `v-model:week`.
 */
import { computed, ref, shallowRef, useAttrs, watch } from "vue";
import { addDays, dayKey, parseDayKey, weekStart } from "@minerva/core";
import styles from "@react-styles/components/WeekStrip/weekStrip.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { logicalArrowKey } from "../../internal/direction";
import { IconChevronLeft, IconChevronRight } from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import type { WeekStripProps } from "./types";

defineOptions({ name: "WeekStrip", inheritAttrs: false });

const props = withDefaults(defineProps<WeekStripProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  week: undefined,
  defaultWeek: undefined,
  firstDayOfWeek: 1,
  today: undefined,
  markers: undefined,
  getDayLabel: undefined,
  showNavigation: false,
  previousWeekLabel: undefined,
  nextWeekLabel: undefined,
  weekdayLabels: undefined,
  locale: undefined,
  disabled: false,
  size: "medium",
  "aria-label": undefined,
});

const emit = defineEmits<{
  /** `v-model`: the selected day ("YYYY-MM-DD") */
  "update:modelValue": [day: string];
  /** The selected day ("YYYY-MM-DD") */
  change: [day: string];
  /** `v-model:week`: the first day of the requested week */
  "update:week": [week: Date];
  /** The first day of the requested week, at local midnight */
  weekChange: [weekStart: Date];
}>();

const attrs = useAttrs();
const { t, language } = useI18n();
const root = shallowRef<HTMLElement | null>(null);

const todayKey = computed(() =>
  props.today && parseDayKey(props.today) ? props.today : dayKey(new Date()),
);
const value = useControllable<string | undefined>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: undefined,
  onChange: (next) => {
    if (next !== undefined) emit("change", next);
  },
  name: "WeekStrip",
});
const week = useControllable<Date>(props, "week", {
  fallback: weekStart(
    props.defaultWeek ??
      parseDayKey(props.modelValue ?? props.defaultValue ?? "") ??
      parseDayKey(todayKey.value) ??
      new Date(),
    props.firstDayOfWeek,
  ),
  onChange: (next) => emit("weekChange", next),
  name: "WeekStrip",
});

const focusedKey = ref("");
let pendingFocus: string | null = null;

// `aria-label` is a declared prop: Vue stores it camelized
const ariaLabel = computed(
  () => (props as unknown as { ariaLabel?: string }).ariaLabel,
);

const start = computed(() => weekStart(week.value, props.firstDayOfWeek));
const startKey = computed(() => dayKey(start.value));
const days = computed(() =>
  Array.from({ length: 7 }, (_, index) => addDays(start.value, index)),
);

const goToWeek = (date: Date) => {
  const next = weekStart(date, props.firstDayOfWeek);
  if (dayKey(next) !== startKey.value) week.value = next;
};

// An uncontrolled week follows the selected day (e.g. a v-model set from
// outside).
watch(value, (next) => {
  const date = next ? parseDayKey(next) : null;
  if (props.week === undefined && date) goToWeek(date);
});

const heading = computed(() => {
  const lang = props.locale ?? language.value;
  const first = start.value;
  const end = days.value[6]!;
  const monthFormat = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
  });
  if (first.getMonth() === end.getMonth()) return monthFormat.format(first);
  const from = new Intl.DateTimeFormat(lang, {
    month: "long",
    ...(first.getFullYear() !== end.getFullYear() && { year: "numeric" }),
  }).format(first);
  return `${from} – ${monthFormat.format(end)}`;
});

interface DayCell {
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

const cells = computed<DayCell[]>(() => {
  const keys = days.value.map(dayKey);
  // Roving tab stop: the focused day, else the selection, today, the 1st.
  const activeKey =
    [focusedKey.value, value.value, todayKey.value].find(
      (key) => key && keys.includes(key),
    ) ?? startKey.value;
  const longDate = new Intl.DateTimeFormat(props.locale ?? language.value, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return days.value.map((date) => {
    const key = dayKey(date);
    const marker = props.markers?.[key];
    const count = markerCount(marker);
    const index = (date.getDay() + 6) % 7;
    const text = longDate.format(date);
    const label = props.getDayLabel
      ? props.getDayLabel(key, marker)
      : count
        ? t("weekStrip.dayWithMarkers", { date: text, count })
        : marker === true
          ? t("weekStrip.dayMarked", { date: text })
          : text;
    return {
      date,
      key,
      count,
      dot: !count && marker === true,
      selected: value.value === key,
      today: key === todayKey.value,
      weekday:
        props.weekdayLabels?.[index] ??
        t(`monthCalendar.weekdays.${WEEKDAYS[index]}`),
      label,
      tabindex: !props.disabled && key === activeKey ? 0 : -1,
    };
  });
});

// After keyboard navigation (possibly into another week), focus the day
// once its cell exists.
watch(
  [startKey, focusedKey, () => props.disabled],
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

function select(date: Date) {
  if (props.disabled) return;
  value.value = dayKey(date);
  goToWeek(date);
}

function onKeydown(event: KeyboardEvent, date: Date) {
  if (props.disabled) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!event.repeat) select(date);
    return;
  }
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
      target = start.value;
      break;
    case "End":
      target = addDays(start.value, 6);
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
  pendingFocus = dayKey(target);
  focusedKey.value = dayKey(target);
  goToWeek(target);
}

const rootAttrs = computed(() => ({
  ...attrs,
  class: [styles.weekStrip, styles[props.size], attrs.class],
  ...hooks("week-strip", "root", {
    disabled: props.disabled,
    size: props.size,
  }),
}));
const listLabel = computed(() => ariaLabel.value ?? t("weekStrip.label"));
</script>

<template>
  <div ref="root" v-bind="rootAttrs">
    <div v-if="showNavigation" :class="styles.toolbar">
      <button
        type="button"
        :class="styles.navButton"
        :aria-label="previousWeekLabel ?? t('weekStrip.previousWeek')"
        :disabled="disabled"
        v-bind="hooks('week-strip', 'nav-button')"
        @click="goToWeek(addDays(start, -7))"
      >
        <IconChevronLeft aria-hidden="true" focusable="false" />
      </button>
      <span
        :class="styles.heading"
        aria-live="polite"
        v-bind="hooks('week-strip', 'heading')"
        >{{ heading }}</span
      >
      <button
        type="button"
        :class="styles.navButton"
        :aria-label="nextWeekLabel ?? t('weekStrip.nextWeek')"
        :disabled="disabled"
        v-bind="hooks('week-strip', 'nav-button')"
        @click="goToWeek(addDays(start, 7))"
      >
        <IconChevronRight aria-hidden="true" focusable="false" />
      </button>
    </div>
    <div
      role="listbox"
      :aria-label="listLabel"
      aria-orientation="horizontal"
      :aria-disabled="disabled || undefined"
      :class="styles.days"
      v-bind="hooks('week-strip', 'list')"
    >
      <div
        v-for="cell in cells"
        :key="cell.key"
        role="option"
        :class="styles.day"
        v-bind="
          hooks('week-strip', 'day', {
            selected: cell.selected,
            today: cell.today,
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
        <span :class="styles.weekday" aria-hidden="true">{{
          cell.weekday
        }}</span>
        <span :class="styles.dayNumber" aria-hidden="true">{{
          cell.date.getDate()
        }}</span>
        <span
          :class="[
            styles.marker,
            cell.count > 0 && styles.count,
            cell.dot && styles.dot,
          ]"
          v-bind="hooks('week-strip', 'indicator')"
          aria-hidden="true"
          >{{ cell.count ? (cell.count > 99 ? "99+" : cell.count) : "" }}</span
        >
      </div>
    </div>
  </div>
</template>
