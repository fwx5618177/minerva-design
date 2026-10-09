<script setup lang="ts">
import { Tabs, Tab, TabList, TabPanel } from "minerva-design/vue";
</script>
<template>
  <Tabs default-value="overview"
    ><TabList aria-label="Book sections"
      ><Tab value="overview">Overview</Tab><Tab value="reviews">Reviews</Tab
      ><Tab value="similar" disabled>Similar books</Tab></TabList
    ><TabPanel value="overview"
      >A desert planet, a noble family and a precious spice.</TabPanel
    ><TabPanel value="reviews">“A masterpiece of world building.”</TabPanel
    ><TabPanel value="similar">Coming soon.</TabPanel></Tabs
  >
</template>
