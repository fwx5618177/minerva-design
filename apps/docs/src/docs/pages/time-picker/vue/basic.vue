<script setup lang="ts">
import { ref } from "vue";
import { TimePicker, VStack } from "minerva-design/vue";
const time = ref<Date | null>(null);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><TimePicker v-model="time" label="Meeting time" clearable /><output>{{
      time?.toLocaleTimeString() || "No time selected"
    }}</output></VStack
  >
</template>
