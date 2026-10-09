<script setup lang="ts">
const props = defineProps<{
  checked?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  name?: string;
  color?: string;
}>();
const emit = defineEmits<{
  "update:checked": [checked: boolean];
  change: [checked: boolean];
}>();
function onChange(event: unknown) {
  const value = (event as { detail?: { value?: unknown } } | null)?.detail
    ?.value;
  if (typeof value !== "boolean") return;
  if (props.disabled || props.readOnly) return;
  emit("update:checked", value);
  emit("change", value);
}
</script>
<template>
  <switch
    class="mn-switch"
    :checked="checked"
    :disabled="disabled || readOnly"
    :name="name"
    :color="color"
    data-minerva="switch"
    data-part="root"
    @change="onChange"
  />
</template>
