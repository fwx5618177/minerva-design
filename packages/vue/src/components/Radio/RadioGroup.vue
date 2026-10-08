<script setup lang="ts">
/**
 * RadioGroup: a set of radios of which one can be selected. `v-model` (or
 * `defaultValue`); emits `change(value, event)`. Native radios sharing one
 * name: Tab enters the group once, the arrow keys move the selection.
 */
import { computed, nextTick, provide, useAttrs, useId } from "vue";
import styles from "@react-styles/components/Radio/radio.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import { useFormControlContext } from "../../internal/form-control";
import { splitRootAttrs } from "../Checkbox/attrs";
import { RADIO_GROUP_KEY } from "./context";
import type { RadioGroupProps } from "./types";

defineOptions({ name: "RadioGroup", inheritAttrs: false });

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  name: undefined,
  label: undefined,
  id: undefined,
  disabled: undefined,
  direction: "vertical",
  size: undefined,
  error: false,
  helperText: undefined,
  required: undefined,
  color: undefined,
});
const emit = defineEmits<{
  "update:modelValue": [value: string | number];
  /** The user selected another radio: its value and the change event */
  change: [value: string | number, event: Event];
}>();
const slots = defineSlots<{
  /** Radio elements */
  default?: () => unknown;
  /** Visible label (the `label` prop) */
  label?: () => unknown;
}>();

const attrs = useAttrs();
const generatedName = useId();
const labelId = useId();
const helperId = useId();

const selected = useControllable<string | number | null | undefined>(
  props,
  "modelValue",
  { defaultProp: "defaultValue", fallback: undefined, name: "RadioGroup" },
);

// FormControl wiring; explicit props win over the field's state.
const fc = useFormControlContext();
const isDisabled = computed(
  () => props.disabled ?? fc?.disabled.value ?? false,
);
const isRequired = computed(
  () => props.required ?? fc?.required.value ?? false,
);
const isError = computed(() => props.error || !!fc?.invalid.value);
const hasLabel = computed(() => !!props.label || !!slots.label);

const syncs = new Set<() => void>();

function onChange(value: string | number, event: Event) {
  if (isDisabled.value) return;
  selected.value = value;
  emit("change", value, event);
  // The DOM follows the (possibly controlled) value, not the click.
  void nextTick(() => syncs.forEach((sync) => sync()));
}

provide(RADIO_GROUP_KEY, {
  value: computed(() => selected.value),
  disabled: isDisabled,
  name: computed(() => props.name ?? generatedName),
  size: computed(() => props.size),
  color: computed(() => props.color),
  onChange,
  register(sync) {
    syncs.add(sync);
    return () => syncs.delete(sync);
  },
});

const split = computed(() => {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledBy,
    "aria-describedby": ariaDescribedBy,
    ...rest
  } = attrs;
  return {
    ...splitRootAttrs(rest),
    ariaLabel: ariaLabel as string | undefined,
    ariaLabelledBy: ariaLabelledBy as string | undefined,
    ariaDescribedBy: ariaDescribedBy as string | undefined,
  };
});

const listAttrs = computed(() => {
  const { ariaLabel, ariaLabelledBy, ariaDescribedBy, control } = split.value;
  const describedBy =
    [
      props.helperText ? helperId : null,
      fc?.invalid.value && fc.errorMessages.value > 0 ? fc.errorId.value : null,
      fc && !fc.invalid.value && fc.helperTexts.value > 0
        ? fc.helperId.value
        : null,
      ariaDescribedBy,
    ]
      .filter(Boolean)
      .join(" ") || undefined;
  const labelledBy = ariaLabelledBy
    ? ariaLabelledBy
    : hasLabel.value
      ? labelId
      : !ariaLabel && fc
        ? fc.labelId.value
        : undefined;
  return {
    ...control,
    role: "radiogroup",
    id: props.id,
    "aria-labelledby": labelledBy,
    "aria-label": hasLabel.value ? undefined : ariaLabel,
    "aria-describedby": describedBy,
    "aria-required": isRequired.value,
    "aria-invalid": isError.value,
    "aria-disabled": isDisabled.value || undefined,
    ...hooks("radio-group", "list"),
  };
});
</script>

<template>
  <div
    :class="[styles.radioGroupWrapper, isError && styles.error]"
    v-bind="{
      ...split.root,
      ...hooks('radio-group', 'root', {
        disabled: isDisabled,
        invalid: isError,
        required: isRequired,
        orientation: direction,
        size,
        color,
      }),
    }"
  >
    <div
      v-if="hasLabel"
      :id="labelId"
      :class="styles.groupLabel"
      v-bind="hooks('radio-group', 'label')"
    >
      <slot name="label">{{ label }}</slot>
    </div>
    <div :class="[styles.radioGroup, styles[direction]]" v-bind="listAttrs">
      <slot />
    </div>
    <div
      v-if="helperText"
      :id="helperId"
      :class="[styles.helperText, isError && styles.errorText]"
      v-bind="hooks('radio-group', 'helper-text')"
    >
      {{ helperText }}
    </div>
  </div>
</template>
