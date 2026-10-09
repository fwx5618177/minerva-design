<script setup lang="ts">
import { IconButton, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><IconButton label="Small add" size="small" shape="circle">+</IconButton
    ><IconButton label="Medium edit" size="medium" shape="square">✎</IconButton
    ><IconButton label="Large favorite" size="large" variant="solid"
      >★</IconButton
    ></HStack
  >
</template>
