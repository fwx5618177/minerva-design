<script setup lang="ts">
import { computed } from "vue";
import { useI18n } from "./i18n";
import { cssLength, lineCount } from "./primitives";
const { t } = useI18n();
const props = withDefaults(
  defineProps<{
    variant?:
      | "text"
      | "circular"
      | "rectangular"
      | "rounded"
      | "button"
      | "image"
      | "card";
    animation?: "pulse" | "wave" | "false";
    decorative?: boolean;
    size?: string | number;
    width?: string | number;
    height?: string | number;
    circle?: boolean;
    animated?: boolean;
    loading?: boolean;
    borderRadius?: string | number;
    lines?: number;
    avatar?: boolean;
    avatarSize?: string | number;
    avatarShape?: "circle" | "square";
    active?: boolean;
    paragraph?: boolean;
    title?: boolean;
    ariaLabel?: string;
  }>(),
  {
    variant: "text",
    loading: true,
    lines: 1,
    avatarSize: 40,
    avatarShape: "circle",
    animated: undefined,
  },
);
const animation = computed(
  () => props.animation ?? (props.animated === false ? "false" : "pulse"),
);
const variant = computed(() => (props.circle ? "circular" : props.variant));
const classes = computed(() => [
  `mn-skeleton-${variant.value}`,
  `mn-skeleton-animation-${animation.value}`,
]);
const blockStyle = computed(() => ({
  width: cssLength(
    props.decorative && variant.value === "circular"
      ? (props.size ?? props.width ?? 32)
      : props.width,
  ),
  height: cssLength(
    props.decorative && variant.value === "circular"
      ? (props.size ?? props.width ?? 32)
      : props.height,
  ),
  borderRadius: cssLength(props.borderRadius),
}));
const rows = computed(() =>
  props.paragraph
    ? ["100%", "100%", "92%", "60%"]
    : props.title || variant.value === "card"
      ? []
      : Array.from({ length: lineCount(props.lines) }, () => undefined),
);
</script>
<template>
  <slot v-if="!loading" />
  <view
    v-else-if="decorative"
    class="mn-skeleton-block mn-skeleton-decorative"
    :class="classes"
    :style="blockStyle"
    aria-hidden="true"
    data-part="root"
  />
  <view
    v-else
    class="mn-uni-skeleton"
    :class="{
      'mn-skeleton-with-avatar': avatar,
      'mn-skeleton-card': variant === 'card',
      'mn-skeleton-active': variant === 'card' && active,
    }"
    role="status"
    aria-busy="true"
    :aria-label="ariaLabel ?? t('common.loading')"
    data-part="root"
  >
    <view
      v-if="avatar"
      class="mn-skeleton-block mn-skeleton-avatar"
      :class="[
        `mn-skeleton-animation-${animation}`,
        `mn-skeleton-avatar-${avatarShape}`,
      ]"
      :style="{ width: cssLength(avatarSize), height: cssLength(avatarSize) }"
      data-part="avatar"
    />
    <view class="mn-skeleton-content">
      <view
        v-if="title"
        class="mn-skeleton-block mn-skeleton-title"
        :class="`mn-skeleton-animation-${animation}`"
        data-part="title"
      />
      <view :class="{ 'mn-skeleton-paragraph': paragraph }"
        ><view
          v-for="(width, index) in rows"
          :key="index"
          class="mn-skeleton-block"
          :class="paragraph ? `mn-skeleton-animation-${animation}` : classes"
          :style="paragraph ? { width, height: '16px' } : blockStyle"
          data-part="line"
      /></view>
    </view>
  </view>
</template>
