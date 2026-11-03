<script setup lang="ts">
import { ref } from "vue";
import { Drawer, Popover, PopoverTrigger, PopoverContent } from "../../src";
const drawerOpen = ref(false),
  drawerModal = ref(false);
const popoverOpen = ref(false),
  popoverModal = ref(false),
  grown = ref(false);
// Keep controlled content open after outside-focus requests to verify scope release.
function requestPopover(open: boolean) {
  if (open) popoverOpen.value = true;
}
</script>
<template>
  <section style="margin-top: 400px; padding: 20px">
    <button id="lifecycle-outside">Lifecycle outside</button>
    <button @click="drawerOpen = true">Open lifecycle drawer</button>
    <Drawer :open="drawerOpen" :modal="drawerModal" title="Lifecycle drawer">
      <button @click="drawerModal = !drawerModal">
        Toggle drawer modality
      </button>
      <button @click="drawerOpen = false">End drawer lifecycle</button>
    </Drawer>
    <Popover
      :open="popoverOpen"
      :modal="popoverModal"
      @open-change="requestPopover"
    >
      <PopoverTrigger>Open lifecycle popover</PopoverTrigger>
      <PopoverContent side="top" :dismiss-layer="false">
        <div id="resizing-panel" :style="{ height: grown ? '220px' : '120px' }">
          <button @click="popoverModal = !popoverModal">
            Toggle popover modality
          </button>
          <button @click="grown = !grown">Resize content</button>
          <button @click="popoverOpen = false">End popover lifecycle</button>
        </div>
      </PopoverContent>
    </Popover>
  </section>
</template>
