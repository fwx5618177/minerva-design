<script setup lang="ts">
/**
 * Divider: a horizontal or vertical separator line, optionally with text
 * (default slot, horizontal only). Without text it is a native <hr> (an
 * implicit separator); with text a `role="separator"` div. The line color
 * reads the `--divider-color` CSS custom property.
 */
import { computed, useAttrs, type CSSProperties } from "vue";
import styles from "@react-styles/components/Divider/divider.module.scss";
import { hooks } from "../../internal/hooks";
import { flattenChildren } from "../../internal/children";
import type { DividerProps } from "./types";

defineOptions({ name: "Divider", inheritAttrs: false });

const props = withDefaults(defineProps<DividerProps>(), {
  variant: "solid",
  orientation: "horizontal",
  thickness: 1,
  length: undefined,
  spacing: 16,
  textAlign: "center",
  elevation: false,
  flexItem: false,
});

defineSlots<{
  /** Text rendered inside a horizontal divider (ignored when vertical) */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const px = (value: number | string) =>
  typeof value === "number" ? `${value}px` : value;

// The text is only rendered by horizontal dividers.
const hasTextOf = (children: unknown) =>
  props.orientation === "horizontal" && flattenChildren(children).length > 0;

const dividerStyle = computed<CSSProperties>(() => {
  const horizontal = props.orientation === "horizontal";
  return {
    ...(props.thickness != null && {
      borderWidth: px(props.thickness),
      "--_divider-thickness": px(props.thickness),
    }),
    ...(!horizontal && props.length != null && { height: px(props.length) }),
    ...(horizontal && props.length != null && { width: px(props.length) }),
    ...(props.spacing != null && {
      marginTop: horizontal ? px(props.spacing) : 0,
      marginBottom: horizontal ? px(props.spacing) : 0,
      marginLeft: horizontal ? 0 : px(props.spacing),
      marginRight: horizontal ? 0 : px(props.spacing),
    }),
  };
});

const classes = (hasText: boolean) => [
  styles.divider,
  styles[props.variant],
  styles[props.orientation],
  hasText && styles.withText,
  hasText &&
    styles[
      `text${props.textAlign.charAt(0).toUpperCase()}${props.textAlign.slice(1)}`
    ],
  props.elevation && styles.elevation,
  props.flexItem && styles.flexItem,
];
// Without text, a native <hr> (an implicit separator).
// The generated declarations win over the `style` attribute (like React)
const rootAttrs = (hasText: boolean) => ({
  "aria-orientation": props.orientation,
  ...(hasText && { role: "separator" }),
  ...attrs,
  class: [classes(hasText), attrs.class],
  style: [attrs.style as CSSProperties, dividerStyle.value],
  ...hooks("divider", "root", {
    orientation: props.orientation,
    variant: props.variant,
    align: hasText ? props.textAlign : undefined,
  }),
});
</script>

<template>
  <div v-if="hasTextOf($slots.default?.())" v-bind="rootAttrs(true)">
    <span :class="styles.text" v-bind="hooks('divider', 'label')">
      <slot />
    </span>
  </div>
  <hr v-else v-bind="rootAttrs(false)" />
</template>
