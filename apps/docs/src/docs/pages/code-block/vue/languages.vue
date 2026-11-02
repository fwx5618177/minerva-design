<script setup lang="ts">
import { CodeBlock, VStack } from "minerva-design/vue";

const samples = [
  {
    language: "ts",
    code: "export const double = (n: number): number => n * 2; // pure",
  },
  { language: "css", code: ".card:hover {\n  color: #1f2937 !important;\n}" },
  {
    language: "html",
    code: '<!-- Form -->\n<input name="email" type="email" required>',
  },
  {
    language: "bash",
    code: '# Install\npnpm add minerva-design && echo "Done in $PWD"',
  },
  {
    language: "python",
    code: "@cache\ndef square(x: int) -> int:\n    return x * x  # memoized",
  },
  {
    language: "diff",
    code: '@@ -1 +1 @@\n-  "theme": "light"\n+  "theme": "dark"',
  },
];
</script>
<template>
  <VStack :gap="3" align="stretch">
    <CodeBlock
      v-for="sample in samples"
      :key="sample.language"
      :code="sample.code"
      :language="sample.language"
      show-language
      :aria-label="`${sample.language} example`"
    />
  </VStack>
</template>
