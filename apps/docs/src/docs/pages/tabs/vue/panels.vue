<script setup lang="ts">
import { Tabs, TabList, Tab, TabPanel, Input } from "minerva-design/vue";
</script>
<template>
  <Tabs default-value="profile"
    ><TabList aria-label="Account settings"
      ><Tab value="profile">Profile</Tab
      ><Tab value="security">Security</Tab></TabList
    ><TabPanel value="profile"
      ><Input aria-label="Display name" default-value="Ada" /></TabPanel
    ><TabPanel value="security"
      ><Input
        type="password"
        aria-label="New password"
        placeholder="New password" /></TabPanel
  ></Tabs>
</template>
