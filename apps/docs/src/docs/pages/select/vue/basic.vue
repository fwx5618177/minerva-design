<script setup lang="ts">
import { ref } from "vue";
import { Select, SelectItem } from "minerva-design/vue";
const language = ref("en");
</script>
<template>
  <div style="width: 240px">
    <Select v-model="language" aria-label="Language"
      ><SelectItem value="en">English</SelectItem
      ><SelectItem value="zh">Chinese</SelectItem
      ><SelectItem value="fr">French</SelectItem></Select
    >
  </div>
</template>
