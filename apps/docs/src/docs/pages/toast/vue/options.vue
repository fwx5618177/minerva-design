<script setup lang="ts">
import { ref } from "vue";
import { ToastProvider, Button, toast, HStack } from "minerva-design/vue";
const result = ref("");
function notify() {
  toast({
    id: "undo",
    title: "Item archived",
    description: "Undo to restore it",
    duration: 0,
    action: { label: "Undo", onClick: () => (result.value = "Restored") },
  });
}
</script>
<template>
  <ToastProvider :max="3" position="bottom-right"
    ><HStack :gap="3"
      ><Button @click="notify">Persistent notification</Button
      ><Button variant="outline" @click="toast.dismiss()">Dismiss all</Button
      ><output>{{ result }}</output></HStack
    ></ToastProvider
  >
</template>
