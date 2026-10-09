<script setup lang="ts">
import { computed, type CSSProperties } from "vue";
import { resolveSpace, resolveSize } from "@minerva/core";
type Space = string | number;
const props = defineProps<{
  p?: Space;
  px?: Space;
  py?: Space;
  pt?: Space;
  pr?: Space;
  pb?: Space;
  pl?: Space;
  m?: Space;
  mx?: Space;
  my?: Space;
  mt?: Space;
  mr?: Space;
  mb?: Space;
  ml?: Space;
  w?: Space;
  h?: Space;
  minW?: Space;
  minH?: Space;
  maxW?: Space;
  maxH?: Space;
  bg?: string;
  rounded?: string;
  boxShadow?: string;
  border?: string;
  padding?: Space;
  margin?: Space;
  background?: string;
  radius?: Space;
}>();
const background: Record<string, string> = {
  bg: "var(--surface-color)",
  "bg.subtle": "var(--surface-subtle-color)",
  "bg.muted": "var(--surface-muted-color)",
  "bg.emphasis": "var(--surface-muted-color)",
  "bg.canvas": "var(--canvas-color)",
  "bg.elevated": "var(--surface-elevated-color)",
};
const style = computed(() => {
  const result: Record<string, string> = {};
  if (props.padding !== undefined) result.padding = resolveSize(props.padding);
  if (props.margin !== undefined) result.margin = resolveSize(props.margin);
  if (props.background) result.background = props.background;
  if (props.radius !== undefined)
    result.borderRadius = resolveSize(props.radius);
  for (const [prefix, property, legacy] of [
    ["p", "padding", props.padding],
    ["m", "margin", props.margin],
  ] as const) {
    delete result[property];
    for (const [suffix, side, axis] of [
      ["t", "Top", "y"],
      ["r", "Right", "x"],
      ["b", "Bottom", "y"],
      ["l", "Left", "x"],
    ] as const) {
      const value =
        props[`${prefix}${suffix}`] ??
        props[`${prefix}${axis}`] ??
        props[prefix];
      if (value !== undefined) result[property + side] = resolveSpace(value);
      else if (legacy !== undefined)
        result[property + side] = resolveSize(legacy);
    }
  }

  for (const [prop, property] of [
    ["w", "width"],
    ["h", "height"],
    ["minW", "minWidth"],
    ["maxW", "maxWidth"],
    ["minH", "minHeight"],
    ["maxH", "maxHeight"],
  ] as const) {
    if (props[prop] !== undefined) result[property] = resolveSize(props[prop]);
  }
  if (props.bg !== undefined)
    result.background = background[props.bg] ?? props.bg;
  if (props.rounded !== undefined)
    result.borderRadius = [
      "none",
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "full",
    ].includes(props.rounded)
      ? `var(--radius-${props.rounded})`
      : props.rounded;
  if (props.boxShadow !== undefined)
    result.boxShadow = ["sm", "md", "lg", "xl"].includes(props.boxShadow)
      ? `var(--shadow-${props.boxShadow})`
      : props.boxShadow;
  if (props.border !== undefined) result.border = props.border;
  return result as CSSProperties;
});
</script>
<template>
  <view class="mn-box" :style="style"><slot /></view>
</template>
