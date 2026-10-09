<script setup lang="ts">
import { Divider } from "minerva-design/vue";
</script>
<template>
  <div style="display: flex; align-items: center">
    <span>Home</span
    ><Divider orientation="vertical" :length="16" :spacing="12" /><span
      >Products</span
    ><Divider orientation="vertical" :length="16" :spacing="12" /><span
      >About</span
    >
  </div>
</template>
