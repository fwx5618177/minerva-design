<script setup lang="ts">
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
    variant?: "solid" | "outline" | "ghost" | "link";
    color?: string;
    fullWidth?: boolean;
    active?: boolean;
    shape?: string;
    borderRadius?: string | number;
    type?: "button" | "submit" | "reset";
    startIcon?: string;
    endIcon?: string;
  }>(),
  { size: "medium", variant: "solid", color: "primary", type: "button" },
);
const emit = defineEmits<{ click: [event: unknown] }>();
const radius = computed(() =>
  typeof props.borderRadius === "number"
    ? `${props.borderRadius}px`
    : (
        {
          none: "0",
          square: "0",
          small: "4px",
          medium: "8px",
          large: "12px",
          circle: "9999px",
        } as Record<string, string>
      )[props.borderRadius ?? ""],
);
</script>
<template>
  <button
    class="mn-button"
    :class="[
      [
        `mn-size-${size}`,
        `mn-variant-${variant}`,
        `mn-color-${color}`,
        `mn-shape-${shape || 'rounded'}`,
        { 'mn-full-width': fullWidth, 'mn-active': active },
      ],
      { 'mn-disabled': disabled || loading },
    ]"
    :style="{ borderRadius: radius }"
    :disabled="disabled"
    :aria-disabled="disabled || loading || undefined"
    :aria-busy="loading || undefined"
    :loading="loading"
    :form-type="loading || type === 'button' ? undefined : type"
    data-minerva="button"
    data-part="root"
    @tap="!disabled && !loading && emit('click', $event)"
  >
    <template v-if="loading && loadingText">{{ loadingText }}</template
    ><template v-else
      ><text v-if="!loading && startIcon">{{ startIcon }}</text
      ><slot v-if="!loading" name="startIcon" /><slot /><text
        v-if="!loading && endIcon"
        >{{ endIcon }}</text
      ><slot v-if="!loading" name="endIcon"
    /></template>
  </button>
</template>
