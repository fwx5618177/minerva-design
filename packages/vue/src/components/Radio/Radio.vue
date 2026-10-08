<script setup lang="ts">
/**
 * Radio: a native radio input. Inside a RadioGroup, the group drives its
 * checked state, name, size, color and disabled state; standalone it is
 * `v-model` (or `defaultChecked`) and emits `change(checked, event)`.
 */
import { computed, inject, onBeforeUnmount, ref, useAttrs, useId } from "vue";
import styles from "@react-styles/components/Radio/radio.module.scss";
import { hooks } from "../../internal/hooks";
import { IconCircleInfoFilled } from "../../internal/icons";
import { useFormControlContext } from "../../internal/form-control";
import { splitRootAttrs } from "../Checkbox/attrs";
import { RADIO_GROUP_KEY } from "./context";
import type { RadioProps } from "./types";

defineOptions({ name: "Radio", inheritAttrs: false });

const props = withDefaults(defineProps<RadioProps>(), {
  modelValue: undefined,
  defaultChecked: undefined,
  disabled: undefined,
  name: undefined,
  value: undefined,
  size: "medium",
  color: "primary",
  label: undefined,
  id: undefined,
  required: false,
  error: false,
  errorMessage: undefined,
  helperText: undefined,
});
const emit = defineEmits<{
  "update:modelValue": [checked: boolean];
  /** A standalone radio was checked (inside a group: RadioGroup `change`) */
  change: [checked: boolean, event: Event];
}>();
const slots = defineSlots<{
  /** Label content (alternative to the `label` prop / slot) */
  default?: () => unknown;
  /** Label content (the `label` prop) */
  label?: () => unknown;
  /** Icon before the error message (default: info circle) */
  "error-icon"?: () => unknown;
}>();

const attrs = useAttrs();
const group = inject(RADIO_GROUP_KEY, null);
const fc = useFormControlContext();
const helperId = useId();
const inputRef = ref<HTMLInputElement | null>(null);

// An explicit `disabled` wins over an enclosing FormControl's state.
const ownDisabled = computed(
  () => props.disabled ?? fc?.disabled.value ?? false,
);
const isChecked = computed<boolean | undefined>(() =>
  group
    ? group.value.value !== undefined && group.value.value === props.value
    : props.modelValue,
);
const isDisabled = computed(() =>
  group ? group.disabled.value || ownDisabled.value : ownDisabled.value,
);
const radioSize = computed(() => group?.size.value || props.size);
const radioColor = computed(() => group?.color.value ?? props.color);
const helper = computed(() =>
  props.error ? props.errorMessage : props.helperText,
);
const hasLabel = computed(
  () => !!props.label || !!slots.label || !!slots.default,
);

/** Puts the DOM `checked` back to the state (controlled radios) */
const sync = () => {
  if (inputRef.value && isChecked.value !== undefined) {
    inputRef.value.checked = isChecked.value;
  }
};
if (group) onBeforeUnmount(group.register(sync));

function onChange(event: Event) {
  /* v8 ignore next */
  if (ownDisabled.value) return;
  const input = event.target as HTMLInputElement;
  if (group) {
    if (props.value !== undefined) group.onChange(props.value, event);
    return;
  }
  emit("update:modelValue", input.checked);
  emit("change", input.checked, event);
  sync();
}

const split = computed(() => splitRootAttrs(attrs));

const inputAttrs = computed(() => ({
  ...split.value.control,
  type: "radio",
  name: group ? group.name.value : props.name,
  value: props.value,
  // Uncontrolled standalone radio: the DOM holds the state
  checked: isChecked.value ?? (group ? undefined : props.defaultChecked),
  disabled: isDisabled.value,
  required: props.required,
  id: props.id,
  // Consumer descriptions are merged with the helper / error text.
  "aria-describedby":
    [helper.value ? helperId : null, attrs["aria-describedby"]]
      .filter(Boolean)
      .join(" ") || undefined,
  ...hooks("radio", "input"),
}));
</script>

<template>
  <div
    :class="[
      styles.radioWrapper,
      styles[radioSize],
      styles[radioColor],
      error && styles.error,
    ]"
    v-bind="{
      ...split.root,
      ...hooks('radio', 'root', {
        state:
          isChecked === undefined
            ? undefined
            : isChecked
              ? 'checked'
              : 'unchecked',
        disabled: isDisabled,
        invalid: error,
        size: radioSize,
        color: radioColor,
      }),
    }"
  >
    <label :class="[styles.radio, isDisabled && styles.disabled]">
      <input
        ref="inputRef"
        :class="styles.input"
        v-bind="inputAttrs"
        @change="onChange"
      />
      <span :class="styles.radioMark" v-bind="hooks('radio', 'control')" />
      <span
        v-if="hasLabel"
        :class="styles.label"
        v-bind="hooks('radio', 'label')"
      >
        <slot name="label">
          <template v-if="label">{{ label }}</template>
          <slot v-else />
        </slot>
      </span>
    </label>
    <div v-if="helper" :class="styles.helperTextWrapper">
      <span
        v-if="error && errorMessage"
        :class="styles.errorIcon"
        aria-hidden="true"
      >
        <slot name="error-icon"><IconCircleInfoFilled /></slot>
      </span>
      <span
        :id="helperId"
        :class="[styles.helperText, error && styles.errorText]"
        v-bind="hooks('radio', 'helper-text')"
      >
        {{ helper }}
      </span>
    </div>
  </div>
</template>
