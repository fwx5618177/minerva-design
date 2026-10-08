<script setup lang="ts">
/**
 * Button: a native `<button>` with a semantic `color`, a visual `variant`
 * (solid, outline, ghost, link), sizes, shapes, icons and a loading state.
 * Attributes fall through to the `<button>`. `type` defaults to "button" so
 * a Button inside a form never submits it by accident.
 */
import { computed, useAttrs, type CSSProperties } from "vue";
import type { ColorScheme } from "@minerva/core";
import styles from "@react-styles/components/Button/button.module.scss";
import { hooks } from "../../internal/hooks";
import type { ButtonProps } from "./types";

defineOptions({ name: "Button", inheritAttrs: false });

const props = withDefaults(defineProps<ButtonProps>(), {
  type: "button",
  color: "primary",
  variant: "solid",
  size: "medium",
  disabled: false,
  loading: false,
  loadingText: undefined,
  fullWidth: false,
  active: false,
  shape: undefined,
  borderRadius: undefined,
});

const emit = defineEmits<{
  /** Pressed (not emitted while disabled or loading) */
  click: [event: MouseEvent];
}>();

const slots = defineSlots<{
  /** Label */
  default?: () => unknown;
  /** Icon before the label */
  "start-icon"?: () => unknown;
  /** Icon after the label */
  "end-icon"?: () => unknown;
  /** Label while loading (replaces the content; the `loadingText` prop) */
  "loading-text"?: () => unknown;
}>();

const attrs = useAttrs();

function onClick(event: MouseEvent) {
  if (props.loading) {
    // Busy buttons stay focusable (aria-disabled) but must not activate,
    // including the implicit form submission of type="submit".
    event.preventDefault();
    return;
  }
  if (!props.disabled) emit("click", event);
}

const color = computed<ColorScheme>(() => props.color);
const classes = computed(() => {
  const radius =
    typeof props.borderRadius === "string"
      ? styles[
          `borderRadius${props.borderRadius.charAt(0).toUpperCase()}${props.borderRadius.slice(1)}`
        ]
      : undefined;
  return [
    styles.customButton,
    styles[color.value],
    styles[`variant-${props.variant}`],
    styles[props.size],
    radius,
    props.shape && styles[props.shape],
    props.fullWidth && styles.fullWidth,
    props.active && styles.active,
    props.loading && styles.loading,
  ];
});
const radiusStyle = computed<CSSProperties | undefined>(() =>
  typeof props.borderRadius === "number"
    ? { borderRadius: `${props.borderRadius}px` }
    : undefined,
);
const showLoadingText = computed(
  () =>
    props.loading &&
    (props.loadingText !== undefined || !!slots["loading-text"]),
);
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("button", "root", {
    state: props.active ? "active" : "inactive",
    disabled: props.disabled,
    loading: props.loading,
    size: props.size,
    variant: props.variant,
    color: props.color,
    shape: props.shape,
  }),
}));
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :style="radiusStyle"
    :aria-busy="loading || undefined"
    :aria-disabled="loading || undefined"
    :disabled="disabled"
    v-bind="rootAttrs"
    @click="onClick"
  >
    <template v-if="showLoadingText">
      <span
        :class="styles.loadingSpinner"
        aria-hidden="true"
        v-bind="hooks('button', 'spinner')"
      />
      <span :class="styles.label" v-bind="hooks('button', 'label')">
        <slot name="loading-text">{{ loadingText }}</slot>
      </span>
    </template>
    <template v-else>
      <span
        v-if="loading"
        :class="styles.loadingSpinner"
        aria-hidden="true"
        v-bind="hooks('button', 'spinner')"
      />
      <span
        v-if="slots['start-icon']"
        :class="[styles.icon, loading && styles.hidden]"
        v-bind="hooks('button', 'start-icon')"
      >
        <slot name="start-icon" />
      </span>
      <span
        :class="[styles.label, loading && styles.hidden]"
        v-bind="hooks('button', 'label')"
      >
        <slot />
      </span>
      <span
        v-if="slots['end-icon']"
        :class="[styles.icon, loading && styles.hidden]"
        v-bind="hooks('button', 'end-icon')"
      >
        <slot name="end-icon" />
      </span>
    </template>
  </button>
</template>
