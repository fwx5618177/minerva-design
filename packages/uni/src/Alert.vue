<script setup lang="ts">
import { ref, computed, useSlots, nextTick } from "vue";
import { useI18n } from "./i18n";
const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    color?: "info" | "success" | "warning" | "danger";
    status?: string;
    variant?: "subtle" | "outline" | "solid";
    size?: "small" | "medium" | "large";
    showIcon?: boolean;
    icon?: string;
    closeIcon?: string;
    closable?: boolean;
    animation?: boolean;
    animationName?: "slideIn" | "fadeIn" | "bounce" | "zoom";
    banner?: boolean;
    elevation?: boolean;
    rounded?: boolean;
    borderRadius?: number | string;
    collapsible?: boolean;
    expanded?: boolean;
    defaultExpanded?: boolean;
    closeLabel?: string;
    expandLabel?: string;
    collapseLabel?: string;
    iconLabel?: string;
    role?: string;
    returnFocus?: unknown;
  }>(),
  {
    variant: "subtle",
    size: "medium",
    showIcon: true,
    animation: true,
    animationName: "slideIn",
    rounded: true,
    expanded: undefined,
    defaultExpanded: true,
  },
);
const { t } = useI18n();
const slots = useSlots();
const emit = defineEmits<{
  close: [event: Event];
  expand: [expanded: boolean];
  "update:expanded": [expanded: boolean];
}>();
const visible = ref(true),
  local = ref(props.defaultExpanded),
  element = ref<any>();
const color = computed(
    () =>
      props.color ??
      (props.status === "error" ? "danger" : props.status) ??
      "info",
  ),
  expanded = computed(() => props.expanded ?? local.value);
const collapsible = computed(
  () => props.collapsible && !!(props.title || slots.title),
);
const role = computed(
  () =>
    props.role ??
    (["danger", "warning"].includes(color.value) ? "alert" : "status"),
);
const icon = computed(
  () =>
    ({ info: "ⓘ", success: "✓", warning: "!", danger: "×" })[color.value] ??
    "ⓘ",
);
function toggle() {
  const value = !expanded.value;
  if (props.expanded === undefined) local.value = value;
  emit("expand", value);
  emit("update:expanded", value);
}
function close(event: Event) {
  emit("close", event);
  const el = element.value?.$el ?? element.value;
  let target =
    typeof props.returnFocus === "function"
      ? props.returnFocus()
      : props.returnFocus;
  target = target?.value ?? target?.current ?? target;
  if (!target && typeof document !== "undefined" && el) {
    const controls = Array.from(
      document.querySelectorAll<HTMLElement>(
        'button:not([disabled]),a[href],input:not([disabled]),[tabindex="0"]',
      ),
    );
    const at = controls.findIndex((node) => el.contains(node));
    target =
      controls.slice(at + 1).find((node) => !el.contains(node)) ??
      controls
        .slice(0, at)
        .reverse()
        .find((node) => !el.contains(node)) ??
      el.parentElement;
  }
  visible.value = false;
  nextTick(() => {
    if (
      typeof document === "undefined" ||
      !document.activeElement ||
      document.activeElement === document.body ||
      el?.contains(document.activeElement)
    ) {
      target?.focus?.();
    }
  });
}
</script>
<template>
  <view
    v-if="visible"
    ref="element"
    class="mn-alert mn-uni-alert"
    :class="[
      `mn-alert-${color}`,
      `mn-alert-${variant}`,
      `mn-alert-${size}`,
      {
        'mn-alert-banner': banner,
        'mn-alert-elevated': elevation,
        'mn-alert-rounded': rounded,
        'mn-alert-collapsible': collapsible,
      },
      animation ? `mn-alert-${animationName}` : '',
    ]"
    :role="role"
    :style="{
      borderRadius:
        typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    }"
  >
    <view
      v-if="showIcon"
      data-alert-icon
      class="mn-uni-alert-icon"
      role="img"
      :aria-label="iconLabel ?? t(`alert.icon.${color}`)"
      ><slot name="icon">{{ props.icon ?? icon }}</slot></view
    ><view class="mn-uni-alert-body"
      ><text v-if="title || $slots.title" class="mn-title"
        ><slot name="title">{{ title }}</slot></text
      ><view
        data-alert-content
        v-show="!collapsible || expanded"
        class="mn-uni-alert-content"
        ><text v-if="description">{{ description }}</text
        ><slot /></view></view
    ><view v-if="$slots.action" class="mn-uni-alert-action"
      ><slot name="action"
    /></view>
    <button
      v-if="collapsible"
      class="mn-close"
      :aria-label="
        expanded
          ? (collapseLabel ?? t('alert.collapse'))
          : (expandLabel ?? t('alert.expand'))
      "
      :aria-expanded="expanded"
      @tap="toggle"
    >
      {{ expanded ? "⌃" : "⌄" }}</button
    ><button
      v-if="closable"
      class="mn-close"
      :aria-label="closeLabel ?? t('alert.close')"
      @tap="close"
    >
      <slot name="close-icon">{{ closeIcon ?? "×" }}</slot>
    </button>
  </view>
</template>
