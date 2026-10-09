<script setup lang="ts">
import { Divider } from "minerva-design/vue";
</script>
<template>
  <div style="display: flex; align-items: center; gap: 12px; height: 48px">
    <span>Edit</span
    ><Divider orientation="vertical" flex-item :spacing="0"></Divider
    ><span>Share</span
    ><Divider orientation="vertical" flex-item :spacing="0"></Divider
    ><span>Delete</span>
  </div>
</template>
