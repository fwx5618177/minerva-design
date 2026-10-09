<script setup lang="ts">
/**
 * Shared implementation of Stack / HStack / VStack (internal): a flex
 * container with a token gap, optional separators between the children
 * (which are not wrapped in item elements) and attached groups.
 */
import { computed, useAttrs, type CSSProperties } from "vue";
import { resolveSpace } from "@minerva/core";
import styles from "@react-styles/components/Stack/stack.module.scss";
import { hooks } from "../../internal/hooks";
import { flattenChildren } from "../../internal/children";
import type { StackAlign, StackJustify, StackProps } from "./types";

defineOptions({ name: "StackBase", inheritAttrs: false });

const props = defineProps<
  Required<Pick<StackProps, "as" | "direction" | "wrap" | "attached">> &
    Omit<StackProps, "as" | "direction" | "wrap" | "attached"> & {
      hookName: "stack" | "hstack" | "vstack";
    }
>();

const slots = defineSlots<{
  default?: () => unknown;
  separator?: () => unknown;
}>();

const alignMap: Record<StackAlign, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};
const justifyMap: Record<StackJustify, string> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

const attrs = useAttrs();

const classes = computed(() => [
  styles.stack,
  styles[props.direction],
  props.wrap && styles.wrap,
  props.attached && styles.attached,
]);
const stackStyle = computed<CSSProperties>(() => ({
  ...(props.gap !== undefined &&
    !props.attached && { gap: resolveSpace(props.gap) }),
  ...(props.align && { alignItems: alignMap[props.align] }),
  ...(props.justify && { justifyContent: justifyMap[props.justify] }),
}));
const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks(
    props.hookName,
    "root",
    props.hookName === "stack"
      ? {
          orientation: props.direction.startsWith("row")
            ? "horizontal"
            : "vertical",
        }
      : undefined,
  ),
}));
const separated = computed(
  () =>
    (props.separator !== undefined && props.separator !== null) ||
    !!slots.separator,
);
</script>

<template>
  <component
    :is="as"
    :class="classes"
    :style="stackStyle"
    :role="attached ? 'group' : undefined"
    v-bind="rootAttrs"
  >
    <template v-if="separated">
      <template
        v-for="(child, index) in flattenChildren($slots.default?.())"
        :key="child.key ?? index"
      >
        <slot v-if="index > 0" name="separator">{{ separator }}</slot>
        <component :is="child" />
      </template>
    </template>
    <slot v-else />
  </component>
</template>
