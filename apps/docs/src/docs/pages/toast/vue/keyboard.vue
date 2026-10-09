<script setup lang="ts">
import { ref } from "vue";
import { ToastProvider, Button, toast } from "minerva-design/vue";
const details = ref(false);
function show() {
  toast.info("Build started", { duration: 0 });
  toast.success("Tests passed", { duration: 0 });
  toast.warning("Coverage dropped by 2%", {
    duration: 0,
    action: { label: "Details", onClick: () => (details.value = true) },
  });
}
</script>
<template>
  <ToastProvider :hotkey="['F8']"
    ><div style="display: grid; gap: 12px">
      <p>
        Show notifications, press F8 to focus them, Tab between actions, and
        Escape to close.
      </p>
      <Button @click="show">Show three notifications</Button
      ><Button variant="outline" @click="toast.dismiss()">Dismiss all</Button
      ><output v-if="details"
        >Coverage changed from 94% to 92%; add tests for the new export
        path.</output
      >
    </div></ToastProvider
  >
</template>
