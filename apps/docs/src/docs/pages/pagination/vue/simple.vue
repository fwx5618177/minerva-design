<script setup lang="ts">
import { ref } from "vue";
import { Pagination } from "minerva-design/vue";
const page = ref(1);
</script>
<template><Pagination v-model:current="page" simple :total="120" /></template>
