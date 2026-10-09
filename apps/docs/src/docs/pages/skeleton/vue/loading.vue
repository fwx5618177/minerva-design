<script setup lang="ts">
import { ref } from "vue";
import { Skeleton, Button, VStack } from "minerva-design/vue";
const loading = ref(true);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="loading = !loading">Toggle loading</Button
    ><Skeleton :loading="loading" height="64px"
      ><p>Content has finished loading.</p></Skeleton
    ></VStack
  >
</template>
