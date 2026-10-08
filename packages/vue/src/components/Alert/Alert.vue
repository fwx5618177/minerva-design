<script setup lang="ts">
/**
 * Alert: an important message of the page (system notices, operation
 * feedback) with a status icon, an optional title, actions, a close button
 * and a collapsible body.
 *
 * - Danger and warning interrupt (`role="alert"`), info and success are
 *   polite (`role="status"`).
 * - Closing moves focus out first (to `returnFocus`, else the next focusable
 *   element), so it never falls to <body>, then removes the alert.
 */
import { computed, ref, shallowRef, useAttrs, useId, type CSSProperties } from "vue";
import styles from "@react-styles/components/Alert/alert.module.scss";
import { hooks } from "../../internal/hooks";
import { useControllable } from "../../internal/controllable";
import {
  isFocusInsideOrLost,
  moveFocusBeforeRemoval,
} from "../../internal/focus-after-removal";
import {
  IconChevronDown,
  IconChevronUp,
  IconCircleCheckFilled,
  IconCircleInfoFilled,
  IconCircleXFilled,
  IconTriangleAlertFilled,
  IconX,
} from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import type { AlertProps } from "./types";

defineOptions({ name: "Alert", inheritAttrs: false });

const props = withDefaults(defineProps<AlertProps>(), {
  title: undefined,
  color: "info",
  variant: "subtle",
  size: "medium",
  showIcon: true,
  closable: false,
  animation: true,
  animationName: "slideIn",
  banner: false,
  elevation: false,
  rounded: true,
  borderRadius: undefined,
  collapsible: false,
  expanded: undefined,
  defaultExpanded: undefined,
  closeLabel: undefined,
  expandLabel: undefined,
  collapseLabel: undefined,
  iconLabel: undefined,
  returnFocus: undefined,
  role: undefined,
});

const emit = defineEmits<{
  /** The close button was clicked (the alert is removed afterwards) */
  close: [event: MouseEvent];
  /** The content was expanded or collapsed */
  expand: [expanded: boolean];
  "update:expanded": [expanded: boolean];
}>();

const slots = defineSlots<{
  /** Alert content */
  default?: () => unknown;
  /** Alert title (the `title` prop) */
  title?: () => unknown;
  /** Custom icon, replacing the status icon */
  icon?: () => unknown;
  /** Action area rendered on the right, e.g. buttons */
  action?: () => unknown;
  /** Custom close icon */
  "close-icon"?: () => unknown;
}>();

const iconMap = {
  info: IconCircleInfoFilled,
  success: IconCircleCheckFilled,
  warning: IconTriangleAlertFilled,
  danger: IconCircleXFilled,
};
const ANIMATION_NAMES = ["slideIn", "fadeIn", "bounce", "zoom"];

const attrs = useAttrs();
const { t } = useI18n();
const visible = ref(true);
const root = shallowRef<HTMLElement | null>(null);
const contentId = useId();

const expanded = useControllable<boolean>(props, "expanded", {
  fallback: true,
  onChange: (value) => emit("expand", value),
  name: "Alert",
});

const hasTitle = computed(() => !!slots.title || !!props.title);
// The toggle lives in the title, so without a title nothing can be collapsed
const isCollapsible = computed(() => props.collapsible && hasTitle.value);
const hasContent = computed(() => !!slots.default);

const onClose = (event: MouseEvent) => {
  emit("close", event);
  // Move focus out before the alert disappears so it never falls to <body>
  // (unless the close listener already moved it elsewhere on purpose)
  const el = root.value;
  if (el && isFocusInsideOrLost(el)) {
    moveFocusBeforeRemoval(el, props.returnFocus);
  }
  visible.value = false;
};
const onExpand = () => {
  expanded.value = !expanded.value;
};

const classes = computed(() => [
  styles.alert,
  styles[props.color],
  styles[props.variant],
  styles[props.size],
  props.showIcon && styles.withIcon,
  hasTitle.value && styles.withTitle,
  props.banner && styles.banner,
  props.animation && styles.withAnimation,
  props.animation &&
    ANIMATION_NAMES.includes(props.animationName) &&
    styles[`animation-${props.animationName}`],
  props.elevation && styles.withElevation,
  props.rounded && styles.rounded,
  expanded.value && styles.expanded,
  isCollapsible.value && styles.collapsible,
]);
const radiusStyle = computed<CSSProperties | undefined>(() =>
  props.borderRadius != null
    ? {
        borderRadius:
          typeof props.borderRadius === "number"
            ? `${props.borderRadius}px`
            : props.borderRadius,
      }
    : undefined,
);
const rootAttrs = computed(() => ({
  ...attrs,
  role:
    props.role ??
    (props.color === "danger" || props.color === "warning"
      ? "alert"
      : "status"),
  ...hooks("alert", "root", {
    state: isCollapsible.value
      ? expanded.value
        ? "open"
        : "closed"
      : undefined,
    size: props.size,
    variant: props.variant,
    color: props.color,
  }),
}));
</script>

<template>
  <div
    v-if="visible"
    ref="root"
    :class="classes"
    :style="radiusStyle"
    v-bind="rootAttrs"
  >
    <span
      v-if="showIcon"
      :class="styles.icon"
      role="img"
      :aria-label="iconLabel ?? t(`alert.icon.${color}`)"
      v-bind="hooks('alert', 'icon')"
    >
      <slot name="icon"><component :is="iconMap[color]" /></slot>
    </span>

    <div :class="styles.content">
      <div v-if="hasTitle" :class="styles.title" v-bind="hooks('alert', 'title')">
        <slot name="title">{{ title }}</slot>
        <button
          v-if="isCollapsible"
          type="button"
          :class="styles.expandButton"
          :aria-label="
            expanded
              ? (collapseLabel ?? t('alert.collapse'))
              : (expandLabel ?? t('alert.expand'))
          "
          :aria-expanded="expanded"
          :aria-controls="expanded && hasContent ? contentId : undefined"
          v-bind="hooks('alert', 'trigger')"
          @click="onExpand"
        >
          <IconChevronUp v-if="expanded" />
          <IconChevronDown v-else />
        </button>
      </div>
      <div
        v-if="hasContent && (!isCollapsible || expanded)"
        :id="contentId"
        :class="styles.message"
        v-bind="hooks('alert', 'description')"
      >
        <slot />
      </div>
    </div>

    <div v-if="slots.action" :class="styles.action" v-bind="hooks('alert', 'action')">
      <slot name="action" />
    </div>

    <button
      v-if="closable"
      :class="styles.closeButton"
      :aria-label="closeLabel ?? t('alert.close')"
      type="button"
      v-bind="hooks('alert', 'close-button')"
      @click="onClose"
    >
      <slot name="close-icon"><IconX /></slot>
    </button>
  </div>
</template>
