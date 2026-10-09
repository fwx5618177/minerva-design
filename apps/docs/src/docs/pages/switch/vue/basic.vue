<script setup lang="ts">
import { Switch, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3"
    ><Switch label="Wi-Fi" default-checked /><Switch label="Bluetooth"
  /></VStack>
</template>
