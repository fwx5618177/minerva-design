<script setup lang="ts">
import { ref } from "vue";
import { FormField, Input, Button, VStack } from "minerva-design/vue";
const name = ref("Minerva");
const saved = ref(false);
</script>
<template>
  <form @submit.prevent="saved = true">
    <VStack :gap="3"
      ><FormField label="Project name" required
        ><Input v-model="name" required /></FormField
      ><Button type="submit">Save project</Button
      ><output v-if="saved">Saved {{ name }}</output></VStack
    >
  </form>
</template>
