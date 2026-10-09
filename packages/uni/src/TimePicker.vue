<script setup lang="ts">
import {
  computed,
  ref,
  watch,
  nextTick,
  provide,
  getCurrentInstance,
} from "vue";
import { useNativeId as useId } from "./native-id";
import {
  formatTime,
  parseTimeInput,
  parseTimeValue,
  resolveTimeFormat,
  formatHasSeconds,
  startOfToday,
} from "@minerva/core";
import PopoverContent from "./PopoverContent.vue";
import type { MiniPopoverContext } from "./popover-context";
import Input from "./Input.vue";
import { inheritForm } from "./form-context";
import { useI18n } from "./i18n";
type Kind = "hour" | "minute" | "second" | "ampm";
const raw = withDefaults(
  defineProps<{
    value?: Date | string | null;
    modelValue?: Date | string | null;
    defaultValue?: Date | string;
    format?: string;
    use12Hours?: boolean;
    showSecond?: boolean;
    hourStep?: number;
    minuteStep?: number;
    secondStep?: number;
    minTime?: Date;
    maxTime?: Date;
    start?: string;
    end?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    clearable?: boolean;
    placeholder?: string;
    label?: string;
    name?: string;
    id?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    size?: "small" | "medium" | "large";
  }>(),
  {
    format: "HH:mm:ss",
    showSecond: true,
    hourStep: 1,
    minuteStep: 1,
    secondStep: 1,
    clearable: true,
    name: "time-picker",
    size: "medium",
  },
);
const props = inheritForm(raw);
const { t, dir } = useI18n();
const emit = defineEmits<{
  change: [value: Date | undefined];
  "update:modelValue": [value: Date | undefined];
  openChange: [open: boolean];
}>();
function date(value: Date | string | null | undefined) {
  return typeof value === "string" ? parseTimeValue(value) : value;
}
const local = ref<Date | null>(date(props.defaultValue) ?? null);
const controlled = computed(
  () => props.value !== undefined || props.modelValue !== undefined,
);
const current = computed(
  () =>
    date(
      props.modelValue !== undefined
        ? props.modelValue
        : props.value !== undefined
          ? props.value
          : local.value,
    ) ?? null,
);
const draft = ref<string | null>(null),
  open = ref(false);
const blocked = computed(() => props.disabled || props.readOnly);
const format = computed(() =>
  resolveTimeFormat(props.format, props.showSecond),
);
const display = computed(
  () =>
    draft.value ??
    (current.value ? formatTime(current.value, format.value) : ""),
);
function setOpen(value: boolean) {
  if ((value && blocked.value) || value === open.value) return;
  open.value = value;
  emit("openChange", value);
}
watch(blocked, (value) => {
  if (value) setOpen(false);
});
function commit(value: Date | undefined) {
  if (blocked.value) return;
  if (!controlled.value) local.value = value ?? null;
  emit("change", value);
  emit("update:modelValue", value);
}
function input(value: string) {
  if (blocked.value) return;
  draft.value = value;
  const parsed = parseTimeInput(value, format.value, {
    strict: true,
    base: current.value ?? undefined,
  });
  if (parsed) commit(parsed);
}
let touchingControl = false;
function blur() {
  if (touchingControl) {
    touchingControl = false;
    return;
  }
  if (blocked.value || draft.value === null) return;
  if (!draft.value.trim()) {
    if (current.value) commit(undefined);
  } else {
    const parsed = parseTimeInput(draft.value, format.value, {
      strict: false,
      base: current.value ?? undefined,
    });
    if (parsed && parsed.getTime() !== current.value?.getTime()) commit(parsed);
  }
  draft.value = null;
}
function clear() {
  touchingControl = false;
  if (blocked.value) return;
  draft.value = null;
  commit(undefined);
}
const reference = computed(() => current.value ?? startOfToday());
const minimum = computed(() => props.minTime ?? parseTimeValue(props.start)),
  maximum = computed(() => props.maxTime ?? parseTimeValue(props.end));
