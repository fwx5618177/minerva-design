<script setup lang="ts">
/**
 * Badge: a small count or status indicator.
 *
 * - With element children (default slot) the badge is attached to a corner
 *   of them (`position`), inside a relatively positioned wrapper.
 * - Without children, or with plain text children, it is a standalone badge
 *   rendered inline in the normal flow.
 *
 * Attributes (`aria-label`, `class`, `style`...) go to the badge element.
 */
import { computed, useAttrs, type CSSProperties } from "vue";
import styles from "@react-styles/components/Badge/badge.module.scss";
import { hooks } from "../../internal/hooks";
import { flattenChildren, isTextOnly } from "../../internal/children";
import { useI18n } from "../../config/useI18n";
import type { BadgeProps } from "./types";

defineOptions({ name: "Badge", inheritAttrs: false });

const props = withDefaults(defineProps<BadgeProps>(), {
  color: "primary",
  variant: "solid",
  size: "medium",
  content: undefined,
  position: "top-right",
  dot: false,
  borderRadius: undefined,
  borderWidth: undefined,
  role: "status",
});

const slots = defineSlots<{
  /** Element the badge is attached to, or the text content of a standalone badge */
  default?: () => unknown;
  /** Rich content of the badge (the `content` prop) */
  content?: () => unknown;
  /** Icon displayed before the content */
  icon?: () => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();

const hasContentProp = computed(
  () => props.content !== undefined || !!slots.content,
);

/**
 * Standalone without children, or with text children (its own content)
 * and no `content`; attached to element children otherwise.
 */
const isStandalone = (children: unknown) => {
  const nodes = flattenChildren(children);
  return (
    nodes.length === 0 || (isTextOnly(nodes) && !hasContentProp.value)
  );
};

const badgeClasses = (standalone: boolean) => [
  styles.badge,
  styles[props.color],
  styles[props.variant],
  styles[props.size],
  standalone ? styles.standalone : styles[props.position],
  props.dot && styles.dot,
];
const badgeStyle = computed<CSSProperties>(() => ({
  borderRadius: props.borderRadius,
  borderWidth: props.borderWidth,
}));
const states = computed(() => ({
  size: props.size,
  variant: props.variant,
  color: props.color,
}));
const badgeAttrs = (standalone: boolean) => ({
  role: props.role,
  ...attrs,
  ...hooks("badge", standalone ? "root" : "badge", states.value),
});
</script>

<template>
  <span
    v-if="isStandalone($slots.default?.())"
    :class="badgeClasses(true)"
    :style="badgeStyle"
    v-bind="badgeAttrs(true)"
  >
    <span v-if="slots.icon" :class="styles.icon" v-bind="hooks('badge', 'icon')">
      <slot name="icon" />
    </span>
    <template v-if="!dot">
      <slot v-if="hasContentProp" name="content">{{ content }}</slot>
      <slot v-else />
    </template>
  </span>
  <div v-else :class="styles.badgeWrapper" v-bind="hooks('badge', 'root', states)">
    <div :class="styles.content"><slot /></div>
    <span
      :class="badgeClasses(false)"
      :style="badgeStyle"
      v-bind="badgeAttrs(false)"
    >
      <span v-if="slots.icon" :class="styles.icon" v-bind="hooks('badge', 'icon')">
        <slot name="icon" />
      </span>
      <template v-if="!dot">
        <slot v-if="hasContentProp" name="content">{{ content }}</slot>
        <template v-else>{{ t("badge.default") }}</template>
      </template>
    </span>
  </div>
</template>
