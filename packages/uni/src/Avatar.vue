<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useI18n } from "./i18n";
const props = withDefaults(
  defineProps<{
    src?: string;
    name?: string;
    alt?: string;
    fallback?: string;
    size?: number | string;
    shape?: "circle" | "square" | "rounded";
    stacked?: boolean;
    ariaLabel?: string;
  }>(),
  { size: "medium", shape: "circle" },
);
const { t } = useI18n();
const failed = ref(false);
watch(
  () => props.src,
  () => (failed.value = false),
);
const pixels = computed(() =>
  typeof props.size === "number"
    ? `${props.size}px`
    : ({
        xsmall: 24,
        small: 32,
        medium: 48,
        large: 64,
        xlarge: 80,
        xxlarge: 96,
      }[props.size] ?? props.size) +
      (/^\d+$/.test(
        String(
          {
            xsmall: 24,
            small: 32,
            medium: 48,
            large: 64,
            xlarge: 80,
            xxlarge: 96,
          }[props.size] ?? props.size,
        ),
      )
        ? "px"
        : ""),
);
const initials = computed(() => {
  const name = props.name?.trim() ?? "";
  if (/[\u3400-\u9fff]/.test(name[0] ?? "")) return name[0];
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0] ?? "")
    .join("")
    .toUpperCase();
});
const label = computed(
  () => props.ariaLabel ?? props.name ?? t("avatar.default"),
);
</script>
<template>
  <view
    class="mn-avatar mn-uni-avatar"
    :class="[`mn-shape-${shape}`, { 'mn-avatar-stacked': stacked }]"
    role="img"
    :aria-label="alt === '' ? undefined : label"
    :aria-hidden="alt === '' || undefined"
    :style="{
      width: pixels,
      height: pixels,
      fontSize: `calc(${pixels} * .36)`,
    }"
    ><image
      v-if="src && !failed"
      class="mn-avatar-image"
      :src="src"
      :alt="alt ?? label"
      mode="aspectFill"
      @error="failed = true"
    /><text v-else
      ><slot name="fallback"
        >{{ fallback ?? initials
        }}<slot v-if="!fallback && !initials">?</slot></slot
      ></text
    ></view
  >
</template>
