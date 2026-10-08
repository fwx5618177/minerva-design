<script setup lang="ts">
/**
 * Toolbar: groups related controls in a wrapping flex row (`role="group"`).
 * It adds no arrow-key navigation; consumers choosing `role="toolbar"` own it.
 */
import { computed, useAttrs } from "vue";
import styles from "@react-styles/components/Page/page.module.scss";
import { hooks } from "../../internal/hooks";
import { Slot } from "../../internal/Slot";
import type { ToolbarProps } from "./types";

defineOptions({ name: "Toolbar", inheritAttrs: false });

const props = withDefaults(defineProps<ToolbarProps>(), {
  wrap: true,
  density: "default",
  asChild: false,
});

defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const classes = computed(() => [
  styles.toolbar,
  props.density === "compact" && styles.compact,
  !props.wrap && styles.nowrap,
]);
const rootAttrs = computed(() => ({ ...attrs, ...hooks("toolbar", "root") }));
</script>

<template>
  <component
    :is="asChild ? Slot : 'div'"
    role="group"
    :class="classes"
    v-bind="rootAttrs"
  >
    <slot />
  </component>
</template>
