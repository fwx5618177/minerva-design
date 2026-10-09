<script setup lang="ts">
import { Stack, Badge } from "minerva-design/vue";
</script>
<template>
  <Stack direction="row" wrap separator="/" :gap="2"
    ><Badge v-for="n in 8" :key="n">Section {{ n }}</Badge></Stack
  >
</template>
