<script setup lang="ts">
import { Tabs, Tab, TabList, VStack } from "minerva-design/vue";
const variants = ["line", "enclosed", "soft", "pills"] as const;
</script>
<template>
  <VStack :gap="6"
    ><Tabs
      v-for="variant in variants"
      :key="variant"
      :variant="variant"
      default-value="hot"
      ><TabList :aria-label="`${variant} tabs`"
        ><Tab value="hot">Hot</Tab><Tab value="new">New</Tab
        ><Tab value="completed">Completed</Tab></TabList
      ></Tabs
    ></VStack
  >
</template>
