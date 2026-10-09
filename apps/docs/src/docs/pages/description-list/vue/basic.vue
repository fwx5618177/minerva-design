<script setup lang="ts">
import { DescriptionList } from "minerva-design/vue";
</script>
<template>
  <DescriptionList
    :items="[
      { key: 'name', label: 'Name', value: 'Minerva' },
      { key: 'status', label: 'Status', value: 'Active' },
    ]"
  />
</template>
