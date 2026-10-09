<script setup lang="ts">
import { ref } from "vue";
import { Switch, FormField } from "minerva-design/vue";
const enabled = ref(true);
</script>
<template>
  <FormField label="Notifications" helper-text="Receive updates by email"
    ><Switch
      v-model="enabled"
      label="Email updates"
      name="notifications" /></FormField
  ><output>{{ enabled ? "Enabled" : "Disabled" }}</output>
</template>
