<script setup lang="ts">
import { Divider } from "minerva-design/vue";
</script>
<template>
  <div style="width: 100%">
    <Divider style="--divider-color: #7c3aed" :thickness="2"></Divider
    ><Divider
      style="--divider-color: #16a34a"
      :thickness="3"
      variant="dashed"
      length="50%"
    ></Divider
    ><Divider style="--divider-color: #7c3aed">Section</Divider
    ><Divider :spacing="32" elevation></Divider>
  </div>
</template>
