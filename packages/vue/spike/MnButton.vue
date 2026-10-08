<script setup lang="ts">
export type MnButtonVariant = "primary" | "secondary" | "ghost";

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    loading?: boolean;
    variant?: MnButtonVariant;
  }>(),
  { disabled: false, loading: false, variant: "primary" },
);

const emit = defineEmits<{ press: [event: MouseEvent] }>();

function onClick(event: MouseEvent) {
  if (props.disabled || props.loading) return;
  emit("press", event);
}
</script>

<template>
  <button
    type="button"
    :class="['mn-button', `mn-button--${variant}`]"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="onClick"
  >
    <slot />
  </button>
</template>
