<script setup lang="ts">
import { DescriptionList, VStack } from "minerva-design/vue";
const items = [
  { key: "plan", label: "Plan", value: "Team" },
  { key: "region", label: "Region", value: "Europe" },
];
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><DescriptionList bordered :items="items" /><DescriptionList
      striped
      :items="items"
  /></VStack>
</template>
