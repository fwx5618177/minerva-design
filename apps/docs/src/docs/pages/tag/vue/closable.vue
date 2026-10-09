<script setup lang="ts">
import { ref } from "vue";
import { Tag, Button, HStack } from "minerva-design/vue";
const initialTags = ["Tag 1", "Tag 2", "Tag 3"];
const tags = ref([...initialTags]);
const opened = ref("");
</script>
<template>
  <HStack :gap="2" wrap
    ><Tag
      v-for="(tag, index) in tags"
      :key="tag"
      closable
      :close-label="(label) => `Remove ${label}`"
      :clickable="index === 0"
      @close="tags = tags.filter((t) => t !== tag)"
      @click="opened = tag"
      >{{ tag }}<template v-if="index === 2" #close-icon>⊗</template></Tag
    ><span v-if="opened">Opened: {{ opened }}</span
    ><Button v-if="!tags.length" @click="tags = [...initialTags]"
      >Reset</Button
    ></HStack
  >
</template>
