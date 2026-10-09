<script setup lang="ts">
import { AutoComplete, type AutoCompleteOption } from "minerva-design/vue";
const options = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium", highlight: true },
  { label: "High", value: "high" },
];
</script>
<template>
  <div style="padding-top: 160px">
    <AutoComplete
      label="Priority (opens above)"
      :options="options"
      placement="top"
      :offset="{ x: 0, y: 8 }"
      :animation="false"
      dropdown-class-name="vue-priority-dropdown"
    />
  </div>
</template>
<style>
.vue-priority-dropdown {
  --auto-complete-dropdown-background: var(--surface-color);
  --auto-complete-option-highlight-background: var(--warning-color-subtle);
  --auto-complete-option-hover-background: var(--primary-color-subtle);
}
</style>
