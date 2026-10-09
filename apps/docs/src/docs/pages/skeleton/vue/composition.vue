<script setup lang="ts">
import { Skeleton, SkeletonText, HStack, VStack } from "minerva-design/vue";
</script>
<template>
  <HStack :gap="4" align="start"
    ><Skeleton variant="circular" width="48px" height="48px" /><VStack
      :gap="3"
      style="flex: 1"
      ><Skeleton width="40%" height="20px" /><SkeletonText :lines="3" /></VStack
  ></HStack>
</template>
