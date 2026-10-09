<script setup lang="ts">
import FormControl from "./FormControl.vue";
defineProps<{
  label?: string;
  helperText?: string;
  errorMessage?: string;
  invalid?: boolean;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
}>();
</script>
<template>
  <FormControl
    :invalid="invalid ?? !!errorMessage"
    :required="required"
    :disabled="disabled"
    :read-only="readOnly"
    ><text class="mn-form-label"
      >{{ label }}<text v-if="required" class="mn-error"> *</text></text
    ><slot /><text
      v-if="(invalid ?? !!errorMessage) && errorMessage"
      class="mn-error"
      >{{ errorMessage }}</text
    ><text v-else-if="helperText" class="mn-muted">{{
      helperText
    }}</text></FormControl
  >
</template>
