<script setup lang="ts">
import { ref } from "vue";
import { Button } from "minerva-design/vue";
const count = ref(0);
</script>
<template>
  <Button @click="count++">Save</Button>
  <span role="status">{{ count }}</span>
</template>
