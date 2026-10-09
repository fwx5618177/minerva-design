<script setup lang="ts">
import { inject, type ComputedRef } from "vue";
defineProps<{ requiredIndicator?: string }>();
const form = inject<ComputedRef<Record<string, any>> | null>(
  "minerva:form",
  null,
);
</script>
<template>
  <text v-if="!form?.invalid" class="mn-muted"><slot /></text>
</template>
