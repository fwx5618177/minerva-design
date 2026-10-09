<script setup lang="ts">
import { ref } from "vue";
import { Empty, Button } from "minerva-design/vue";
const created = ref(false);
</script>
<template>
  <Empty v-if="!created" title="Create your first project"
    ><template #actions
      ><Button @click="created = true">Create project</Button></template
    ></Empty
  ><output v-else>Project created</output>
</template>
