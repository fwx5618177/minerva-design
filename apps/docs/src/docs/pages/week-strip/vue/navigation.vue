<script setup lang="ts">
import { ref } from "vue";
import { VStack, WeekStrip } from "minerva-design/vue";
const day = ref<string>();
const week = ref(new Date());
</script>
<template>
  <VStack :gap="3" align="stretch" style="max-width: 480px"
    ><WeekStrip v-model="day" v-model:week="week" show-navigation /><output
      >Week of {{ week.toLocaleDateString()
      }}{{ day ? ` · selected ${day}` : "" }}</output
    ></VStack
  >
</template>
