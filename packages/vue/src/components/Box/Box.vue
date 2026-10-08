<script setup lang="ts">
/**
 * Box: a polymorphic container (`as`) with a small set of style shorthands
 * (padding, margin, size, background, radius, shadow, border). The `style`
 * attribute wins over the generated declarations; side props win over axis
 * props, which win over the all-sides shorthand.
 */
import { computed, useAttrs, type CSSProperties } from "vue";
import { resolveSize, resolveSpace } from "@minerva/core";
import { hooks } from "../../internal/hooks";
import type { BoxProps } from "./types";

defineOptions({ name: "Box", inheritAttrs: false });

const props = withDefaults(defineProps<BoxProps>(), {
  as: "div",
  p: undefined,
  px: undefined,
  py: undefined,
  pt: undefined,
  pr: undefined,
  pb: undefined,
  pl: undefined,
  m: undefined,
  mx: undefined,
  my: undefined,
  mt: undefined,
  mr: undefined,
  mb: undefined,
  ml: undefined,
  w: undefined,
  h: undefined,
  minW: undefined,
  minH: undefined,
  maxW: undefined,
  maxH: undefined,
  bg: undefined,
  rounded: undefined,
  boxShadow: undefined,
  border: undefined,
});

defineSlots<{ default?: () => unknown }>();

/** Surface aliases accepted by `bg` (`bg.*` shorthands -> surface tokens) */
const backgrounds: Record<string, string> = {
  bg: "var(--surface-color)",
  "bg.subtle": "var(--surface-subtle-color)",
  "bg.muted": "var(--surface-muted-color)",
  "bg.emphasis": "var(--surface-muted-color)",
  "bg.canvas": "var(--canvas-color)",
  "bg.elevated": "var(--surface-elevated-color)",
};
const radii = ["none", "sm", "md", "lg", "xl", "2xl", "full"];
const shadows = ["sm", "md", "lg", "xl"];

const attrs = useAttrs();

const boxStyle = computed<CSSProperties>(() => {
  const p = props;
  const style: CSSProperties = {};
  const space = (value: string | number | undefined, ...keys: string[]) => {
    if (value === undefined) return;
    for (const key of keys) {
      (style as Record<string, string>)[key] = resolveSpace(value);
    }
  };
  const size = (value: string | number | undefined, key: string) => {
    if (value !== undefined) {
      (style as Record<string, string>)[key] = resolveSize(value);
    }
  };
  space(p.p, "padding");
  space(p.px, "paddingLeft", "paddingRight");
  space(p.py, "paddingTop", "paddingBottom");
  space(p.pt, "paddingTop");
  space(p.pr, "paddingRight");
  space(p.pb, "paddingBottom");
  space(p.pl, "paddingLeft");
  space(p.m, "margin");
  space(p.mx, "marginLeft", "marginRight");
  space(p.my, "marginTop", "marginBottom");
  space(p.mt, "marginTop");
  space(p.mr, "marginRight");
  space(p.mb, "marginBottom");
  space(p.ml, "marginLeft");
  size(p.w, "width");
  size(p.h, "height");
  size(p.minW, "minWidth");
  size(p.minH, "minHeight");
  size(p.maxW, "maxWidth");
  size(p.maxH, "maxHeight");
  if (p.bg !== undefined) style.background = backgrounds[p.bg] ?? p.bg;
  if (p.rounded !== undefined) {
    style.borderRadius = radii.includes(p.rounded)
      ? `var(--radius-${p.rounded})`
      : p.rounded;
  }
  if (p.boxShadow !== undefined) {
    style.boxShadow = shadows.includes(p.boxShadow)
      ? `var(--shadow-${p.boxShadow})`
      : p.boxShadow;
  }
  if (p.border !== undefined) style.border = p.border;
  return style;
});

const rootAttrs = computed(() => ({ ...attrs, ...hooks("box", "root") }));
</script>

<template>
  <component :is="as" :style="boxStyle" v-bind="rootAttrs">
    <slot />
  </component>
</template>
