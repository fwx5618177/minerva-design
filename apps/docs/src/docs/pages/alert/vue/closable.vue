<script setup lang="ts">
import { ref } from "vue";
import { Alert, Button, VStack } from "minerva-design/vue";
const visible = ref(true);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Alert
      v-if="visible"
      closable
      title="Scheduled maintenance"
      @close="visible = false"
      >Service will restart tonight.</Alert
    ><Button v-else @click="visible = true">Restore notice</Button></VStack
  >
</template>
