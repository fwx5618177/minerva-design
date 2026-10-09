<script setup lang="ts">
import { ref } from "vue";
import { JsonField } from "minerva-design/vue";
const json = ref('{"name":"Minerva","enabled":true}');
</script>
<template>
  <JsonField v-model="json" aria-label="Configuration JSON" />
</template>
