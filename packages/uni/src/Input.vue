<script setup lang="ts">
import { useI18n } from "./i18n";
const { t } = useI18n();
import { computed, ref, inject, type ComputedRef } from "vue";
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    required?: boolean;
    placeholder?: string;
    name?: string;
    id?: string;
    role?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    ariaControls?: string;
    ariaExpanded?: boolean | "true" | "false";
    ariaActivedescendant?: string;
    ariaAutocomplete?: "none" | "inline" | "list" | "both";
    type?: string;
    password?: boolean;
    maxlength?: number;
    maxLength?: number;
    variant?: string;
    size?: string;
    clearable?: boolean;
    showCharCount?: boolean;
    clearLabel?: string;
    prefix?: string;
    suffix?: string;
    showPasswordLabel?: string;
    hidePasswordLabel?: string;
  }>(),
  {
    type: "text",
    maxlength: 140,
    variant: "outline",
    size: "medium",
    disabled: undefined,
    readOnly: undefined,
    invalid: undefined,
    required: undefined,
  },
);
const form = inject<ComputedRef<Record<string, any>> | null>(
  "minerva:form",
  null,
);
const disabled = computed(
    () => props.disabled ?? form?.value.disabled ?? false,
  ),
  readonly = computed(() => props.readOnly ?? form?.value.readOnly ?? false),
  invalid = computed(() => props.invalid ?? form?.value.invalid ?? false);
const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
  clear: [];
  focus: [event: unknown];
  blur: [event: unknown];
  confirm: [value: string];
}>();
const local = ref(props.defaultValue ?? "");
const current = computed(() => props.modelValue ?? props.value ?? local.value);
const visible = ref(false);
const focused = ref(false);
const isPassword = computed(() => props.password || props.type === "password");
function change(value: string) {
  if (disabled.value || readonly.value) return;
  local.value = value;
  emit("update:modelValue", value);
  emit("change", value);
}
function onInput(event: any) {
  if (typeof event?.detail?.value === "string") change(event.detail.value);
  return current.value;
}
function clear() {
  if (disabled.value || readonly.value) return;
  change("");
  focused.value = true;
  emit("clear");
}
</script>
<template>
  <view
    class="mn-input-wrapper"
    :class="[
      `mn-input-${variant}`,
      `mn-size-${size}`,
      { 'mn-invalid': invalid, 'mn-disabled': disabled },
    ]"
    ><text v-if="prefix">{{ prefix }}</text
    ><slot name="prefix" /><input
      class="mn-input"
      :id="id ?? form?.id"
      :role="role"
      :aria-label="props.ariaLabel"
      :aria-labelledby="props.ariaLabelledby"
      :aria-describedby="props.ariaDescribedby"
      :aria-controls="props.ariaControls"
      :aria-expanded="props.ariaExpanded"
      :aria-activedescendant="props.ariaActivedescendant"
      :aria-autocomplete="props.ariaAutocomplete"
      :value="current"
      :class="{ 'mn-disabled': disabled || readonly }"
      :disabled="disabled || readonly"
      :placeholder="placeholder"
      :name="name"
      :type="isPassword ? 'text' : type"
      :password="isPassword && !visible"
      :maxlength="maxLength ?? maxlength"
      :focus="focused"
      :aria-invalid="invalid"
      :aria-required="required ?? form?.required"
      data-minerva="input"
      data-part="input"
      @input="onInput"
      @focus="emit('focus', $event)"
      @blur="
        focused = false;
        emit('blur', $event);
      "
      @confirm="emit('confirm', current)" /><button
      v-if="clearable && current && !disabled && !readonly"
      class="mn-close"
      data-action="clear"
      :aria-label="clearLabel ?? t('input.clear')"
      @tap="clear"
    >
      ×</button
    ><button
      v-if="isPassword"
      class="mn-close"
      data-action="password"
      :class="{ 'mn-disabled': disabled }"
      :disabled="disabled"
      :aria-label="
        visible
          ? (hidePasswordLabel ?? t('input.hidePassword'))
          : (showPasswordLabel ?? t('input.showPassword'))
      "
      @tap="visible = !visible"
    >
      {{ visible ? t("input.hidePassword") : t("input.showPassword") }}</button
    ><text v-if="showCharCount" class="mn-muted"
      >{{ current.length
      }}{{
        (maxLength ?? maxlength) > 0 ? ` / ${maxLength ?? maxlength}` : ""
      }}</text
    ><text v-if="suffix">{{ suffix }}</text
    ><slot name="suffix"
  /></view>
</template>
