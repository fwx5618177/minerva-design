<script setup lang="ts">
import { ref } from "vue";
import { PageTabs, PageTab } from "minerva-design/vue";
const active = ref("overview");
const pages = ref([
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings" },
]);
</script>
<template>
  <PageTabs :active-value="active" aria-label="Project pages"
    ><PageTab
      v-for="page in pages"
      :key="page.value"
      :value="page.value"
      :label="page.label"
      :active="active === page.value"
      @select="active = page.value" /></PageTabs
  ><output>Current page: {{ active }}</output>
</template>
