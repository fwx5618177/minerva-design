<script setup lang="ts">
import {
  ConfigProvider,
  Button,
  Input,
  VStack,
  PaletteToggle,
} from "minerva-design/vue";
</script>
<template>
  <ConfigProvider palette="tech" density="compact" radius="small"
    ><VStack :gap="3"
      ><PaletteToggle /><Input
        aria-label="Compact input"
        placeholder="Compact input"
      /><Button>Configured appearance</Button></VStack
    ></ConfigProvider
  >
</template>
