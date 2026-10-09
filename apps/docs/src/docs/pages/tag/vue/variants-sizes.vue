<script setup lang="ts">
import { Tag, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Tag size="small" variant="outline" shape="square">Small</Tag
    ><Tag color="primary" variant="solid">Solid</Tag
    ><Tag size="large" shape="circle" color="info">Large</Tag
    ><Tag loading>Working</Tag></HStack
  >
</template>
