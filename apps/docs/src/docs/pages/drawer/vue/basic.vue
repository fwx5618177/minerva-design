<script setup lang="ts">
import { ref } from "vue";
import { Drawer, DrawerBody, DrawerFooter, Button } from "minerva-design/vue";
const open = ref(false);
</script>
<template>
  <Button @click="open = true">Open drawer</Button
  ><Drawer
    v-model:open="open"
    title="Project details"
    description="Review your project settings"
    ><DrawerBody><p>Everything you need to manage this project.</p></DrawerBody
    ><DrawerFooter
      ><Button @click="open = false">Done</Button></DrawerFooter
    ></Drawer
  >
</template>
