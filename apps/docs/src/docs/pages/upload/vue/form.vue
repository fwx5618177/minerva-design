<script setup lang="ts">
import { ref } from "vue";
import { Upload, FormField } from "minerva-design/vue";
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
  <FormField
    label="Project documents"
    helper-text="Up to 3 PDF files, 2 MB each"
    ><Upload
      v-model="files"
      label="PDF documents"
      accept=".pdf"
      multiple
      :max-count="3"
      :max-size="2 * 1024 * 1024"
      @files-selected="selected"
  /></FormField>
</template>
