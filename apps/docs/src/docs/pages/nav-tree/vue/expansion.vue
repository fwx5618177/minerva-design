<script setup lang="ts">
import { ref } from "vue";
import { NavTree, Button, VStack } from "minerva-design/vue";
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
const expanded = ref(["projects"]);
</script>
<template>
  <VStack :gap="3" align="stretch"
    ><Button @click="expanded = expanded.length ? [] : ['projects']"
      >Toggle project group</Button
    ><NavTree
      v-model:expanded-ids="expanded"
      :sections="sections"
      :active-id="active"
      @item-select="(item) => (active = item.id)"
      aria-label="Controlled navigation"
    /><output>Expanded: {{ expanded.join(", ") || "none" }}</output></VStack
  >
</template>
