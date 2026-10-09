<script setup lang="ts">
import { ConfigProvider, Pagination, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><ConfigProvider :locale="{ language: 'en' }"
      ><Pagination :total="100" /></ConfigProvider
    ><ConfigProvider :locale="{ language: 'zh' }"
      ><Pagination :total="100" /></ConfigProvider
  ></VStack>
</template>
