<script setup lang="ts">
/**
 * `<tr>` of a TableRoot (attributes fall through). A row with
 * `aria-selected` true gets the public `data-selected` item hook.
 */
import { hooks } from "../../internal/hooks";

defineOptions({ name: "TableRow", inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();

const isSelected = (value: unknown) => value === true || value === "true";
</script>

<template>
  <tr
    v-bind="{
      ...$attrs,
      ...hooks('data-table', 'row', {
        selected: isSelected($attrs['aria-selected']),
      }),
    }"
  >
    <slot />
  </tr>
</template>
