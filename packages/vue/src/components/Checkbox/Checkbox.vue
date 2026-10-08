<script setup lang="ts">
/**
 * Checkbox: a native checkbox with label, helper text and indeterminate
 * state. `v-model` (or `defaultChecked`); emits `change(checked, event)`.
 * Inside a FormControl it picks up the field's id, description, invalid,
 * required, disabled and read-only state.
 */
import { computed, ref, useAttrs, useId, watch } from "vue";
import styles from "@react-styles/components/Checkbox/checkbox.module.scss";
import { hooks } from "../../internal/hooks";
import { IconCircleInfoFilled } from "../../internal/icons";
import { useControllable } from "../../internal/controllable";
import {
  useFormControlContext,
  useFormControlProps,
} from "../../internal/form-control";
import { splitRootAttrs } from "./attrs";
import type { CheckboxProps } from "./types";

defineOptions({ name: "Checkbox", inheritAttrs: false });

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: undefined,
  defaultChecked: undefined,
  disabled: undefined,
  indeterminate: false,
  name: undefined,
  shape: "square",
  size: "medium",
  label: undefined,
  color: "primary",
  id: undefined,
  value: undefined,
  required: undefined,
  error: false,
  helperText: undefined,
  labelPlacement: "end",
});
const emit = defineEmits<{
  "update:modelValue": [checked: boolean];
  /** The user toggled the checkbox: the new state and the change event */
  change: [checked: boolean, event: Event];
}>();
const slots = defineSlots<{
  /** Label content (alternative to the `label` prop / slot) */
  default?: () => unknown;
  /** Label content (the `label` prop) */
  label?: () => unknown;
  /** Custom icon shown when checked */
  icon?: () => unknown;
  /** Icon before the helper text in the error state (default: info circle) */
  "error-icon"?: () => unknown;
}>();

const attrs = useAttrs();
const helperId = useId();
const inputRef = ref<HTMLInputElement | null>(null);

const checked = useControllable<boolean>(props, "modelValue", {
  defaultProp: "defaultChecked",
  fallback: false,
  name: "Checkbox",
});

// FormControl wiring. An explicit `disabled` / `required` prop wins over the
// FormControl's state (so `:disabled="false"` can opt out).
const fc = useFormControlContext();
const field = useFormControlProps(() => ({
  id: props.id,
  "aria-describedby":
    [props.helperText ? helperId : null, attrs["aria-describedby"]]
      .filter(Boolean)
      .join(" ") || undefined,
}));
const isDisabled = computed(
  () => props.disabled ?? fc?.disabled.value ?? false,
);
const isRequired = computed(
  () => props.required ?? fc?.required.value ?? false,
);
const isError = computed(() => props.error || !!fc?.invalid.value);
const isReadOnly = computed(() => !!fc?.readOnly.value);

// `indeterminate` only exists as a DOM property.
watch(
  [inputRef, () => props.indeterminate],
  ([input, indeterminate]) => {
    if (input) input.indeterminate = indeterminate;
  },
  { flush: "post", immediate: true },
);

function onClick(event: MouseEvent) {
  // A read-only field (FormControl readOnly) keeps its state.
  if (isReadOnly.value) event.preventDefault();
}

function onChange(event: Event) {
  const input = event.target as HTMLInputElement;
  /* v8 ignore next */
  if (isReadOnly.value) return;
  // A click clears the native indeterminate flag; the prop is the source of
  // truth, so re-apply it (the parent clears it when it wants to).
  input.indeterminate = props.indeterminate;
  const next = input.checked;
  checked.value = next;
  emit("change", next, event);
  // A controlled state wins: the DOM follows the prop, not the click.
  input.checked = checked.value;
}

const split = computed(() => splitRootAttrs(attrs));
const content = computed(
  () => !!slots.label || !!slots.default || !!props.label,
);

const labelClasses = computed(() => {
  const cap = (s: string) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
  return [
    styles.checkbox,
    styles[props.size],
    styles[props.shape],
    styles[`label${cap(props.labelPlacement)}`],
    props.color !== "primary" && styles[`color${cap(props.color)}`],
    isDisabled.value && styles.disabled,
    isError.value && styles.error,
  ];
});

const rootHooks = computed(() =>
  hooks("checkbox", "root", {
    state: props.indeterminate
      ? "indeterminate"
      : checked.value
        ? "checked"
        : "unchecked",
    disabled: isDisabled.value,
    invalid: isError.value,
    readonly: isReadOnly.value,
    required: isRequired.value,
    size: props.size,
    color: props.color,
    shape: props.shape,
  }),
);

const inputAttrs = computed(() => ({
  ...split.value.control,
  type: "checkbox",
  id: field.value.id,
  value: props.value,
  checked: checked.value,
  disabled: isDisabled.value,
  name: props.name,
  required: isRequired.value,
  "aria-checked": props.indeterminate ? ("mixed" as const) : undefined,
  "aria-invalid": isError.value || undefined,
  "aria-readonly": field.value["aria-readonly"],
  "aria-describedby": field.value["aria-describedby"],
  ...hooks("checkbox", "input"),
}));
</script>

<template>
  <div
    :class="[styles.checkboxWrapper, isError && styles.error]"
    v-bind="rootHooks"
  >
    <label :class="labelClasses" v-bind="split.root">
      <input
        ref="inputRef"
        :class="styles.input"
        v-bind="inputAttrs"
        @click="onClick"
        @change="onChange"
      />
      <span :class="styles.checkmark" v-bind="hooks('checkbox', 'control')">
        <slot v-if="checked && !indeterminate" name="icon" />
      </span>
      <span
        v-if="content"
        :class="styles.label"
        v-bind="hooks('checkbox', 'label')"
      >
        <slot name="label">
          <template v-if="label">{{ label }}</template>
          <slot v-else />
        </slot>
      </span>
    </label>
    <div v-if="helperText" :class="styles.helperTextWrapper">
      <span v-if="isError" :class="styles.errorIcon" aria-hidden="true">
        <slot name="error-icon"><IconCircleInfoFilled /></slot>
      </span>
      <span
        :id="helperId"
        :class="[styles.helperText, isError && styles.errorText]"
        v-bind="hooks('checkbox', 'helper-text')"
      >
        {{ helperText }}
      </span>
    </div>
  </div>
</template>
