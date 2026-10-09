<script setup lang="ts">
import { ref } from "vue";
import { Upload } from "minerva-design/vue";
import type { UploadItem } from "minerva-design/vue";
const files = ref<UploadItem[]>([
  {
    id: "failed",
    name: "report.pdf",
    status: "error",
    error: "Transfer interrupted",
  },
]);
async function retry(item: UploadItem) {
  item.status = "uploading";
  await new Promise((resolve) => setTimeout(resolve, 500));
  item.status = "done";
  item.error = undefined;
}
function selected(items: File[]) {
  for (const file of items) {
    const item: UploadItem = {
      id: String(Date.now()),
      name: file.name,
      status: "uploading",
    };
    files.value.push(item);
    void retry(files.value[files.value.length - 1]!);
  }
}
</script>
<template>
  <Upload
    v-model="files"
    label="Transfer queue"
    @retry="retry"
    @files-selected="selected"
  />
</template>
