<script setup lang="ts">
import { ref } from "vue";
import { ConfirmProvider, Button, confirm } from "minerva-design/vue";
const result = ref("");
async function ask() {
  result.value = (await confirm({
    title: "Archive workspace?",
    description: "You can restore it later.",
  }))
    ? "Archived"
    : "Cancelled";
}
</script>
<template>
  <ConfirmProvider
    ><Button @click="ask">Archive workspace</Button
    ><output>{{ result }}</output></ConfirmProvider
  >
</template>
