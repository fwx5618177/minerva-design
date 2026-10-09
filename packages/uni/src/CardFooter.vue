<script setup lang="ts">
defineProps<{
  label?: string;
  padding?: "none" | "small" | "medium" | "large";
}>();
</script>
<template>
  <view
    :style="
      padding === undefined
        ? undefined
        : {
            padding:
              padding === 'none'
                ? '0'
                : `var(--space-${padding === 'small' ? 3 : padding === 'large' ? 6 : 4})`,
          }
    "
    class="mn-card-footer"
    ><slot>{{ label }}</slot></view
  >
</template>
