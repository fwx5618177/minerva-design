<script setup lang="ts">
/**
 * Input: a single-line text input with optional prefix / suffix, clear
 * button, character count and password visibility toggle. `v-model` (or
 * `defaultValue`). Inside a FormControl it picks up the id, aria wiring,
 * invalid, required, disabled and read-only state. The `class` goes to the
 * wrapper; other attributes and native listeners go to the `<input>`.
 */
import { computed, ref, useAttrs, useId, type InputHTMLAttributes } from "vue";
import styles from "@react-styles/components/Input/input.module.scss";
import { hooks } from "../../internal/hooks";
import { IconEye, IconEyeOff, IconX } from "../../internal/icons";
import { useControllable } from "../../internal/controllable";
import {
  isAriaInvalid,
  useFormControlProps,
} from "../../internal/form-control";
import { useI18n } from "../../config/useI18n";
import type { InputProps } from "./types";

defineOptions({ name: "Input", inheritAttrs: false });

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  type: "text",
  variant: "outline",
  size: "medium",
  invalid: false,
  disabled: false,
  readOnly: false,
  required: false,
  id: undefined,
  maxLength: undefined,
  prefix: undefined,
  suffix: undefined,
  clearable: false,
  clearLabel: undefined,
  showCharCount: false,
  showPasswordLabel: undefined,
  hidePasswordLabel: undefined,
});
const emit = defineEmits<{
  "update:modelValue": [value: string];
  /** The clear button emptied the field */
  clear: [];
}>();
const slots = defineSlots<{
  /** Content before the text (the `prefix` prop) */
  prefix?: () => unknown;
  /** Content after the text (the `suffix` prop) */
  suffix?: () => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();
const countId = useId();
const inputRef = ref<HTMLInputElement | null>(null);

const value = useControllable<string | number>(props, "modelValue", {
  defaultProp: "defaultValue",
  fallback: "",
  name: "Input",
});
const text = computed(() => String(value.value ?? ""));

const field = useFormControlProps(() => ({
  id: props.id,
  disabled: props.disabled,
  readOnly: props.readOnly,
  "aria-describedby":
    [
      attrs["aria-describedby"] as string | undefined,
      props.showCharCount ? countId : null,
    ]
      .filter(Boolean)
      .join(" ") || undefined,
  "aria-invalid": attrs["aria-invalid"],
}));
const isInvalid = computed(
  () => props.invalid || isAriaInvalid(field.value["aria-invalid"]),
);
const isDisabled = computed(() => field.value.disabled);
const isReadOnly = computed(() => field.value.readOnly);

const passwordVisible = ref(false);
const isPassword = computed(() => props.type === "password");

function onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  value.value = input.value;
  // A controlled value wins: put it back when the parent keeps it
  if (props.modelValue !== undefined && input.value !== text.value) {
    input.value = text.value;
  }
}

function clear() {
  const input = inputRef.value;
  /* v8 ignore next */
  if (!input) return;
  input.value = "";
  input.dispatchEvent(new Event("input", { bubbles: true }));
  emit("clear");
  // The clear button disappears; keep focus in the field.
  input.focus();
}

const hasPrefix = computed(() => props.prefix != null || !!slots.prefix);
const hasSuffix = computed(() => props.suffix != null || !!slots.suffix);
const showClear = computed(
  () =>
    props.clearable &&
    text.value !== "" &&
    !isDisabled.value &&
    !isReadOnly.value,
);
const passwordLabel = computed(() =>
  passwordVisible.value
    ? (props.hidePasswordLabel ?? t("input.hidePassword"))
    : (props.showPasswordLabel ?? t("input.showPassword")),
);
const count = computed(() =>
  props.maxLength != null && props.maxLength >= 0
    ? `${text.value.length} / ${props.maxLength}`
    : String(text.value.length),
);

const rootAttrs = computed(() => ({
  class: [
    styles.root,
    styles[props.variant],
    styles[props.size],
    isInvalid.value && styles.invalid,
    isDisabled.value && styles.disabled,
    attrs.class,
  ],
  // Lets layouts such as Toolbar size text fields
  "data-component": "input",
  ...hooks("input", "root", {
    disabled: isDisabled.value,
    invalid: isInvalid.value,
    readonly: isReadOnly.value,
    required: props.required || !!field.value["aria-required"],
    size: props.size,
    variant: props.variant,
  }),
}));

const inputAttrs = computed(() => {
  const { class: _class, ...rest } = attrs;
  const wired = field.value;
  return {
    ...rest,
    id: wired.id,
    disabled: wired.disabled,
    readonly: wired.readOnly,
    required: props.required,
    maxlength: props.maxLength,
    "aria-describedby": wired["aria-describedby"],
    "aria-invalid": props.invalid ? true : wired["aria-invalid"],
    "aria-required":
      wired["aria-required"] ??
      (rest["aria-required"] as InputHTMLAttributes["aria-required"]),
    "aria-readonly":
      wired["aria-readonly"] ??
      (rest["aria-readonly"] as InputHTMLAttributes["aria-readonly"]),
    type: isPassword.value && passwordVisible.value ? "text" : props.type,
    value: text.value,
    ...hooks("input", "input"),
  };
});
</script>

<template>
  <div v-bind="rootAttrs">
    <span
      v-if="hasPrefix"
      :class="[styles.addon, styles.start]"
      v-bind="hooks('input', 'prefix')"
    >
      <slot name="prefix">{{ prefix }}</slot>
    </span>
    <input
      ref="inputRef"
      :class="styles.field"
      v-bind="inputAttrs"
      @input="onInput"
    />
    <button
      v-if="showClear"
      type="button"
      :class="styles.action"
      :aria-label="clearLabel ?? t('input.clear')"
      v-bind="hooks('input', 'clear-button')"
      @click="clear"
    >
      <IconX />
    </button>
    <button
      v-if="isPassword"
      type="button"
      :class="styles.action"
      :aria-label="passwordLabel"
      :disabled="isDisabled"
      v-bind="hooks('input', 'password-toggle')"
      @click="passwordVisible = !passwordVisible"
    >
      <IconEyeOff v-if="passwordVisible" />
      <IconEye v-else />
    </button>
    <span
      v-if="showCharCount"
      :id="countId"
      :class="styles.count"
      v-bind="hooks('input', 'count')"
    >
      {{ count }}
    </span>
    <span
      v-if="hasSuffix"
      :class="[styles.addon, styles.end]"
      v-bind="hooks('input', 'suffix')"
    >
      <slot name="suffix">{{ suffix }}</slot>
    </span>
  </div>
</template>
