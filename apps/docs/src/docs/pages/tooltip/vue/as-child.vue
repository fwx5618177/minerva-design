<script setup lang="ts">
import { Tooltip, Button } from "minerva-design/vue";
</script>
<template>
  <div style="display: flex; gap: 12px">
    <Tooltip content="Handlers attach to the button itself" as-child
      ><Button variant="outline">No wrapper</Button></Tooltip
    ><Tooltip
      content="Frosted surface"
      as-child
      variant="glass"
      placement="bottom-start"
      ><Button variant="outline">Glass trigger</Button></Tooltip
    >
  </div>
</template>
