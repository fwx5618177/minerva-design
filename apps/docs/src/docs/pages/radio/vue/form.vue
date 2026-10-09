<script setup lang="ts">
import { ref } from "vue";
import { RadioGroup, Radio, FormField } from "minerva-design/vue";
const value = ref<string | number | null>("monthly");
</script>
<template>
  <FormField label="Subscription" required
    ><RadioGroup v-model="value" name="subscription" label="Subscription"
      ><Radio value="monthly" label="Monthly" /><Radio
        value="annual"
        label="Annual" /></RadioGroup></FormField
  ><output>Selected: {{ value }}</output>
</template>
