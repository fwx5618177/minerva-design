<script setup lang="ts">
import { ref } from "vue";
import {
  AnswerSheet,
  VStack,
  type AnswerSheetGroup,
  type AnswerSheetItem,
} from "minerva-design/vue";
const groups: AnswerSheetGroup[] = [
  { key: "single", title: "Single choice" },
  { key: "multiple", title: "Multiple choice" },
  { key: "short", title: "Short answer" },
];
const items: AnswerSheetItem[] = [
  { key: "s1", group: "single", status: "correct" },
  { key: "s2", group: "single", status: "correct" },
  { key: "s3", group: "single", status: "wrong", flagged: true },
  { key: "s4", group: "single", status: "correct" },
  { key: "s5", group: "single", status: "skipped" },
  { key: "s6", group: "single", status: "correct" },
  { key: "m1", group: "multiple", status: "wrong" },
  { key: "m2", group: "multiple", status: "correct" },
  { key: "m3", group: "multiple", status: "answered", flagged: true },
  { key: "a1", group: "short", status: "answered" },
  { key: "a2", group: "short" },
  { key: "a3", group: "short", disabled: true },
];
const value = ref("s3");
</script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 420px"
    ><AnswerSheet
      v-model="value"
      :items="items"
      :groups="groups"
      show-summary
      show-legend
      aria-label="Review questions"
    /><output>Reviewing: {{ value }}</output></VStack
  >
</template>
