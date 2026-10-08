<script setup lang="ts">
/**
 * NumberInput: numeric text field (role="spinbutton") with keyboard stepping
 * (arrows, Page Up / Down, Home / End to min / max when bounded), an
 * optional stepper, min / max clamping and fixed precision. The draft may
 * hold intermediate text ("-", "1.") while typing; it is committed on blur /
 * Enter (`update:modelValue` + `change`). Mouse wheel never changes the value.
 */
import { computed, ref, useAttrs, watch } from "vue";
import {
  clampNumber,
  formatNumberValue,
  inferStepPrecision,
  parseNumberDraft,
} from "@minerva/core";
import styles from "@react-styles/components/NumberInput/numberInput.module.scss";
import { hooks } from "../../internal/hooks";
import { IconChevronDown, IconChevronUp } from "../../internal/icons";
import { useControllable } from "../../internal/controllable";
import {
  isAriaInvalid,
  useFormControlProps,
} from "../../internal/form-control";
import { useI18n } from "../../config/useI18n";
import type { NumberInputProps } from "./types";

defineOptions({ name: "NumberInput", inheritAttrs: false });

const props = withDefaults(defineProps<NumberInputProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  min: undefined,
  max: undefined,
  step: 1,
  precision: undefined,
  size: "medium",
  invalid: false,
  disabled: false,
  readOnly: false,
  required: false,
  id: undefined,
  showStepper: false,
  allowEmpty: true,
  incrementLabel: undefined,
  decrementLabel: undefined,
  notANumberMessage: undefined,
  belowMinMessage: undefined,
  aboveMaxMessage: undefined,
});
const emit = defineEmits<{
  "update:modelValue": [value: number | null];
  /** A value was committed (blur / Enter, stepping, stepper); `null` when cleared */
  change: [value: number | null];
}>();

const attrs = useAttrs();
const { t } = useI18n();

const field = useFormControlProps(() => ({
  id: props.id,
  disabled: props.disabled,
  readOnly: props.readOnly,
  "aria-describedby": attrs["aria-describedby"] as string | undefined,
  "aria-invalid": attrs["aria-invalid"],
}));
const isDisabled = computed(() => field.value.disabled);
const isLocked = computed(() => isDisabled.value || field.value.readOnly);
const precision = computed(
  () => props.precision ?? inferStepPrecision(props.step),
);

const current = useControllable<number | null>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: null,
  name: "NumberInput",
  onChange: (value) => emit("change", value),
});

const draft = ref(formatNumberValue(current.value, precision.value));
// Sync the draft when the value changes from outside, unless the draft
// already shows that number (keeps "1." etc.).
watch(
  [current, precision],
  ([value, digits]) => {
    const numeric = parseNumberDraft(draft.value);
    if (numeric === null || numeric !== value) {
      draft.value = formatNumberValue(value, digits);
    }
  },
  { flush: "sync" },
);

function set(next: number) {
  const rounded = Number(next.toFixed(precision.value));
  current.value = rounded;
  draft.value = rounded.toFixed(precision.value);
}

function commit(text: string) {
  if (isLocked.value) return;
  const trimmed = text.trim();
  if (trimmed === "" || trimmed === "-") {
    if (props.allowEmpty) {
      current.value = null;
      draft.value = "";
    } else {
      set(clampNumber(props.min ?? 0, props.min, props.max));
    }
    return;
  }
  const parsed = parseNumberDraft(trimmed);
  if (parsed === null) {
    // Invalid text falls back to the last valid value.
    draft.value = formatNumberValue(current.value, precision.value);
    return;
  }
  set(clampNumber(parsed, props.min, props.max));
}

function adjust(delta: number) {
  if (isLocked.value) return;
  const base = parseNumberDraft(draft.value) ?? current.value ?? 0;
  set(clampNumber(base + delta, props.min, props.max));
}

function onKeyDown(event: KeyboardEvent) {
  // The consumer's @keydown ran first (attributes are bound before)
  if (isLocked.value || event.defaultPrevented) return;
  const { min, max, step } = props;
  if (event.key === "ArrowUp") {
    event.preventDefault();
    adjust(step);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    adjust(-step);
  } else if (event.key === "PageUp" || event.key === "PageDown") {
    // WAI-ARIA spinbutton: Page Up / Down step by a larger amount (10 steps).
    event.preventDefault();
    adjust((event.key === "PageUp" ? 10 : -10) * step);
  } else if (event.key === "Home" && min !== undefined) {
    // Home / End jump to the bounds; without a bound they move the caret.
    event.preventDefault();
    set(min);
  } else if (event.key === "End" && max !== undefined) {
    event.preventDefault();
    set(max);
  } else if (event.key === "Enter") {
    (event.currentTarget as HTMLInputElement).blur();
  }
}

