<script setup lang="ts">
import { ref } from "vue";
import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Button,
  VStack,
} from "minerva-design/vue";
const active = ref("one");
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="active = active === 'one' ? 'two' : 'one'"
      >Switch active tab</Button
    ><Tabs v-model="active"
      ><TabList aria-label="Controlled sections"
        ><Tab value="one">First</Tab><Tab value="two">Second</Tab></TabList
      ><TabPanel value="one">First panel</TabPanel
      ><TabPanel value="two">Second panel</TabPanel></Tabs
    ><output>{{ active }}</output></VStack
  >
</template>
