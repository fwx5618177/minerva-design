<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "./i18n";
const props = withDefaults(
  defineProps<{
    variant?: "spinner" | "bar" | "wave" | "circle" | "dottedBar";
    size?: "xsmall" | "small" | "medium" | "large" | "xlarge";
    color?: "primary" | "neutral" | "current";
    icon?: string;
    label?: string;
    ariaLabel?: string;
    decorative?: boolean;
    width?: string;
    full?: boolean;
    value?: number;
    max?: number;
    indeterminate?: boolean;
    showLabel?: boolean;
    status?: string;
  }>(),
  {
    variant: "spinner",
    size: "medium",
    color: "primary",
    max: 100,
    indeterminate: undefined,
  },
);
const { t } = useI18n();
const percent = computed(() =>
  Math.min(
    100,
    Math.max(0, ((props.value ?? 0) / Math.max(1, props.max)) * 100),
  ),
);
const indefinite = computed(
  () => props.indeterminate ?? props.value === undefined,
);
const diameter = computed(
  () =>
    ({ xsmall: 12, small: 16, medium: 24, large: 32, xlarge: 48 })[props.size],
);
const tone = computed(() =>
  props.color === "current"
    ? "currentColor"
    : `var(--${props.color === "neutral" ? "text-muted" : "primary"}-color)`,
);
</script>
<template>
  <view
    class="mn-uni-progress"
    :class="{
      'mn-progress-indeterminate': indefinite,
      'mn-progress-full': full,
    }"
    :role="decorative ? undefined : 'progressbar'"
    :aria-hidden="decorative || undefined"
    :aria-label="
      decorative ? undefined : (props.ariaLabel ?? label ?? t('common.loading'))
    "
    :aria-valuemin="decorative ? undefined : 0"
    :aria-valuemax="decorative ? undefined : 100"
    :aria-valuenow="decorative || indefinite ? undefined : percent"
    :style="{
      width: full ? '100%' : width,
      '--mn-progress-diameter': `${diameter}px`,
      '--mn-progress-color': tone,
    }"
  >
    <slot name="icon"
      ><text v-if="icon">{{ icon }}</text></slot
    >
    <view
      v-if="variant === 'spinner' || variant === 'circle'"
      :data-progress-visual="variant"
      class="mn-progress-ring"
      :class="{ 'mn-ring-indeterminate': indefinite }"
      :style="
        !indefinite
          ? {
              background: `conic-gradient(${tone} ${percent}%, var(--surface-muted-color) 0)`,
            }
          : undefined
      "
      ><view class="mn-progress-ring-hole"
    /></view>
    <view
      v-else-if="variant === 'bar'"
      data-progress-visual="bar"
      class="mn-progress-track"
      ><view
        class="mn-progress-fill"
        :style="{ width: `${indefinite ? 35 : percent}%`, background: tone }"
    /></view>
    <view
      v-else
      :data-progress-visual="variant"
      class="mn-progress-segments"
      :class="`mn-progress-${variant}`"
      ><view
        v-for="n in 5"
        :key="n"
        class="mn-progress-segment"
        :style="{
          animationDelay: `${(n - 1) * 0.12}s`,
          opacity: !indefinite && n * 20 > percent ? 0.25 : undefined,
        }"
    /></view>
    <slot name="label"
      ><text v-if="label">{{ label }}</text></slot
    ><text v-if="showLabel && !indefinite">{{ Math.round(percent) }}%</text>
  </view>
</template>
