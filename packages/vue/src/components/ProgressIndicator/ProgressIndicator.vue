<script setup lang="ts">
/**
 * ProgressIndicator: a loading indicator (spinner, circle, wave, bar or dotted
 * bar). Without `value` it is an indeterminate `progressbar` (no
 * aria-valuenow), named by `aria-label`, by its visible `label`, or by the
 * localized "Loading". With `value`, the bar and circle variants become
 * determinate: a filled bar / arc, aria-valuenow/min/max and an optional
 * formatted value (`showValue`). It is never focusable, so it can sit inside
 * buttons. Set `decorative` when a surrounding element already announces the
 * loading state.
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
  value: undefined,
  max: 100,
  showValue: false,
  format: undefined,
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
  /** Custom rendering of the shown value (showValue) */
  value?: (props: { value: number; max: number }) => unknown;
}>();

const attrs = useAttrs();
const { t } = useI18n();
const labelId = useId();

const hasLabel = computed(
  () =>
    !!slots.label ||
    (props.label !== undefined && props.label !== null && props.label !== ""),
);
const determinate = computed(
  () =>
    typeof props.value === "number" &&
    (props.variant === "bar" || props.variant === "circle"),
);
const safeMax = computed(() =>
  Number.isFinite(props.max) && props.max > 0 ? props.max : 100,
);
const current = computed(() =>
  determinate.value
    ? Math.min(
        Math.max(Number.isNaN(props.value) ? 0 : (props.value as number), 0),
        safeMax.value,
      )
    : 0,
);
const percent = computed(() => (current.value / safeMax.value) * 100);
const formatted = computed(() =>
  determinate.value
    ? props.format
      ? props.format(current.value, safeMax.value)
      : `${Math.round(percent.value)}%`
    : "",
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
  const name =
    ariaLabel ??
    (hasLabel.value
      ? undefined
      : t(determinate.value ? "progress.label" : "common.loading"));
  const a11y = props.decorative
    ? { "aria-hidden": "true" as const }
    : {
        // Not focusable: it is not interactive and is often rendered inside
        // buttons. Indeterminate progressbars have no aria-valuenow.
        role: "progressbar",
        "aria-label": name,
        "aria-labelledby": ariaLabel || !hasLabel.value ? undefined : labelId,
        ...(determinate.value && {
          "aria-valuemin": 0,
          "aria-valuemax": safeMax.value,
          "aria-valuenow": current.value,
          "aria-valuetext": props.format ? formatted.value : undefined,
        }),
      };
  return {
    ...a11y,
    ...attrs,
    ...(!props.decorative && { "aria-label": name }),
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
      <div
        :class="[styles.bar, determinate && styles.determinate]"
        :style="determinate ? { width: `${percent}%` } : undefined"
      />
    </div>
    <div
      v-else-if="variant === 'wave'"
      :class="[styles.waveContainer, styles[size]]"
      v-bind="indicator"
    >
      <IconWaveSquare :class="styles.wave" aria-hidden="true" />
    </div>
    <svg
      v-else-if="variant === 'circle' && determinate"
      :class="[styles.ring, styles[size]]"
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      aria-hidden="true"
      focusable="false"
      v-bind="indicator"
    >
      <circle :class="styles.ringTrack" cx="12" cy="12" r="10" />
      <circle
        :class="styles.ringArc"
        cx="12"
        cy="12"
        r="10"
        pathLength="100"
        :stroke-dasharray="`${percent} 100`"
      />
    </svg>
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
      v-if="determinate && showValue"
      :class="styles.value"
      aria-hidden="true"
      v-bind="hooks('progress', 'value')"
    >
      <slot name="value" :value="current" :max="safeMax">{{ formatted }}</slot>
    </span>
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
