<script setup lang="ts">
/**
 * Stack: a flex container that lays out its children in a row or column with a
 * token-based gap. It does not wrap children in item elements; an optional
 * `separator` is inserted between them, and `attached` joins them into one
 * group (shared borders, outer corners only).
 */
import StackBase from "./StackBase.vue";
import type { StackProps } from "./types";

defineOptions({ name: "Stack" });

withDefaults(defineProps<StackProps>(), {
  as: "div",
  direction: "column",
  gap: undefined,
  align: undefined,
  justify: undefined,
  wrap: false,
  separator: undefined,
  attached: false,
});

defineSlots<{
  /** Items */
  default?: () => unknown;
  /** Rendered between every two items (the `separator` prop as content) */
  separator?: () => unknown;
}>();
</script>

<template>
  <StackBase
    hook-name="stack"
    :as="as"
    :direction="direction"
    :gap="gap"
    :align="align"
    :justify="justify"
    :wrap="wrap"
    :separator="separator"
    :attached="attached"
  >
    <slot />
    <template v-if="$slots.separator" #separator>
      <slot name="separator" />
    </template>
  </StackBase>
</template>
