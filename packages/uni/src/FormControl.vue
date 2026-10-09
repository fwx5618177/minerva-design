<script setup lang="ts">
import { provide, computed } from "vue";
const props = defineProps<{
  disabled?: boolean;
  readOnly?: boolean;
  invalid?: boolean;
  required?: boolean;
  id?: string;
}>();
provide(
  "minerva:form",
  computed(() => props),
);
</script>
<template>
  <view
    class="mn-form-control"
    :class="{ 'mn-invalid': invalid, 'mn-disabled': disabled }"
    ><slot
  /></view>
</template>
