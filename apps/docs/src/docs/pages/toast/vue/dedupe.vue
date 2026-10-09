<script setup lang="ts">
import { ref } from "vue";
import { ToastProvider, Button, toast } from "minerva-design/vue";
const attempts = ref(0);
function fail() {
  attempts.value++;
  toast.danger(`Sync failed, attempt ${attempts.value}`, {
    id: "vue-sync-error",
    duration: 0,
  });
}
</script>
<template>
  <ToastProvider
    ><div style="display: flex; gap: 12px">
      <Button @click="fail">Fail again</Button
      ><Button variant="outline" @click="toast.dismiss('vue-sync-error')"
        >Dismiss sync error</Button
      ><output>{{ attempts }} attempts, one notification ID</output>
    </div></ToastProvider
  >
</template>
