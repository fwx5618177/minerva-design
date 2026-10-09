<script setup lang="ts">
import { Button, HStack, VStack } from "minerva-design/vue";
const colors = ["primary", "neutral", "danger"] as const;
const variants = ["solid", "outline", "ghost", "link"] as const;
</script>
<template>
  <VStack :gap="3"
    ><HStack v-for="color in colors" :key="color" :gap="2" wrap
      ><Button
        v-for="variant in variants"
        :key="variant"
        :color="color"
        :variant="variant"
        >{{ variant }}</Button
      ></HStack
    ></VStack
  >
</template>
