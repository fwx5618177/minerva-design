<script setup lang="ts">
import { ref } from "vue";
import { PageTabs, PageTab, Button } from "minerva-design/vue";
const active = ref("overview");
const pages = ref([
  { value: "overview", label: "Overview" },
  { value: "activity", label: "Activity" },
  { value: "settings", label: "Settings" },
]);
function add() {
  const value = `page-${pages.value.length + 1}`;
  pages.value.push({ value, label: `Page ${pages.value.length + 1}` });
  active.value = value;
}
</script>
<template>
  <PageTabs :active-value="active" aria-label="Open documents"
    ><PageTab
      v-for="page in pages"
      :key="page.value"
      :value="page.value"
      :label="page.label"
      :active="active === page.value"
      @select="active = page.value"
    /><template #actions
      ><Button size="small" @click="add">New page</Button></template
    ></PageTabs
  ><output>{{ pages.length }} open pages</output>
</template>
