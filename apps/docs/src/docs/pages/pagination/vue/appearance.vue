<script setup lang="ts">
import { Pagination, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Pagination
      :total="80"
      size="small"
      shape="circle"
      variant="solid" /><Pagination
      :total="80"
      size="large"
      shape="square"
      variant="outline"
  /></VStack>
</template>
