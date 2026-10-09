<script setup lang="ts">
import ResponsiveGrid from "./ResponsiveGrid.vue";
defineProps<{
  columns?: number | { base?: number; sm?: number; md?: number; lg?: number };
  gap?: string | number;
  rowGap?: string | number;
  columnGap?: string | number;
  reportSubmit?: boolean;
}>();
const emit = defineEmits<{ submit: [detail: unknown]; reset: [] }>();
</script>
<template>
  <form
    class="mn-uni-form-layout"
    :report-submit="reportSubmit"
    @submit="emit('submit', ($event as any).detail)"
    @reset="emit('reset')"
  >
    <ResponsiveGrid
      :columns="columns"
      :gap="gap"
      :row-gap="rowGap"
      :column-gap="columnGap"
      ><slot
    /></ResponsiveGrid>
  </form>
</template>
