<script setup lang="ts">
import { computed, useSlots } from "vue";
import { cssLength } from "./primitives";
const props = withDefaults(
  defineProps<{
    orientation?: "horizontal" | "vertical";
    vertical?: boolean;
    label?: string | number;
    variant?: "solid" | "dashed" | "dotted";
    thickness?: number;
    length?: number | string;
    spacing?: number;
    textAlign?: "left" | "center" | "right";
    elevation?: boolean;
    flexItem?: boolean;
  }>(),
  { variant: "solid", thickness: 1, spacing: 16, textAlign: "center" },
);
const slots = useSlots();
const orientation = computed(
  () => props.orientation ?? (props.vertical ? "vertical" : "horizontal"),
);
const withText = computed(
  () =>
    orientation.value === "horizontal" &&
    (slots.default || (props.label != null && props.label !== "")),
);
const lineBorder = computed(() => ({
  borderTopWidth: `${Math.max(0, props.thickness)}px`,
  borderTopStyle: props.variant,
  borderTopColor: "var(--divider-color, var(--border-color))",
}));
const rootStyle = computed(() => ({
  width:
    orientation.value === "horizontal"
      ? (cssLength(props.length) ?? "100%")
      : undefined,
  height:
    orientation.value === "vertical"
      ? (cssLength(props.length) ?? (props.flexItem ? "auto" : "1em"))
      : undefined,
  margin:
    orientation.value === "horizontal"
      ? `${props.spacing}px 0`
      : `0 ${props.spacing}px`,
  ...(!withText.value && orientation.value === "horizontal"
    ? lineBorder.value
    : {}),
  ...(orientation.value === "vertical"
    ? {
        borderLeftWidth: `${Math.max(0, props.thickness)}px`,
        borderLeftStyle: props.variant,
        borderLeftColor: "var(--divider-color, var(--border-color))",
      }
    : {}),
  alignSelf:
    props.flexItem && orientation.value === "vertical" ? "stretch" : undefined,
}));
</script>
<template>
  <view
    class="mn-uni-divider"
    :class="{
      'mn-divider-elevated': elevation,
      'mn-divider-with-text': withText,
    }"
    role="separator"
    :aria-orientation="orientation"
    :style="rootStyle"
  >
    <template v-if="withText">
      <view
        class="mn-divider-line"
        :style="{
          ...lineBorder,
          flex: textAlign === 'left' ? '0 0 5%' : '1',
        }"
      />
      <text class="mn-divider-label"
        ><slot>{{ label }}</slot></text
      >
      <view
        class="mn-divider-line"
        :style="{
          ...lineBorder,
          flex: textAlign === 'right' ? '0 0 5%' : '1',
        }"
      />
    </template>
  </view>
</template>
