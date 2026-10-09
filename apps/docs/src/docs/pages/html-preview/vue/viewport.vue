<script setup lang="ts">
import { ref } from "vue";
import { HtmlPreview, Button, VStack } from "minerva-design/vue";
const mobile = ref(true);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="mobile = !mobile">{{
      mobile ? "Switch to desktop" : "Switch to mobile"
    }}</Button
    ><HtmlPreview
      html="<h2>Responsive preview</h2><p>Inspect content at different viewport widths.</p>"
      title="Responsive document"
      :viewport="mobile ? 'mobile' : 'desktop'"
      :mobile-width="320"
      :height="220"
  /></VStack>
</template>
