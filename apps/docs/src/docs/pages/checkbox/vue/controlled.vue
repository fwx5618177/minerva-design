<script setup lang="ts">
import { ref } from "vue";
import { Checkbox, VStack } from "minerva-design/vue";
const checked = ref(true);
</script>
<template>
  <VStack align="start" :gap="3"
    ><Checkbox v-model="checked" label="Subscribe to the newsletter" /><span
      role="status"
      >{{ checked ? "Subscribed" : "Not subscribed" }}</span
    ></VStack
  >
</template>
