<script setup lang="ts">
import { ref } from "vue";
import { LoadingState, Card, CardContent, Button } from "minerva-design/vue";
const loading = ref(true);
</script>
<template>
  <Card
    ><CardContent
      ><Button @click="loading = !loading">{{
        loading ? "Finish loading" : "Reload"
      }}</Button
      ><LoadingState v-if="loading" size="small" label="Fetching activity…" />
      <p v-else>All activity is up to date.</p></CardContent
    ></Card
  >
</template>
