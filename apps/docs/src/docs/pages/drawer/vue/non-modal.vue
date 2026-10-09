<script setup lang="ts">
import {
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerBody,
  DrawerClose,
  Button,
} from "minerva-design/vue";
</script>
<template>
  <DrawerRoot :modal="false"
    ><DrawerTrigger as-child
      ><Button variant="outline">Open non-modal panel</Button></DrawerTrigger
    ><DrawerContent description="The rest of the page stays interactive"
      ><template #title>Quick reference</template
      ><DrawerBody
        ><p>Keep working while this reference stays open.</p>
        <DrawerClose>Close panel</DrawerClose></DrawerBody
      ></DrawerContent
    ></DrawerRoot
  >
</template>
