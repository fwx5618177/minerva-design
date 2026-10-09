<script setup lang="ts">
import { computed, ref, nextTick, watch } from "vue";
import { inheritForm } from "./form-context";
const rawProps = withDefaults(
  defineProps<{
    modelValue?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    invalid?: boolean;
    required?: boolean;
    name?: string;
    id?: string;
    ariaLabel?: string;
    ariaLabelledby?: string;
    ariaDescribedby?: string;
    placeholder?: string;
    maxlength?: number;
    maxLength?: number;
    rows?: number;
    autoHeight?: boolean;
    variant?: "outline" | "filled" | "unstyled";
    size?: "small" | "medium" | "large";
  }>(),
  {
    maxlength: -1,
    variant: "outline",
    size: "medium",
    disabled: undefined,
    readOnly: undefined,
    invalid: undefined,
    required: undefined,
  },
);
const props = inheritForm(rawProps);
const local = ref(props.defaultValue ?? "");
const current = computed(() => props.modelValue ?? props.value ?? local.value);
const displayed = ref(current.value);
watch(current, (value) => {
  displayed.value = value;
});
const emit = defineEmits<{
  change: [value: string];
  "update:modelValue": [value: string];
  focus: [event: unknown];
  blur: [event: unknown];
  confirm: [value: string];
}>();
function onInput(event: {
  detail?: { value?: string } | number;
  target?: EventTarget | null;
}) {
  const target = event.target as HTMLTextAreaElement | undefined;
  const value =
    (typeof event.detail === "object" ? event.detail?.value : undefined) ??
    target?.value ??
    "";
  // Commit the native draft once, then publish the owner’s accepted value.
  // A textarea ignores handler return values; two renders also restore a
  // rejected edit without remounting the field or losing its keyboard focus.
  displayed.value = value;
  if (!props.disabled && !props.readOnly) {
    local.value = value;
    emit("update:modelValue", value);
    emit("change", value);
  }
  void nextTick(() => {
    displayed.value = current.value;
  });
}
</script>
<template>
  <textarea
    class="mn-input mn-textarea mn-uni-textarea"
    :class="[
      `mn-textarea-${size}`,
      `mn-textarea-${variant}`,
      {
        'mn-invalid': props.invalid,
        'mn-disabled': props.disabled || props.readOnly,
      },
    ]"
    :value="displayed"
    :disabled="props.disabled || props.readOnly"
    :aria-readonly="props.readOnly"
    :aria-invalid="props.invalid"
    :aria-required="props.required"
    :aria-label="ariaLabel"
    :aria-labelledby="ariaLabelledby"
    :aria-describedby="ariaDescribedby"
    :name="name"
    :id="id"
    :placeholder="placeholder"
    :maxlength="maxLength ?? maxlength"
    :auto-height="autoHeight"
    :rows="rows"
    @input="onInput"
    @focus="emit('focus', $event)"
    @blur="emit('blur', $event)"
    @confirm="emit('confirm', current)"
  />
</template>
