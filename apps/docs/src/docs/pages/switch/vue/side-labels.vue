<script setup lang="ts">
import { ref } from "vue";
import { Switch, VStack } from "minerva-design/vue";
const enabled = ref(false);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Switch v-model="enabled" off-label="Monthly" on-label="Annual" /><Switch
      v-model="enabled"
      variant="segmented"
      off-label="Light"
      on-label="Dark"
  /></VStack>
</template>
