<script setup lang="ts">
/**
 * Skeleton: a placeholder shown where content is loading (lines, avatar,
 * title, paragraph or a card), announced as a busy status region; renders
 * the default slot once `loading` is false. `decorative` renders one bare
 * `aria-hidden` block to compose custom layouts.
 */
import { computed, useAttrs, type CSSProperties, type StyleValue } from "vue";
import styles from "@react-styles/components/Skeleton/skeleton.module.scss";
import { hooks } from "../../internal/hooks";
import { useI18n } from "../../config/useI18n";
import type { SkeletonProps } from "./types";

defineOptions({ name: "Skeleton", inheritAttrs: false });

const props = withDefaults(defineProps<SkeletonProps>(), {
  variant: "text",
  animation: "pulse",
  decorative: false,
  size: undefined,
  width: undefined,
  height: undefined,
  loading: true,
  borderRadius: undefined,
  lines: 1,
  avatar: false,
  avatarSize: 40,
  avatarShape: "circle",
  active: false,
  paragraph: false,
  title: false,
});

defineSlots<{
  /** Real content, rendered once loading is false */
  default?: () => unknown;
}>();

const toCss = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

const attrs = useAttrs();
const { t } = useI18n();

const animationClass = computed(() => styles[`animation-${props.animation}`]);
/** Attributes without `style` (applied to the lines / decorative block) */
const otherAttrs = computed(() => {
  const { style: _style, ...rest } = attrs;
  return rest;
});

const decorativeAttrs = computed(() => {
  const dim =
    props.variant === "circular"
      ? toCss(props.size ?? props.width ?? 32)
      : undefined;
  return {
    "aria-hidden": "true",
    ...otherAttrs.value,
    class: [
      styles.skeleton,
      styles.decorative,
      styles[props.variant],
      animationClass.value,
      attrs.class,
    ],
    style: [
      {
        width: dim ?? toCss(props.width),
        height: dim ?? toCss(props.height),
        borderRadius: toCss(props.borderRadius),
      },
      attrs.style as StyleValue,
    ],
    ...hooks("skeleton", "root", { variant: props.variant }),
  };
});

const lineCount = computed(() =>
  props.paragraph || props.title
    ? 0
    : // Guard against negative / fractional / NaN counts
      Number.isFinite(props.lines)
      ? Math.max(0, Math.floor(props.lines))
      : 0,
);
const lineClass = computed(() => [
  styles.skeleton,
  styles[props.variant],
  animationClass.value,
]);
const lineStyle = computed<StyleValue>(() => [
  {
    width: toCss(props.width),
    height: toCss(props.height),
    borderRadius: toCss(props.borderRadius),
  },
  attrs.style as StyleValue,
]);
const avatarStyle = computed<CSSProperties>(() => ({
  width: toCss(props.avatarSize),
  height: toCss(props.avatarSize),
}));
const paragraphLines = [
  { width: "100%", height: "16px" },
  { width: "100%", height: "16px" },
  { width: "92%", height: "16px" },
  { width: "60%", height: "16px" },
];

const rootAttrs = computed(() => ({
  role: "status",
  "aria-busy": "true",
  "aria-label": t("common.loading"),
  ...otherAttrs.value,
  class: [styles.skeletonRoot, props.avatar && styles.withAvatar, attrs.class],
  ...hooks("skeleton", "root", { variant: props.variant }),
}));
</script>

<template>
  <slot v-if="!loading" />
  <span v-else-if="decorative" v-bind="decorativeAttrs" />
  <div v-else v-bind="rootAttrs">
    <div
      v-if="variant === 'card'"
      :class="[styles.card, active && styles.active]"
    >
      <div
        v-if="avatar"
        :class="[
          styles.skeleton,
          styles.avatar,
          animationClass,
          styles[`avatar-${avatarShape}`],
        ]"
        :style="avatarStyle"
        v-bind="hooks('skeleton', 'avatar')"
      />
      <div :class="styles.cardContent">
        <div
          v-if="title"
          :class="[styles.skeleton, styles.title, animationClass]"
          v-bind="hooks('skeleton', 'title')"
        />
        <div v-if="paragraph" :class="styles.paragraph">
          <div
            v-for="(line, index) in paragraphLines"
            :key="`p-${index}`"
            :class="[styles.skeleton, animationClass]"
            :style="line"
            v-bind="hooks('skeleton', 'line')"
          />
        </div>
      </div>
    </div>
    <template v-else>
      <div
        v-if="avatar"
        :class="[
          styles.skeleton,
          styles.avatar,
          animationClass,
          styles[`avatar-${avatarShape}`],
        ]"
        :style="avatarStyle"
        v-bind="hooks('skeleton', 'avatar')"
      />
      <div :class="styles.content">
        <div
          v-if="title"
          :class="[styles.skeleton, styles.title, animationClass]"
          v-bind="hooks('skeleton', 'title')"
        />
        <div
          v-for="index in lineCount"
          :key="index"
          :class="lineClass"
          :style="lineStyle"
          v-bind="hooks('skeleton', 'line')"
        />
        <div v-if="paragraph" :class="styles.paragraph">
          <div
            v-for="(line, index) in paragraphLines"
            :key="`p-${index}`"
            :class="[styles.skeleton, animationClass]"
            :style="line"
            v-bind="hooks('skeleton', 'line')"
          />
        </div>
      </div>
    </template>
  </div>
</template>
