<script setup lang="ts">
/**
 * TimePickerPanel: the hour / minute / second (/ AM-PM) columns of a
 * TimePicker. Each column is a listbox: Up/Down/Home/End move, Enter/Space
 * pick, Left/Right switch column.
 */
import { computed, onMounted, ref, watch } from "vue";
import styles from "@react-styles/components/TimePicker/timePickerPanel.module.scss";
import { useI18n } from "../../config/useI18n";
import { logicalArrowKey } from "../../internal/direction";
import { hooks } from "../../internal/hooks";
import type {
  TimePickerPanelEmits,
  TimePickerPanelProps,
  TimeUnit,
  TimeUnitKind,
} from "./types";

defineOptions({ name: "TimePickerPanel" });

const props = withDefaults(defineProps<TimePickerPanelProps>(), {
  value: undefined,
  hasValue: true,
  format: undefined,
  use12Hours: false,
  showSecond: false,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  minTime: undefined,
  maxTime: undefined,
  focusOnOpen: false,
});
const emit = defineEmits<TimePickerPanelEmits>();

const { t } = useI18n();
const panelRef = ref<HTMLDivElement | null>(null);

const units = (
  count: number,
  step: number,
  start: number,
  isDisabled: (value: number) => boolean,
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

interface Column {
  kind: TimeUnitKind;
  label: string;
  items: TimeUnit[];
  selected: number;
  toValue: (v: number) => number;
  tabStop: number | undefined;
}

const columns = computed<Column[]>(() => {
  const { use12Hours, minTime, maxTime } = props;
  const value = props.value ?? new Date(0);
  const hour = value.getHours();
  const minute = value.getMinutes();
  const second = value.getSeconds();
  const isPM = hour >= 12;
  const toHour24 = (h: number) => (use12Hours ? (h % 12) + (isPM ? 12 : 0) : h);
  const identity = (v: number) => v;

  const hours = units(
    use12Hours ? 12 : 24,
    props.hourStep,
    use12Hours ? 1 : 0,
    (h) => {
      const h24 = toHour24(h);
      return Boolean(
        (minTime && h24 < minTime.getHours()) ||
        (maxTime && h24 > maxTime.getHours()),
      );
    },
  );
  const minutes = units(60, props.minuteStep, 0, (m) =>
    Boolean(
      (minTime && hour === minTime.getHours() && m < minTime.getMinutes()) ||
      (maxTime && hour === maxTime.getHours() && m > maxTime.getMinutes()),
    ),
  );
  const seconds = units(60, props.secondStep, 0, (s) => {
    const atMin =
      minTime && hour === minTime.getHours() && minute === minTime.getMinutes();
    const atMax =
      maxTime && hour === maxTime.getHours() && minute === maxTime.getMinutes();
    return Boolean(
      (atMin && s < minTime.getSeconds()) ||
      (atMax && s > maxTime.getSeconds()),
    );
  });
  const periods: TimeUnit[] = [
    { value: 0, label: "AM", disabled: false },
    { value: 1, label: "PM", disabled: false },
  ];

  const list: Array<Omit<Column, "tabStop">> = [
    {
      kind: "hour",
      label: t("timePicker.hours"),
      items: hours,
      selected: use12Hours ? hour % 12 || 12 : hour,
      toValue: toHour24,
    },
    {
      kind: "minute",
      label: t("timePicker.minutes"),
      items: minutes,
      selected: minute,
      toValue: identity,
    },
  ];
  if (props.showSecond) {
    list.push({
      kind: "second",
      label: t("timePicker.seconds"),
      items: seconds,
      selected: second,
      toValue: identity,
    });
  }
  if (use12Hours) {
    list.push({
      kind: "ampm",
      label: t("timePicker.period"),
      items: periods,
      selected: isPM ? 1 : 0,
      toValue: identity,
    });
  }
  return list.map((column) => ({
    ...column,
    // Roving tab stop: the selected unit, else the first enabled one
    tabStop: column.items.some(
      (u) => u.value === column.selected && !u.disabled,
    )
      ? column.selected
      : column.items.find((u) => !u.disabled)?.value,
  }));
});

const focusFirstColumn = () => {
  panelRef.value
    ?.querySelector<HTMLElement>('[role="option"][tabindex="0"]')
    ?.focus();
};

// Scroll the selected units into view when the panel opens
const scrollSelected = () => {
  panelRef.value
    ?.querySelectorAll<HTMLElement>('[aria-selected="true"]')
    .forEach((el) => el.scrollIntoView?.({ block: "nearest" }));
};

// Opened from the keyboard: the portalled panel is not in the input's Tab
// sequence, so focus moves to the first column's tab stop (APG combobox
// with a dialog popup: ArrowDown opens it and moves focus into it).
const onVisible = () => {
  if (!props.visible) return;
  scrollSelected();
  if (props.focusOnOpen) focusFirstColumn();
};
onMounted(onVisible);
watch(
  () => [props.visible, props.focusOnOpen],
  ([visible], [wasVisible]) => {
    if (visible !== wasVisible) scrollSelected();
    if (props.visible && props.focusOnOpen) focusFirstColumn();
  },
  { flush: "post" },
);

function handleKeyDown(event: KeyboardEvent, columnIndex: number) {
  const column = event.currentTarget as HTMLElement;
  const target = event.target as HTMLElement;
  const enabled = Array.from(
    column.querySelectorAll<HTMLElement>('[role="option"]'),
  ).filter((o) => o.getAttribute("aria-disabled") !== "true");
  const index = enabled.indexOf(target);
  const count = columns.value.length;
  const focusColumn = (i: number) => {
    panelRef.value
      ?.querySelectorAll<HTMLElement>('[role="listbox"]')
      [i]?.querySelector<HTMLElement>('[tabindex="0"]')
      ?.focus();
  };
  // RTL: columns are laid out right to left, so ArrowLeft is the next one.
  switch (logicalArrowKey(event.key, column)) {
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

function pick(column: Column, unit: TimeUnit) {
  if (!unit.disabled)
    emit("timeChange", column.kind, column.toValue(unit.value));
}

function onOptionKeyDown(event: KeyboardEvent, column: Column, unit: TimeUnit) {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    pick(column, unit);
  }
}

const isSelected = (column: Column, unit: TimeUnit) =>
  props.hasValue && unit.value === column.selected;
</script>

<template>
  <div ref="panelRef" :class="styles.timePickerPanel">
    <div :class="styles.timeColumns">
      <!-- Roving tabindex lives on the options; the listbox is only a
           programmatic focus target. -->
      <div
        v-for="(column, columnIndex) in columns"
        :key="column.kind"
        :class="styles.timeColumn"
        v-bind="hooks('time-picker', 'column')"
        role="listbox"
        :aria-label="column.label"
        tabindex="-1"
        @keydown="handleKeyDown($event, columnIndex)"
      >
        <div
          v-for="unit in column.items"
          :key="unit.value"
          v-bind="
            hooks('time-picker', 'item', {
              selected: isSelected(column, unit),
              disabled: unit.disabled,
            })
          "
          role="option"
          :aria-selected="isSelected(column, unit)"
          :aria-disabled="unit.disabled || undefined"
          :tabindex="unit.value === column.tabStop ? 0 : -1"
          :class="[
            styles.timeUnit,
            isSelected(column, unit) && styles.selected,
            unit.disabled && styles.disabled,
          ]"
          @click="pick(column, unit)"
          @keydown="onOptionKeyDown($event, column, unit)"
        >
          {{ unit.label }}
        </div>
      </div>
    </div>
  </div>
</template>
