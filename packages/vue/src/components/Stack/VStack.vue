<script setup lang="ts">
/**
 * VStack: a vertical Stack, stretched on the cross axis by default.
 */
import StackBase from "./StackBase.vue";
import type { VStackProps } from "./types";

defineOptions({ name: "VStack" });

withDefaults(defineProps<VStackProps>(), {
  as: "div",
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
    hook-name="vstack"
    :as="as"
    direction="column"
    :gap="gap"
    :align="align ?? 'stretch'"
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
