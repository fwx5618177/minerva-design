<script setup lang="ts">
import { ref } from "vue";
import { ConfigProvider, ThemeToggle, VStack } from "minerva-design/vue";
const result = ref("none");
</script>
<template>
  <ConfigProvider @theme-change="(theme) => (result = String(theme))"
    ><VStack :gap="3"
      ><ThemeToggle /><output>Last theme change: {{ result }}</output></VStack
    ></ConfigProvider
  >
</template>
