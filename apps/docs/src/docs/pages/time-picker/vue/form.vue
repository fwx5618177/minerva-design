<script setup lang="ts">
import { ref } from "vue";
import { TimePicker, FormField } from "minerva-design/vue";
const time = ref<Date | null>(null);
</script>
<template>
  <FormField
    label="Start time"
    required
    :invalid="!time"
    error-message="Choose a start time"
    ><TimePicker v-model="time" format="HH:mm" :show-second="false"
  /></FormField>
</template>