function disabled(kind: Kind, value: number) {
  const r = reference.value,
    h = r.getHours(),
    m = r.getMinutes(),
    min = minimum.value,
    max = maximum.value;
  const hour = props.use12Hours ? (value % 12) + (h >= 12 ? 12 : 0) : value;
  if (kind === "hour")
    return !!((min && hour < min.getHours()) || (max && hour > max.getHours()));
  if (kind === "minute")
    return !!(
      (min && h === min.getHours() && value < min.getMinutes()) ||
      (max && h === max.getHours() && value > max.getMinutes())
    );
  if (kind === "second")
    return !!(
      (min &&
        h === min.getHours() &&
        m === min.getMinutes() &&
        value < min.getSeconds()) ||
      (max &&
        h === max.getHours() &&
        m === max.getMinutes() &&
        value > max.getSeconds())
    );
  return false;
}
const columns = computed(() => {
  const r = reference.value;
  const specs: Array<{
    kind: Kind;
    count: number;
    step: number;
    start: number;
    selected: number;
    label: string;
  }> = [
    {
      kind: "hour",
      count: props.use12Hours ? 12 : 24,
      start: props.use12Hours ? 1 : 0,
      step: props.hourStep,
      selected: props.use12Hours ? r.getHours() % 12 || 12 : r.getHours(),
      label: t("timePicker.hours"),
    },
    {
      kind: "minute",
      count: 60,
      start: 0,
      step: props.minuteStep,
      selected: r.getMinutes(),
      label: t("timePicker.minutes"),
    },
  ];
  if (formatHasSeconds(format.value))
    specs.push({
      kind: "second",
      count: 60,
      start: 0,
      step: props.secondStep,
      selected: r.getSeconds(),
      label: t("timePicker.seconds"),
    });
  if (props.use12Hours)
    specs.push({
      kind: "ampm",
      count: 2,
      start: 0,
      step: 1,
      selected: r.getHours() >= 12 ? 1 : 0,
      label: t("timePicker.period"),
    });
  return specs.map((c) => ({
    ...c,
    items: Array.from(
      {
        length: Math.ceil(
          c.count / Math.max(1, Number.isFinite(c.step) ? c.step : 1),
        ),
      },
      (_, i) => c.start + i * Math.max(1, Number.isFinite(c.step) ? c.step : 1),
    ).map((value) => ({
      value,
      label:
        c.kind === "ampm"
          ? value
            ? "PM"
            : "AM"
          : String(value).padStart(2, "0"),
      disabled: disabled(c.kind, value),
    })),
  }));
});
function choose(kind: Kind, value: number) {
  touchingControl = false;
  if (blocked.value || disabled(kind, value)) return;
  const next = new Date(reference.value);
  if (kind === "hour")
    next.setHours(
      props.use12Hours
        ? (value % 12) + (next.getHours() >= 12 ? 12 : 0)
        : value,
    );
  else if (kind === "minute") next.setMinutes(value);
  else if (kind === "second") next.setSeconds(value);
  else next.setHours((next.getHours() % 12) + value * 12);
  draft.value = null;
  commit(next);
}
const panel = ref<any>(),
  field = ref<any>();
const fieldId = `mn-time-${useId().replace(/[^a-z0-9]/gi, "")}`;
const instance = getCurrentInstance();
function focusInput(event: Event) {
  event.preventDefault();
  const el = field.value?.$el ?? field.value;
  el?.querySelector?.("input")?.focus();
}
provide<MiniPopoverContext>("minerva:popover", {
  open: computed(() => open.value && !blocked.value),
  disabled: blocked,
  placement: computed(() => "bottom"),
  modal: computed(() => false),
  setOpen,
  trigger: field,
  anchor: ref(),
  anchorId: ref(""),
  triggerId: fieldId,
  measureTrigger: (callback) => {
    uni
      .createSelectorQuery?.()
      .in(instance?.proxy)
      .select(`#${fieldId}`)
      .boundingClientRect((rect: any) => {
        if (rect) callback(rect);
      })
      .exec();
  },
});

