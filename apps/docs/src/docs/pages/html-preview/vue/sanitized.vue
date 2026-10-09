<script setup lang="ts">
import { HtmlPreview, VStack } from "minerva-design/vue";
const html =
  '<h2>Safe preview</h2><img src="x" onerror="alert(1)"><a href="javascript:alert(1)">Unsafe link</a><p>Ordinary content remains visible.</p>';
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><HtmlPreview :html="html" title="Sanitized document" :height="220" />
    <p>
      Unsafe scripts and event handlers are removed; the preview stays
      sandboxed.
    </p></VStack
  >
</template>
