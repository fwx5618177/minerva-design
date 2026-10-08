<script setup lang="ts">
/**
 * Textarea: multi-line text input sharing Input's look. Manual resizing is
 * disabled (set `rows` or layout dimensions instead). `v-model` (or
 * `defaultValue`); FormControl-aware.
 */
import { computed, useAttrs, type StyleValue } from "vue";
import styles from "@react-styles/components/Textarea/textarea.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import {
  isAriaInvalid,
  useFormControlProps,
} from "../../internal/form-control";
import type { TextareaProps } from "./types";

defineOptions({ name: "Textarea", inheritAttrs: false });

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  variant: "outline",
  size: "medium",
  invalid: false,
  disabled: false,
  readOnly: false,
  required: false,
  id: undefined,
});
defineEmits<{ "update:modelValue": [value: string] }>();

const attrs = useAttrs();
const value = useControllable<string | number>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: "",
  name: "Textarea",
});
const text = computed(() => String(value.value ?? ""));

const field = useFormControlProps(() => ({
  id: props.id,
  disabled: props.disabled,
  readOnly: props.readOnly,
  "aria-describedby": attrs["aria-describedby"] as string | undefined,
  "aria-invalid": attrs["aria-invalid"],
}));
const isInvalid = computed(
  () => props.invalid || isAriaInvalid(field.value["aria-invalid"]),
);

function onInput(event: Event) {
  const textarea = event.target as HTMLTextAreaElement;
  value.value = textarea.value;
  // A controlled value wins: put it back when the parent keeps it
  if (props.modelValue !== undefined && textarea.value !== text.value) {
    textarea.value = text.value;
  }
}

const textareaAttrs = computed(() => {
  const wired = field.value;
  return {
    ...attrs,
    class: [
      styles.textarea,
      styles[props.variant],
      styles[props.size],
      isInvalid.value && styles.invalid,
      attrs.class,
    ],
    style: [attrs.style as StyleValue, { resize: "none" as const }],
    id: wired.id,
    disabled: wired.disabled,
    readonly: wired.readOnly,
    required: props.required,
    "aria-describedby": wired["aria-describedby"],
    "aria-invalid": props.invalid ? true : wired["aria-invalid"],
    "aria-required": wired["aria-required"],
    "aria-readonly": wired["aria-readonly"],
    value: text.value,
    ...hooks("textarea", "root", {
      disabled: wired.disabled,
      invalid: isInvalid.value,
      readonly: wired.readOnly,
      required: props.required || !!wired["aria-required"],
      size: props.size,
      variant: props.variant,
    }),
  };
});
</script>

<template>
  <textarea v-bind="textareaAttrs" @input="onInput" />
</template>
