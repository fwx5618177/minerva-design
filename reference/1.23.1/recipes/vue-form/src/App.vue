<script setup lang="ts">
import { ref } from "vue";
import {
  Button,
  ConfigProvider,
  FormField,
  Input,
  Switch,
  VStack,
} from "minerva-design/vue";
const name = ref("");
const subscribed = ref(false);
const saved = ref("");
</script>
<template>
  <ConfigProvider theme="light"
    ><VStack :gap="4" align="start">
      <FormField label="Project name" required
        ><Input name="project" v-model="name" clearable
      /></FormField>
      <Switch label="Newsletter" v-model="subscribed" />
      <Button
        :disabled="!name.trim()"
        @click="saved = `${name}${subscribed ? ' · subscribed' : ''}`"
        >Save project</Button
      >
      <output aria-live="polite">{{ saved || "No project saved" }}</output>
    </VStack></ConfigProvider
  >
</template>
