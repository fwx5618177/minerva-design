<script setup lang="ts">
import { ref } from "vue";
import { Upload } from "minerva-design/vue";
import type { UploadItem } from "minerva-design/vue";
const files = ref<UploadItem[]>([]);
function selected(items: File[]) {
  files.value.push(
    ...items.map((file, index) => ({
      id: `${Date.now()}-${index}`,
      name: file.name,
      status: "done" as const,
    })),
  );
}
</script>
<template>
  <Upload
    v-model="files"
    label="Attachments"
    multiple
    @files-selected="selected"
  />
</template>
