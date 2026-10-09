<script setup lang="ts">
/**
 * IconButton: a button that only contains an icon (default slot, hidden
 * from assistive technologies; `label` / `aria-label` names the button).
 * `pressed` / `defaultPressed` (or a `pressedChange` listener) make it a
 * toggle button (aria-pressed, `v-model:pressed`). While `loading` it stays
 * focusable (aria-disabled + aria-busy) but ignores activation, including
 * the implicit form submission of `type="submit"`.
 */
import { computed, getCurrentInstance, useAttrs, ref } from "vue";
import styles from "@react-styles/components/IconButton/iconButton.module.scss";
import progressStyles from "@react-styles/components/ProgressIndicator/progressIndicator.module.scss";
import { hooks } from "../../internal/hooks";
import { IconSpinner } from "../../internal/icons";
import { useControllable } from "../../internal/controllable";
import { useI18n } from "../../config/useI18n";
import Tooltip from "../Tooltip/Tooltip.vue";
import type { IconButtonProps } from "./types";

defineOptions({ name: "IconButton", inheritAttrs: false });

const props = withDefaults(defineProps<IconButtonProps>(), {
  label: undefined,
  tooltip: undefined,
  showTooltip: undefined,
  color: "neutral",
  variant: "ghost",
  size: "medium",
  shape: "circle",
  disabled: false,
  loading: false,
  pressed: undefined,
  defaultPressed: undefined,
});
const emit = defineEmits<{
  /** Pressed (not emitted while disabled or loading) */
  click: [event: MouseEvent];
  "update:pressed": [pressed: boolean];
  /** A toggle button was activated: the new pressed state */
  pressedChange: [pressed: boolean];
}>();
defineSlots<{
  /** The icon */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const button = ref<HTMLButtonElement | null>(null);
defineExpose({
  get $el() {
    return button.value;
  },
});
const { t } = useI18n();
const vnodeProps = getCurrentInstance()?.vnode.props ?? {};

const isToggle = computed(
  () =>
    props.pressed !== undefined ||
    props.defaultPressed !== undefined ||
    "onPressedChange" in vnodeProps ||
    "onUpdate:pressed" in vnodeProps,
);
const pressedState = useControllable<boolean>(props, "pressed", {
  fallback: false,
  name: "IconButton",
  onChange: (value) => emit("pressedChange", value),
});
const isPressed = computed(() => isToggle.value && pressedState.value);

function onClick(event: MouseEvent) {
  if (props.loading) {
    // Busy buttons keep focus but must not activate (nor submit)
    event.preventDefault();
    return;
  }
  /* v8 ignore next */
  if (props.disabled) return;
  emit("click", event);
  if (isToggle.value && !event.defaultPrevented) {
    pressedState.value = !pressedState.value;
  }
}

const classes = computed(() => [
  styles.iconButton,
  styles[props.color],
  styles[`variant-${props.variant}`],
  styles[props.size],
  styles[props.shape],
  props.disabled && styles.disabled,
  props.loading && styles.loading,
  isPressed.value && styles.pressed,
  attrs.class,
]);

const buttonAttrs = computed(() => ({
  type: "button" as const,
  disabled: props.disabled,
  "aria-pressed": isToggle.value ? isPressed.value : undefined,
  "aria-busy": props.loading || undefined,
  "aria-disabled": (props.loading && !props.disabled) || undefined,
  ...attrs,
  class: classes.value,
  tabindex: props.disabled
    ? -1
    : ((attrs.tabindex as number | string | undefined) ?? 0),
  "aria-label":
    props.label ??
    (attrs["aria-label"] as string | undefined) ??
    t("iconButton.default"),
  ...hooks("icon-button", "root", {
    // always set: also replaces the data-state of a popup trigger
    state: isPressed.value ? "active" : "inactive",
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
  <Tooltip
    v-bind="tooltip"
    :content="tooltip?.content ?? label"
    :disabled="!(showTooltip ?? label !== undefined) || disabled || loading"
    as-child
  >
    <button ref="button" v-bind="buttonAttrs" @click="onClick">
      <span
        v-if="loading"
        :class="styles.glyph"
        v-bind="hooks('icon-button', 'spinner')"
      >
        <!-- the ProgressIndicator spinner (role="progressbar") -->
        <div
          :class="[progressStyles.progressIndicator, progressStyles.current]"
          role="progressbar"
          :aria-label="t('common.loading')"
          v-bind="
            hooks('progress', 'root', {
              variant: 'spinner',
              size,
              color: 'current',
            })
          "
        >
          <IconSpinner
            :class="[progressStyles.spinner, progressStyles[size]]"
            v-bind="hooks('progress', 'indicator')"
          />
        </div>
      </span>
      <!-- The icon is wrapped so it is always hidden from AT -->
      <span
        v-else
        :class="styles.glyph"
        aria-hidden="true"
        v-bind="hooks('icon-button', 'icon')"
      >
        <slot />
      </span>
    </button>
  </Tooltip>
</template>
