<script setup lang="ts">
import { Skeleton, HStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="3" wrap
    ><Skeleton
      variant="circular"
      width="64px"
      height="64px"
      animation="pulse" /><Skeleton
      width="180px"
      height="64px"
      animation="wave" /><Skeleton
      width="120px"
      height="64px"
      animation="false"
  /></HStack>
</template>
