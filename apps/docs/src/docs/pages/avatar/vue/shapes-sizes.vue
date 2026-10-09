<script setup lang="ts">
import { Avatar, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Avatar name="Ada" size="small" shape="circle" /><Avatar
      name="Grace"
      size="medium"
      shape="square" /><Avatar name="Alan" size="large" shape="rounded"
  /></HStack>
</template>
