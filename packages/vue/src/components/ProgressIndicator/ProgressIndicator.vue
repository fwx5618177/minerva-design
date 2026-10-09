<script setup lang="ts">
/**
 * ProgressIndicator: the indeterminate loading indicator (spinner, circle,
 * wave, bar or dotted bar). It is a `progressbar` without a value, named by
 * `aria-label`, by its visible `label`, or by the localized "Loading". It is
 * never focusable, so it can sit inside buttons. Set `decorative` when a
 * surrounding element already announces the loading state.
 */
import { computed, useAttrs, useId, type StyleValue } from "vue";
import styles from "@react-styles/components/ProgressIndicator/progressIndicator.module.scss";
import { hooks } from "../../internal/hooks";
import {
  IconCircleNotch,
  IconSpinner,
  IconWaveSquare,
} from "../../internal/icons";
import { useI18n } from "../../config/useI18n";
import type { ProgressIndicatorProps } from "./types";

defineOptions({ name: "ProgressIndicator", inheritAttrs: false });

const props = withDefaults(defineProps<ProgressIndicatorProps>(), {
  variant: "spinner",
  size: "medium",
  color: "primary",
  label: undefined,
  decorative: false,
  width: undefined,
  full: false,
});

const slots = defineSlots<{
  /** Icon displayed before the indicator */
  icon?: () => unknown;
  /** Visible label (the `label` prop) */
  label?: () => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();
const labelId = useId();

const hasLabel = computed(
  () =>
    !!slots.label ||
    (props.label !== undefined && props.label !== null && props.label !== ""),
);
const isBar = computed(
  () => props.variant === "bar" || props.variant === "dottedBar",
);
const classes = computed(() => [
  styles.progressIndicator,
  styles[props.color],
  props.full
    ? styles.fullWidth
    : !props.width && isBar.value
      ? styles.defaultWidth
      : undefined,
]);
const rootAttrs = computed(() => {
  const ariaLabel = attrs["aria-label"] as string | undefined;
  const a11y = props.decorative
    ? { "aria-hidden": "true" as const }
    : {
        // Indeterminate progressbar (no aria-valuenow). Not focusable: it is
        // not interactive and is often rendered inside buttons.
        role: "progressbar",
        "aria-label":
          ariaLabel ?? (hasLabel.value ? undefined : t("common.loading")),
        "aria-labelledby": ariaLabel || !hasLabel.value ? undefined : labelId,
      };
  return {
    ...a11y,
    ...attrs,
    ...(!props.decorative && { "aria-label": a11y["aria-label"] }),
    style: [
      attrs.style as StyleValue,
      props.width && !props.full ? { width: props.width } : undefined,
    ],
    ...hooks("progress", "root", {
      variant: props.variant === "dottedBar" ? "dotted-bar" : props.variant,
      size: props.size,
      color: props.color,
    }),
  };
});
const indicator = hooks("progress", "indicator");
</script>

<template>
  <div :class="classes" v-bind="rootAttrs">
    <span
      v-if="slots.icon"
      :class="styles.icon"
      v-bind="hooks('progress', 'icon')"
    >
      <slot name="icon" />
    </span>
    <IconSpinner
      v-if="variant === 'spinner'"
      :class="[styles.spinner, styles[size]]"
      aria-hidden="true"
      v-bind="indicator"
    />
    <div
      v-else-if="variant === 'bar'"
      :class="[styles.barContainer, styles[size]]"
      v-bind="indicator"
    >
      <div :class="styles.bar" />
    </div>
    <div
      v-else-if="variant === 'wave'"
      :class="[styles.waveContainer, styles[size]]"
      v-bind="indicator"
    >
      <IconWaveSquare :class="styles.wave" aria-hidden="true" />
    </div>
    <IconCircleNotch
      v-else-if="variant === 'circle'"
      :class="[styles.circle, styles[size]]"
      aria-hidden="true"
      v-bind="indicator"
    />
    <div
      v-else-if="variant === 'dottedBar'"
      :class="[styles.dottedBarContainer, styles[size]]"
      v-bind="indicator"
    >
      <div :class="styles.dottedBar" />
    </div>
    <span
      v-if="hasLabel"
      :id="labelId"
      :class="styles.label"
      v-bind="hooks('progress', 'label')"
    >
      <slot name="label">{{ label }}</slot>
    </span>
  </div>
</template>
