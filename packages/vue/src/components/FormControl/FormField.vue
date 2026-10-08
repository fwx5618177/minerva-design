<script setup lang="ts">
/**
 * FormField: FormControl + FormLabel + helper text + error message in one
 * component. An error message (prop or slot) makes the field invalid unless
 * `invalid` is set explicitly. Attributes fall through to the FormControl.
 */
import { computed } from "vue";
import FormControl from "./FormControl.vue";
import FormLabel from "./FormLabel.vue";
import FormHelperText from "./FormHelperText.vue";
import FormErrorMessage from "./FormErrorMessage.vue";
import type { FormFieldProps } from "./types";

defineOptions({ name: "FormField" });

const props = withDefaults(defineProps<FormFieldProps>(), {
  label: undefined,
  helperText: undefined,
  errorMessage: undefined,
  invalid: undefined,
  required: false,
  disabled: false,
  readOnly: false,
  id: undefined,
});
const slots = defineSlots<{
  /** The control */
  default?: () => unknown;
  /** Label (the `label` prop) */
  label?: () => unknown;
  /** Help text (the `helperText` prop) */
  "helper-text"?: () => unknown;
  /** Error message (the `errorMessage` prop) */
  "error-message"?: () => unknown;
}>();

const hasError = computed(
  () => !!props.errorMessage || !!slots["error-message"],
);
const isInvalid = computed(() => props.invalid ?? hasError.value);
</script>

<template>
  <FormControl
    :invalid="isInvalid"
    :required="required"
    :disabled="disabled"
    :read-only="readOnly"
    :id="id"
  >
    <FormLabel>
      <slot name="label">{{ label }}</slot>
    </FormLabel>
    <slot />
    <FormHelperText v-if="helperText || slots['helper-text']">
      <slot name="helper-text">{{ helperText }}</slot>
    </FormHelperText>
    <FormErrorMessage v-if="hasError">
      <slot name="error-message">{{ errorMessage }}</slot>
    </FormErrorMessage>
  </FormControl>
</template>
