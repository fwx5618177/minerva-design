<script setup lang="ts">
import { CodeBlock, VStack } from "minerva-design/vue";

// Code without a known language (e.g. an EPUB <pre> without a class):
// language="auto" detects it (detectCodeLanguage of minerva-design/core).
const snippets = [
  '{\n  "title": "The Little Prince",\n  "year": 1943\n}',
  "def word_count(path):\n    with open(path) as f:\n        return len(f.read().split())",
  "SELECT title, COUNT(*) AS readers\nFROM books\nGROUP BY title\nORDER BY readers DESC;",
  "server:\n  port: 8080\n  hosts:\n    - reader.example.com",
  "It was a dark and stormy night;\nthe rain fell in torrents.",
];
</script>
<template>
  <VStack :gap="3" align="stretch">
    <CodeBlock
      v-for="(snippet, i) in snippets"
      :key="i"
      :code="snippet"
      language="auto"
      show-language
      :aria-label="`Snippet ${i + 1}`"
    />
  </VStack>
</template>
