<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
</script>
<template>
  <Tooltip content="I follow your cursor" follow-cursor :enter-delay="0"
    ><Button
      variant="outline"
      style="width: 280px; height: 100px; border-style: dashed"
      >Move the mouse here</Button
    ></Tooltip
  >
</template>
