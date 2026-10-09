<script setup lang="ts">
import { TooltipProvider, Tooltip, Button, HStack } from "minerva-design/vue";
</script>
<template>
  <TooltipProvider :enter-delay="500" :skip-delay="400"
    ><HStack :gap="3"
      ><Tooltip content="First action"><Button>First</Button></Tooltip
      ><Tooltip content="Second action"><Button>Second</Button></Tooltip
      ><Tooltip content="Third action"><Button>Third</Button></Tooltip></HStack
    ></TooltipProvider
  >
</template>
