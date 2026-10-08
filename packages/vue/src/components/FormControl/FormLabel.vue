<script setup lang="ts">
/**
 * FormLabel: label of the closest FormControl's control (`for` = its id),
 * with a required indicator while the field is required.
 */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/FormControl/formControl.module.scss";
import { hooks } from "../../internal/hooks";
import { useFormControlContext } from "../../internal/form-control";
import type { FormLabelProps } from "./types";

defineOptions({ name: "FormLabel", inheritAttrs: false });

const props = withDefaults(defineProps<FormLabelProps>(), {
  requiredIndicator: "*",
  htmlFor: undefined,
});
defineSlots<{
  /** Label text */
  default?: () => unknown;
  /** Required indicator (the `requiredIndicator` prop) */
  "required-indicator"?: () => unknown;
}>();

const attrs = useAttrs();
const ctx = useFormControlContext();

const labelAttrs = computed(() => ({
  id: ctx?.labelId.value,
  ...attrs,
  for: props.htmlFor ?? (attrs.for as string | undefined) ?? ctx?.id.value,
  ...hooks("form-control", "label"),
}));
</script>

<template>
  <label :class="styles.label" v-bind="labelAttrs">
    <slot />
    <span
      v-if="ctx?.required.value"
      :class="styles.required"
      aria-hidden="true"
      v-bind="hooks('form-control', 'required-indicator')"
    >
      <slot name="required-indicator">{{ requiredIndicator }}</slot>
    </span>
  </label>
</template>
