<script setup lang="ts">
import { Button, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="2" wrap
    ><Button shape="square">Square</Button
    ><Button shape="rounded">Rounded</Button
    ><Button shape="circle" aria-label="Add">+</Button
    ><Button border-radius="none">No radius</Button
    ><Button :border-radius="12">12px radius</Button></HStack
  >
</template>
