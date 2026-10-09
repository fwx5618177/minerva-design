<script setup lang="ts">
import { inject, type ComputedRef } from "vue";
defineProps<{ requiredIndicator?: string }>();
const form = inject<ComputedRef<Record<string, any>> | null>(
  "minerva:form",
  null,
);
</script>
<template>
  <text v-if="true" class="mn-form-label"
    ><slot /><text v-if="form?.required" class="mn-error">{{
      requiredIndicator ?? "*"
    }}</text></text
  >
</template>
