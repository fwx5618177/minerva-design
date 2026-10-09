<script setup lang="ts">
import { ref } from "vue";
import { Select, SelectItem, FormField } from "minerva-design/vue";
const value = ref("");
</script>
<template>
  <FormField
    label="Role"
    required
    :invalid="!value"
    error-message="Choose a role"
    ><Select v-model="value" name="role" placeholder="Select a role"
      ><SelectItem value="viewer">Viewer</SelectItem
      ><SelectItem value="editor">Editor</SelectItem></Select
    ></FormField
  >
</template>
