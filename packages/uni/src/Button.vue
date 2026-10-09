<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean;
    loading?: boolean;
    size?: "small" | "medium" | "large";
    variant?: "solid" | "outline" | "ghost";
  }>(),
  { size: "medium", variant: "solid" },
);
const emit = defineEmits<{ click: [event: unknown] }>();
</script>
<template>
  <button
    class="mn-button"
    :class="[`mn-size-${size}`, `mn-variant-${variant}`]"
    :disabled="disabled || loading"
    :loading="loading"
    data-minerva="button"
    data-part="root"
    @tap="!disabled && !loading && emit('click', $event)"
  >
    <slot />
  </button>
</template>
