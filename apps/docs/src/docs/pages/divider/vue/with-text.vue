<script setup lang="ts">
import { Divider } from "minerva-design/vue";
</script>
<template>
  <div style="width: 100%">
    <Divider text-align="left">Left</Divider><Divider>Center</Divider
    ><Divider text-align="right" variant="dashed" :thickness="3">Right</Divider>
  </div>
</template>
