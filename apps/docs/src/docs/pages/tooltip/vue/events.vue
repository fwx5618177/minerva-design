<script setup lang="ts">
import { ref } from "vue";
import { Tooltip, Button } from "minerva-design/vue";
const opened = ref(0);
const closed = ref(0);
</script>
<template>
  <div style="display: flex; gap: 16px; align-items: center">
    <Tooltip content="Press Escape to close" @open="opened++" @close="closed++"
      ><Button>Hover or focus me</Button></Tooltip
    ><output>Opened: {{ opened }} · Closed: {{ closed }}</output>
  </div>
</template>