function keys(event: KeyboardEvent, index?: number) {
  if (event.key === "Escape") {
    event.preventDefault();
    setOpen(false);
    return;
  }
  if (index === undefined) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      nextTick(() => {
        const el =
          panel.value?.element?.$el ??
          panel.value?.element ??
          panel.value?.$el ??
          panel.value;
        el?.querySelector?.('[role="option"]:not([disabled])')?.focus();
      });
    }
    return;
  }
  const el =
    panel.value?.element?.$el ??
    panel.value?.element ??
    panel.value?.$el ??
    panel.value;
  const lists = el?.querySelectorAll?.('[role="listbox"]');
  const options = Array.from(
    lists?.[index]?.querySelectorAll('[role="option"]:not([disabled])') ?? [],
  ) as HTMLElement[];
  const at = options.indexOf(event.target as HTMLElement);
  let target: HTMLElement | undefined;
  if (event.key === "ArrowDown")
    target = options[Math.min(options.length - 1, at + 1)];
  else if (event.key === "ArrowUp") target = options[Math.max(0, at - 1)];
  else if (event.key === "Home") target = options[0];
  else if (event.key === "End") target = options.at(-1);
  else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    const delta =
      (event.key === "ArrowRight" ? 1 : -1) * (dir.value === "rtl" ? -1 : 1);
    target = lists?.[index + delta]?.querySelector(
      '[role="option"]:not([disabled])',
    );
  }
  if (target) {
    event.preventDefault();
    target.focus();
  }
}
</script>
<template>
  <view
    :id="fieldId"
    class="mn-uni-time-picker"
    :data-state="open ? 'open' : 'closed'"
  >
    <text v-if="label">{{ label }}</text
    ><Input
      ref="field"
      :value="display"
      :id="id"
      :name="name"
      :placeholder="placeholder ?? t('timePicker.placeholder')"
      :aria-label="label ?? props.ariaLabel ?? t('timePicker.label')"
      :aria-labelledby="props.ariaLabelledby"
      :aria-describedby="props.ariaDescribedby"
      :disabled="props.disabled"
      :read-only="props.readOnly"
      :required="props.required"
      :invalid="props.invalid"
      :size="size"
      @change="input"
      @blur="blur"
      @confirm="blur"
      @click="setOpen(!open)"
      @keydown="keys($event)"
      ><template #suffix
        ><button
          v-if="clearable && current && !blocked"
          class="mn-close"
          :aria-label="t('timePicker.clear')"
          @touchstart="touchingControl = true"
          @touchcancel="touchingControl = false"
          @mousedown.prevent
          @tap.stop="clear"
        >
          ×</button
        ><text v-else aria-hidden="true">◷</text></template
      ></Input
    >
    <PopoverContent
      ref="panel"
      class="mn-uni-time-panel"
      align="start"
      :aria-label="label ?? props.ariaLabel ?? t('timePicker.label')"
      @open-auto-focus="$event.preventDefault()"
      @close-auto-focus="focusInput"
    >
      <scroll-view
        v-for="(column, index) in columns"
        :key="column.kind"
        scroll-y
        class="mn-uni-time-column"
        :data-time-column="column.kind"
        role="listbox"
        :aria-label="column.label"
        @keydown="keys($event, index)"
        ><button
          v-for="unit in column.items"
          :key="unit.value"
          class="mn-option"
          role="option"
          :class="{
            'mn-time-selected': !!current && column.selected === unit.value,
          }"
          :data-unit="unit.value"
          :disabled="unit.disabled"
          :aria-disabled="unit.disabled"
          :aria-selected="!!current && column.selected === unit.value"
          :tabindex="column.selected === unit.value ? 0 : -1"
          @touchstart="touchingControl = true"
          @touchcancel="touchingControl = false"
          @mousedown.prevent
          @tap="choose(column.kind, unit.value)"
        >
          {{ unit.label }}
        </button></scroll-view
      >
    </PopoverContent>
  </view>
</template>
