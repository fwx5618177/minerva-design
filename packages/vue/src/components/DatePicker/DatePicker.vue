<script setup lang="ts">
/** A date input with an accessible popup calendar; values use YYYY-MM-DD. */
import {
  computed,
  nextTick,
  onMounted,
  provide,
  ref,
  shallowRef,
  unref,
  useId,
} from "vue";
import {
  addDays,
  dayKey,
  localDate,
  monthStart,
  parseDayKey,
  sameMonth,
} from "@minerva/core";
import styles from "@react-styles/components/DatePicker/datePicker.module.scss";
import iconButtonStyles from "@react-styles/components/IconButton/iconButton.module.scss";
import { hooks } from "../../internal/hooks";
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
  IconX,
} from "../../internal/icons";
import { useControllable } from "../../internal/controllable";
import FloatingPanel from "../../internal/FloatingPanel.vue";
import { useLayerParent } from "../../internal/scope";
import {
  FORM_CONTROL_KEY,
  useFormControlContext,
  useFormControlProps,
} from "../../internal/form-control";
import { useI18n } from "../../config/useI18n";
import { Input } from "../Input";
import { logicalArrowKey } from "../../internal/direction";
import { adjacentTabbable, tabLeavesPanel } from "../TimePicker/tabbing";
import type { DatePickerEmits, DatePickerProps } from "./types";

defineOptions({ name: "DatePicker", inheritAttrs: false });

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  placeholder: undefined,
  label: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  id: undefined,
  required: undefined,
  readOnly: undefined,
  invalid: undefined,
  name: "date-picker",
  disabled: undefined,
  clearable: true,
  size: "medium",
  minDate: undefined,
  maxDate: undefined,
  locale: undefined,
});
const emit = defineEmits<DatePickerEmits>();

const { t, language } = useI18n();
const fc = useFormControlContext();
// The field state is resolved here (explicit props win over the
// FormControl), so the inner Input must not merge it again.
provide(FORM_CONTROL_KEY, null as never);
const fieldProps = useFormControlProps(() => ({
  id: props.id,
  "aria-describedby": props.ariaDescribedby,
}));

const disabled = computed(() => props.disabled ?? fc?.disabled.value ?? false);
const readOnly = computed(() => props.readOnly ?? fc?.readOnly.value ?? false);
const required = computed(() => props.required ?? fc?.required.value ?? false);
const invalid = computed(() => props.invalid ?? fc?.invalid.value ?? false);
const accessibleName = computed(
  () => props.label ?? props.ariaLabel ?? t("datePicker.label"),
);
// A FormLabel names the input unless `label` / `aria-label` is given; the
// aria-label stays as fallback (aria-labelledby wins when its target
// exists, and is ignored when it does not).
const labelledBy = computed(
  () =>
    props.ariaLabelledby ??
    (fc && !props.label && !props.ariaLabel ? fc.labelId.value : undefined),
);

const current = useControllable<string | null>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: "",
  name: "DatePicker",
});
const open = ref(false);
const setOpen = (next: boolean) => {
  if (next === open.value) return;
  open.value = next;
  emit("openChange", next);
};
const panelOpen = computed(
  () => open.value && !disabled.value && !readOnly.value,
);

// Text being typed; `null` = show the formatted value
const draft = ref<string | null>(null);
const field = ref<HTMLDivElement | null>(null);
const input = shallowRef<HTMLInputElement | null>(null);
const floating = ref<InstanceType<typeof FloatingPanel> | null>(null);
// Tab moves on within the enclosing layer (e.g. a Modal), else the page.
const tabContainer = useLayerParent();

onMounted(() => {
  input.value = field.value?.querySelector("input") ?? null;
});

const headingId = useId();
const month = ref(monthStart(parseDayKey(current.value ?? "") ?? new Date()));
const focusedKey = ref("");
const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
const todayKey = dayKey(new Date());
const heading = computed(() =>
  new Intl.DateTimeFormat(props.locale ?? language.value, {
    year: "numeric",
    month: "long",
  }).format(month.value),
);
const days = computed(() => {
  const first = monthStart(month.value);
  const start = addDays(first, -((first.getDay() + 6) % 7));
  return Array.from({ length: 42 }, (_, i) => addDays(start, i));
});
const weeks = computed(() =>
  Array.from({ length: 6 }, (_, i) => days.value.slice(i * 7, i * 7 + 7)),
);
const isDayDisabled = (key: string) =>
  !!(
    (props.minDate && key < props.minDate) ||
    (props.maxDate && key > props.maxDate)
  );
