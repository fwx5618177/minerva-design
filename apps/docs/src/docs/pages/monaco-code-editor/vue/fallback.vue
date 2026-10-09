<script setup lang="ts">
import { ref, shallowRef } from "vue";
import { MonacoCodeEditor } from "minerva-design/vue/monaco";
import { Alert, Button, Stack } from "minerva-design/vue";

const code = ref("Text stays editable while the engine is unavailable.");
const engine = shallowRef<typeof import("monaco-editor")>();
const loading = ref(false);
const loadError = ref("");
async function recover() {
  loading.value = true;
  loadError.value = "";
  try {
    engine.value = (await import("../engine")).monaco;
  } catch (error) {
    loadError.value =
      error instanceof Error
        ? error.message
        : "The local editor engine could not be loaded. Retry when it is available.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Stack :gap="3" style="width: 100%">
    <MonacoCodeEditor
      v-model="code"
      :monaco="engine"
      label="Recoverable editor"
      :load-timeout="1"
      :height="220"
    />
    <Button :loading="loading" @click="recover"
      >Load local editor engine</Button
    >
    <Alert v-if="loadError" color="danger" title="Editor engine unavailable">{{
      loadError
    }}</Alert>
    <output>{{ code }}</output>
  </Stack>
</template>
