<script setup lang="ts">
/** `<td>` of a TableRoot (attributes fall through) */
import { hooks } from "../../internal/hooks";

defineOptions({ name: "TableCell", inheritAttrs: false });
defineSlots<{ default?: () => unknown }>();
</script>

<template>
  <td v-bind="{ ...$attrs, ...hooks('data-table', 'cell') }"><slot /></td>
</template>