const activeKey = computed(() => {
  const keys = days.value.map(dayKey);
  return [
    focusedKey.value,
    current.value,
    todayKey,
    dayKey(month.value),
    ...keys,
  ].find((key) => key && keys.includes(key) && !isDayDisabled(key));
});
function commit(next: string) {
  current.value = next;
  emit("change", next);
}
function syncMonth() {
  const date = parseDayKey(current.value ?? "");
  if (date) month.value = monthStart(date);
}
function handleInputChange(value: string | number) {
  if (disabled.value || readOnly.value) return;
  const text = String(value);
  draft.value = text;
  if (text === "") {
    commit("");
    return;
  }
  const date = parseDayKey(text, true);
  if (date && !isDayDisabled(dayKey(date))) {
    commit(dayKey(date));
    month.value = monthStart(date);
  }
}
function handleInputBlur() {
  if (draft.value === null) return;
  const text = draft.value.trim();
  if (!disabled.value && !readOnly.value) {
    if (!text) {
      if (current.value) commit("");
    } else {
      const date = parseDayKey(text, false);
      if (
        date &&
        !isDayDisabled(dayKey(date)) &&
        dayKey(date) !== current.value
      ) {
        commit(dayKey(date));
        month.value = monthStart(date);
      }
    }
  }
  draft.value = null;
}
function handleClear() {
  if (disabled.value || readOnly.value) return;
  draft.value = null;
  commit("");
  input.value?.focus();
}
function selectDate(date: Date) {
  if (disabled.value || readOnly.value || isDayDisabled(dayKey(date))) return;
  draft.value = null;
  commit(dayKey(date));
  month.value = monthStart(date);
  setOpen(false);
  input.value?.focus();
}
function toggle() {
  if (disabled.value || readOnly.value) return;
  if (!open.value) syncMonth();
  setOpen(!open.value);
}
async function focusDay(key?: string) {
  await nextTick();
  const panel = unref(floating.value?.element);
  (key
    ? panel?.querySelector<HTMLElement>(`[data-date="${key}"]`)
    : panel?.querySelector<HTMLElement>('[role="gridcell"][tabindex="0"]')
  )?.focus();
}
function handleDayKeyDown(event: KeyboardEvent, date: Date) {
  if (disabled.value || readOnly.value) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    if (!event.repeat) selectDate(date);
    return;
  }
  let target: Date;
  const weekday = (date.getDay() + 6) % 7;
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
  focusedKey.value = dayKey(target);
  if (!sameMonth(target, month.value)) month.value = monthStart(target);
  void focusDay(dayKey(target));
}

// Clicking the input toggles the panel. The handler only reacts to clicks
// on the inner <input>, which has its own keyboard support (ArrowDown opens
// the panel; Escape closes it), so the wrapper is not a control.
function handleRootClick(event: MouseEvent) {
  if (input.value && event.target === input.value) toggle();
}

function handleInputKeyDown(event: KeyboardEvent) {
  if (event.key !== "ArrowDown" || disabled.value || readOnly.value) return;
  event.preventDefault();
  if (!open.value) {
    syncMonth();
    focusedKey.value = current.value ?? "";
    setOpen(true);
  }
  void focusDay();
}

// The portalled panel sits after the input in the Tab order: Tab past its
// last control continues after the input (its clear button, then the rest of
// the page); Shift+Tab before its first control returns to the input.
function handlePanelKeyDown(event: KeyboardEvent) {
  const panel = event.currentTarget as HTMLElement;
  const el = input.value;
  if (
    !el ||
    event.key !== "Tab" ||
    event.altKey ||
    event.ctrlKey ||
    event.metaKey ||
    !tabLeavesPanel(panel, event.target as Element, event.shiftKey)
  )
    return;
  event.preventDefault();
  const next = event.shiftKey
    ? el
    : (adjacentTabbable(
        el,
        tabContainer?.value ?? el.ownerDocument.body,
        false,
      ) ?? el);
  next.focus();
  setOpen(false);
}

const displayValue = computed(() => draft.value ?? current.value ?? "");
const showClear = computed(
  () =>
    props.clearable && !!current.value && !disabled.value && !readOnly.value,
);

defineExpose({
  /** The native `<input>` (the React `ref`) */
  input,
  focus: () => input.value?.focus(),
  blur: () => input.value?.blur(),
});
</script>

