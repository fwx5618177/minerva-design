<script setup lang="ts">
import { Tabs, TabList, Tab, TabPanel } from "minerva-design/vue";
</script>
<template>
  <Tabs default-value="general" orientation="vertical" variant="pills"
    ><TabList aria-label="Settings sections"
      ><Tab value="general">General</Tab><Tab value="team">Team</Tab></TabList
    ><TabPanel value="general">General workspace settings</TabPanel
    ><TabPanel value="team">Team access settings</TabPanel></Tabs
  >
</template>
