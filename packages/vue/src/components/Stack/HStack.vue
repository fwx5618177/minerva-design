<script setup lang="ts">
/**
 * HStack: a horizontal Stack, centered on the cross axis by default.
 */
import StackBase from "./StackBase.vue";
import type { HStackProps } from "./types";

defineOptions({ name: "HStack" });

withDefaults(defineProps<HStackProps>(), {
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
    hook-name="hstack"
    :as="as"
    direction="row"
    :gap="gap"
    :align="align ?? 'center'"
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
