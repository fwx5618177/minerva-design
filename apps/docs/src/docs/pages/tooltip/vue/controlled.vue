<script setup lang="ts">
import { ref } from "vue";
import { Tooltip, Button, HStack } from "minerva-design/vue";
const open = ref(false);
</script>
<template>
  <HStack :gap="3" wrap
    ><Button @click="open = !open">Toggle tooltip</Button
    ><Tooltip v-model:open="open" content="Controlled by Vue state"
      ><Button variant="outline">Anchor</Button></Tooltip
    ><output>{{ open ? "Open" : "Closed" }}</output></HStack
  >
</template>
