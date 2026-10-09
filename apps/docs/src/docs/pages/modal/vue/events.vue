<script setup lang="ts">
import { ref } from "vue";
import { Modal, ModalBody, Button } from "minerva-design/vue";
const open = ref(false);
const last = ref("");
</script>
<template>
  <Button @click="open = true">Open tracked dialog</Button
  ><Modal
    v-model:open="open"
    title="Dialog events"
    @open-change="(value) => (last = value ? 'Opened' : 'Closed')"
    ><ModalBody
      ><p>
        Escape, the close button, or the backdrop closes this dialog.
      </p></ModalBody
    ></Modal
  ><output>{{ last }}</output>
</template>
