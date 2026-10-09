<script setup lang="ts">
import { Skeleton, SkeletonText, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Skeleton width="180px" height="24px" /><SkeletonText :lines="3"
  /></VStack>
</template>
