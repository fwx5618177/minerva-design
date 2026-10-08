<script setup lang="ts">
/**
 * Tabs: accessible tabs (WAI-ARIA tabs pattern) with line / enclosed / soft /
 * pills variants, semantic colors and horizontal or vertical orientation.
 * Compose with `TabList`, `Tab` and `TabPanel`. Attributes fall through to
 * the root `<div>`.
 */
import { computed, provide, useAttrs, useId } from "vue";
import { createTabsMachine } from "@minerva/core";
import styles from "@react-styles/components/Tabs/tabs.module.scss";
import { hooks } from "../../internal/hooks";
import { useMachine } from "../../internal/machine";
import { TABS_KEY } from "./context";
import type { TabsProps } from "./types";

defineOptions({ name: "Tabs", inheritAttrs: false });

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: undefined,
  defaultValue: undefined,
  orientation: "horizontal",
  activationMode: "automatic",
  dir: undefined,
  variant: "line",
  color: "primary",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  /** The value of the newly selected tab */
  change: [value: string];
}>();

defineSlots<{
  /** `TabList` and `TabPanel` elements */
  default?: () => unknown;
}>();

const attrs = useAttrs();
const baseId = useId();

// Selection and automatic / manual activation: core's tabs machine.
const { state, send } = useMachine(createTabsMachine, () => ({
  value: props.modelValue,
  defaultValue: props.defaultValue,
  activationMode: props.activationMode,
  onValueChange: (value: string) => {
    emit("update:modelValue", value);
    emit("change", value);
  },
}));

provide(TABS_KEY, {
  baseId,
  value: computed(() => state.value.value),
  send,
  variant: computed(() => props.variant),
  orientation: computed(() => props.orientation),
  dir: computed(() => props.dir),
});

const rootAttrs = computed(() => ({
  ...attrs,
  ...hooks("tabs", "root", {
    orientation: props.orientation,
    variant: props.variant,
    color: props.color,
  }),
}));
</script>

<template>
  <div
    :dir="dir"
    :class="[
      styles.tabs,
      styles[color],
      orientation === 'vertical' && styles.vertical,
    ]"
    v-bind="rootAttrs"
  >
    <slot />
  </div>
</template>
