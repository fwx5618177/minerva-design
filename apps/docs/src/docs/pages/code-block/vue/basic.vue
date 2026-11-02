<script setup lang="ts">
import { CodeBlock } from "minerva-design/vue";
const code = JSON.stringify(
  { id: 42, title: "The Three-Body Problem", tags: ["sci-fi", "classic"] },
  null,
  2,
);
</script>
<template>
  <CodeBlock :code="code" language="json" aria-label="Response payload" />
</template>
