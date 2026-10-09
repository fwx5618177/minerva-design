<script setup lang="ts">
import { ref } from "vue";
import { Drawer, DrawerBody, Button, HStack } from "minerva-design/vue";
import type { DrawerSide } from "minerva-design/vue";
const sides: DrawerSide[] = ["left", "right", "top", "bottom"];
const side = ref<DrawerSide>("right");
const open = ref(false);
</script>
<template>
  <HStack :gap="3" wrap
    ><Button
      v-for="edge in sides"
      :key="edge"
      variant="outline"
      @click="
        side = edge;
        open = true;
      "
      >{{ edge }}</Button
    ></HStack
  ><Drawer
    v-model:open="open"
    :side="side"
    size="small"
    :title="`${side} drawer`"
    ><DrawerBody
      ><p>Choose the edge that fits your workflow.</p></DrawerBody
    ></Drawer
  >
</template>
