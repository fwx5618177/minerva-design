<script setup lang="ts">
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
  Button,
} from "minerva-design/vue";
</script>
<template>
  <Popover
    ><PopoverTrigger as-child><Button>Open popover</Button></PopoverTrigger
    ><PopoverContent
      ><p>Review the changes before continuing.</p>
      <PopoverClose as-child
        ><Button>Got it</Button></PopoverClose
      ></PopoverContent
    ></Popover
  >
</template>
