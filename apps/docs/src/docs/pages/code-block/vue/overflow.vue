<script setup lang="ts">
import { CodeBlock } from "minerva-design/vue";
const code = Array.from(
  { length: 16 },
  (_, i) =>
    `const line${i + 1} = "A long line of code demonstrates horizontal and vertical scrolling in the code block.";`,
).join("\n");
</script>
<template>
  <CodeBlock :code="code" max-height="160px" :wrap="false" />
</template>
