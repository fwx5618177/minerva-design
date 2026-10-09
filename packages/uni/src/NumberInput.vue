<script setup lang="ts">
import { useI18n } from "./i18n";
const { t } = useI18n();
import { computed, ref, watch } from "vue";
import {
  clampNumber,
  formatNumberValue,
  inferStepPrecision,
  parseNumberDraft,
} from "@minerva/core";
import { inheritForm } from "./form-context";
const rawProps = withDefaults(
  defineProps<{
    value?: number | null;
    modelValue?: number | null;
    defaultValue?: number | null;
    min?: number;
    max?: number;
    step?: number;
    precision?: number;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    showStepper?: boolean;
    allowEmpty?: boolean;
    size?: string;
    incrementLabel?: string;
    decrementLabel?: string;
    notANumberMessage?: string;
    belowMinMessage?: string;
    aboveMaxMessage?: string;
  }>(),
  {
    defaultValue: null,
    step: 1,
    allowEmpty: true,
    showStepper: false,
    size: "medium",
  },
);
const props = inheritForm(rawProps);
const emit = defineEmits(["change", "update:modelValue", "blur"]);
const local = ref<number | null>(props.defaultValue);
const current = computed(() =>
  props.modelValue !== undefined
    ? props.modelValue
    : props.value !== undefined
      ? props.value
      : local.value,
);
const precision = computed(() =>
  Math.max(0, Math.min(20, props.precision ?? inferStepPrecision(props.step))),
);
const draft = ref(formatNumberValue(current.value, precision.value));
const locked = computed(() => props.disabled || props.readOnly);
const parsed = computed(() => parseNumberDraft(draft.value));
const message = computed(() =>
  !draft.value || draft.value === "-"
    ? ""
    : parsed.value === null
      ? (props.notANumberMessage ?? t("numberInput.notANumber"))
      : props.min !== undefined && parsed.value < props.min
        ? (props.belowMinMessage ??
          t("numberInput.belowMin", { min: props.min }))
        : props.max !== undefined && parsed.value > props.max
          ? (props.aboveMaxMessage ??
            t("numberInput.aboveMax", { max: props.max }))
          : "",
);
watch([current, precision], () => {
  if (parseNumberDraft(draft.value) !== current.value)
    draft.value = formatNumberValue(current.value, precision.value);
});
function change(v: number | null) {
  if (locked.value) return;
  const value =
    v === null
      ? null
      : Number(clampNumber(v, props.min, props.max).toFixed(precision.value));
  local.value = value;
  emit("update:modelValue", value);
  emit("change", value);
  draft.value = formatNumberValue(current.value, precision.value);
}
function onNativeInput(event: unknown) {
  const e = event as { detail?: { value?: unknown } };
  if (!locked.value && typeof e.detail?.value === "string")
    draft.value = e.detail.value;
}
function commit() {
  if (locked.value) return;
  const text = draft.value.trim();
  if (text === "" || text === "-") {
    change(props.allowEmpty ? null : (props.min ?? 0));
    return;
  }
  const v = parseNumberDraft(text);
  if (v === null) {
    draft.value = formatNumberValue(current.value, precision.value);
    return;
  }
  change(v);
}
function adjust(delta: number) {
  if (locked.value) return;
  change((parseNumberDraft(draft.value) ?? current.value ?? 0) + delta);
}
function keydown(e: KeyboardEvent) {
  if (locked.value) return;
  const steps: Record<string, number> = {
    ArrowUp: props.step,
    ArrowDown: -props.step,
    PageUp: props.step * 10,
    PageDown: -props.step * 10,
  };
  if (e.key in steps) {
    e.preventDefault();
    adjust(steps[e.key]!);
  } else if (e.key === "Home" && props.min !== undefined) {
    e.preventDefault();
    change(props.min);
  } else if (e.key === "End" && props.max !== undefined) {
    e.preventDefault();
    change(props.max);
  } else if (e.key === "Enter") {
    commit();
  }
}
</script>
<template>
  <view
    class="mn-number-input"
    :class="[
      `mn-size-${size}`,
      {
        'mn-invalid': props.invalid || !!message,
        'mn-disabled': props.disabled,
      },
    ]"
    ><button
      v-if="showStepper"
      class="mn-button mn-variant-outline"
      data-action="decrement"
      :class="{
        'mn-disabled':
          locked || (min !== undefined && current !== null && current <= min),
      }"
      :disabled="
        locked || (min !== undefined && current !== null && current <= min)
      "
      :aria-label="decrementLabel ?? t('numberInput.decrement')"
      @tap="adjust(-step)"
    >
      −</button
    ><input
      class="mn-input"
      type="digit"
      :value="draft"
      :class="{ 'mn-disabled': locked }"
      :disabled="locked"
      :aria-invalid="props.invalid || !!message"
      @input="onNativeInput"
      @blur="
        commit();
        emit('blur', $event);
      "
      @confirm="commit"
      @keydown="keydown"
    /><button
      v-if="showStepper"
      class="mn-button mn-variant-outline"
      data-action="increment"
      :class="{
        'mn-disabled':
          locked || (max !== undefined && current !== null && current >= max),
      }"
      :disabled="
        locked || (max !== undefined && current !== null && current >= max)
      "
      :aria-label="incrementLabel ?? t('numberInput.increment')"
      @tap="adjust(step)"
    >
      +</button
    ><text v-if="message" class="mn-error">{{ message }}</text></view
  >
</template>
