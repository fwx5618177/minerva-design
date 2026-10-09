<script setup lang="ts">
import { Tag, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Tag>Design</Tag><Tag color="success">Published</Tag
    ><Tag color="warning">Draft</Tag></HStack
  >
</template>
