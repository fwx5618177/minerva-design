<script setup lang="ts">
import { onMounted, shallowRef, ref } from "vue";
import { MonacoCodeEditor } from "minerva-design/vue/monaco";
import { Alert, Switch, Stack } from "minerva-design/vue";

const code = ref("<h1>Hello, Minerva</h1>");
const disabled = ref(false);
const engine = shallowRef<typeof import("monaco-editor")>();
const loadError = ref("");
// The host configures MonacoEnvironment.getWorker. The docs use a bundled
// local worker; neither the editor nor its worker is fetched from a CDN.
onMounted(async () => {
  try {
    engine.value = (await import("../engine")).monaco;
  } catch (error) {
    loadError.value =
      error instanceof Error
        ? error.message
        : "The local editor engine could not be loaded.";
  }
});
</script>

<template>
  <Stack :gap="3" style="width: 100%">
    <Switch v-model="disabled" label="Read-only editor" />
    <Alert v-if="loadError" color="danger" title="Editor engine unavailable">{{
      loadError
    }}</Alert>
    <MonacoCodeEditor
      v-model="code"
      :monaco="engine"
      label="HTML source"
      language="html"
      :disabled="disabled"
      :height="280"
    />
    <output aria-live="polite">{{ code.length }} characters</output>
  </Stack>
</template>
