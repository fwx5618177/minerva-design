<script setup lang="ts">
/**
 * `<th>` of a TableRoot (attributes fall through). A sortable header
 * (`aria-sort` ascending / descending / none) gets the public `data-sort`
 * item hook.
 */
import { hooks } from "../../internal/hooks";

defineOptions({ name: "TableHeader", inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();

const SORT_HOOKS = new Set(["ascending", "descending", "none"]);
const sortOf = (value: unknown) =>
  typeof value === "string" && SORT_HOOKS.has(value) ? value : undefined;
</script>

<template>
  <th
    v-bind="{
      ...$attrs,
      ...hooks('data-table', 'header-cell', {
        sort: sortOf($attrs['aria-sort']),
      }),
    }"
  >
    <slot />
  </th>
</template>
