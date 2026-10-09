<script setup lang="ts">
import { ref } from "vue";
import { Switch, VStack } from "minerva-design/vue";
const enabled = ref(false);
</script>
<template>
  <VStack :gap="3"
    ><Switch label="Email notifications" v-model="enabled" /><span
      >Notifications are {{ enabled ? "on" : "off" }}</span
    ></VStack
  >
</template>
