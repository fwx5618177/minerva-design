<script setup lang="ts">
import { HtmlPreview } from "minerva-design/vue";
</script>
<template>
  <HtmlPreview
    html="<h1>Hello Minerva</h1><p>A sandboxed document preview.</p>"
    title="Welcome document"
    :height="220"
  />
</template>