<template>
  <div
    ref="field"
    :class="styles.datePicker"
    v-bind="{
      ...$attrs,
      ...hooks('date-picker', 'root', {
        state: panelOpen ? 'open' : 'closed',
        disabled,
        readonly: readOnly,
        invalid,
        size,
      }),
    }"
    @click="handleRootClick"
  >
    <Input
      :model-value="displayValue"
      :placeholder="placeholder ?? t('datePicker.placeholder')"
      :id="fieldProps.id"
      :aria-label="accessibleName"
      :aria-labelledby="labelledBy"
      :aria-describedby="fieldProps['aria-describedby']"
      :aria-invalid="invalid || undefined"
      :aria-readonly="readOnly || undefined"
      :required="required"
      :read-only="readOnly"
      :name="name"
      :disabled="disabled"
      :size="size"
      @update:model-value="handleInputChange"
      @blur="handleInputBlur"
      @keydown="handleInputKeyDown"
    >
      <template #suffix>
        <button
          v-if="showClear"
          type="button"
          :class="[
            iconButtonStyles.iconButton,
            iconButtonStyles.neutral,
            iconButtonStyles['variant-ghost'],
            iconButtonStyles.small,
            iconButtonStyles.circle,
            styles.clearButton,
          ]"
          tabindex="0"
          :aria-label="t('datePicker.clear')"
          v-bind="
            hooks('icon-button', 'root', {
              state: 'inactive',
              disabled: false,
              loading: false,
              size: 'small',
              variant: 'ghost',
              color: 'neutral',
              shape: 'circle',
            })
          "
          @click="handleClear"
        >
          <span
            :class="iconButtonStyles.glyph"
            aria-hidden="true"
            v-bind="hooks('icon-button', 'icon')"
          >
            <IconX />
          </span>
        </button>
        <span
          v-else
          :class="styles.calendarIcon"
          aria-hidden="true"
          v-bind="hooks('date-picker', 'icon')"
        >
          <IconCalendar />
        </span>
      </template>
    </Input>
    <FloatingPanel
      ref="floating"
      :open="panelOpen"
      :anchor="input"
      placement="bottom-start"
      :branches="() => [field]"
      :return-focus-on-escape="() => input"
      focusable
      role="dialog"
      tabindex="-1"
      :aria-label="accessibleName"
      :aria-labelledby="labelledBy"
      :class="styles.popup"
      v-bind="hooks('date-picker', 'content', { state: 'open' })"
      @dismiss="setOpen(false)"
      @keydown="handlePanelKeyDown"
    >
      <div :class="styles.panel">
        <div :class="styles.header">
          <h2 :id="headingId" :class="styles.heading" aria-live="polite">
            {{ heading }}
          </h2>
          <div :class="styles.navGroup">
            <button
              type="button"
              :class="styles.navButton"
              :aria-label="t('monthCalendar.previousMonth')"
              @click="month = monthStart(month, -1)"
            >
              <IconChevronLeft aria-hidden="true" focusable="false" />
            </button>
            <button
              type="button"
              :class="styles.navButton"
              :aria-label="t('monthCalendar.nextMonth')"
              @click="month = monthStart(month, 1)"
            >
              <IconChevronRight aria-hidden="true" focusable="false" />
            </button>
          </div>
        </div>
        <div role="grid" :aria-labelledby="headingId" :class="styles.grid">
          <div role="row" :class="styles.week">
            <div
              v-for="day in weekdays"
              :key="day"
              role="columnheader"
              :class="styles.weekday"
            >
              {{ t(`monthCalendar.weekdays.${day}`) }}
            </div>
          </div>
          <div
            v-for="(week, index) in weeks"
            :key="index"
            role="row"
            :class="styles.week"
          >
            <div
              v-for="date in week"
              :key="dayKey(date)"
              role="gridcell"
              :class="styles.day"
              :data-date="dayKey(date)"
              :data-outside="!sameMonth(date, month) ? '' : undefined"
              :aria-label="dayKey(date)"
              :aria-selected="current === dayKey(date)"
              :aria-current="dayKey(date) === todayKey ? 'date' : undefined"
              :aria-disabled="isDayDisabled(dayKey(date)) || undefined"
              :tabindex="dayKey(date) === activeKey ? 0 : -1"
              @focus="focusedKey = dayKey(date)"
              @click="selectDate(date)"
              @keydown="handleDayKeyDown($event, date)"
            >
              {{ date.getDate() }}
            </div>
          </div>
        </div>
        <div :class="styles.footer">
          <button
            type="button"
            :class="styles.footerButton"
            :disabled="isDayDisabled(todayKey)"
            @click="selectDate(new Date())"
          >
            {{ t("datePicker.today") }}
          </button>
          <button
            v-if="clearable && current"
            type="button"
            :class="styles.footerButton"
            @click="
              handleClear();
              setOpen(false);
            "
          >
            {{ t("datePicker.clear") }}
          </button>
        </div>
      </div>
    </FloatingPanel>
  </div>
</template>
