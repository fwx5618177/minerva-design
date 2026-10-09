<script setup lang="ts">
import { ref } from "vue";
import { Pagination, VStack } from "minerva-design/vue";
const page = ref(1);
const size = ref(10);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Pagination
      v-model:current="page"
      v-model:page-size="size"
      :total="248"
      show-total
      show-size-changer
      show-quick-jumper
    /><output>Page {{ page }}, {{ size }} rows per page</output></VStack
  >
</template>
