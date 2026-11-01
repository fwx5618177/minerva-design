<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { addDays, dayKey, parseDayKey, weekStart } from "@minerva/core";
import { useI18n } from "./i18n";
type WeekStripMarker = number | boolean;
const WEEKDAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const props = withDefaults(
  defineProps<{
    value?: string;
    modelValue?: string;
    defaultValue?: string;
    week?: Date | string;
    defaultWeek?: Date | string;
    firstDayOfWeek?: number;
    today?: string;
    markers?: Readonly<Record<string, WeekStripMarker>>;
    getDayLabel?: (day: string, marker: WeekStripMarker | undefined) => string;
    showNavigation?: boolean;
    previousWeekLabel?: string;
    nextWeekLabel?: string;
    weekdayLabels?: readonly string[];
    locale?: string;
    disabled?: boolean;
    size?: "small" | "medium" | "large";
    ariaLabel?: string;
  }>(),
  { firstDayOfWeek: 1, showNavigation: false, size: "medium" },
);
const emit = defineEmits<{
  change: [day: string];
  "update:modelValue": [day: string];
  weekChange: [weekStart: Date];
  "update:week": [weekStart: Date];
}>();
const { t, language, dir } = useI18n();
function dateOf(value: Date | string | undefined) {
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  return typeof value === "string" ? parseDayKey(value) : null;
}
const todayKey = computed(() =>
  props.today && parseDayKey(props.today) ? props.today : dayKey(new Date()),
);
const localValue = ref(props.defaultValue ?? "");
const selected = computed(
  () => props.modelValue ?? props.value ?? localValue.value,
);
const firstDay = computed(() => ((props.firstDayOfWeek % 7) + 7) % 7);
const localWeek = ref(
  weekStart(
    dateOf(props.defaultWeek) ??
      parseDayKey(selected.value) ??
      parseDayKey(todayKey.value) ??
      new Date(),
    firstDay.value,
  ),
);
const start = computed(() =>
  weekStart(dateOf(props.week) ?? localWeek.value, firstDay.value),
);
const days = computed(() =>
  Array.from({ length: 7 }, (_, i) => addDays(start.value, i)),
);
const focused = ref("");
const active = computed(() => {
  const keys = days.value.map(dayKey);
  return (
    [focused.value, selected.value, todayKey.value].find(
      (key) => key && keys.includes(key),
    ) ?? keys[0]
  );
});
const locale = computed(() => props.locale ?? language.value);
function format(date: Date, options: Intl.DateTimeFormatOptions) {
  try {
    return new Intl.DateTimeFormat(locale.value, options).format(date);
  } catch {
    return dayKey(date);
  }
}
const heading = computed(() => {
  const end = days.value[6]!;
  const month = (date: Date) =>
    format(date, { year: "numeric", month: "long" });
  return start.value.getMonth() === end.getMonth()
    ? month(start.value)
    : `${month(start.value)} – ${month(end)}`;
});
const cells = computed(() =>
  days.value.map((date) => {
    const key = dayKey(date);
    const marker = props.markers?.[key];
    const count =
      typeof marker === "number" && Number.isFinite(marker) && marker > 0
        ? Math.floor(marker)
        : 0;
    const index = (date.getDay() + 6) % 7;
    const long = format(date, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return {
      date,
      key,
      count,
      dot: !count && marker === true,
      selected: selected.value === key,
      today: key === todayKey.value,
      weekday:
        props.weekdayLabels?.[index] ??
        t(`monthCalendar.weekdays.${WEEKDAYS[index]}`),
      label:
        props.getDayLabel?.(key, marker) ??
        (count
          ? t("weekStrip.dayWithMarkers", { date: long, count })
          : marker === true
            ? t("weekStrip.dayMarked", { date: long })
            : long),
    };
  }),
);
function goTo(date: Date) {
  const next = weekStart(date, firstDay.value);
  if (dayKey(next) === dayKey(start.value)) return;
  if (props.week === undefined) localWeek.value = next;
  emit("weekChange", next);
  emit("update:week", next);
}
// An uncontrolled week follows the selected day.
watch(selected, (next) => {
  const date = parseDayKey(next);
  if (props.week === undefined && date) goTo(date);
});
function choose(date: Date) {
  if (props.disabled) return;
  const key = dayKey(date);
  if (key !== selected.value) {
    if (props.value === undefined && props.modelValue === undefined)
      localValue.value = key;
    emit("change", key);
    emit("update:modelValue", key);
  }
  goTo(date);
}
function shift(offset: number) {
  if (!props.disabled) goTo(addDays(start.value, offset));
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
  switch (event.key) {
    case "ArrowLeft":
      target = addDays(date, -delta);
      break;
    case "ArrowRight":
      target = addDays(date, delta);
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
  focused.value = dayKey(target);
  goTo(target);
}
</script>
<template>
  <view class="mn-week-strip" :class="`mn-size-${size}`">
    <view v-if="showNavigation" class="mn-week-strip__toolbar"
      ><button
        class="mn-close"
        :disabled="disabled"
        :aria-label="previousWeekLabel ?? t('weekStrip.previousWeek')"
        @tap="shift(-7)"
      >
        ‹</button
      ><text class="mn-week-strip__title" aria-live="polite">{{ heading }}</text
      ><button
        class="mn-close"
        :disabled="disabled"
        :aria-label="nextWeekLabel ?? t('weekStrip.nextWeek')"
        @tap="shift(7)"
      >
        ›
      </button></view
    >
    <view
      class="mn-week-strip__days"
      role="listbox"
      aria-orientation="horizontal"
      :aria-label="ariaLabel ?? t('weekStrip.label')"
      :aria-disabled="disabled || undefined"
    >
      <view
        v-for="cell in cells"
        :key="cell.key"
        class="mn-week-strip__day"
        :class="{
          'mn-selected': cell.selected,
          'mn-today': cell.today,
          'mn-disabled': disabled,
        }"
        role="option"
        :data-day="cell.key"
        :aria-selected="cell.selected"
        :aria-current="cell.today ? 'date' : undefined"
        :aria-disabled="disabled || undefined"
        :aria-label="cell.label"
        :tabindex="!disabled && cell.key === active ? 0 : -1"
        @tap="choose(cell.date)"
        @keydown="keydown($event, cell.date)"
        ><text class="mn-week-strip__weekday" aria-hidden="true">{{
          cell.weekday
        }}</text
        ><text class="mn-week-strip__number" aria-hidden="true">{{
          cell.date.getDate()
        }}</text
        ><text
          class="mn-week-strip__marker"
          :class="{ 'mn-has-count': cell.count > 0, 'mn-has-dot': cell.dot }"
          aria-hidden="true"
          >{{ cell.count ? (cell.count > 99 ? "99+" : cell.count) : "" }}</text
        ></view
      >
    </view>
  </view>
</template>
