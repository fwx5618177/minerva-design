<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string;
    value?: string;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    name?: string;
    type?: string;
    password?: boolean;
    maxlength?: number;
  }>(),
  { type: "text", maxlength: 140 },
);
const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();
function onInput(event: unknown) {
  const value = (event as { detail?: { value?: unknown } } | null)?.detail
    ?.value;
  if (typeof value !== "string") return;
  if (props.disabled || props.readOnly) return;
  emit("update:modelValue", value);
  emit("change", value);
}
</script>
<template>
  <input
    class="mn-input"
    :value="modelValue ?? value ?? ''"
    :disabled="disabled || readOnly"
    :placeholder="placeholder"
    :name="name"
    :type="type"
    :password="password"
    :maxlength="maxlength"
    data-minerva="input"
    data-part="input"
    @input="onInput"
  />
</template>
