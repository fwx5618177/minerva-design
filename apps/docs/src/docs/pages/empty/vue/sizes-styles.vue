<script setup lang="ts">
import { Empty, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Empty size="small" title="No matches" :icon="false" /><Empty
      size="large"
      title="All caught up"
      description="Nothing requires your attention."
      :show-shadow="false"
  /></HStack>
</template>
