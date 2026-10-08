<script setup lang="ts">
/**
 * FormControl: field container that shares id / invalid / required /
 * disabled / read-only state with its label, control, helper text and error
 * message. Controls inside read it with `useFormControlProps`
 * (`internal/form-control.ts`). Attributes fall through to the `<div>`.
 */
import { computed, provide, ref, useAttrs, useId } from "vue";
import styles from "@react-styles/components/FormControl/formControl.module.scss";
import { hooks } from "../../internal/hooks";
import {
  FORM_CONTROL_KEY,
  type FormControlContext,
} from "../../internal/form-control";
import type { FormControlProps } from "./types";

defineOptions({ name: "FormControl", inheritAttrs: false });

const props = withDefaults(defineProps<FormControlProps>(), {
  invalid: false,
  required: false,
  disabled: false,
  readOnly: false,
  id: undefined,
});
defineSlots<{
  /** Field content: FormLabel, a control, FormHelperText, FormErrorMessage */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const autoId = useId();
const id = computed(() => props.id ?? `field-${autoId}`);

const context: FormControlContext = {
  id,
  labelId: computed(() => `${id.value}-label`),
  helperId: computed(() => `${id.value}-helper`),
  errorId: computed(() => `${id.value}-error`),
  invalid: computed(() => props.invalid),
  required: computed(() => props.required),
  disabled: computed(() => props.disabled),
  readOnly: computed(() => props.readOnly),
  helperTexts: ref(0),
  errorMessages: ref(0),
};
provide(FORM_CONTROL_KEY, context);

const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("form-control", "root", {
    disabled: props.disabled,
    invalid: props.invalid,
    readonly: props.readOnly,
    required: props.required,
  }),
}));
</script>

<template>
  <div :class="styles.root" v-bind="rootAttrs">
    <slot />
  </div>
</template>
