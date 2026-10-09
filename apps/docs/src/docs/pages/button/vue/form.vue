<script setup lang="ts">
import { ref } from "vue";
import { Button, Input } from "minerva-design/vue";
const log = ref("Nothing yet");
function submit(event: Event) {
  const title = new FormData(event.target as HTMLFormElement).get("title");
  log.value = `Submitted "${String(title)}"`;
}
</script>
<template>
  <form
    @submit.prevent="submit"
    @reset="log = 'Reset'"
    style="display: flex; flex-wrap: wrap; gap: 8px; align-items: center"
  >
    <Input name="title" aria-label="Title" default-value="Draft" />
    <Button
      color="neutral"
      variant="outline"
      @click="log = 'Preview opened (form not submitted)'"
      >Preview</Button
    >
    <Button type="reset" color="neutral" variant="ghost">Reset</Button
    ><Button type="submit">Save</Button
    ><output style="flex-basis: 100%">{{ log }}</output>
  </form>
</template>