function onBlur(event: FocusEvent) {
  commit((event.currentTarget as HTMLInputElement).value);
  const own = attrs.onBlur as
    ((event: FocusEvent) => void) | ((event: FocusEvent) => void)[] | undefined;
  for (const handler of [own ?? []].flat()) handler(event);
}

function onInput(event: Event) {
  draft.value = (event.target as HTMLInputElement).value;
}

// Draft-level validation: not a number, or out of range.
const errorMessage = computed(() => {
  const trimmed = draft.value.trim();
  if (!trimmed || trimmed === "-" || trimmed === ".") return undefined;
  const parsed = parseNumberDraft(trimmed);
  const { min, max } = props;
  if (parsed === null) {
    return props.notANumberMessage ?? t("numberInput.notANumber");
  }
  if (min !== undefined && parsed < min) {
    return props.belowMinMessage ?? t("numberInput.belowMin", { min });
  }
  if (max !== undefined && parsed > max) {
    return props.aboveMaxMessage ?? t("numberInput.aboveMax", { max });
  }
  return undefined;
});
const internalInvalid = computed(() => errorMessage.value !== undefined);
const isInvalid = computed(
  () =>
    props.invalid ||
    internalInvalid.value ||
    isAriaInvalid(field.value["aria-invalid"]),
);

const rootAttrs = computed(() => ({
  class: [
    styles.root,
    styles[props.size],
    isInvalid.value && styles.invalid,
    internalInvalid.value && styles.shake,
    isDisabled.value && styles.disabled,
    attrs.class,
  ],
  title: errorMessage.value,
  ...hooks("number-input", "root", {
    disabled: isDisabled.value,
    invalid: isInvalid.value,
    readonly: field.value.readOnly,
    required: props.required || !!field.value["aria-required"],
    size: props.size,
  }),
}));

const inputAttrs = computed(() => {
  const { class: _class, onBlur: _onBlur, ...rest } = attrs;
  const wired = field.value;
  return {
    inputmode: "decimal" as const,
    ...rest,
    type: "text",
    id: wired.id,
    disabled: wired.disabled,
    readonly: wired.readOnly,
    required: props.required,
    "aria-describedby": wired["aria-describedby"],
    "aria-required": wired["aria-required"],
    "aria-readonly": wired["aria-readonly"],
    // min / max / now + arrow-key stepping is the WAI-ARIA spinbutton pattern.
    role: "spinbutton",
    "aria-valuemin": props.min,
    "aria-valuemax": props.max,
    "aria-valuenow": current.value ?? undefined,
    "aria-invalid": isInvalid.value || wired["aria-invalid"] || undefined,
    value: draft.value,
    ...hooks("number-input", "input"),
  };
});

const incrementDisabled = computed(
  () =>
    isLocked.value ||
    (props.max !== undefined && (current.value ?? 0) >= props.max),
);
const decrementDisabled = computed(
  () =>
    isLocked.value ||
    (props.min !== undefined && (current.value ?? 0) <= props.min),
);
</script>

<template>
  <div v-bind="rootAttrs">
    <input
      :class="styles.field"
      v-bind="inputAttrs"
      @input="onInput"
      @blur="onBlur"
      @keydown="onKeyDown"
    />
    <!-- Pointer convenience only: keyboard users step with the arrow keys. -->
    <div
      v-if="showStepper"
      :class="styles.stepper"
      aria-hidden="true"
      v-bind="hooks('number-input', 'stepper')"
    >
      <button
        type="button"
        :class="[styles.step, styles.stepUp]"
        tabindex="-1"
        :disabled="incrementDisabled"
        :aria-label="incrementLabel ?? t('numberInput.increment')"
        v-bind="hooks('number-input', 'increment')"
        @click="adjust(step)"
      >
        <IconChevronUp :size="12" stroke-width="2.5" />
      </button>
      <button
        type="button"
        :class="[styles.step, styles.stepDown]"
        tabindex="-1"
        :disabled="decrementDisabled"
        :aria-label="decrementLabel ?? t('numberInput.decrement')"
        v-bind="hooks('number-input', 'decrement')"
        @click="adjust(-step)"
      >
        <IconChevronDown :size="12" stroke-width="2.5" />
      </button>
    </div>
  </div>
</template>
