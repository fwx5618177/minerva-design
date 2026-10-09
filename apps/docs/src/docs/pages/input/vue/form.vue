<script setup lang="ts">
import { ref } from "vue";
import { Input, FormField, Button, VStack } from "minerva-design/vue";
const email = ref("");
const saved = ref(false);
</script>
<template>
  <form @submit.prevent="saved = true">
    <VStack :gap="3"
      ><FormField label="Email" required
        ><Input v-model="email" type="email" required /></FormField
      ><Button type="submit">Subscribe</Button
      ><output v-if="saved">Subscribed: {{ email }}</output></VStack
    >
  </form>
</template>
