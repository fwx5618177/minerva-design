<script setup lang="ts">
import {
  Popover,
  PopoverAnchor,
  PopoverTrigger,
  PopoverContent,
  Input,
  Button,
  VStack,
} from "minerva-design/vue";
</script>
<template>
  <Popover
    ><VStack :gap="3"
      ><PopoverAnchor
        ><Input
          aria-label="Search query"
          placeholder="Search projects" /></PopoverAnchor
      ><PopoverTrigger as-child
        ><Button>Show search help</Button></PopoverTrigger
      ></VStack
    ><PopoverContent match-anchor-width="exact"
      ><p>
        The panel is positioned against the input, independently of its trigger.
      </p></PopoverContent
    ></Popover
  >
</template>
