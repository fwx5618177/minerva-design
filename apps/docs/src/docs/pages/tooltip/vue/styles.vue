<script setup lang="ts">
import { Tooltip, Button, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Tooltip
      content="Solid success"
      color="success"
      variant="solid"
      shape="rounded"
      ><Button color="success">Solid</Button></Tooltip
    ><Tooltip content="Subtle warning" color="warning" variant="subtle" arrow
      ><Button variant="outline">Subtle</Button></Tooltip
    ><Tooltip content="Glass surface" variant="glass" animation="scale"
      ><Button variant="ghost">Glass</Button></Tooltip
    ></HStack
  >
</template>
