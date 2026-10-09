<script setup lang="ts">
import { Button, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="2" wrap
    ><Button
      ><template #start-icon><span aria-hidden="true">+</span></template
      >Add</Button
    ><Button color="danger"
      ><template #start-icon><span aria-hidden="true">↻</span></template
      >Retry</Button
    ><Button color="neutral" variant="ghost"
      ><template #start-icon><span aria-hidden="true">←</span></template
      >Back</Button
    ><Button color="danger" variant="outline" aria-label="Delete item"
      ><span aria-hidden="true">×</span></Button
    ></HStack
  >
</template>
