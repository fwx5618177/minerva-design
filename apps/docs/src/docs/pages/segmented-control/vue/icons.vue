<script setup lang="ts">
import { SegmentedControl, VStack } from "minerva-design/vue";
</script>
<template>
  <VStack :gap="4" align="start"
    ><SegmentedControl
      aria-label="Layout"
      default-value="list"
      :options="[
        { value: 'list', label: 'List', icon: '☰' },
        { value: 'grid', label: 'Grid', icon: '▦' },
        { value: 'map', label: 'Map', icon: '⌖' },
      ]" /><SegmentedControl
      aria-label="Layout (compact)"
      default-value="grid"
      :options="[
        { value: 'list', icon: '☰', 'aria-label': 'List' },
        { value: 'grid', icon: '▦', 'aria-label': 'Grid' },
        { value: 'map', icon: '⌖', 'aria-label': 'Map' },
      ]"
  /></VStack>
</template>
