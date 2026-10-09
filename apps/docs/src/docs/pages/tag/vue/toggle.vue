<script setup lang="ts">
import { ref } from "vue";
import { Tag, HStack } from "minerva-design/vue";
const tags = ["All", "Design", "Engineering"];
const selected = ref("All");
</script>
<template>
  <HStack :gap="3" wrap
    ><Tag
      v-for="tag in tags"
      :key="tag"
      clickable
      :pressed="selected === tag"
      @click="selected = tag"
      >{{ tag }}</Tag
    ><output>Filter: {{ selected }}</output></HStack
  >
</template>
