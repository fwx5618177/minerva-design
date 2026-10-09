<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
</script>
<template>
  <div style="display: flex; gap: 12px">
    <Tooltip content="Brand color" content-class-name="vue-brand-tooltip" arrow
      ><Button variant="outline">Brand</Button></Tooltip
    ><Tooltip
      content="Gradient surface"
      content-class-name="vue-gradient-tooltip"
      arrow
      ><Button variant="outline">Gradient</Button></Tooltip
    ><Tooltip content="Twenty pixel gap" :offset="[0, 20]"
      ><Button variant="outline">Offset</Button></Tooltip
    >
  </div>
</template>
<style>
.vue-brand-tooltip {
  --tooltip-bg: #7c3aed;
  --tooltip-color: #fff;
}
.vue-gradient-tooltip {
  --tooltip-bg: linear-gradient(135deg, #ec4899, #f59e0b);
  --tooltip-color: #fff;
}
</style>
