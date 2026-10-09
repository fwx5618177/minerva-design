<script setup lang="ts">
import { ref } from "vue";
import { NavTree } from "minerva-design/vue";
const active = ref("overview");
const sections = [
  {
    id: "workspace",
    title: "Workspace",
    items: [
      { id: "overview", label: "Overview", href: "#overview" },
      {
        id: "projects",
        label: "Projects",
        children: [
          { id: "design", label: "Design", href: "#design" },
          { id: "web", label: "Website", href: "#web" },
        ],
      },
      { id: "settings", label: "Settings", href: "#settings" },
    ],
  },
];
</script>
<template>
  <NavTree
    :sections="sections"
    :active-id="active"
    aria-label="Workspace navigation"
    @item-select="(item) => (active = item.id)"
  /><output>Selected: {{ active }}</output>
</template>
