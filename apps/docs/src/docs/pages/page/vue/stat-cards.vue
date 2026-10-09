<script setup lang="ts">
import { ResponsiveGrid, StatCard } from "minerva-design/vue";
</script>
<template>
  <ResponsiveGrid :columns="{ base: 1, sm: 3 }" :gap="4"
    ><StatCard
      label="Revenue"
      value="$24,560"
      description="+12% this month" /><StatCard
      label="Customers"
      :value="1280"
      description="84 new customers" /><StatCard
      label="Availability"
      value="99.9%"
      description="Last 30 days"
  /></ResponsiveGrid>
</template>
