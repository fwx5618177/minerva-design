<script setup lang="ts">
import { Alert, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Alert color="info" variant="subtle" size="small" title="Tip"
      >Use keyboard shortcuts to move faster.</Alert
    ><Alert color="warning" variant="outline" title="Storage almost full"
      >Archive unused files.</Alert
    ><Alert color="danger" variant="solid" size="large" title="Connection lost"
      >Reconnect to continue.</Alert
    ></VStack
  >
</template>
