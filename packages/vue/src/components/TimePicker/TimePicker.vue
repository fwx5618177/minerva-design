<script setup lang="ts">
/**
 * TimePicker: type a time or pick hours / minutes / seconds from a panel.
 * `v-model` (a `Date`, `null` = no time) or uncontrolled (`defaultValue`).
 * Inside a FormControl the input picks up the field's id, label,
 * description, invalid, required, disabled and read-only state (explicit
 * props win). `class`, `style` and `data-*` attributes go to the root.
 */
import { computed, onMounted, provide, ref, shallowRef, unref } from "vue";
import {
  formatHasSeconds,
  formatTime,
  parseTimeInput,
  resolveTimeFormat,
  startOfToday,
} from "@minerva/core";
import styles from "@react-styles/components/TimePicker/timePicker.module.scss";
import iconButtonStyles from "@react-styles/components/IconButton/iconButton.module.scss";
import { hooks } from "../../internal/hooks";
import { IconClock, IconX } from "../../internal/icons";
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
import TimePickerPanel from "./TimePickerPanel.vue";
import { adjacentTabbable, tabLeavesPanel } from "./tabbing";
import type { TimePickerEmits, TimePickerProps, TimeUnitKind } from "./types";

defineOptions({ name: "TimePicker", inheritAttrs: false });

const props = withDefaults(defineProps<TimePickerProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  format: "HH:mm:ss",
  use12Hours: false,
  placeholder: undefined,
  label: undefined,
  ariaLabel: undefined,
  ariaLabelledby: undefined,
  ariaDescribedby: undefined,
  id: undefined,
  required: undefined,
  readOnly: undefined,
  invalid: undefined,
  name: "time-picker",
  disabled: undefined,
  clearable: true,
  size: "medium",
  minTime: undefined,
  maxTime: undefined,
  showSecond: true,
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
});
const emit = defineEmits<TimePickerEmits>();

const { t } = useI18n();
const fc = useFormControlContext();
// The field state is resolved here (explicit props win over the
// FormControl), so the inner Input must not merge it again.
provide(FORM_CONTROL_KEY, null as never);
const fieldProps = useFormControlProps(() => ({
  id: props.id,
  "aria-describedby": props.ariaDescribedby,
}));

// One source of truth: the format in use decides the seconds column
const format = computed(() =>
  resolveTimeFormat(props.format, props.showSecond),
);
const showSecond = computed(() => formatHasSeconds(format.value));
const disabled = computed(() => props.disabled ?? fc?.disabled.value ?? false);
const readOnly = computed(() => props.readOnly ?? fc?.readOnly.value ?? false);
const required = computed(() => props.required ?? fc?.required.value ?? false);
const invalid = computed(() => props.invalid ?? fc?.invalid.value ?? false);
const accessibleName = computed(
  () => props.label ?? props.ariaLabel ?? t("timePicker.label"),
);
// A FormLabel names the input unless `label` / `aria-label` is given; the
// aria-label stays as fallback (aria-labelledby wins when its target
// exists, and is ignored when it does not).
const labelledBy = computed(
  () =>
    props.ariaLabelledby ??
    (fc && !props.label && !props.ariaLabel ? fc.labelId.value : undefined),
);

const current = useControllable<Date | null>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: null,
  name: "TimePicker",
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
// Opened from the keyboard: the panel moves focus into its first column.
const focusPanelOnOpen = ref(false);

onMounted(() => {
  input.value = field.value?.querySelector("input") ?? null;
});

function commit(next: Date | null) {
  current.value = next;
  emit("change", next ?? undefined);
}

function handleTimeChange(type: TimeUnitKind, val: number) {
  const next = new Date(current.value ?? startOfToday());
  if (type === "hour") next.setHours(val);
  else if (type === "minute") next.setMinutes(val);
  else if (type === "second") next.setSeconds(val);
  else {
    const hours = next.getHours() % 12;
    next.setHours(val === 1 ? hours + 12 : hours);
  }
  draft.value = null;
  commit(next);
}

function handleInputChange(text: string | number) {
  const value = String(text);
  draft.value = value;
  const parsed = parseTimeInput(value, format.value, {
    strict: true,
    base: current.value ?? undefined,
  });
  if (parsed) commit(parsed);
}

function handleInputBlur() {
  const text = draft.value;
  if (text === null) return;
  if (text.trim() === "") {
    if (current.value) commit(null);
  } else {
    const parsed = parseTimeInput(text, format.value, {
      strict: false,
      base: current.value ?? undefined,
    });
    if (parsed && parsed.getTime() !== current.value?.getTime()) commit(parsed);
  }
  draft.value = null;
}

function handleClear() {
  draft.value = null;
  commit(null);
  input.value?.focus();
}

function toggle() {
  if (disabled.value || readOnly.value) return;
  focusPanelOnOpen.value = false;
  setOpen(!open.value);
}

// Clicking the input toggles the panel. The handler only reacts to clicks
// on the inner <input>, which has its own keyboard support (ArrowDown opens
// the panel; Escape closes it), so the wrapper is not a control.
function handleRootClick(event: MouseEvent) {
  if (input.value && event.target === input.value) toggle();
}

function handleInputKeyDown(event: KeyboardEvent) {
  // ArrowDown (also Alt+ArrowDown) opens the panel and moves focus into it;
  // the portalled panel is otherwise unreachable by Tab.
  if (event.key !== "ArrowDown") return;
  event.preventDefault();
  if (!open.value) {
    focusPanelOnOpen.value = true;
    setOpen(true);
  } else {
    unref(floating.value?.element)
      ?.querySelector<HTMLElement>('[role="option"][tabindex="0"]')
      ?.focus();
  }
}

// The portalled panel sits after the input in the Tab order: Tab past its
// last column continues after the input (its clear button, then the rest of
// the page); Shift+Tab before its first column returns to the input.
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

const displayValue = computed(
  () =>
    draft.value ??
    (current.value ? formatTime(current.value, format.value) : ""),
);
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
    :class="styles.timePicker"
    v-bind="{
      ...$attrs,
      ...hooks('time-picker', 'root', {
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
      :placeholder="placeholder ?? t('timePicker.placeholder')"
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
          :aria-label="t('timePicker.clear')"
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
          :class="styles.clockIcon"
          aria-hidden="true"
          v-bind="hooks('time-picker', 'icon')"
        >
          <IconClock />
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
      v-bind="hooks('time-picker', 'content', { state: 'open' })"
      @dismiss="setOpen(false)"
      @keydown="handlePanelKeyDown"
    >
      <TimePickerPanel
        :value="current ?? startOfToday()"
        :has-value="current !== null"
        :format="format"
        :use12-hours="use12Hours"
        :show-second="showSecond"
        :hour-step="hourStep"
        :minute-step="minuteStep"
        :second-step="secondStep"
        :min-time="minTime"
        :max-time="maxTime"
        :visible="open"
        :focus-on-open="focusPanelOnOpen"
        @time-change="handleTimeChange"
      />
    </FloatingPanel>
  </div>
</template>
