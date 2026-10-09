<script setup lang="ts">
import { ref } from "vue";
import { ConfirmDialog, Button, VStack } from "minerva-design/vue";
const open = ref(false);
const loading = ref(false);
const result = ref("");
async function publish() {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 600));
  loading.value = false;
  open.value = false;
  result.value = "Release published";
}
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="open = true">Publish release</Button
    ><ConfirmDialog
      v-model:open="open"
      :loading="loading"
      title="Publish this release?"
      description="The release will become available to your team."
      confirm-label="Publish"
      @confirm="publish"
    /><output>{{ result }}</output></VStack
  >
</template>
