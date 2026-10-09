<script setup lang="ts">
import { ref } from "vue";
import {
  ConfirmProvider,
  Button,
  confirm,
  type ConfirmOptions,
} from "minerva-design/vue";
const result = ref("No decision yet");
const examples: { label: string; options: ConfirmOptions }[] = [
  {
    label: "Publish",
    options: { title: "Publish this chapter?", color: "primary" },
  },
  {
    label: "Reset",
    options: {
      title: "Reset all settings?",
      description: "Your preferences return to their defaults.",
      color: "warning",
      confirmLabel: "Reset",
    },
  },
  {
    label: "Delete",
    options: { title: "Delete this draft?", color: "danger" },
  },
];
async function ask(example: (typeof examples)[number]) {
  result.value = `${example.label}: ${(await confirm(example.options)) ? "confirmed" : "cancelled"}`;
}
</script>
<template>
  <ConfirmProvider
    ><div style="display: flex; gap: 12px; flex-wrap: wrap">
      <Button
        v-for="example in examples"
        :key="example.label"
        :color="example.options.color"
        variant="outline"
        @click="ask(example)"
        >{{ example.label }}</Button
      ><output>{{ result }}</output>
    </div></ConfirmProvider
  >
</template>
