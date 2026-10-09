<script setup lang="ts">
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  HStack,
} from "minerva-design/vue";
const sides = ["top", "right", "bottom", "left"] as const;
</script>
<template>
  <HStack :gap="3" wrap
    ><Popover v-for="side in sides" :key="side"
      ><PopoverTrigger as-child
        ><Button variant="outline">{{ side }}</Button></PopoverTrigger
      ><PopoverContent :side="side" align="start" arrow
        >{{ side }} placement</PopoverContent
      ></Popover
    ></HStack
  >
</template>
